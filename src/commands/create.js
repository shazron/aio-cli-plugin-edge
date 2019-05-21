const {Command, flags} = require('@oclif/command')
const repos = require('../repos.json')
const path = require('path')
const fs = require('fs')
const simpleGit = require('simple-git/promise')
const {exec, execSync} = require('child_process')

class CreateCommand extends Command {
  async run() {
    const {args, flags} = this.parse(CreateCommand)
    const workingFolder = path.resolve(args.path)
    if (fs.existsSync(workingFolder)) {
      this.error('Path already exists - please specify a new location.')
    }

    // always create a fresh folder
    fs.mkdirSync(workingFolder)

    this.log(`Adobe I/O CLI (edge) will be installed as '${flags.bin}'`)

    // for a url, match the repo name (before the .git)
    const regex = /\/([\w,\-,_]+).git{0,1}\/{0,1}$/

    const git = simpleGit(workingFolder)
    repos.forEach(repoItem =>  { // GIT CLONE
      const {url, cli, plugin} = repoItem
      const repoName = url.match(regex)[1]

      const execFlags = {
        cwd: path.join(workingFolder, repoName),
        stdio: flags.verbose ? 'inherit' : 'ignore',
      }

      // git clone
      this.log(`Cloning ${url}...`)
      git.clone(url)
      .then(() => {
        this.log(`\tCloned -> ${url}`)
      })
      .then(() => { // NPM INSTALL
        this.log(`npm install in '${repoName}'`)
        exec('npm install', execFlags, (error, stdout) => {
          if (error) {
            throw error
          }
          if (flags.verbose) {
            this.log(stdout)
          }
          this.log(`\tnpm installed --> '${repoName}'`)
        })
      })
      .then(() => { // NPM LINK
        const repoPath = path.join(workingFolder, repoName)
        const packageJsonPath = path.join(repoPath, 'package.json')
        if (cli) {
          // modify package.json bin name to 'bin'
          const packageJson = require(packageJsonPath)
          packageJson.bin = {
            [flags.bin]: './bin/run',
          }
          packageJson.oclif.bin = flags.bin

          // write out the new package.json
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

          execSync('npm link', execFlags)
          this.log(`npm linked --> '${repoName}' with bin '${flags.bin}'`)
        } else if (plugin) {
          exec(`${flags.bin} plugins link`, execFlags, (error, stdout) => {
            if (error) {
              throw error
            }
            if (flags.verbose) {
              this.log(stdout)
            }
            this.log(`${flags.bin} plugins link --> '${repoName}'`)
          })
        }
      })
    })
  }
}

CreateCommand.description = 'Download and link repos for the core Adobe I/O cli (edge)'

CreateCommand.flags = {
  verbose: flags.boolean({char: '-v', description: 'verbose output'}),
  bin: flags.string({char: '-b', description: 'edge cli binary name', default: 'aio-edge'}),
}

CreateCommand.args = [
  {
    name: 'path',
    required: true,
    description: 'folder that will contain the Adobe I/O cli repos',
  },
]

module.exports = CreateCommand
