import { Feature } from "../feature";
import { evaluate } from "../../algorithm/evaluate";

export class Calculator extends Feature {
    private readonly userMsg: string;
    private readonly regex: RegExp;

    constructor (userMsg: string, regex: RegExp) {
        super();
        const addMulRegex1 =  /(-?\d+(\.\d+)?)\s*(?=\()/g;
        const newExpression = userMsg.replace(addMulRegex1, '$1*');
        const addMulRegex2 = /(\))\s*(?=-?\d+(\.\d+)?)/g;
        const newExpression1 = newExpression.replace(addMulRegex2, '$1*');
        const addPlusRegex = /(-?\d+(\.\d+)?)\s*(?=-\d+(\.\d+)?)/g;
        const finalExpression = newExpression1.replace(addPlusRegex, '$1 + ');
        this.userMsg = finalExpression;
        this.regex = regex;
    }

    getResponse(): string {
        let result;
        try {
            result = evaluate(this.userMsg, this.regex);
            // console.log(result);
        } catch (error) {
            return "Sintaks persamaan tidak sesuai"
        }
        if (result != undefined && !isNaN(result)) {
            return "Hasilnya adalah " + result.toString();
        }
        else {
            return "Sintaks persamaan tidak sesuai"
        }
    }
}