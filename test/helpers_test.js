const {describe, it} = require('mocha');

const assert = require('assert');

const { isBool, isInt, isFloat, isString } = require('../src/helpers.js');

describe('Helpers', function() {
    describe('#isBool()', function() {
        it('should properly discover types', function() {
            assert.equal(isBool(true), true);
            assert.equal(isBool(false), true);

            assert.equal(isBool("true"), false);
            assert.equal(isBool("false"), false);
            assert.equal(isBool("string"), false);
            assert.equal(isBool("1.0"), false);
            assert.equal(isBool(1.0), false);
            assert.equal(isBool(1), false);
            assert.equal(isString({}), false);
        });
    });

    describe('#isFloat()', function() {
        it('should properly discover types', function() {
            assert.equal(isFloat(1.2), true);
            assert.equal(isFloat(31231414123.3), true);
            assert.equal(isFloat(-31231414123.3), true);

            assert.equal(isFloat(""), false);
            assert.equal(isFloat("string"), false);
            assert.equal(isFloat("1.0"), false);
            assert.equal(isFloat(1.0), false);
            assert.equal(isFloat(1), false);
            assert.equal(isString({}), false);
        });
    });

    describe('#isInt()', function() {
        it('should properly discover types', function() {
            assert.equal(isInt(1.0), true);
            assert.equal(isInt(-1.0), true);
            assert.equal(isInt(2), true);
            assert.equal(isInt(-3), true);

            assert.equal(isInt(""), false);
            assert.equal(isInt("string"), false);
            assert.equal(isInt("1.0"), false);
            assert.equal(isInt(1.2), false);
            assert.equal(isString({}), false);
        });
    });

    describe('#isString()', function() {
        it('should properly discover types', function() {
            assert.equal(isString(""), true);
            assert.equal(isString("string"), true);
            assert.equal(isString("1.0"), true);


            assert.equal(isString(1.0), false);
            assert.equal(isString(1.2), false);
            assert.equal(isString(true), false);
            assert.equal(isString({}), false);
        });
    });
});