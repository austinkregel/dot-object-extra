# Dot-Object

Dot-Object makes it possible to transform javascript objects using dot notation.

### Installation

Install from npm:

```
  npm install dot-object --save
```

Install from bower:

```
  bower install dot-object --save
```

### Download

## Usage

#### Pick a property within an object or an array

```javascript
var dot = require("dot-object");

var obj = dot.pick("hobbies.type", {
    id: null,
    name: "Doe",
    "first-name": "John",
    age: 25,
    hobbies: [
        {
            type: "reading",
            keys: ["sci-fi"],
        },
        {
            type: "cinema",
            keys: ["action"],
        },
        {
            type: "sports",
            keys: ["volley-ball", "badminton"],
        },
    ],
    address: {},
});

console.log(obj);

["reading", "cinema", "sports"];
```

## Everything else

For literally everything other than getting things out of arrays, and objects refer to [the original doc](https://github.com/rhalff/dot-object/blob/master/README.md)
