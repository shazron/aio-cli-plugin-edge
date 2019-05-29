const {Command, flags} = require('@oclif/command')
const repos = require('../../repos.json')
const path = require('path')
const fs = require('fs')
const {exec, execSync} = require('child_process')
const debug = require('debug')('edge-link')

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
      const {url, cli, 'aio-plugins-link': aioPluginsLink, 'npm-link': npmLink, 'npm-link-items': npmLinkItems} = repoItem
      const repoName = url.match(regex)[1]
      const repoPath = path.join(workingFolder, repoName)
      const packageJsonPath = path.join(repoPath, 'package.json')

      const execFlags = {
        cwd: repoPath,
        stdio: flags.verbose ? 'inherit' : 'ignore',
      }

      debug('Exec flags', execFlags)
      debug('RepoItem', repoItem)

      if (!fs.existsSync(repoPath)) {
        this.error(`${repoPath} does not exist. Clone using 'git clone ${url}'`)
      }

      if (cli) {
        // modify package.json bin name to 'bin'
        const packageJson = require(packageJsonPath)
        packageJson.bin = {
          [flags.bin]: './bin/run',
        }
        packageJson.name = '@adobe/aio-cli-edge'
        packageJson.oclif.bin = flags.bin

        // write out the new package.json
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

        // don't git stash, we need the package.json changes since it is linked
      }

      if (npmLinkItems) {
        npmLinkItems.forEach(linkItem => {
          execSync(`npm link ${linkItem}`, execFlags)
          this.log(`npm linked (local) in ${repoName} --> '${linkItem}'`)
        })
      }

      if (npmLink) {
        execSync('npm link', execFlags)
        this.log(`npm linked --> '${repoName}' with bin '${flags.bin}'`)
      }

      if (aioPluginsLink) {
        const cmd = `${flags.bin} plugins link`
        debug('cmd', cmd)
        exec(cmd, execFlags, (error, stdout) => {
          if (error) {
            throw error
          }
          if (flags.verbose) {
            this.log(stdout)
          }
          this.log(`Linked plugin (${flags.bin}) --> '${repoName}'`)
        })
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
