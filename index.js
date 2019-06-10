import post from 'axios';

class SliceUp {
    constructor(tok) {
        this.path = path;        
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

    exec() {
        return await post('http://test.sliceup.co/query', this.query);
    }
}