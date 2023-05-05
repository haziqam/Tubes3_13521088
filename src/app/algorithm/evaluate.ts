export function evaluate (expression:string, regex:RegExp): number | undefined{
    const operatorStack: string[] = [];
    const operandStack: number[] = [];
    const precedence: { [key: string]: number } = {
      "^": 4,
      "*": 3,
      "/": 3,
      "+": 2,
      "-": 2,
      "(": 1,
    };

    function isOperator(token: string): boolean {
      return "+-*/^".indexOf(token) !== -1;
    }

    function calculate(operator: string, operand2: number, operand1: number): number {
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
  const tokens = expression.match(regex) ?? [];
  for (const token of tokens) {
    if (isOperator(token)) {
      while (
        operatorStack.length > 0 &&
        precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]
      ) {
        const operator = operatorStack.pop()!;
        const operand2 = operandStack.pop()!;
        const operand1 = operandStack.pop()!;
        // console.log(operator, operand2, operand1)
        operandStack.push(calculate(operator, operand2, operand1));
      }
      operatorStack.push(token);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (operatorStack[operatorStack.length - 1] !== "(") {
        const operator = operatorStack.pop()!;
        const operand2 = operandStack.pop()!;
        const operand1 = operandStack.pop()!;
        // console.log(operator, operand2, operand1)
        operandStack.push(calculate(operator, operand2, operand1));
      }
      operatorStack.pop();
    } else {
      operandStack.push(parseFloat(token));
    }
  }
  while (operatorStack.length > 0) {
    const operator = operatorStack.pop()!;
    const operand2 = operandStack.pop()!;
    const operand1 = operandStack.pop()!;
    // console.log(operator, operand2, operand1)
    operandStack.push(calculate(operator, operand2, operand1));
  }
  return operandStack.pop();
}
  