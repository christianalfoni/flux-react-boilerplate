## React FLUX Boilerplate

Based on the architecture suggestions from Facebook, this boilerplate will help you deal with it. It has included the
flux-react extension to React JS. Read more about FLUX over at [Facebook Flux](http://facebook.github.io/flux/) and I wrote a post about it too: [React JS and FLUX](http://christianalfoni.github.io/javascript/2014/08/20/react-js-and-flux.html).

### How to use

* Clone the repo
* Run `npm install`
* Open `dev/index.html`, run `python -m SimpleHTTPServer` in the `dev` folder or set up your own server

### Development
* Run `gulp`
* Any changes to `app` or `styles` folder will automatically rebuild to `dev` folder

### Tests
* Run `gulp test -'./tests/App-test.js'
* Open `test.html`
* Any changes done to the test file or files in `app` folder will autoreload the browser

### Run all tests with Karma
* Run `npm test`

Karma will launch PhantomJS and run the tests once. If you need to run tests in a GUI browser, either change `karma.conf.js` to use Chrome or Firefox, or manually start it with:
`./node_modules/karma/bin/karma start --single-run --browsers Chrome`

### Minify the code, ready for production
* Run `gulp deploy`

### Directory
* **app/**: Where you develop the application
* **dev/**: Where your automatically builds to. This is where you launch your app in development
* **dist/**: Where the deployed code exists, ready for production
* **utils/**: Gulp tasks and other utils
* **styles/**: Where you put your css files
* **tests/**: Where you put your test files
* **gulpfile**: Gulp configuration
* **karma.conf.js**: Karma configuration
* **test.html**: Open when running specific test files
