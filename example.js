const { SliceUp, count, sum } = require('./index.js');

console.log('Welcome to SliceUp client!');

const sliceup = new SliceUp('198.211.104.225');

function query(cmd) {
    sliceup.query(cmd).then(data => {
        console.log(data);
    }).catch(err => {
        console.log('Request: ' + err.config.data);
        if (typeof err.response !== 'undefined'){
            console.log('Error: ' + err.response);
        }
        else {
            console.log(err.toString());
        }
    });
}

query({
    'select': [count('bid_qty')],
    'from': 'demo',
});

query({
    'select': ['bid_qty', 'bid_qty', 'ask_qty', 'ask_price'],
    'from': 'demo',
});

query({
    'select': [sum('bid_price')],
    'from': 'demo',
});
