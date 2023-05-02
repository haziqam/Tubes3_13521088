import { Feature } from "../feature";

export class Calculator extends Feature {
    private readonly regexMatch: string[];

    constructor (regexMatch: string[]) {
        super();
        this.regexMatch = regexMatch;
    }

    getResponse(): string {
        const pattern = /(\d+(\.\d+)?)\s*((\+|-|\*|\/|\^|\(|\))\s*\d+(\.\d+)?\s*)*(\+|-|\*|\/|\^)\s*\d+(\.\d+)?/;
        let match = this.regexMatch;
        const [fullMatch, num1, , operators, operator, num2] = match;
        const result = applyOperator(num1, num2, operator);
        let expression = expression.replace(fullMatch, result);

        while ((match = pattern.exec(expression))) {
          const [fullMatch, num1, , operators, operator, num2] = match;
          const result = applyOperator(num1, num2, operator);
          expression = expression.replace(fullMatch, result);
        }

        let successful: boolean = true;
        if (successful) {
            return "Pertanyaan " + question + " berhasil dihapuskan!";
        }
        else {
            return "gagal"
        }
    }
}