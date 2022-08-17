<!-- Top -->

# Cho

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
-   `yarn run compile` builds source code with TypeScript

### Running Tests

```shell
yarn run test
```

Tests are written in [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai).
Their files are written using alongside source files under `src/` and named `*.test.ts?`.
Whenever you add, remove, or rename a `*.test.t*` file under `src/`, `watch` will re-run `yarn run test:setup` to regenerate the list of static test files in `test/index.html`.
You can open that file in a browser to debug through the tests, or run `yarn test:run` to run them in headless Chrome.

<!-- Maps -->
<!-- /Maps -->

<!-- Top -->

# ChooseYourFramework

[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)
![TypeScript: Strict](https://img.shields.io/badge/typescript-strict-brightgreen.svg)
[![NPM version](https://badge.fury.io/js/chooseyourframework.svg)](http://badge.fury.io/js/chooseyourframework)

Choosing a modern JavaScript UI framework, Pokemon-style.

<!-- /Top -->

## Usage

This is a hacked-together fork of [FullScreenShenanigans/FullScreenPokemon](https://github.com/FullScreenShenanigans/FullScreenPokemon), which is itself very old code on a hacked-together custom game engine and not production ready.
No guarantees any of this stuff works.

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
-   `yarn run compile` builds source code with TypeScript

### Running Tests

```shell
yarn run test
```

Tests are written in [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai).
Their files are written using alongside source files under `src/` and named `*.test.ts?`.
Whenever you add, remove, or rename a `*.test.t*` file under `src/`, `watch` will re-run `yarn run test:setup` to regenerate the list of static test files in `test/index.html`.
You can open that file in a browser to debug through the tests, or run `yarn test:run` to run them in headless Chrome.
