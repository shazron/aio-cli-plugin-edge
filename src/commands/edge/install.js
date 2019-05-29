const {Command, flags} = require('@oclif/command')
const repos = require('../../repos.json')
const path = require('path')
const fs = require('fs')
const simpleGit = require('simple-git/promise')
const {exec} = require('child_process')

class InstallCommand extends Command {
  async run() {
    const {args, flags} = this.parse(InstallCommand)
    const workingFolder = path.resolve(args.path)
    const workingFolderExists = fs.existsSync(workingFolder)

    if (flags['use-existing']) { // use existing
      if (!workingFolderExists) {
        this.error(`Path ${workingFolder} does not exist.`)
      }
    } else { // create new each time
      // eslint-disable-next-line no-lonely-if
      if (workingFolderExists) {
        this.error(`Path ${workingFolder} already exists - please specify a new location.`)
      } else {
        // create a fresh folder
        fs.mkdirSync(workingFolder)
      }
    }

    // for a url, match the repo name (before the .git)
    const regex = /\/([\w,\-,_]+).git{0,1}\/{0,1}$/

    // the first item in the repos list *must* be the cli

    repos.forEach(async repoItem =>  { // GIT CLONE
      const {url} = repoItem
      const repoName = url.match(regex)[1]

      const execFlags = {
        cwd: path.join(workingFolder, repoName),
        stdio: flags.verbose ? 'inherit' : 'ignore',
      }

      if (!flags['use-existing']) {
      // git clone
        this.log(`Cloning ${url}...`)
        await simpleGit(workingFolder).clone(url)
        this.log(`\tCloned -> ${url}`)
      }

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
  }
}

InstallCommand.description = 'Download repos for the core Adobe I/O cli (edge)'

InstallCommand.flags = {
  verbose: flags.boolean({char: '-v', description: 'verbose output'}),
  'use-existing': flags.boolean({char: '-e', description: 'Don\'t create a folder to contain all the repos, use existing'}),
}

InstallCommand.args = [
  {
    name: 'path',
    required: true,
    description: 'folder that will contain the Adobe I/O cli repos',
  },
]

module.exports = InstallCommand
