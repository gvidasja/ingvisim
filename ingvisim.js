"use strict";

const ohm = require('ohm-js');
const fs = require('fs');
const assert = require('assert');
const IngvisimStdLib = require('./ingvisim.stdlib').IngvisimStdLib;
const Scope = require('./ingvisim.ast').Scope;

var grammar = ohm.grammar(fs.readFileSync('./ingvisim.grammar.ohm').toString());
var semantics = grammar.createSemantics();
var ASTBuilder = require('./ingvisim.semantics').make(semantics).ASTBuilder;

var GLOBAL_SCOPE = new Scope(null);

function Ingvisim() {
    IngvisimStdLib.create(GLOBAL_SCOPE);

    var filePath = process.argv[2];

    if(!filePath) {
        throw new Error("Please specify a file to run.")
    }

    compileAndRun(filePath, grammar);
}

function compileAndRun(file, grammar){
	var input = fs.readFileSync(file).toString();
	var match = grammar.match(input);

	if(match.failed()) return new Error("input failed to match " + input + match.message);

    var ast = ASTBuilder(match).toAST();
    var result = ast.resolve(GLOBAL_SCOPE);

    if(result) {
        console.log(result.val || result);
    }

    console.log('Done.')
}

module.exports = Ingvisim;