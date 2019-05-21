edge-cli
========

Plugin to generate the edge version of the Adobe I/O cli and plugins

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/edge-cli.svg)](https://npmjs.org/package/edge-cli)
[![Downloads/week](https://img.shields.io/npm/dw/edge-cli.svg)](https://npmjs.org/package/edge-cli)
[![License](https://img.shields.io/npm/l/edge-cli.svg)](https://github.com/adobe/aio-cli-edge/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g edge-cli
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
edge-cli/0.1.0 darwin-x64 node-v8.15.0
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-example create PATH`](#oclif-example-create-path)
* [`oclif-example update PATH`](#oclif-example-update-path)

## `oclif-example create PATH`

Download and link repos for the core Adobe I/O cli (edge)

```
USAGE
  $ oclif-example create PATH

ARGUMENTS
  PATH  folder that will contain the Adobe I/O cli repos

OPTIONS
  --, --bin=bin  [default: aio-edge] edge cli binary name
  --, --verbose  verbose output
```

_See code: [src/commands/create.js](https://github.com/adobe/aio-cli-edge/blob/v0.1.0/src/commands/create.js)_

## `oclif-example update PATH`

Update repos for the core Adobe I/O cli (edge)

```
USAGE
  $ oclif-example update PATH

ARGUMENTS
  PATH  folder that contains the Adobe I/O cli repos (edge)

OPTIONS
  --, --verbose  verbose output
```

_See code: [src/commands/update.js](https://github.com/adobe/aio-cli-edge/blob/v0.1.0/src/commands/update.js)_
<!-- commandsstop -->
