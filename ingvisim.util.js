var assert = require("assert");
var { Scope } = require("./ingvisim.models.js");
let { semantics, grammar, calculator, astBuilder } = require('./ingvisim.semantics');

const GLOBAL_SCOPE = new Scope();

function test(input, answer) {
    let match = grammar.match(input);

    if(match.failed()) {
        return console.log(`*** input failed to match: ${input} ${match.message} ***`);
    }

    let result = astBuilder(match).toAst().resolve(GLOBAL_SCOPE)

    try {
        assert.equal(result.equals(answer), true);
        console.log('Assert passed: ', result, answer);
    } catch(e) {
        console.error("Assert did not pass: ", result, answer, e.message);
    }
}

module.exports = {
    test
}