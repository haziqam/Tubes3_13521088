import { Feature } from "../feature";
import { evaluate } from "../../algorithm/evaluate";

export class Calculator extends Feature {
    private readonly userMsg: string;
    private readonly regex: RegExp;

    constructor (userMsg: string, regex: RegExp) {
        super();
        const addMulRegex1 = /(\d+)\s*(?=\()/g;
        const newExpression = userMsg.replace(addMulRegex1, '$1*');
        const addMulRegex2 = /(\))\s*(?=\d+)/g;
        const finalExpression = newExpression.replace(addMulRegex2, '$1*');
        this.userMsg = finalExpression;
        this.regex = regex;
    }

    getResponse(): string {
        const result = evaluate(this.userMsg, this.regex);
        if (result != undefined && !isNaN(result)) {
            return "Hasilnya adalah " + result.toString();
        }
        else {
            return "Sintaks persamaan tidak sesuai"
        }
    }
}