### [3.10.1](https://github.com/folke/ultra-runner/compare/v3.10.0...v3.10.1) (2021-02-27)


### Bug Fixes

* **ultraignore:** allow ultraignore to work with tracked git files ([#170](https://github.com/folke/ultra-runner/issues/170)) ([65cc044](https://github.com/folke/ultra-runner/commit/65cc04420aa9f95c1bbe2dde5da304c2119db564))


### Other

* **deps:** pin dependency @yarnpkg/pnp to 2.3.2 ([#169](https://github.com/folke/ultra-runner/issues/169)) ([880073f](https://github.com/folke/ultra-runner/commit/880073fceee7b6a3b88e6de20ac4b71d6538f39c))

## [3.10.0](https://github.com/folke/ultra-runner/compare/v3.9.0...v3.10.0) (2021-02-26)


### Features

* **git:** ✨ added support for .ultraignore ([#168](https://github.com/folke/ultra-runner/issues/168)) ([fab9da1](https://github.com/folke/ultra-runner/commit/fab9da1c6b6d6cae522f8ec4b8d079bb15c4294f))


### Documentation

* 📚️ added info about .ultraignore ([9675976](https://github.com/folke/ultra-runner/commit/96759766069a92be4ac96fac3bb0dd7be8fc26a0))


### Other

* **deps:** 🔗 update ([57d1d30](https://github.com/folke/ultra-runner/commit/57d1d3013fe1cf12e99bb065258f88b35844d260))
* ♻️ use @yarnpkg/pnp for proper typing of pnpapi ([73eec5a](https://github.com/folke/ultra-runner/commit/73eec5a13fdf40e6b4bcdbfc6c7f432f934dba83))
* 🎨 fixed some linting issues ([bdcbe31](https://github.com/folke/ultra-runner/commit/bdcbe31b982cf014ba5fa272fb2ec9d0d2331f5b))
* 📦️ upgrade to Husky 5 ([311e902](https://github.com/folke/ultra-runner/commit/311e902cb92fd78bc56718ad27a66d189520624f))
* **deps:** update all non-major dependencies ([#157](https://github.com/folke/ultra-runner/issues/157)) ([8bf50d4](https://github.com/folke/ultra-runner/commit/8bf50d44b8cfe90a79b95fdbdecc8e3d013146f5))

## [3.9.0](https://github.com/folke/ultra-runner/compare/v3.8.1...v3.9.0) (2021-01-11)


### Features

* ✨ use --filter + to filter for cwd's dependencies ([#155](https://github.com/folke/ultra-runner/issues/155)) ([4aa061a](https://github.com/folke/ultra-runner/commit/4aa061a28a72b7826cf3de42c926e78881254936))

### [3.8.1](https://github.com/folke/ultra-runner/compare/v3.8.0...v3.8.1) (2021-01-11)


### Bug Fixes

* 🐛  resolve binaries from current package location and memoize costly operations ([#154](https://github.com/folke/ultra-runner/issues/154)) ([8c5ed2a](https://github.com/folke/ultra-runner/commit/8c5ed2aac59843d24d829f7e2c5118c71986a632))
* 🐛 fixed linting errors related to pnpapi ([0d32d08](https://github.com/folke/ultra-runner/commit/0d32d0878a45f6a2a5c720d76e5c789cbd054074))


### Other

* 📦️ disable unicorn/import-reduce rule ([392a5ae](https://github.com/folke/ultra-runner/commit/392a5ae636961088b5711a9b6f02d69800e7bbdb))
* **deps:** pin dependency @types/pnpapi to 0.0.1 ([#156](https://github.com/folke/ultra-runner/issues/156)) ([581714b](https://github.com/folke/ultra-runner/commit/581714b4c043be79aa2127a1be028a0f43bb6309))
* **deps:** update all non-major dependencies ([#151](https://github.com/folke/ultra-runner/issues/151)) ([f5b10f6](https://github.com/folke/ultra-runner/commit/f5b10f62a3070e2cf26a2b8b2f6b272d3d7defde))
* **deps:** update dependency eslint-plugin-unicorn to v26 ([#152](https://github.com/folke/ultra-runner/issues/152)) ([f801087](https://github.com/folke/ultra-runner/commit/f801087119f6c6cb03473783a383daffd9e4440a))

## [3.8.0](https://github.com/folke/ultra-runner/compare/v3.7.1...v3.8.0) (2020-12-24)


### Features

* ✨ set default concurrency to number of cpus ([a63c3d5](https://github.com/folke/ultra-runner/commit/a63c3d559b6685a7ca622eab0001dc128ecda541))


### Bug Fixes

* 🐛 add `-h` as alias for `--help` ([439f8cf](https://github.com/folke/ultra-runner/commit/439f8cf4919c8969832bbd05a60bafe4a8d01dc6))
* 🐛 resolution in pnp subpackages ([#150](https://github.com/folke/ultra-runner/issues/150)) ([823def0](https://github.com/folke/ultra-runner/commit/823def070f49510f07f638de3076ea683d80710a))


### Other

* 📦️ fix semantic-release script ([8c1b81c](https://github.com/folke/ultra-runner/commit/8c1b81ccfe69e02ee7db9fa9cd37f27e01bde002))
* 📦️ fix semantic-release script ([a90c790](https://github.com/folke/ultra-runner/commit/a90c7904ce3dd02cbcd2758c6b65b8ca3d680ea8))
* 📦️ fix semantic-release script ([c13472b](https://github.com/folke/ultra-runner/commit/c13472b0aabfa5a6995e83303a623483b0a8de02))
* **deps:** 🔗 udpates ([f7a062b](https://github.com/folke/ultra-runner/commit/f7a062bea1a594e720175728f9729f4aa123b823))
* **deps:** pin dependencies ([#146](https://github.com/folke/ultra-runner/issues/146)) ([f44b70e](https://github.com/folke/ultra-runner/commit/f44b70e398ed45e996298fe880a64a8e491ea94c))
* **deps:** update actions/setup-node action to v2 ([#148](https://github.com/folke/ultra-runner/issues/148)) ([d5b44b9](https://github.com/folke/ultra-runner/commit/d5b44b9d865d894b98f066708a3eaee12370e1d0))
* **deps:** update all non-major dependencies ([#147](https://github.com/folke/ultra-runner/issues/147)) ([1d317e1](https://github.com/folke/ultra-runner/commit/1d317e109e5d682bfdcc52b349535549d432bd7d))
* **deps:** update dependency eslint-plugin-unicorn to v24 ([#149](https://github.com/folke/ultra-runner/issues/149)) ([32eeb3d](https://github.com/folke/ultra-runner/commit/32eeb3d6167fc0ff6cde360888432026e1f3011a))

### [3.7.1](https://github.com/folke/ultra-runner/compare/v3.7.0...v3.7.1) (2020-12-14)


### Bug Fixes

* 🐛 support script run args `npm run test -- --help` (fixes [#143](https://github.com/folke/ultra-runner/issues/143)) ([b095a8a](https://github.com/folke/ultra-runner/commit/b095a8a396619369aff51df2df1eee99185ed4fa))


### Other

* 👷 fixed pnpm stuff ([994dc09](https://github.com/folke/ultra-runner/commit/994dc0948c386b2a538be958d953effa657074fc))
* 👷 fixed pnpm test ([2cda3cb](https://github.com/folke/ultra-runner/commit/2cda3cb3d7de3611614b43f58060cb6b73eb1b6f))
* 👷 pnpm recursive=false ([e93c8f5](https://github.com/folke/ultra-runner/commit/e93c8f5f216e3167621ff6455725ff603911c3e8))
* 👷 use babel for code coverage ([c851fe1](https://github.com/folke/ultra-runner/commit/c851fe1d173c8c0381874f3f660f831c6cfacc22))
* 👷 use pnpm action ([0f88b3f](https://github.com/folke/ultra-runner/commit/0f88b3fa15a6f934286298d5042a2b5184e89d16))
* 📦️ semantic release config ([7f8e9c4](https://github.com/folke/ultra-runner/commit/7f8e9c49289a930494d229f9b3c785c70a57bc49))
* **deps:** 🔗 update ([4187c20](https://github.com/folke/ultra-runner/commit/4187c20f124348dc64880790b09e39c3952abdcb))
* 📦️ update to node v14.15.1 ([9ff679e](https://github.com/folke/ultra-runner/commit/9ff679ee67a4a4c828e3386990ef923565571f54))
* 📦️ use pnpm instead of yarn ([32d5b6f](https://github.com/folke/ultra-runner/commit/32d5b6fd12f48f2ae08b839087bee6724a9711be))
* 📦️ use pnpm instead of yarn ([0c14c19](https://github.com/folke/ultra-runner/commit/0c14c19b7d19e6f71ea008a82c1babca562a0c69))
* 📦️ use semantic-release instead of standard-version ([cad9d7e](https://github.com/folke/ultra-runner/commit/cad9d7ed24b484ede6fff08c4475f0cf4157d5a0))
* **deps:** update all non-major dependencies ([#145](https://github.com/folke/ultra-runner/issues/145)) ([003ecdd](https://github.com/folke/ultra-runner/commit/003ecdda90f5192068793941391a3ba64bcd4262))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.7.0](https://github.com/folke/ultra-runner/compare/v3.6.0...v3.7.0) (2020-12-13)


### Features

* ✨ yarn pnp commands run with `node -r .pnp.js` ([#142](https://github.com/folke/ultra-runner/issues/142)) ([cfbe921](https://github.com/folke/ultra-runner/commit/cfbe92187869e32dd3d0b420b7c5a73e292fe412))


### Other

* 🎨 fixed linting errors ([5cb2c40](https://github.com/folke/ultra-runner/commit/5cb2c4009f6f9383dd0b2dabbbbc4c6e5e19a099))
* **deps:** update all non-major dependencies ([#139](https://github.com/folke/ultra-runner/issues/139)) ([6031ce4](https://github.com/folke/ultra-runner/commit/6031ce4a4b29d768ca0be94d5fb1b0548c2691cb))
* **deps:** update dependency eslint-config-prettier to v7 ([#140](https://github.com/folke/ultra-runner/issues/140)) ([5d5e528](https://github.com/folke/ultra-runner/commit/5d5e52809bcfcd1de15cef9dab12dc7b9b9c80e7))

## [3.6.0](https://github.com/folke/ultra-runner/compare/v3.5.1...v3.6.0) (2020-11-25)


### Features

* ✨ added support for Yarn v2 with PnP (fixes [#137](https://github.com/folke/ultra-runner/issues/137)) ([27b51b0](https://github.com/folke/ultra-runner/commit/27b51b00a2d1ff82b9857406f30fb4c89173205f))


### Other

* **deps:** update all non-major dependencies ([#136](https://github.com/folke/ultra-runner/issues/136)) ([edf7dba](https://github.com/folke/ultra-runner/commit/edf7dbab1b6739e551fbf334cbf624ac839cc5cd))
* **deps:** update all non-major dependencies ([#138](https://github.com/folke/ultra-runner/issues/138)) ([7edfc96](https://github.com/folke/ultra-runner/commit/7edfc96598b89be49cf22108ea3cbb1cf50de410))

### [3.5.1](https://github.com/folke/ultra-runner/compare/v3.5.0...v3.5.1) (2020-11-23)


### Bug Fixes

* **deps:** update dependency yargs to v16 ([#126](https://github.com/folke/ultra-runner/issues/126)) ([b77079c](https://github.com/folke/ultra-runner/commit/b77079c0498132127b7b66a1886a326601ef06bf))
* **lint:** 🐛 updated packages and fixed linting errors ([d387c9c](https://github.com/folke/ultra-runner/commit/d387c9c230dc0489abc612c3f68cb423f840ba56))


### Other

* **deps:** update all non-major dependencies ([#135](https://github.com/folke/ultra-runner/issues/135)) ([6ee076f](https://github.com/folke/ultra-runner/commit/6ee076f32348269b1e6c0f19c07b2e8fe7aa7cfc))
* 📚️ added npm@7 as supported ([d3e75d0](https://github.com/folke/ultra-runner/commit/d3e75d074679e8a77e1a33629ef2cbcc0616177a))
* **deps:** update actions/checkout action to v2 ([#134](https://github.com/folke/ultra-runner/issues/134)) ([3b1b0d8](https://github.com/folke/ultra-runner/commit/3b1b0d8001ef865e11dcb45b760c94893a31d63d))
* **deps:** update all non-major dependencies ([2d3a577](https://github.com/folke/ultra-runner/commit/2d3a57733329dc0d6e350360abb37c7fe208cbb7))
* **deps:** update all non-major dependencies ([#124](https://github.com/folke/ultra-runner/issues/124)) ([332c44f](https://github.com/folke/ultra-runner/commit/332c44f52f8f1eccd24a7955d893bd9b9e5dfb2a))
* **deps:** update all non-major dependencies ([#129](https://github.com/folke/ultra-runner/issues/129)) ([b700edd](https://github.com/folke/ultra-runner/commit/b700eddce25712284ec8f028c9d24b69ec8bdd3c))
* **deps:** update all non-major dependencies ([#132](https://github.com/folke/ultra-runner/issues/132)) ([f4886a0](https://github.com/folke/ultra-runner/commit/f4886a02073071b02a759ec23faa3fda4806e610))
* **deps:** update all non-major dependencies ([#96](https://github.com/folke/ultra-runner/issues/96)) ([c83f475](https://github.com/folke/ultra-runner/commit/c83f475d207b44cee0720cd65514c934720d4f0a))
* **deps:** update dependency eslint-plugin-unicorn to v23 ([#133](https://github.com/folke/ultra-runner/issues/133)) ([e73d58d](https://github.com/folke/ultra-runner/commit/e73d58d7dc7ac532052767733846032752add183))
* **deps:** update dependency standard-version to v8.0.2 ([#127](https://github.com/folke/ultra-runner/issues/127)) ([183ac76](https://github.com/folke/ultra-runner/commit/183ac76398841ebe84ddf6ab9903c57a77896a51))
* **deps:** update dependency standard-version to v9 ([#128](https://github.com/folke/ultra-runner/issues/128)) ([3abd5f1](https://github.com/folke/ultra-runner/commit/3abd5f1687bc400131c77410dd33c666dac2e6c3))
* **deps:** update dependency ts-node to v9 ([#118](https://github.com/folke/ultra-runner/issues/118)) ([db7fc3c](https://github.com/folke/ultra-runner/commit/db7fc3c8818c7e994297386dcf6e3f33a82d31c9))
* **deps:** update dependency typescript to v4 ([#119](https://github.com/folke/ultra-runner/issues/119)) ([913d267](https://github.com/folke/ultra-runner/commit/913d267b1fb50cd94d5da1bfc554ec113de40502))
* **deps:** update eslint ([#113](https://github.com/folke/ultra-runner/issues/113)) ([9891ea8](https://github.com/folke/ultra-runner/commit/9891ea884a0caeea1844e82bdac0d93ee48bd722))
* **lint:** 🎨 linter updates ([a3c7e9c](https://github.com/folke/ultra-runner/commit/a3c7e9c96caee4ee13852eba8fd09a1018d04cd7))
* changed animated SVG into a link ([f3860c2](https://github.com/folke/ultra-runner/commit/f3860c26d5e4d75819200ddd19f3646eda875cdd))
* fixed typo ([#130](https://github.com/folke/ultra-runner/issues/130)) ([f2f18f5](https://github.com/folke/ultra-runner/commit/f2f18f5dc8d5f6c9dbc8bc728a2f5aa63caefba7))
* **deps:** update jest ([#125](https://github.com/folke/ultra-runner/issues/125)) ([d837716](https://github.com/folke/ultra-runner/commit/d837716cadb6c21a8b1dc3b1078c73121bdd0fd0))

## [3.5.0](https://github.com/folke/ultra-runner/compare/v3.4.1...v3.5.0) (2020-05-25)


### Features

* ✨ enable extended globbing for --filter (implements [#91](https://github.com/folke/ultra-runner/issues/91)) ([4ce826c](https://github.com/folke/ultra-runner/commit/4ce826c52c053eb1a01e1e7e645901d8575b8cce))

### [3.4.1](https://github.com/folke/ultra-runner/compare/v3.4.0...v3.4.1) (2020-05-25)

## [3.4.0](https://github.com/folke/ultra-runner/compare/v3.3.0...v3.4.0) (2020-05-25)


### Features

* ✨ prefix output for `--no-pretty` with the package name when running concurrently [#90](https://github.com/folke/ultra-runner/issues/90) ([4aa68a2](https://github.com/folke/ultra-runner/commit/4aa68a29aa5f74c86179ae2c725e4058abc8ee7b))


### Bug Fixes

* 🐛 force full rebuild when not in a git repository [#87](https://github.com/folke/ultra-runner/issues/87) ([38952e8](https://github.com/folke/ultra-runner/commit/38952e895e079788167c4156c2bb050d69fba12e))
* 🐛 ultra should work in any directory (fixes [#95](https://github.com/folke/ultra-runner/issues/95)) ([9de98ae](https://github.com/folke/ultra-runner/commit/9de98aea91c213c42c8ce2b86b4933a377b9279b))


### Other

* **deps:** update dependency eslint to v7.1.0 ([#94](https://github.com/folke/ultra-runner/issues/94)) ([a12edc8](https://github.com/folke/ultra-runner/commit/a12edc890d8b6dd6bab4c589f467f0de4320aa16))
* 🎨 upgrade typescript-eslint ([faa2fca](https://github.com/folke/ultra-runner/commit/faa2fca5dc7f6ed2c04389988fb3c9ff90428683))
* **deps:** update all non-major dependencies ([#86](https://github.com/folke/ultra-runner/issues/86)) ([5fbfd87](https://github.com/folke/ultra-runner/commit/5fbfd870086b25911b00a3762311636beb41b897))
* **deps:** update dependency ts-jest to v26 ([#88](https://github.com/folke/ultra-runner/issues/88)) ([f62603d](https://github.com/folke/ultra-runner/commit/f62603d2abcd5cab0e34e12c45788430a4c6b7e3))
* **deps:** update eslint to v3 ([#93](https://github.com/folke/ultra-runner/issues/93)) ([c70cb66](https://github.com/folke/ultra-runner/commit/c70cb6633a32a7aad4a87fff99f7000fdbed0fdb))

## [3.3.0](https://github.com/folke/ultra-runner/compare/v3.2.2...v3.3.0) (2020-05-14)


### Features

* ✨ added --topology to use workspace dependencies for parallell commands other than "build" ([c19f807](https://github.com/folke/ultra-runner/commit/c19f80779f2b07b8ffa34f93168fbd8b17e0ae14))
* ✨ you can now prefix a filter with '+' to always inlcude the dependencies of the filtered packages (see [#79](https://github.com/folke/ultra-runner/issues/79)) ([dd9ca3f](https://github.com/folke/ultra-runner/commit/dd9ca3ffc92d86293a117764b6160f751208e336))
* ✨ you can now prefix a filter with '+' to always inlcude the dependencies of the filtered packages (see [#79](https://github.com/folke/ultra-runner/issues/79)) ([5b50ff0](https://github.com/folke/ultra-runner/commit/5b50ff034a0b54f23e346c7b311651c28500688e))


### Bug Fixes

* 🐛 [#85](https://github.com/folke/ultra-runner/issues/85) - Use the default list of ignore patterns only for workspace type "recursive" ([d4afba9](https://github.com/folke/ultra-runner/commit/d4afba992fee66e28edc98505b774901013c6307))
* **deps:** update dependency tslib to v2 ([#83](https://github.com/folke/ultra-runner/issues/83)) ([41bdd1f](https://github.com/folke/ultra-runner/commit/41bdd1f6e994a1597f7db0519033744b34ac2a82))
* 🐛 consistency in messages ([#75](https://github.com/folke/ultra-runner/issues/75)) ([606accd](https://github.com/folke/ultra-runner/commit/606accd6d9c552bacc0e3ce79a67ea18736a4039))


### Other

* ⚡️ use yargs only for showing help. parse argv in options ([6d88ab5](https://github.com/folke/ultra-runner/commit/6d88ab5fe1c9b17d69e9330636f16a2d36494546))
* 🎨 eslint update ([2dfc4d2](https://github.com/folke/ultra-runner/commit/2dfc4d2702b5ce3071225c72449048d7edecb55e))
* 🚨 added tests for filter with dependencies ([4f551f1](https://github.com/folke/ultra-runner/commit/4f551f11d875e1d1408a26958d93e791a98c326b))
* **deps:** update all non-major dependencies ([#68](https://github.com/folke/ultra-runner/issues/68)) ([f2fe266](https://github.com/folke/ultra-runner/commit/f2fe2663553be07049064c923fe974e99c014d72))
* **deps:** update all non-major dependencies ([#71](https://github.com/folke/ultra-runner/issues/71)) ([d687f9c](https://github.com/folke/ultra-runner/commit/d687f9cebd99be4de335bfdae9eb2d21bf7612f0))
* **deps:** update all non-major dependencies ([#82](https://github.com/folke/ultra-runner/issues/82)) ([17af133](https://github.com/folke/ultra-runner/commit/17af13379a452ce3de1d6565ab90bce9fc1f5d4e))
* **deps:** update dependency jest to v26 ([#77](https://github.com/folke/ultra-runner/issues/77)) ([bba6f4a](https://github.com/folke/ultra-runner/commit/bba6f4acb386d6ba8e60fdbf3a466f56ec5ba682))
* **deps:** update dependency standard-version to v8 ([#78](https://github.com/folke/ultra-runner/issues/78)) ([abc8abd](https://github.com/folke/ultra-runner/commit/abc8abd383b24e36631a2b717714c4aed60c9279))
* **deps:** update eslint ([#80](https://github.com/folke/ultra-runner/issues/80)) ([5ad8690](https://github.com/folke/ultra-runner/commit/5ad869032b8df733bf18b0c422bc17181811ec8c))
* 👷 added automatic management of stale issues ([ae1b176](https://github.com/folke/ultra-runner/commit/ae1b17612e889cc328a07e7f37bce10f9391c261))

### [3.2.2](https://github.com/folke/ultra-runner/compare/v3.2.1...v3.2.2) (2020-04-28)


### Bug Fixes

* 🐛 increase max buffer for repo git file cache list to 1GB. (fixes [#66](https://github.com/folke/ultra-runner/issues/66)) ([a301cf7](https://github.com/folke/ultra-runner/commit/a301cf7f0e6debe323f2f17c3c6fb6154696c0e5))
* **deps:** update dependency wrap-ansi to v7 ([#65](https://github.com/folke/ultra-runner/issues/65)) ([6596da0](https://github.com/folke/ultra-runner/commit/6596da00d07bdf3019e0fe7776b1ea0b78cc60b2))
* Replace yarn command ([#64](https://github.com/folke/ultra-runner/issues/64)) ([ef35a17](https://github.com/folke/ultra-runner/commit/ef35a17fa16ff466151b15ef527d3c85e5beb81b))


### Other

* **deps:** update all non-major dependencies ([#58](https://github.com/folke/ultra-runner/issues/58)) ([3d18fed](https://github.com/folke/ultra-runner/commit/3d18fedafafcd7dc44461ac1037ace9c07019ee8))
* **deps:** update all non-major dependencies ([#62](https://github.com/folke/ultra-runner/issues/62)) ([39d9da3](https://github.com/folke/ultra-runner/commit/39d9da374a3b9a84fa7f354a312c99714a09d04f))
* **deps:** update dependency devmoji to v2.1.9 ([#61](https://github.com/folke/ultra-runner/issues/61)) ([c5cf382](https://github.com/folke/ultra-runner/commit/c5cf3820138592464ad06145038451806a2a2d57))
* **deps:** update eslint ([#63](https://github.com/folke/ultra-runner/issues/63)) ([c7bf762](https://github.com/folke/ultra-runner/commit/c7bf76266c737bb9c4638637ccbfeb97233e6a91))
* **lint:** 🎨 unicorn/no-null ([cf81451](https://github.com/folke/ultra-runner/commit/cf814512f5095a2acf7908aeaca4231d94f1a4a6))

### [3.2.1](https://github.com/folke/ultra-runner/compare/v3.2.0...v3.2.1) (2020-04-02)


### Bug Fixes

* 🐛 make the Runner.runRecursive method asynchronous ([#56](https://github.com/folke/ultra-runner/issues/56)) ([10b8853](https://github.com/folke/ultra-runner/commit/10b88531d8ca0683b98eb593bf97051df61df9d4))
* **deps:** update dependency chalk to v4 ([#54](https://github.com/folke/ultra-runner/issues/54)) ([8da7549](https://github.com/folke/ultra-runner/commit/8da75494826f152fb20fed56b6e3e4db51f22723))
* **test:** 🐛 🚨 fix tests that call runner and expected a process.exit(1) ([8b1ed9b](https://github.com/folke/ultra-runner/commit/8b1ed9b2c6008d2c1f2cfd219a7f0d9fd5f510c4))
* 🐛 make runRecursive return a promise & move process.exit to cli ([9b4adf1](https://github.com/folke/ultra-runner/commit/9b4adf1490cad82250b0ddd4e0c3b6eea5e3e051))


### Other

* **deps:** 🔗 ➖ dep strip-json-comments ([8af4d1e](https://github.com/folke/ultra-runner/commit/8af4d1eaa61b87589d3406fec8c5e2de9c5b136f))
* **deps:** 🔗 Merge branches 'master' and 'master' of github.com:folke/ultra-runner ([6b8d87e](https://github.com/folke/ultra-runner/commit/6b8d87e53d5145aa99a52a0de411f8b5e5d68629))
* **deps:** update all non-major dependencies ([#52](https://github.com/folke/ultra-runner/issues/52)) ([6bbc7bf](https://github.com/folke/ultra-runner/commit/6bbc7bf82ed249e74aaa5b27180f163cce2ffe9e))
* **deps:** update dependency @types/prettier to v2 ([#55](https://github.com/folke/ultra-runner/issues/55)) ([4c04e19](https://github.com/folke/ultra-runner/commit/4c04e1933bf6a94e17f1a4fad076ac4b2d411a70))
* **deps:** update dependency @types/sinon to v9 ([#53](https://github.com/folke/ultra-runner/issues/53)) ([e872990](https://github.com/folke/ultra-runner/commit/e872990649d150822ad7015f7b36f439ebe8bfed))

## [3.2.0](https://github.com/folke/ultra-runner/compare/v3.1.0...v3.2.0) (2020-03-28)


### Features

* ✨ add all vscode node procs under one combined vscode root ([b1e499b](https://github.com/folke/ultra-runner/commit/b1e499b35d3b1ef7d3c5d8608b5b7d5aa7fbd989))


### Other

* **deps:** update dependency @types/node to v13.9.5 ([#51](https://github.com/folke/ultra-runner/issues/51)) ([379caa0](https://github.com/folke/ultra-runner/commit/379caa0b42aec800130057633482d125dc91c471))

## [3.1.0](https://github.com/folke/ultra-runner/compare/v3.0.1...v3.1.0) (2020-03-27)


### Features

* ✨ expose PackageJson from type-fest ([a792cc5](https://github.com/folke/ultra-runner/commit/a792cc56b58f2191309e0fa3e738a6ebca1cb945))
* ✨ include dev dependencies in dep topology ([4b5a566](https://github.com/folke/ultra-runner/commit/4b5a566f9ca21cf256c25054ce6b0e36298064f0))


### Other

* **deps:** 🔗 update ([ccbaafd](https://github.com/folke/ultra-runner/commit/ccbaafd2cadd8510e81816e31afd35e02039e0c2))
* **deps:** update all non-major dependencies ([#50](https://github.com/folke/ultra-runner/issues/50)) ([a90f735](https://github.com/folke/ultra-runner/commit/a90f735aea864023d1130bec83bcc3ffbfd13363))

### [3.0.1](https://github.com/folke/ultra-runner/compare/v3.0.0...v3.0.1) (2020-03-26)


### Bug Fixes

* 🐛 terminal now properly updates changed lines ([d366be7](https://github.com/folke/ultra-runner/commit/d366be7b94106cf26281f56d64d175c08ef695cf))


### Other

* **deps:** update dependency eslint-plugin-unicorn to v18 ([#49](https://github.com/folke/ultra-runner/issues/49)) ([a66a9ee](https://github.com/folke/ultra-runner/commit/a66a9eee7efb03555bc2e09b5e3cc91c5daaf259))
* **deps:** update dependency jest to v25.2.2 ([#47](https://github.com/folke/ultra-runner/issues/47)) ([2810354](https://github.com/folke/ultra-runner/commit/281035494e95a0dd5fd1ec379475b593d8f48835))
* ⚡️ set spinner interval to 120 instead of 80 ([6c916e9](https://github.com/folke/ultra-runner/commit/6c916e98508abac6b73c383f1e5163ec6115418d))

## [3.0.0](https://github.com/folke/ultra-runner/compare/v2.3.6...v3.0.0) (2020-03-25)


### ⚠ BREAKING CHANGES

* 💥 🐛 --concurrency was one of. Concurrency of 1 is now correct

### Features

* ✨ added --serial option that is the same as --concurrency 1 ([10e09a7](https://github.com/folke/ultra-runner/commit/10e09a7ef36a2a05fffd84aba9c43833ffef06f9))
* ✨ quit --monitor on [q] ([7703f40](https://github.com/folke/ultra-runner/commit/7703f40d91f85044f4804589c94f5d328b769ad0))


### Bug Fixes

* 🐛 force build when package has not been added to Git ([17d5dea](https://github.com/folke/ultra-runner/commit/17d5dead928478d5bfdb7309f5d88063f27f9a68))
* 💥 🐛 --concurrency was one of. Concurrency of 1 is now correct ([d85781c](https://github.com/folke/ultra-runner/commit/d85781cdd04cd06378f2849d3a3230a724add7e9))


### Other

* **deps:** update dependency @types/node to v13.9.4 ([#46](https://github.com/folke/ultra-runner/issues/46)) ([86d8ec2](https://github.com/folke/ultra-runner/commit/86d8ec2a9bf298f99cb10026338b584238039bdb))
* 🎨 prettier 2.0 ([b2d2d3b](https://github.com/folke/ultra-runner/commit/b2d2d3be7fe517dc4dfe51b2e09920712f3409cf))

### [2.3.6](https://github.com/folke/ultra-runner/compare/v2.3.5...v2.3.6) (2020-03-24)


### Bug Fixes

* 🐛 correctly handle post and pre scripts when running concurrently (fixes [#45](https://github.com/folke/ultra-runner/issues/45)) ([9a5c670](https://github.com/folke/ultra-runner/commit/9a5c6707c7bc834f5a8e209afac8e9f531d39240))

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
