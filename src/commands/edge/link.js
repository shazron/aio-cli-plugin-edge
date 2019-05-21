const {Command, flags} = require('@oclif/command')
const repos = require('../../repos.json')
const path = require('path')
const fs = require('fs')
const {exec, execSync} = require('child_process')

class LinkCommand extends Command {
  async run() {
    const {args, flags} = this.parse(LinkCommand)
    const workingFolder = path.resolve(args.path)
    if (!fs.existsSync(workingFolder)) {
      this.error('Path does not exist.')
    }

    // for a url, match the repo name (before the .git)
    const regex = /\/([\w,\-,_]+).git{0,1}\/{0,1}$/

    // the first item in the repos list *must* be the cli

    this.log(`Adobe I/O CLI (edge) will be installed as '${flags.bin}'`)

    repos.forEach(repoItem =>  {
      const {url, plugin} = repoItem
      const repoName = url.match(regex)[1]

      const execFlags = {
        cwd: path.join(workingFolder, repoName),
        stdio: flags.verbose ? 'inherit' : 'ignore',
      }

      const repoPath = path.join(workingFolder, repoName)
      const packageJsonPath = path.join(repoPath, 'package.json')

      if (plugin) { // OCLIF PLUGINS LINK
        exec(`${flags.bin} plugins link`, execFlags, (error, stdout) => {
          if (error) {
            throw error
          }
          if (flags.verbose) {
            this.log(stdout)
          }
          this.log(`Linked plugin (${flags.bin}) --> '${repoName}'`)
        })
      } else { // NPM LINK (cli)
        // modify package.json bin name to 'bin'
        const packageJson = require(packageJsonPath)
        packageJson.bin = {
          [flags.bin]: './bin/run',
        }
        packageJson.name = '@adobe/aio-cli-edge'
        packageJson.oclif.bin = flags.bin

        // write out the new package.json
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

        execSync('npm link', execFlags)
        this.log(`npm linked --> '${repoName}' with bin '${flags.bin}'`)

        // don't git stash, we need the package.json changes since it is linked
      }
    })
  }
}

LinkCommand.description = 'Link repos for the core Adobe I/O cli (edge)'

LinkCommand.flags = {
  verbose: flags.boolean({char: '-v', description: 'verbose output'}),
  bin: flags.string({char: '-b', description: 'edge cli binary name', default: 'aio-edge'}),
}

LinkCommand.args = [
  {
    name: 'path',
    required: true,
    description: 'folder that contains the Adobe I/O cli repos',
  },
]

module.exports = LinkCommand
