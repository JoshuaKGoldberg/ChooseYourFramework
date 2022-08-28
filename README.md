<!-- Top -->

# ChooseYourFramework

[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)
![TypeScript: Strict](https://img.shields.io/badge/typescript-strict-brightgreen.svg)
[![NPM version](https://badge.fury.io/js/chooseyourframework.svg)](http://badge.fury.io/js/chooseyourframework)

Choosing a modern JavaScript UI framework, Pokemon-style.

<!-- /Top -->

## Usage

This is a hacked-together fork of [FullScreenShenanigans/FullScreenPokemon](https://github.com/FullScreenShenanigans/FullScreenPokemon), which is itself very old code on the not-production-ready [EightBittr game engine](https://github.com/FullScreenShenanigans/EightBittr).
No guarantees any of this stuff works.

<!-- Development -->

## Development

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo):

```shell
git clone https://github.com/<your-name-here>/ChooseYourFramework
cd ChooseYourFramework
yarn
yarn run hydrate
yarn run compile
```

-   `yarn run hydrate` creates a few auto-generated setup files locally.
-   `yarn run compile` builds source code to `lib/` with TypeScript

> Tip: run `yarn compile -w` to keep TypeScript running in watch mode, so your output files stay up-to-date as you save source code.

### Running Locally

Once you've run the setup commands above, `lib/index.html` will contain a working file you can directly open in a browser locally, such as with `open lib/index.html` on Mac or `start lib/index.html` on Windows.

### Running Tests

```shell
yarn run test
```

Tests are written in [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai).
Their files are written using alongside source files under `src/` and named `*.test.ts?`.
Whenever you add, remove, or rename a `*.test.t*` file under `src/`, `watch` will re-run `yarn run test:setup` to regenerate the list of static test files in `test/index.html`.
You can open that file in a browser to debug through the tests, or run `yarn test:run` to run them in headless Chrome.

### Production Builds

```shell
yarn run dist
```

After running the `dist` command, the `dist/` folder will contain project outputs optimized for running in production: i.e. versions of code that are concatenated into fewer files and minified.
`dist/index.html` will be a more optimized version of `lib/index.html`.

<!-- Maps -->
<!-- /Maps -->

<!-- /Development -->
