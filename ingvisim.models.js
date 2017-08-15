class Number {
    constructor(val) {
        this.val = val;
    }

    resolve(scope) {
        return this;
    }

    equals(val) {
        return this.val === val;
    }
}

class BinOperation {
    constructor(op, a, b) {
        this.op = op;
        this.a = a;
        this.b = b;
    }

    resolve(scope) {
        let a = this.a.resolve(scope).val;
        let b = this.b.resolve(scope).val;

        switch(this.op) {
            case 'add': return new Number(a + b);
            case 'sub': return new Number(a - b);
            case 'mul': return new Number(a * b);
            case 'div': return new Number(a / b);
        }
    }
}

class Symbol {
    constructor(name) {
        this.name = name;
    }

    resolve(scope) {
        console.log(this.name);
        return scope.getSymbol(this.name);
    }
}

class Scope {
    constructor() {
        this.storage = {};
    }

    setSymbol(symbol, object) {
        return this.storage[symbol.name] = object;
    }

    getSymbol(name) {
        return this.storage[name] || null;
    }
}

class Assignment {
    constructor(symbol, value) {
        this.symbol = symbol;
        this.value = value;
    }

    resolve(scope) {
        return scope.setSymbol(this.symbol, this.value.resolve(scope));
    }
}

module.exports = {
    Number,
    BinOperation,
    Symbol,
    Scope,
    Assignment
}