# Reddit Lite

##### Author: Kris Frenette

## Introduction

This is a version of Reddit Lite. It utilizes the Reddit Api (https://www.reddit.com/dev/api/) and loads them into a Single Page App. Technology stack is:

-   React
-   Redux
-   Thunk
-   React Router
-   Styled Components

Most of what is being used is well known. One package that I would like to point out is Styled Components (https://www.styled-components.com/). I recently started working with styled components and I really enjoy its' simplicity being able to pass props and treat it more like JavaScript.

## Development Tools

-   TypeScript
-   TSLint
-   Polyfill
-   Jest
-   Webpack Development Server
-   Prettier

I chose to write the application in TypeScript. This affords confidence in the data as it gets passed around the application. This also gives a lot of extra tooling in the IDE.

My IDE of choice is VSCode: (https://code.visualstudio.com).

Most of the other tooling is pretty much standard in today's web world. The one that I would like to point out is Prettier. If you aren't familiar with it, it basically makes it so you don't have to worry about formatting anymore. You can read more at: (https://prettier.io/)

## Installation Instructions

This document makes the assumption that you have NodeJS and npm installed. If you do not have them installed please go to: https://www.npmjs.com/get-npm to install NodeJs and NPM.

1. Download the application from the git repo

2. Install dependencies

```
npm install
```

This will install Webpack and various other dependencies you will need to run the application.

3. Build and start the server

```
npm start
```

This will open a browser window at http://localhost:8080 and launch the application

## Testing

The test framework that I chose is jest (https://jestjs.io/). I chose this package for a couple of reasons. First is familiarity and second is because it is developed by the same group that did React.

### To run the tests

```
npm run test
```

This will run all of the tests in the **\_\_tests** directory in **.src** directory.

### Developing more tests

```
npm run test -- watch
```

This will run a watcher on the tests and will run the updated tests automatically on file change.

### File coverage

```
npm run test -- --ci --coverage
```

This will output coverage results for the tests. You will see that there is

npm run check-types

## Linting

```
npm run check-types
```

This will run linting on the package and ensure that rules are being followed. Typically the IDE with the right plugins will show the error immediately with this setup.

## Things to note

While everything is running as expected there are a few things that I didn't do that I would have completed if I had time.

1. Although the dev server works as expected, the build is showing an issue that I didn't spend a lot of time. I would have also liked to spend a little more time on the build process and add in hooks for linting and running prettier. In the end I decided that my time was better spent on developing the code base than worrying too much about the build process.

2. There is unit tests, but I would have liked to spend more time and built out integration / functional tests. I have done this before with jest and nightwatch.

3. I would have liked to add more functionality to the subreddits selection, and would have liked to work the paging in the to url so that we could leverage the browser history and control the paging there.
