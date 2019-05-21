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
edge-cli/0.1.0 darwin-x64 node-v8.11.4
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-example edge:install PATH`](#oclif-example-edgeinstall-path)
* [`oclif-example edge:link PATH`](#oclif-example-edgelink-path)
* [`oclif-example edge:unlink PATH`](#oclif-example-edgeunlink-path)
* [`oclif-example edge:update PATH`](#oclif-example-edgeupdate-path)

## `oclif-example edge:install PATH`

Download repos for the core Adobe I/O cli (edge)

```
USAGE
  $ oclif-example edge:install PATH

ARGUMENTS
  PATH  folder that will contain the Adobe I/O cli repos

OPTIONS
  --, --verbose  verbose output
```

_See code: [src/commands/edge/install.js](https://github.com/adobe/aio-cli-edge/blob/v0.1.0/src/commands/edge/install.js)_

## `oclif-example edge:link PATH`

Link repos for the core Adobe I/O cli (edge)

```
USAGE
  $ oclif-example edge:link PATH

ARGUMENTS
  PATH  folder that contains the Adobe I/O cli repos

OPTIONS
  --, --bin=bin  [default: aio-edge] edge cli binary name
  --, --verbose  verbose output
```

_See code: [src/commands/edge/link.js](https://github.com/adobe/aio-cli-edge/blob/v0.1.0/src/commands/edge/link.js)_

## `oclif-example edge:unlink PATH`

Unlink repos for the core Adobe I/O cli (edge)

```
USAGE
  $ oclif-example edge:unlink PATH

ARGUMENTS
  PATH  folder that contains the Adobe I/O cli repos

OPTIONS
  --, --bin=bin  [default: aio-edge] edge cli binary name
  --, --verbose  verbose output
```

_See code: [src/commands/edge/unlink.js](https://github.com/adobe/aio-cli-edge/blob/v0.1.0/src/commands/edge/unlink.js)_

## `oclif-example edge:update PATH`

Update repos for the core Adobe I/O cli (edge)

```
USAGE
  $ oclif-example edge:update PATH

ARGUMENTS
  PATH  folder that contains the Adobe I/O cli repos (edge)

OPTIONS
  --, --verbose  verbose output
```

_See code: [src/commands/edge/update.js](https://github.com/adobe/aio-cli-edge/blob/v0.1.0/src/commands/edge/update.js)_
<!-- commandsstop -->
