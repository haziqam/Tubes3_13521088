"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
function evaluate(expression, regex) {
    var _a;
    var operatorStack = [];
    var operandStack = [];
    var precedence = {
        "^": 4,
        "*": 3,
        "/": 3,
        "+": 2,
        "-": 2,
        "(": 1,
    };
    function isOperator(token) {
        return "+-*/^".indexOf(token) !== -1;
    }
    function calculate(operator, operand2, operand1) {
        switch (operator) {
            case "+":
                return operand1 + operand2;
            case "-":
                return operand1 - operand2;
            case "*":
                return operand1 * operand2;
            case "/":
                return operand1 / operand2;
            case "^":
                return Math.pow(operand1, operand2);
            default:
                throw new Error("Unknown operator " + operator);
        }
    }
    var tokens = (_a = expression.match(regex)) !== null && _a !== void 0 ? _a : [];
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (isOperator(token)) {
            while (operatorStack.length > 0 &&
                precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]) {
                var operator = operatorStack.pop();
                var operand2 = operandStack.pop();
                var operand1 = operandStack.pop();
                // console.log(operator, operand2, operand1)
                operandStack.push(calculate(operator, operand2, operand1));
            }
            operatorStack.push(token);
        }
        else if (token === "(") {
            operatorStack.push(token);
        }
        else if (token === ")") {
            while (operatorStack[operatorStack.length - 1] !== "(") {
                var operator = operatorStack.pop();
                var operand2 = operandStack.pop();
                var operand1 = operandStack.pop();
                // console.log(operator, operand2, operand1)
                operandStack.push(calculate(operator, operand2, operand1));
            }
            operatorStack.pop();
        }
        else {
            operandStack.push(parseFloat(token));
        }
    }
    while (operatorStack.length > 0) {
        var operator = operatorStack.pop();
        var operand2 = operandStack.pop();
        var operand1 = operandStack.pop();
        // console.log(operator, operand2, operand1)
        operandStack.push(calculate(operator, operand2, operand1));
    }
    return operandStack.pop();
}
exports.evaluate = evaluate;
