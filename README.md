# :eyeglasses: Boiler Room Custodian

*Because boilerplates need a little cleanup sometimes* :honeybee:

![demo](demo.gif)

## :exclamation: :question: Why :question: :exclamation:

Simple :full_moon_with_face: There are lots of amazing boilerplates out there that do a great job of giving us what we need.  They also often include minimal sample app code just so we can "see it run".  What `boiler-plate-custodian` aims to do is have a way to use configuration to clean that all up when ready to start development on the project.

## :bulb: What should this turn into? :bulb:

Ideally the best place for a cleanup configuration to be stored would be in the root directory of the boilerplate repositories themselves.  Then have a little npm script that runs `mop` (the bin of `boiler-plate-custodian`).  That way the boilerplate consumers would have a typical workflow of...

 1. clone the boilerplate
 2. run the boilerplate as-is viewing functionality/sample
 3. run `boiler-plate-custodian` (i.e. `npm run cleanup`)
 4. start development on minified project

## :boom: (boilerplate maintainers) What should you do? :boom:

 1. `npm install --save-dev boiler-room-custodian`
 2. create [`setup.js`](#page_facing_up-cleanupjs-structuresample-page_facing_up) in the root dir of the boilerplate
 3. note what it would take (files removed, added, modified) to remove unnecessary code/files
 4. inject the item changes in the `setup.js` configuration
 5. create an npm script i.e. `"cleanup": "mop -v"`

## :page_facing_up: `setup.js` structure/sample :page_facing_up:

*The below example uses a cleanup configuration for the extremely useful [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)*

**[Pull Request illustrating the code changes for this boilerplate](https://github.com/chentsulin/electron-react-boilerplate/pull/402)**

```javascript
module.exports = {
  // remove the following files as they are mostly 
  // related to the sample counter page and functionality
  remove: [
    { file: 'app/actions/counter.js' },
    { file: 'app/components/Counter.css' },
    { file: 'app/components/Counter.js' },
    { file: 'app/containers/CounterPage.js' },
    { file: 'app/reducers/counter.js' },
    { file: 'test/actions/counter.spec.js' },
    { file: 'test/components/Counter.spec.js' },
    { file: 'test/containers/CounterPage.spec.js' },
    { file: 'test/reducers/counter.spec.js' },
    { file: 'CHANGELOG.md' },
    { file: 'erb-logo.png' }
  ],
  // clean the following files by either clearing them 
  // (by specifying {clear: true}) or by removing lines 
  // that match a regex pattern
  clean: [
    {
      file: 'app/reducers/index.js',
      pattern: /counter/
    },
    {
      file: 'app/store/configureStore.development.js',
      pattern: /counterActions/
    },
    {
      file: 'app/app.global.css',
      clear: true
    },
    {
      file: 'app/routes.js',
      pattern: /CounterPage/
    },
    {
      file: 'test/e2e.js',
      clear: true
    },
    {
      file: 'README.md',
      clear: true
    },
    {
      file: 'app/components/Home.js',
      pattern: /(h2|Link to)/
    }
  ],
  // add the following files to the project, mostly 
  // related to .gitkeep for version control
  add: [
    { file: 'app/actions/.gitkeep' },
    { file: 'test/actions/.gitkeep' },
    { file: 'test/components/.gitkeep' },
    { file: 'test/containers/.gitkeep' },
    { file: 'test/reducers/.gitkeep' }
  ]
};
```
