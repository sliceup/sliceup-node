const axios = require('axios');

module.exports = class SliceUp {
    constructor() {
        this.query = {
            'select': [],
            'from': [],
        };
    }

    select(expr) {
        this.selects.push(expr);
        return this;
    }

    from(name) {
        this.from = name;
        return this;
    }

    async exec() {
        return await axios.post('http://test.sliceup.co/query', this.query);
    }
}

