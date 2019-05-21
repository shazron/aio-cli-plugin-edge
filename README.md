aio-cli-plugin-edge
========

Plugin to generate the edge version of the Adobe I/O cli and plugins

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/aio-cli-plugin-edge.svg)](https://npmjs.org/package/aio-cli-plugin-edge)
[![Downloads/week](https://img.shields.io/npm/dw/aio-cli-plugin-edge.svg)](https://npmjs.org/package/aio-cli-plugin-edge)
[![License](https://img.shields.io/npm/l/aio-cli-plugin-edge.svg)](https://github.com/adobe/aio-cli-plugin-edge/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @adobe/aio-cli-plugin-edge
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
@adobe/aio-cli-plugin-edge/0.1.0 darwin-x64 node-v8.11.4
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
<!-- commandsstop -->
