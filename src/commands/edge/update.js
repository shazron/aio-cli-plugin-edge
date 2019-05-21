const {Command, flags} = require('@oclif/command')
const repos = require('../../repos.json')
const path = require('path')
const fs = require('fs')
const simpleGit = require('simple-git/promise')

class UpdateCommand extends Command {
  async run() {
    const {args, flags} = this.parse(UpdateCommand)
    const workingFolder = path.resolve(args.path)
    if (!fs.existsSync(workingFolder)) {
      this.error('Path does not exist.')
    }

    // for a url, match the repo name (before the .git)
    const regex = /\/([\w,\-,_]+).git{0,1}\/{0,1}$/

    repos.forEach(repoItem =>  {
      const {url} = repoItem
      const repoName = url.match(regex)[1]

      const git = simpleGit(path.join(workingFolder, repoName))

      // git pull
      this.log(`git pull ${url}...`)
      git
      .outputHandler((command, stdout, stderr) => {
        if (flags.verbose) {
          stdout.pipe(process.stdout)
          stderr.pipe(process.stderr)
        }
      })
      .pull('--rebase', '--autostash')
      .then(() => {
        this.log(`\tgit pulled -> ${url}`)
      })
    })
  }
}

UpdateCommand.description = 'Update repos for the core Adobe I/O cli (edge)'

UpdateCommand.flags = {
  verbose: flags.boolean({char: '-v', description: 'verbose output'}),
}

UpdateCommand.args = [
  {
    name: 'path',
    required: true,
    description: 'folder that contains the Adobe I/O cli repos (edge)',
  },
]

module.exports = UpdateCommand
