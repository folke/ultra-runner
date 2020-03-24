# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.3.5](https://github.com/folke/ultra-runner/compare/v2.3.4...v2.3.5) (2020-03-24)


### Bug Fixes

* 🐛 use correct PATH key on all platforms. It's "Path" instead of "PATH" on Windows ([a90a310](https://github.com/folke/ultra-runner/commit/a90a310513c9774dab4a5b09c85221860339494d))


### Other

* **deps:** update dependency devmoji to v2.1.7 ([#44](https://github.com/folke/ultra-runner/issues/44)) ([5a2d994](https://github.com/folke/ultra-runner/commit/5a2d994e0f56eb38116a960301698717b162b613))

### [2.3.4](https://github.com/folke/ultra-runner/compare/v2.3.3...v2.3.4) (2020-03-24)


### Bug Fixes

* 🐛 always extend PATH with local node_modules/.bin directory for commands that execute child processes like nyc [#35](https://github.com/folke/ultra-runner/issues/35) ([b375017](https://github.com/folke/ultra-runner/commit/b375017f61eedcd9ec73ac1f803c5f8b8ba4aa35))


### Other

* **deps:** update all non-major dependencies to v2.25.0 ([#42](https://github.com/folke/ultra-runner/issues/42)) ([2d869ae](https://github.com/folke/ultra-runner/commit/2d869aebee30d19478fdeb834a48b8a353f15d9d))
* **deps:** update dependency @types/prettier to v1.19.1 ([#41](https://github.com/folke/ultra-runner/issues/41)) ([d6266f4](https://github.com/folke/ultra-runner/commit/d6266f43576617d1400e6755e29e7790e24aa3be))
* **deps:** update dependency prettier to v2.0.2 ([#43](https://github.com/folke/ultra-runner/issues/43)) ([239d833](https://github.com/folke/ultra-runner/commit/239d8337f331ec809677d4bc61576d51b1c4c31b))

### [2.3.3](https://github.com/folke/ultra-runner/compare/v2.3.2...v2.3.3) (2020-03-22)


### Bug Fixes

* 🐛 added support for specifying env vars before the command ([edcb0bf](https://github.com/folke/ultra-runner/commit/edcb0bf16c72c8abc8899ea7142f837bd30cb6ef))


### Other

* 🎨 Prettier 2.0 ([8b19431](https://github.com/folke/ultra-runner/commit/8b194318dca9e81727cc9a4b38afe38ae2ea50bc))
* 🚨 added tests for env vars prefixes ([e3d2335](https://github.com/folke/ultra-runner/commit/e3d23350678c821114f0a839ee53ad341a931329))
* **deps:** pin dependency @types/cross-spawn to 6.0.1 ([#36](https://github.com/folke/ultra-runner/issues/36)) ([547f539](https://github.com/folke/ultra-runner/commit/547f5398e7e8df134f640e94015f4ecf4b59aaed))
* **deps:** update all non-major dependencies ([#34](https://github.com/folke/ultra-runner/issues/34)) ([ca36459](https://github.com/folke/ultra-runner/commit/ca364593645c300d86ae6d43d7376b0b34ef3538))
* **deps:** update all non-major dependencies ([#38](https://github.com/folke/ultra-runner/issues/38)) ([7327851](https://github.com/folke/ultra-runner/commit/73278514a8e92754a0c6654086c79a6e6e1e5916))
* **deps:** update dependency @types/rimraf to v3 ([#39](https://github.com/folke/ultra-runner/issues/39)) ([0459b43](https://github.com/folke/ultra-runner/commit/0459b43f404a1642430697db77445f7620b6f1d1))
* **deps:** update dependency prettier to v2 ([#40](https://github.com/folke/ultra-runner/issues/40)) ([6642656](https://github.com/folke/ultra-runner/commit/6642656d588b4bc685dfacf557fc6623f1b2c18a))

### [2.3.2](https://github.com/folke/ultra-runner/compare/v2.3.1...v2.3.2) (2020-03-18)


### Bug Fixes

* 🐛 process-list now shows node processes on windows ([03d8087](https://github.com/folke/ultra-runner/commit/03d8087afdf202950f3fbf5fcea5436599192296))
* 🐛 use cross-spawn for better windows support ([d5b6450](https://github.com/folke/ultra-runner/commit/d5b6450e01a34a309032a45da1c1a622bb12a384))

### [2.3.1](https://github.com/folke/ultra-runner/compare/v2.3.0...v2.3.1) (2020-03-16)


### Bug Fixes

* 🐛 stricter regex for known binaries ([5d5fc92](https://github.com/folke/ultra-runner/commit/5d5fc9244d994f5cf50d54442974da51689cd9f9))

## [2.3.0](https://github.com/folke/ultra-runner/compare/v2.2.1...v2.3.0) (2020-03-15)


### Features

* ✨ sort by total cpu for parent process including its children ([755dc60](https://github.com/folke/ultra-runner/commit/755dc6030f43094f6f00f72f8652aeb654fda637))

### [2.2.1](https://github.com/folke/ultra-runner/compare/v2.2.0...v2.2.1) (2020-03-15)


### Bug Fixes

* 🐛 some node processes were not shown due to issue with ps-list ([e4d4f54](https://github.com/folke/ultra-runner/commit/e4d4f54c853a91e93235835d88d3fbcd690284e2))
* 🐛 tree rendering should now always be correct ([6e1fe43](https://github.com/folke/ultra-runner/commit/6e1fe437f4208ff600283cf5505966ef83035479))


### Other

* **deps:** 🔗 update ([4f6f824](https://github.com/folke/ultra-runner/commit/4f6f824d76c1ebc9709a5d2caa774fcb10a28ba6))
* **deps:** 🔗 update ([139d590](https://github.com/folke/ultra-runner/commit/139d59025eee75458f2b03629cb4c7390f223706))
* **deps:** update dependency @types/chai to v4.2.11 ([#32](https://github.com/folke/ultra-runner/issues/32)) ([5b8c607](https://github.com/folke/ultra-runner/commit/5b8c6072091d276465c70b9d7328d11feff52842))
* **deps:** update dependency devmoji to v2.1.6 ([#33](https://github.com/folke/ultra-runner/issues/33)) ([ecc9dab](https://github.com/folke/ultra-runner/commit/ecc9dab3378095bbb5073ba2c302fa96962cc10b))

## [2.2.0](https://github.com/folke/ultra-runner/compare/v2.1.2...v2.2.0) (2020-03-13)


### Features

* ✨ added new node process monitoring feature ([c36ca83](https://github.com/folke/ultra-runner/commit/c36ca831cf5db4c23504f2ccd017c6fe94b085d8))


### Other

* ♻️ moved hideCursor code to terminal ([9d201bf](https://github.com/folke/ultra-runner/commit/9d201bf7935bdab821b4954debcd3acb556f7898))
* ♻️ moved onProcessExit to its own file ([daf786a](https://github.com/folke/ultra-runner/commit/daf786a26457eec17224e33440b84202b1725bbd))
* 👷 :del: yarn cache ([23b501f](https://github.com/folke/ultra-runner/commit/23b501f323d4ed47e3eb7ef9597b6bce71bab75b))
* 👷 don't run full build in CI ([1939805](https://github.com/folke/ultra-runner/commit/19398051431646690f6962f8ca65cd70988ccc52))
* 📚️ added --monitor ([8a1b63f](https://github.com/folke/ultra-runner/commit/8a1b63ffb988d99c3a0aa56bf30237f2110d0961))
* 🚨 fixed issue with runner test and rollup ([1227509](https://github.com/folke/ultra-runner/commit/1227509eabdae89069b3b02c15ceba5da104a2b0))
* 🚨 lowered code coverage ([ba16c52](https://github.com/folke/ultra-runner/commit/ba16c5279e9f2dda1f239cce804c942daee6a7e5))
* **deps:** update all non-major dependencies ([#28](https://github.com/folke/ultra-runner/issues/28)) ([c6084a9](https://github.com/folke/ultra-runner/commit/c6084a992af037d71566f2aaa860f60fbb774a5e))
* **deps:** update dependency eslint-plugin-unicorn to v17 ([#31](https://github.com/folke/ultra-runner/issues/31)) ([4f4818c](https://github.com/folke/ultra-runner/commit/4f4818c45eb37eff8aac84cd4afea2138f7039cf))
* 📚️ added missing info on output zooming ([36bb8e9](https://github.com/folke/ultra-runner/commit/36bb8e9f269e97740be0d7c7d885c554d7ca330d))

### [2.1.2](https://github.com/folke/ultra-runner/compare/v2.1.1...v2.1.2) (2020-03-05)

### [2.1.1](https://github.com/folke/ultra-runner/compare/v2.1.0...v2.1.1) (2020-03-05)


### Bug Fixes

* 🐛 ➕ tslib as a runtime dependency ([92a17a0](https://github.com/folke/ultra-runner/commit/92a17a028fdb7e325b805f2f79250f2788cfefc7))

## [2.1.0](https://github.com/folke/ultra-runner/compare/v2.0.1...v2.1.0) (2020-03-05)


### Features

* ✨ expose ultra-runner as a module as well, including type definitions ([9bb6076](https://github.com/folke/ultra-runner/commit/9bb6076cf3d68c140c4930c0e5e5285e3a9342c4))


### Other

* **deps:** 🔗 update ([a7b748e](https://github.com/folke/ultra-runner/commit/a7b748eb834826230b5c845dd40cd7373c461654))
* **deps:** 🔗 yarn.lock ([8a4f33a](https://github.com/folke/ultra-runner/commit/8a4f33aaffa8f0e29060fe7b7da597bc1f1ff568))
* **deps:** pin dependencies ([2d55797](https://github.com/folke/ultra-runner/commit/2d5579729eb754ae16b67999c7ddd19d3ba3ff6d))
* **deps:** update node.js to v13.10.1 ([#26](https://github.com/folke/ultra-runner/issues/26)) ([f2fe227](https://github.com/folke/ultra-runner/commit/f2fe22759812651fe77573ab44b4ff40e785077e))
* **merge:** 🔧 Merge branch 'master' of github.com:folke/ultra-runner ([7b6e9e4](https://github.com/folke/ultra-runner/commit/7b6e9e4ad041bdc17130ea9896756f572602e9e7))
* ♻️ don't use Object.fromEntries ([a829863](https://github.com/folke/ultra-runner/commit/a8298630f68c572feda9d33602fa5aae5f6c9942))
* 📚️ added todo ([5237479](https://github.com/folke/ultra-runner/commit/5237479d472da00854135d500c3a2ce7c125ab56))
* 🚨 🐛 issue with parallel running of jest tests ([785a389](https://github.com/folke/ultra-runner/commit/785a389b6fd018f9f72a61b0f12abe6fa2499184))

### [2.0.1](https://github.com/folke/ultra-runner/compare/v2.0.0...v2.0.1) (2020-03-04)


### Bug Fixes

* 🐛 properly clear down and reset cursor to [0,0] on terminal resize ([c3addab](https://github.com/folke/ultra-runner/commit/c3addabf9c2cc26f3376aaecc7e4daca640a2641))


### Other

* ♻️ use yamljs and json5 instead of yaml and comment-json. smaller deps ([b6d3994](https://github.com/folke/ultra-runner/commit/b6d3994b8bd9e439c21ac722681ae3bd6ce1dc02))

## [2.0.0](https://github.com/folke/ultra-runner/compare/v1.1.0...v2.0.0) (2020-03-04)


### ⚠ BREAKING CHANGES

* 💥 ♻️ new command line options

### Features

* ✨ added --build, --concurrency, --debug and --root to cli ([0c277ef](https://github.com/folke/ultra-runner/commit/0c277ef36d5853c2a380ca06633def29d60e2e51))
* ✨ added --list to show available scripts ([6f9224a](https://github.com/folke/ultra-runner/commit/6f9224a8e03d84a798e59d39953411ecebf88ca6))
* ✨ added initial support for rush workspaces ([a771ec6](https://github.com/folke/ultra-runner/commit/a771ec6247dee4b81df8d1b3f1ff038fca7bf9e8))
* ✨ added support for lerna, yarn and pnpm workspaces ([f2b387d](https://github.com/folke/ultra-runner/commit/f2b387dd4fff6a59459809ca739d03e15e7e1082))
* ✨ automatically scroll spinner output ([79a9dcd](https://github.com/folke/ultra-runner/commit/79a9dcde86d139e4165a404b09ba6f0896cf11ea))
* ✨ builds are skipped when no files were changed ([86c9966](https://github.com/folke/ultra-runner/commit/86c99661d1299f1fee8af30bdfd6ab3dd75d58de))
* ✨ imply build when using --build. Same for --rebuild ([931ef32](https://github.com/folke/ultra-runner/commit/931ef32ede07028b444c6208c35738b6052a1338))
* ✨ moved to yargs for cli, instead of commander ([cc2356a](https://github.com/folke/ultra-runner/commit/cc2356a94f81d3af2dc793d2f5c35d116022e727))
* ✨ optimized ansi terminal rendering ([1e65903](https://github.com/folke/ultra-runner/commit/1e65903af7982f6723728359c55aba34aba2866b))
* ✨ package filtering for --recursive ([4422d7c](https://github.com/folke/ultra-runner/commit/4422d7c7b14a87f82d4c850d368352492e3b665a))
* ✨ show detected workspaces and package manager in --info ([6902c19](https://github.com/folke/ultra-runner/commit/6902c19a932239a4a29408f5165aa6355a4e127a))
* ✨ use fast-glob to find packages ([c35da68](https://github.com/folke/ultra-runner/commit/c35da68a1a2f464682f9ea5a11042024eb6d238c))
* ✨ you can now use "rebuild" which will trigger a forced build ([abde0e3](https://github.com/folke/ultra-runner/commit/abde0e3de58d7181ce96fac1e3d0f426d29feb91))


### Bug Fixes

* 🐛 don't stat .ultra.cache.json files and ignore top level directories ([5799c63](https://github.com/folke/ultra-runner/commit/5799c6396f73421c159a0a8b476cb329d2ba73cd))
* 🐛 max resize listeners when running tests ([6044beb](https://github.com/folke/ultra-runner/commit/6044beb560120da3d30662e9cf6589dd74853f7f))
* 🐛 properly kill child processes when exiting ([099f879](https://github.com/folke/ultra-runner/commit/099f879080a455b73da843e858dfa494a5e56254))
* 🐛 removed circular dependency ([57e162c](https://github.com/folke/ultra-runner/commit/57e162cdfc1d78323ec0f9d69dfdc467716f08a8))


### Other

* 📚️ fixed linter errors ([e17ddc8](https://github.com/folke/ultra-runner/commit/e17ddc8508b8b67b42bc2d5e9e835f672b9f4365))
* 📚️ updated for new release ([9afaa8b](https://github.com/folke/ultra-runner/commit/9afaa8b63337e8b11ebb64b472038e89b7d36307))
* **deps:** 🔗 ➖ some deps ([31cd246](https://github.com/folke/ultra-runner/commit/31cd24623aeac1cc921286874a99f10bb874576a))
* **deps:** update node.js to v13.10.0 ([#24](https://github.com/folke/ultra-runner/issues/24)) ([68b3333](https://github.com/folke/ultra-runner/commit/68b3333072f6317908faebb8d9e1dd1681cc2166))
* ♻️ added Workspace class for managing packages in monorepo ([3f122c8](https://github.com/folke/ultra-runner/commit/3f122c8bd226e164798c775b3ef530ef5b624060))
* ♻️ command output formatter to its own file ([01cd3d3](https://github.com/folke/ultra-runner/commit/01cd3d30846c5666df82587951ef88214b7e9437))
* ♻️ filtering is now part of Workspace ([fa8b41b](https://github.com/folke/ultra-runner/commit/fa8b41b5d783a9b0ab5d689d03a096f2f214bcd5))
* ♻️ refactored multiple classes ([083f567](https://github.com/folke/ultra-runner/commit/083f5678773eb8a3c90cb2fc5efc08ba65a407ee))
* ♻️ use HASH_FILE constant for ignoring ultra cache files ([fbfa5b7](https://github.com/folke/ultra-runner/commit/fbfa5b7c377369c777ffee355fc5a08998532897))
* ⚡️ dynamically import fast-glob ([51d01bb](https://github.com/folke/ultra-runner/commit/51d01bb31a96c7b5f8fcfef2ef0099d4869df72c))
* ⚡️ dynamically load yaml and comment-json ([d443d61](https://github.com/folke/ultra-runner/commit/d443d61cd1e80af11842f29d3d3e1e1571a92710))
* ⚡️ get package from root instead of loading it through workspaces ([a22ab34](https://github.com/folke/ultra-runner/commit/a22ab34aa183abe1eed0a7953ffa85c4fbe625dd))
* ⚡️ get rid of cli-spinners, cli-cursor, and cursor-restore ([18d5424](https://github.com/folke/ultra-runner/commit/18d5424268aeedcedd5d16ff8804370f3a8da195))
* ⚡️ no need to pipe stuff through through2 ([d469e69](https://github.com/folke/ultra-runner/commit/d469e69762a1a033ff57a82a0d78ffae7da03293))
* ⚡️ only load yargs for more complex args ([cb6f204](https://github.com/folke/ultra-runner/commit/cb6f204e4eb234be8a6cb919c64067a87e9fb6a2))
* 💥 ♻️ new command line options ([e1a81ac](https://github.com/folke/ultra-runner/commit/e1a81ac802197ef51c51d867aaf5b3727ba260ec))
* 🚨 fixed tests for Win32 ([f1cf7e1](https://github.com/folke/ultra-runner/commit/f1cf7e184122a506a65e12ec9eb24729ee8c968a))
* 🚨 fixed tests for Win32 ([a9a6799](https://github.com/folke/ultra-runner/commit/a9a67996aaca194c41cd32cea05881bd76b84cc3))
* **deps:** 🔗 update ([b7dc359](https://github.com/folke/ultra-runner/commit/b7dc359e269138535156a896b669c7fedf365373))
* **deps:** pin dependency @types/yargs to 15.0.4 ([#23](https://github.com/folke/ultra-runner/issues/23)) ([00f28df](https://github.com/folke/ultra-runner/commit/00f28df1412b409daf8b80fe536dbf3e559f4f71))
* 🚨 added more tests for code coverage ([ca06588](https://github.com/folke/ultra-runner/commit/ca06588b481eb57c88179aa3edd048c702b17adf))
* 🚨 added workspace test data ([1510390](https://github.com/folke/ultra-runner/commit/15103901ce918c8dd25ee7c8c9a105aef882965f))
* 🚨 don't trigger --build during runner tests ([c4a2db3](https://github.com/folke/ultra-runner/commit/c4a2db38ba80a633a9ca1b488f6b9fbea1de7d3f))
* 🚨 fix filtering for Windows paths ([815234e](https://github.com/folke/ultra-runner/commit/815234ee8ec8f86f68ac0b474e687b3cda0095e1))
* 🚨 fix for Windows tests ([ed005a7](https://github.com/folke/ultra-runner/commit/ed005a7881ee58f9ec33c853cd8def7479b0e487))
* 🚨 fixed tests for Win32 ([8813609](https://github.com/folke/ultra-runner/commit/8813609bbcd36b6be229605ac9bc2876a818c691))
* 🚨 fixed tests for Win32 ([39e1394](https://github.com/folke/ultra-runner/commit/39e1394b4a81753ddffd5598f030361d424f4523))
* 🚨 fixed tests for Win32 ([f1e0c5e](https://github.com/folke/ultra-runner/commit/f1e0c5e3ee740ea2c0c69d4d168d0f23cf9ff700))
* 🚨 set jest threshold to 75 for now ([2af5ff4](https://github.com/folke/ultra-runner/commit/2af5ff417e6ec85deeaf5d7356e594b891a6772e))
* 🚨 updated jest tests ([084ef92](https://github.com/folke/ultra-runner/commit/084ef92e6e8c63d1a0e50b04d4dca133a5008ad9))
* 🚨 updated tests ([23fd06b](https://github.com/folke/ultra-runner/commit/23fd06b5420d579dc4ba6d85eb5d7ad1f09385c9))
* **deps:** 🔗 update ([4770196](https://github.com/folke/ultra-runner/commit/47701964a8a688829a333ca590e00f94fccd5abd))
* **deps:** 🔗 updates ([43223f5](https://github.com/folke/ultra-runner/commit/43223f591ed22b30e27b2fcc7eeb2d33d7344a80))
* **deps:** pin dependencies ([#19](https://github.com/folke/ultra-runner/issues/19)) ([a395059](https://github.com/folke/ultra-runner/commit/a39505985a519fd3b5ab7421a18f86565508811d))
* **deps:** pin dependencies ([#21](https://github.com/folke/ultra-runner/issues/21)) ([0716672](https://github.com/folke/ultra-runner/commit/0716672cf753f83e8f2f192765ccc07a08a45394))
* **deps:** update all non-major dependencies ([#20](https://github.com/folke/ultra-runner/issues/20)) ([5212d4e](https://github.com/folke/ultra-runner/commit/5212d4e4ac60b7fe270e0ecd0cff20d9ef9072c8))
* 🚨 fixed tests for Windows ([71612b4](https://github.com/folke/ultra-runner/commit/71612b409cc6779c0235b753c9787fa38792872a))
* 🚨 set coverage treshold to 85 ([630ce18](https://github.com/folke/ultra-runner/commit/630ce187115e4734e748954471b46098d4a7ada8))
* 🚨 updated tests ([ff9e055](https://github.com/folke/ultra-runner/commit/ff9e055985de0c5bc71fa8cf2dcead5c1c1097a6))
* **deps:** pin dependencies ([#16](https://github.com/folke/ultra-runner/issues/16)) ([c2766be](https://github.com/folke/ultra-runner/commit/c2766be87b4e4c639090d290996d706e78f98615))
* **deps:** update dependency eslint-plugin-jest to v23.8.1 ([#18](https://github.com/folke/ultra-runner/issues/18)) ([8b3d44d](https://github.com/folke/ultra-runner/commit/8b3d44da69539d991f4f15f9f1172d97daf45169))
* **deps:** update node.js to v13.9.0 ([#17](https://github.com/folke/ultra-runner/issues/17)) ([2d740b0](https://github.com/folke/ultra-runner/commit/2d740b04de4d2dbd97d4e23ebbc9db5253578f70))

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
