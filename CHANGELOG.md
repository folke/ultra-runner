# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/folke/ultra-runner/compare/v1.0.8...v1.1.0) (2020-01-27)


### Features

* ✨ added --cwd ([a365cd2](https://github.com/folke/ultra-runner/commit/a365cd21c9d54767b300925720a29b80ab729fd3))
* ✨ added support for bins higher up in monorepo ([80c9257](https://github.com/folke/ultra-runner/commit/80c92574a48ede89fc87de0a7450724c922ec351))


### Bug Fixes

* 🐛 endless loop on Windows when getting local bins ([17d250c](https://github.com/folke/ultra-runner/commit/17d250cb9f0627237a3839f6e124a8884420800d))
* 🐛 getBin for win32 ([5a0227e](https://github.com/folke/ultra-runner/commit/5a0227e2a9c872a4c263405d065cbe15e1ebe288))
* 🐛 resolve on win32 ([ef7e564](https://github.com/folke/ultra-runner/commit/ef7e564eadbc8918a19e665ab2da257cf7bb5840))


### Other

* 🔧 unused import ([6297155](https://github.com/folke/ultra-runner/commit/6297155d822a31db1fad7b65f9766469c071fd7f))
* **deps:** 🔗 package upgrade ([1d3def7](https://github.com/folke/ultra-runner/commit/1d3def79bcec0dda166f14c46e0e65ef1a7adeb6))
* **deps:** 🔗 package upgrade merge ([8a48387](https://github.com/folke/ultra-runner/commit/8a48387df15547082c6a1d77d66eab47bd57a08c))
* **deps:** add renovate.json ([0cd77a6](https://github.com/folke/ultra-runner/commit/0cd77a6e37ebe9d7a4e5e7788bb0adc45506ff0e))
* **deps:** pin dependencies ([#3](https://github.com/folke/ultra-runner/issues/3)) ([6f883f1](https://github.com/folke/ultra-runner/commit/6f883f158680eb293c0a4bb108affb913c2dd845))
* **deps:** pin dependency husky to 4.2.1 ([#6](https://github.com/folke/ultra-runner/issues/6)) ([2ba8227](https://github.com/folke/ultra-runner/commit/2ba8227cc394d7bbf612b90e67a84ee7fa1bf124))
* **deps:** update all non-major dependencies ([#9](https://github.com/folke/ultra-runner/issues/9)) ([0723fd8](https://github.com/folke/ultra-runner/commit/0723fd87da2e7eeb6536ca8c6a0fa67f58d812a4))
* **deps:** update dependency devmoji to v2.1.1 ([#7](https://github.com/folke/ultra-runner/issues/7)) ([a3f365d](https://github.com/folke/ultra-runner/commit/a3f365d69e3d561a47010d7557d069a87f6a6ae8))
* **deps:** update dependency devmoji to v2.1.3 ([#8](https://github.com/folke/ultra-runner/issues/8)) ([f24a351](https://github.com/folke/ultra-runner/commit/f24a351a5f4456ff1a23d4bd535c12fc9b5bfeb3))
* **deps:** update node.js to v13.7.0 ([ef93093](https://github.com/folke/ultra-runner/commit/ef93093d8c6b2b58b0b3e780c093930a4528c94a))
* **github:** 👷 prepare semantic-release ([15cae83](https://github.com/folke/ultra-runner/commit/15cae837ab355dd0cfc27f5811d2a75c1c8faca8))
* **github:** 👷 use node 12.x LTS version ([0cca149](https://github.com/folke/ultra-runner/commit/0cca149ad37f8953f6e52566c60f78533ea21eac))
* **renovate:** 👷 better renovate config ([9a58214](https://github.com/folke/ultra-runner/commit/9a58214e5c5b394b196e4be26a827ccaf4e622a2))
* 👷 added env.CI to top level build ([e165b75](https://github.com/folke/ultra-runner/commit/e165b75536341875574a57657fa1c3eec639e025))
* 👷 added support for [skip ci] ([080c23f](https://github.com/folke/ultra-runner/commit/080c23fa56b9552a36c006cb0b3e0f31951920d8))
* 📚️ removed travis badge ([860aab8](https://github.com/folke/ultra-runner/commit/860aab876db4baa72ed9206a4b8eb50444e2f128))
* 🚨 fixed tests for Windows ([8111d8d](https://github.com/folke/ultra-runner/commit/8111d8d9e6136ea47b94d4a6f0f41597a6e4cf08))
* added matrix for build ([16ba5e2](https://github.com/folke/ultra-runner/commit/16ba5e21648abb02be4a357fbb300448ba00f1b1))
* added renovate badge ([e6d272e](https://github.com/folke/ultra-runner/commit/e6d272eb2fb63ed1dec521b21f432df87c960e2a))
* fixed coveralls parallel ([9a5951d](https://github.com/folke/ultra-runner/commit/9a5951da7648504aee5619e040aaabebd3cc67f7))
* updated build.yml [skip ci] ([7cee0b3](https://github.com/folke/ultra-runner/commit/7cee0b352a8a29665810df5b1da27a462c2ad7af))
* updated jest coverage stats ([ec7e632](https://github.com/folke/ultra-runner/commit/ec7e632fe69634d263d7ae00be812b05e962e06a))

### [1.0.8](https://github.com/folke/ultra-runner/compare/v1.0.7...v1.0.8) (2020-01-24)


### Other

* ♻️ main should be lib/cli.js ([e640cb1](https://github.com/folke/ultra-runner/commit/e640cb18422ffd634db60ac7c7f17275734d976c))
* 👷 added Github build action ([5b6bd03](https://github.com/folke/ultra-runner/commit/5b6bd03189a580cd44427d2b83adb633e9174c9e))
* 👷 fixed Github build action ([efd50e7](https://github.com/folke/ultra-runner/commit/efd50e7c30fef8bc597cdee372a31c44c0d099e2))
* 📚 added Github CI badge ([56aa598](https://github.com/folke/ultra-runner/commit/56aa59847ebf9ae97f834edc0815970d50d68284))
* 📚️ migrate travis-ci.org to .com [skip ci] ([48095bb](https://github.com/folke/ultra-runner/commit/48095bb776df2156826f3dc300102987551c5d91))
* 🚨 code coverage to 100% 💯 💥 ([713c633](https://github.com/folke/ultra-runner/commit/713c633f693a466946852c13e230d4d860610176))

### [1.0.7](https://github.com/folke/ultra-runner/compare/v1.0.6...v1.0.7) (2020-01-23)

### [1.0.6](https://github.com/folke/ultra-runner/compare/v1.0.5...v1.0.6) (2020-01-23)


### Other

* 📚️ fixed links on badges ([62e18ad](https://github.com/folke/ultra-runner/commit/62e18ad9881f88a9896a2bebd4f595443a38f2f5))

### [1.0.5](https://github.com/folke/ultra-runner/compare/v1.0.4...v1.0.5) (2020-01-23)


### Bug Fixes

* 🐛 force hard wrapping on long lines ([ea88b58](https://github.com/folke/ultra-runner/commit/ea88b58a83e54b3e03e45352e9ee782e3d59dc22))


### Other

* 📚️ added badges ([f32cba4](https://github.com/folke/ultra-runner/commit/f32cba4a16883790db61cca1a41f01e610c9ad5d))
* 🚨 added a bunch of tests ([b35827c](https://github.com/folke/ultra-runner/commit/b35827c6a1d7364bd970d86d16e87e44d171344d))
* **eslint:** 🎨 added additional eslint rules ([a3a44c5](https://github.com/folke/ultra-runner/commit/a3a44c54084a4302813d5c4f684c06ce03ee9a3c))
* added Apache 2.0 license ([d6ce07a](https://github.com/folke/ultra-runner/commit/d6ce07affd907727750e8fa16aa239b0eb7c824b))

### [1.0.4](https://github.com/folke/ultra-runner/compare/v1.0.3...v1.0.4) (2020-01-22)


### Other

* 📚️ fixed markdown table ([8fca4e1](https://github.com/folke/ultra-runner/commit/8fca4e11c430a5cbf5a9457dbd22e9d18775a788))

### [1.0.3](https://github.com/folke/ultra-runner/compare/v1.0.2...v1.0.3) (2020-01-22)


### Other

* 📚️ updated README.md ([e6f96ab](https://github.com/folke/ultra-runner/commit/e6f96ab0e23c87efaca69055d2d0a9eec64461de))
* 🔧 release artifacts ([e7c0379](https://github.com/folke/ultra-runner/commit/e7c03792307af89a6ad6dee34e1064fcb9cbea24))

### [1.0.2](https://github.com/folke/ultra-runner/compare/v1.0.1...v1.0.2) (2020-01-22)


### Bug Fixes

* 🐛 properly wrap long ansi lines to preseve CSI output ([9f7c4cd](https://github.com/folke/ultra-runner/commit/9f7c4cd6575262cd684858bcca0226b85161a6d8))


### Other

* **release:** 🚀 1.0.1 ([2c9ae09](https://github.com/folke/ultra-runner/commit/2c9ae09277bffab9d73afb1f9eb53ab168b83564))
* 🎨 removed debug ([7bee55c](https://github.com/folke/ultra-runner/commit/7bee55cdd9e4d51ee88383f7126441702fcef11e))
* **deps:** 🔗 downgrade Jest ([98b16c6](https://github.com/folke/ultra-runner/commit/98b16c6f328a10e18c64c92a54d4e076e4a8ae96))
* **eslint:** 🎨 added prefer-template ([3467581](https://github.com/folke/ultra-runner/commit/3467581f1f3f64353c2b2c1734d096e740b890b0))
* **eslint:** 🎨 fixed linting errors ([9a048b8](https://github.com/folke/ultra-runner/commit/9a048b8397c3d47a12207941b021a84e56e99b81))
* 📚️ new demo svg ([a850825](https://github.com/folke/ultra-runner/commit/a850825cf3364778d48e3f0b9ebd68cce434ec83))
* 🔧 tsconfig.json ([5bf564c](https://github.com/folke/ultra-runner/commit/5bf564c56b1ae4a86cca1e699a3ec62452c3e3b1))
* **spinner:** ⚡️ optimized rendering of spinners ([099e1fa](https://github.com/folke/ultra-runner/commit/099e1fa8b818da7b052b51d2825144740105ad46))
* 🔧 vscode launch config for ultra ([8056bee](https://github.com/folke/ultra-runner/commit/8056bee63334433bf310e4b52b532a8823f5e7ce))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
