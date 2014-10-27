## React FLUX Boilerplate

Based on the architecture suggestions from Facebook, this boilerplate will help you deal with it. It has included the flux-react extension to React JS, [flux-react](https://github.com/christianalfoni/flux-react). 

Read more about FLUX over at [Facebook Flux](http://facebook.github.io/flux/) and I wrote a post about it too: [React JS and FLUX](http://christianalfoni.github.io/javascript/2014/08/20/react-js-and-flux.html).

### How to use

* Clone the repo
* Run `npm install`
* Open `build/index.html`, run `python -m SimpleHTTPServer` in the `build` folder or set up your own server

### Development
* Run `gulp`
* Any changes to `app` folder will automatically rebuild to `build` folder

### Run all tests with Karma
* Run `npm test`

Karma will launch PhantomJS and run the tests once. If you need to run tests in a normal browser change karma.conf.js to use 'Chrome' as browser. You can also keep running the tests as you write them. Set `autoWatch: true` and `singleRun: false`.

### Minify the code, ready for production
* Run `gulp deploy` to deploy to `dist` folder

### Directory
* **app/**: Where you develop the application
* **build/**: Where your automatically builds to. This is where you launch your app in development
* **dist/**: Where the deployed code exists, ready for production
* **tests/**: Where you put your test files
* **gulpfile**: Gulp configuration
* **karma.conf.js**: Karma configuration
* **test.html**: Open when running specific test files
