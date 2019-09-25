# Sliceup

![npm](https://img.shields.io/npm/v/sliceup) ![npm](https://img.shields.io/npm/dt/sliceup) ![GitHub](https://img.shields.io/github/license/sliceup/sliceup-node)

NodeJS client of the SliceUp API

Installing
---
```bash
$ npm install --save sliceup
```

Examples
---

### Importing

```js
const sliceup = require('sliceup');
```
or
```js
const {Sliceup} = require('sliceup');
```

### Database summary

```js
const {Sliceup} = require('sliceup');

const sliceup = new Sliceup('demo.sliceup.co');

sliceup.summary()
.then(response => console.log(response))
.catch(error => console.error(error));
```

### Create a table

```js
const s = require('sliceup');

const sliceup = new s.Sliceup('demo.sliceup.co');

sliceup.create({
    'name': 'orders',
    'columns': [
       {'name': 'time', 'type': 'time'},
       {'name': 'qty', 'type': 'int'},
       {'name': 'price', 'type': 'float'}
    ],
    'recreate': true
})
.then(response => console.log(response))
.catch(error => console.error(error));
```

### Insert data

```js
const s = require('sliceup');

const sliceup = new s.Sliceup('demo.sliceup.co');

sliceup.insert({
    'name': 'orders', 
    'rows': [
        {'time': '00:00:00', 'qty': 2, 'price': 9.0},
        {'time': '00:30:09', 'qty': 2, 'price': 2.0},
        {'time': '01:45:01', 'qty': 4, 'price': 1.0},
        {'time': '12:10:33', 'qty': 10, 'price': 16.0},
        {'time': '16:00:09', 'qty': 4, 'price': 8.0},
        {'time': '22:00:00', 'qty': 4, 'price': 23.0},
        {'time': '22:31:49', 'qty': 4, 'price': 45.0},
        {'time': '22:59:19', 'qty': 4, 'price': 17.0},
    ]
})
.then(response => console.log(response))
.catch(error => console.error(error));
```

### Query data
*Check out in [RunKit](https://runkit.com/sliceup/5d7c162cea9933001c32a424)*

#### Select from table

```js
const {Sliceup} = require('sliceup');

sliceup.query({
    'select': ['time', 'qty', 'price'],
    'from': 'orders'
})
.then(response => console.log(response))
.catch(error => console.error(error));
```

#### Visualize data

```js
const {Sliceup} = require('sliceup');

sliceup.query({
    'select': ['time', 'qty', 'price'],
    'from': 'orders'
})
.then(response => {
    response.visualize()
})
.catch(error => console.error(error));
```

#### Query table statistics

```js
const {Sliceup, max, min} = require('sliceup');

sliceup.query({
   'select': [max('time'), min('time'), min('qty'), max('qty'), min('price'), max('price')],
   'from': 'orders'
})
.then(response => console.log(response))
.catch(error => console.error(error));
```

#### Slice the data into hour buckets

```js
const {Sliceup, count, bar, time} = require('sliceup');

sliceup.query({
  'select': count('price'),
  'by': bar('time', time(1,0,0)),
  'from': 'orders'
})
.then(response => console.log(response))
.catch(error => console.error(error));
```

#### Slice and group the quantity by bars of 2

```js
const {Sliceup, count, bar, time} = require('sliceup');

sliceup.query({
   'select': count('price'),
   'by': bar('qty', 2),
   'from': 'orders'
})
.then(response => console.log(response))
.catch(error => console.error(error));
```

### Delete tables

```js
const s = require('sliceup');

const sliceup = new s.Sliceup('demo.sliceup.co');

sliceup.delete('orders')
.then(response => console.log(response))
.catch(error => console.error(error));
```

Docs
---

https://sliceup.github.io/sliceup-node/

License
---

Sliceup is copyright (c) 2019-present SliceUp, Inc.

Sliceup is free software, licensed under the MIT. See the LICENSE file for more details.