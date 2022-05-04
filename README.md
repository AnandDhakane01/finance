# ARC(Animal Rescue Community)- BACKEND

# My first contribution

## Raising Hands For Injured Paws

ARC is a non-profit organization which helps orphan pets find their new homes and a family.

## Contents

- [Stack](#stack)
- [Setup Guide](#setup-guide)
- [Contribution Guide](#contribution-guide)
- [Community](#community)
- [Support](#support)
- [License](#license)
- [Maintainers](#primary-maintainers)

# Stack

| Stack    | Technology         |
| -------- | ------------------ |
| Backend  | Nodejs , expressjs |
| Database | MongoDB            |

[![NPM](https://img.shields.io/static/v1?label=npm&message=7.23&color=blue)](https://shields.io/)
[![NODE](https://img.shields.io/static/v1?label=node&message=14.17.6&color=success)](https://shields.io/)
[![MONGODB](https://img.shields.io/static/v1?label=mongodb&message=4.4.4&color=blueviolet)](https://shields.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://shields.io/)

## Setup Guide

Basic requirements

```
 Install Node version 14 or higher
 Install MongoDB
```

- Fork this repository into your own GitHub account.
- Clone the repo from your GitHub account to your local machine using the following commands

- you can either use ssh or https

```bash
using https:
$ git clone https://github.com/arc-pune/arc-backend.git
$ cd arc-backend

or

using ssh:
$ git clone git@github.com:arc-pune/arc-backend.git
$ cd arc-backend
```

- Creating branch

```bash
git branch  your-branch-name
git checkout your-branch-name
```

- Configuring env file
  - create a .env file in the root directory
  - set the MongoDb url in the env file
  - you can refer to the .env.example file

To run the development server, do the following in the `arc-backend` directory:

##Non-Docker Version

```bash
$ npm install
$ npm run dev
```

##Docker Version

```bash
$ npm install && npm dockerize
```

You can now see the project running on your localhost

You can edit files on your text-editor, changes will be reflected in your browser.

## Contribution Guide

- Go to `Contributing.md`

## Community

We also have public chat rooms on Discord. Drop by and say hello!

[![](https://img.shields.io/badge/chat-on_Discord-blue.svg?style=for-the-badge&logo=Discord)](https://discord.gg/CyDnCUEW)

## Support

If you have any feature requests or bug reports, please log them on the [issue tracker](https://github.com/arc-pune/arc-backend/issues/new).

## License

This project is licensed under the [MIT License](LICENSE).

## Primary Maintainers

[Anand](https://github.com/AnandDhakane01)

[Kishore](https://github.com/majjikishore007)

[Sahil](https://github.com/agarwalsahil0210)
