# Boiler Room Custodian

*Because boilerplates need a little cleanup sometimes*

## Usage

Boiler Room Custodian removes and cleans based of comments.

### Remove the single following line

```javascript
// brc
console.log('this line will be removed');
```

### Remove the current single line

```javascript
console.log('this line will be removed'); // brc
```

### Remove multiple lines

```javascript
// brc start
console.log('will be removed');
const alsoWillBeRemoved = 'bye';
console.log('more to be removed');
// brc end
```
