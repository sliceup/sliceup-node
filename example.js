const { Sliceup, count, sum } = require('./index.js');

console.log('Welcome to SliceUp client!');

const sliceup = new Sliceup('198.211.104.225');

function query(cmd) {
    sliceup.query(cmd).then(data => {
        console.log(data);
    }).catch(err => {
        if (typeof err.response !== 'undefined'){
            console.log('Error: ' + err.response);
        }
        else {
            console.log(err.toString());
        }
    });
}

function summary() {
    sliceup.summary().then(data => {
        console.log(data);
    }).catch(err => {
        if (typeof err.response !== 'undefined'){
            console.log('Error: ' + err.response);
        }
        else {
            console.log(err.toString());
        }
    });
}

summary();

query({
    'select': [count('time')],
    'from': 'demo',
});

query({
    'select': ['time', 'qty', 'price'],
    'from': 'demo',
});

query({
    'select': [sum('price')],
    'from': 'demo',
});
