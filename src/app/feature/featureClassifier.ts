import { Feature } from "./feature";
import { AddQuestion } from "./implementations/AddQuestion";
import { AskQuestion } from "./implementations/AskQuesetion";
import { DeleteQuestion } from "./implementations/DeleteQuestion";
import { Calculator } from "./implementations/Calculator";
import { GetDate } from "./implementations/GetDate";

class FeatureClassifier {
    private readonly userMsg: string;

    private readonly addQuestion: RegExp 
    = /^(tambahkan|input|masukkan|simpan) (pertanyaan|query) (.*) dengan (jawaban|respon) (.*) ke (dalam )?(database|basis data)/i; 

    private readonly deleteQuestion: RegExp
    = /^(hapus|hilangkan) (data |informasi )?(pertanyaan|query) (.*) dari (database|basis data)/i;

    private readonly calculator: RegExp
    = /(\d+(\.\d+)?|-?\d+(\.\d+)?|[+\-*/^()])/g;

    private readonly date: RegExp
    = /^(Hari\s*apa)?\s*(\d{2}\/\d{2}\/\d{4})\s*(\?)?/i;

    constructor(userMsg: string) {
        this.userMsg = userMsg;
    }

    getFeature(): Feature {
        let match = this.addQuestion.exec(this.userMsg);
        if (match !== null) {
            return new AddQuestion(match);
        }
        
        match = this.deleteQuestion.exec(this.userMsg);
        if (match !== null) {
            return new DeleteQuestion(match);
        }

        match = this.calculator.exec(this.userMsg);
        if (match !== null) {
            return new Calculator(this.userMsg, calculator);
        }

        match = this.date.exec(this.userMsg);
        if (match !== null) {
            return new GetDate(match[2]);
        }
        /* ... */

        // Default case
        return new AskQuestion();
        
    }
}

// Example case
const userMessage = "Tambahkan pertanyaan apa ibukota Indonesia dengan jawaban YYY ke dalam database.";
const userMessage1 = "Hapus pertanyaan XXX dari database";
let addQuestion: RegExp 
= /^(tambahkan|input|masukkan|simpan) (pertanyaan|query) (.*) dengan (jawaban|respon) (.*) ke (dalam )?(database|basis data)/i; 
console.log(addQuestion.exec(userMessage));
const userMessage2 = "-1 * 2??";
let calculator: RegExp
= /(\d+(\.\d+)?|-?\d+(\.\d+)?|[+\-*/^()])/g
console.log(userMessage2.match(calculator))
const x = new Calculator(userMessage2, calculator)
console.log(x.getResponse());

const userMessage3 = "nah gimana Hari   APa 25/802/20237";
let date: RegExp
= /^(Hari\s*apa)?\s*(\d{2}\/\d{2}\/\d{4})\s*(\?)?/i;
console.log(userMessage3.match(date))
const a = userMessage3.match(date)
if(a != null){
    const y = new GetDate(a[2]);
    console.log(y.getResponse());
}