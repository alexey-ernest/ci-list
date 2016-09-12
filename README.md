# ci-list
CI build list UI example

[![Build Status](https://travis-ci.org/alexey-ernest/ci-list.svg?branch=master)](https://travis-ci.org/alexey-ernest/ci-list)
[![Coverage Status](https://coveralls.io/repos/github/alexey-ernest/ci-list/badge.svg?branch=master)](https://coveralls.io/github/alexey-ernest/ci-list?branch=master)

* [Deployment](#deployment)
* [Architecture](#architecture)
* [Technologies](#technologies)
* [Tests](#tests)
* [How to run](#how-to-run)

<img src="assets/ss.png" width="600">

## Deployment
https://ci-list.firebaseapp.com/

## Architecture
The app is buit using classical Facebook's flux architecutre.

<img src="assets/flux.png" width="600">


## Technologies
* Lang: JavaScript/ES6/ES7/Babel
* Frameworks: React/Flux, Material UI components, chartjs, SASS Susy grid, SASS Breakpoint responsive layout, Compass
* Tools: eslint, webpack (build), jest/jasmine (unit and [snapshot](https://facebook.github.io/jest/blog/2016/07/27/jest-14.html) testing), git (source control), travis (ci server), coveralls (test coverage data), firebase (deployment)

## Tests

```
$ npm install
$ npm test
```

## How to run

```
$ npm install
$ npm start
```

Open in your browser:
```
[http://localhost:3000](http://localhost:3000)
```

