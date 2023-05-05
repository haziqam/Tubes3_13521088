import { Feature } from "./feature";
import { AddQuestion } from "./implementations/AddQuestion";
import { AskQuestion } from "./implementations/AskQuestion";
import { DeleteQuestion } from "./implementations/DeleteQuestion";
import { Calculator } from "./implementations/Calculator";
import { GetDate } from "./implementations/GetDate";
import { Help } from "./implementations/Help";

export default class FeatureClassifier {
    private readonly userMsg: string;
    private readonly algorithm: string;

    private readonly addQuestion: RegExp 
    = /^(tambahkan|input|masukkan|simpan) (pertanyaan|query) "(.*)" dengan (jawaban|respon) (.*) ke (dalam )?(database|basis data)/i; 

    private readonly deleteQuestion: RegExp
    = /^(hapus|hilangkan) (data |informasi )?(pertanyaan|query) "(.*)" dari (database|basis data)/i;

    private readonly calculator: RegExp
    = /(\d+(\.\d+)?|-?\d+(\.\d+)?|[+\-*/^()])/g;

    private readonly date: RegExp
    = /^(Hari\s*apa)?\s*(\d{2}\/\d{2}\/\d{4})\s*(\?)?/i;

    private readonly help: RegExp
    = /^help$/i;

    constructor(userMsg: string, algorithm: string) {
        this.userMsg = userMsg;
        this.algorithm = algorithm;
    }

    getFeature(): Feature {
        let match = this.addQuestion.exec(this.userMsg);
        if (match !== null) {
            return new AddQuestion(match, this.algorithm);
        }
        
        match = this.deleteQuestion.exec(this.userMsg);
        if (match !== null) {
            return new DeleteQuestion(match, this.algorithm);
        }

        match = this.date.exec(this.userMsg);
        if (match !== null) {
            return new GetDate(match[2]);
        }

        match = this.calculator.exec(this.userMsg);
        if (match !== null) {
            const arr = this.userMsg.match(this.calculator)
            if(arr != null){
                let cekOperand = false;
                arr.forEach((el) => {
                    // console.log(el);
                    if(el === '+' || el === '-' || el === '*' || el === '/' || el === '^') cekOperand = true;
                });
                if(cekOperand) return new Calculator(this.userMsg, this.calculator);
            }
        }

        match = this.help.exec(this.userMsg);
        if (match !== null) {
            return new Help();
        }
        /* ... */

        // Default case
        return new AskQuestion(this.userMsg, this.algorithm);
        
    }
}


// // Example case
// const userMessage1 = "Apa IbuKOta Indonesia";
// let addQuestion: RegExp 
// = /^(tambahkan|input|masukkan|simpan) (pertanyaan|query) (.*) dengan (jawaban|respon) (.*) ke (dalam )?(database|basis data)/i; 
// console.log(addQuestion.exec(userMessage));
// const userMessage = "help";
// const classifier = new FeatureClassifier(userMessage, "BM");
// const feature = classifier.getFeature();
// (async () => {
//     const response = await feature.getResponse();
//     console.log(response); 
// })()
// let cal: RegExp = /(\d+(\.\d+)?|-?\d+(\.\d+)?|[+\-*/^()])/g
// const userMessage1 = "1 + 2?";
// const classifier1 = new FeatureClassifier(userMessage1, "BM");
// console.log(userMessage1.match(cal));
