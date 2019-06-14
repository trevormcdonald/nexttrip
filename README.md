# NextTrip Case Study

### TODO

- [x] Select a bus route from a list of available routes
- [x] Select a direction for a bus route
- [x] For a given route and direction, display the stops
- [x] Respond reasonably to browser back and forward buttons (for
      example, implement application
      routing)
- [x] Include test code that validates your application works as expected.

Include a README.md file that includes:

- [x] The steps to build and run your application.
- [x] The steps to execute provided tests.
- [x] A list of assumptions you made during development.
- [x] To submit your application, you may either email a zip archive of your project or provide remote
      access to your project repository.

[NextTrip API documentation](http://svc.metrotransit.org/)

# Documentation

### Install, Build, and Run

- Install [yarn](https://yarnpkg.com/en/docs/install) (or alternative)
- run `yarn` on the command line to install packages
- run `yarn build` to build
- run `yarn dev` to spin up the dev server, and go to `localhost:3000` in a browser
- run `yarn start` to serve the production server at `localhost:5000`
- run `yarn test` to open cypress to execute tests

### Testing

Note: on Linux (Debian) systems execute this command so Cypress can launch:
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`, otherwise you will get `ENOSPC` errors. See [here](https://stackoverflow.com/questions/22475849/node-js-what-is-enospc-error-and-how-to-solve) for details.

- run `yarn test`
- in the window that opens click on `unit_test_specs.js` to run unit tests against the application models
- during this step, the tests pause 3 times (once per model), click the play button at the top of the screen to advance the test
- in the first window that opened, click on `nexttrip_spec.js` to run tests with the DOM
- tests live in `cypress/integration/`

### Assumptions

- user did not need a `<form>` to submit every time they wanted a new set of stops
- user does not need to see old stops if they are actively changing routes
- we don't need to pre-load data, and each time the user selects a new option we can just request the data we know is relevant
- a route can only be uniquely identified by a positive integer (or string representation of that integer)
- the Metro Transit API might not like getting every possible request all the time
- styling is not the most important part of this case study
- if a well-formed API call does not return data, nothing needs to be displayed

### Possible Future Work

- let departure times update periodically
- bring in more of the API
- figure out what the deal is with routes like 906 and 888
- handle direct url inputs to the browser better
- can Mithril lifecycle methods all return promises?
