import { Feature } from "../feature";
import { evaluate } from "../../algorithm/evaluate";

export class Calculator extends Feature {
    private readonly userMsg: string;
    private readonly regex: RegExp;

    constructor (userMsg: string, regex: RegExp) {
        super();
        this.userMsg = userMsg;
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