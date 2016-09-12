# ci-list
CI server UI design example

Demo https://ci-list.firebaseapp.com/


## Architecture

The app is buit using classical Facebook's flux architecutre.
https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png


## Technologies

* Lang: JavaScript/ES6/ES7/Babel
* Frameworks: React/Flux, Material UI components, chartjs, SASS Susy grid, SASS Breakpoint responsive layout, Compass
* Tools: eslint, webpack (build), jest/jasmine (unit and snapshot(https://facebook.github.io/jest/blog/2016/07/27/jest-14.html) testing), git (source control), travis (ci server), coveralls (test coverage data), firebase (deployment)


## Tests

Using npm:
$ npm install
$ npm test


## How to run

Using npm:
$ npm install
$ npm start

Open in your browser:
http://localhost:3000


## What can be improved

* Would be great to add more unit and snapshot tests.
* The app can be improved by using Redux architecture for data stores instead of classical flux.
