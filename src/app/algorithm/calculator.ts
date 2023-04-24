export class Calculator {
    private result: number = 0;
  
    add(num: number): void {
      this.result += num;
    }
  
    sub(num: number): void {
      this.result -= num;
    }
  
    mul(num: number): void {
      this.result *= num;
    }
  
    div(num: number): void {
      if (num === 0) {
        throw new Error('Division by zero');
      }
      this.result /= num;
    }
  
    getResult(): number {
      return this.result;
    }
  
    clear(): void {
      this.result = 0;
    }
  
    query(queryString: string): void {
      const queryRegex = /^(\d+)\s*([\+\-\*\/])\s*(\d+)$/;
  
      const match = queryRegex.exec(queryString);
      if (match) {
        const num1 = Number(match[1]);
        const op = match[2];
        const num2 = Number(match[3]);
  
        switch (op) {
          case '+':
            this.add(num1 + num2);
            break;
          case '-':
            this.sub(num1 - num2);
            break;
          case '*':
            this.mul(num1 * num2);
            break;
          case '/':
            this.div(num1 / num2);
            break;
          default:
            throw new Error('Invalid operator');
        }
      } else {
        throw new Error('Invalid query format');
      }
    }
  }
  