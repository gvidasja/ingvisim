const fs = require("fs");
const MSymbol = require('./ingvisim.ast').MSymbol

class IngvisimStdLib {
    static create(scope) {
        scope.setSymbol(new MSymbol("print"), function(text) {
            console.log(text.toString());
        });

        scope.setSymbol(new MSymbol("clear"), function(fileName) {
            fs.writeFileSync(fileName, '');
        })

        scope.setSymbol(new MSymbol("write"), function(data, fileName) {
            if(!fileName) throw new Error("Invalid output file.")

            if(data && data.toString) { data = data.toString() }

            fs.appendFileSync(`${data}\n`, fileName);
        })

        scope.setSymbol(new MSymbol("max"), function(A,B) {
            return A.val > B.val ? A : B;
        });

        scope.setSymbol(new MSymbol("min"), function(A,B) {
            return A.val < B.val ? A : B
        })
    }
}

module.exports = {
    IngvisimStdLib
}