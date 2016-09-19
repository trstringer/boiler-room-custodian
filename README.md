# :eyeglasses: Boiler Room Custodian

*Because boiler plates need a little cleanup sometimes* :honeybee:

## Why :question: :exclamation:

Simple :full_moon_with_face: There are lots of amazing boiler plates out there that do a great job of giving us what we need.  They also often include minimal sample app code just so we can "see it run".  What `boiler-plate-custodian` aims to do is have a way to use configuration to clean that all up when ready to start development on the project.

## :bulb: What should this turn into? :bulb:

Ideally the best place for a cleanup configuration to be stored would be in the root directory of the boiler plate repositories themselves.  Then have a little npm script that runs `mop` (the bin of `boiler-plate-custodian`).  That way the boiler plate consumers would have a typical workflow of...

 1. clone the boiler plate
 2. run the boiler plate as-is viewing functionality/sample
 3. run `boiler-plate-custodian` (i.e. `npm run cleanup`)
 4. start development on minified project

## :boom: (Boiler plate maintainers) What should you do? :boom:

 1. `npm install --save-dev boiler-room-custodian`
 2. create `cleanup.js` in the root dir of the boiler plate
 3. note what it would take (files removed, added, modified) to remove unnecessary code/files
 4. inject the item changes in the `cleanup.js` configuration
 5. create an npm script i.e. `"cleanup": "mop -v"`

## :page_facing_up: `cleanup.js` structure/sample :page_facing_up:

```javascript
module.exports = {
  remove: [
    { file: 'test-file1.txt' },
    { file: 'test-file2.txt' },
    { file: 'test-file4.txt' }
  ],
  clean: [
    {
      file: 'test-file3.txt',
      clear: true
    },
    {
      file: 'child-dir/test-file5.txt',
      pattern: /blah/
    }
  ],
  add: [
    { file: 'new-add-file1.txt' },
    { file: 'new-add-file2.txt' },
    { file: 'child-dir/.gitkeep' }
  ]
};
```
