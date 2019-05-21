const {Command, flags} = require('@oclif/command')
const repos = require('../../repos.json')
const path = require('path')
const fs = require('fs')
const simpleGit = require('simple-git/promise')
const {execSync} = require('child_process')

class UnlinkCommand extends Command {
  async run() {
    const {args, flags} = this.parse(UnlinkCommand)
    const workingFolder = path.resolve(args.path)
    if (!fs.existsSync(workingFolder)) {
      this.error('Path does not exist.')
    }

    // aio-edge should be in the path
    try {
      execSync(`${flags.bin}`, {stdio: flags.verbose ? 'inherit' : 'ignore'})
    // eslint-disable-next-line unicorn/catch-error-name
    } catch (e) {
      this.error(`${flags.bin}: command not found.`)
    }

    // for a url, match the repo name (before the .git)
    const regex = /\/([\w,\-,_]+).git{0,1}\/{0,1}$/

    // the first item in the repo is the cli, we reverse the list
    repos.reverse()

    repos.forEach(repoItem =>  {
      const {url, cli, plugin} = repoItem
      const repoName = url.match(regex)[1]

      const execFlags = {
        cwd: path.join(workingFolder, repoName),
        stdio: flags.verbose ? 'inherit' : 'ignore',
      }

      const repoPath = path.join(workingFolder, repoName)
      const packageJsonPath = path.join(repoPath, 'package.json')
      const git = simpleGit(repoPath)
      const packageJson = require(packageJsonPath)

      if (cli) { // NPM LINK
        // modify package.json bin name to 'bin'
        packageJson.bin = {
          [flags.bin]: './bin/run',
        }
        packageJson.name = '@adobe/aio-cli-edge'
        packageJson.oclif.bin = flags.bin

        // write out the new package.json
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

        execSync('npm unlink', execFlags)
        this.log(`npm unlinked --> '${repoName}' for bin '${flags.bin}'`)

        // revert changes
        git.stash()
        git.stash('drop')
      } else if (plugin) { // OCLIF PLUGINS LINK
        try {
          execSync(`${flags.bin} plugins uninstall`, execFlags)
          this.log(`Uninstalled plugin (${flags.bin}) --> '${packageJson.name}'`)
        // eslint-disable-next-line unicorn/catch-error-name
        } catch (e) {
          this.log(`Failed to uninstall (${flags.bin})--> ${packageJson.name}`)
        }
      }
    })
  }
}

UnlinkCommand.description = 'Unlink repos for the core Adobe I/O cli (edge)'

UnlinkCommand.flags = {
  verbose: flags.boolean({char: '-v', description: 'verbose output'}),
  bin: flags.string({char: '-b', description: 'edge cli binary name', default: 'aio-edge'}),
}

UnlinkCommand.args = [
  {
    name: 'path',
    required: true,
    description: 'folder that contains the Adobe I/O cli repos',
  },
]

module.exports = UnlinkCommand
