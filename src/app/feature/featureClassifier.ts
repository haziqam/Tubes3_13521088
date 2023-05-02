import { Feature } from "./feature";
import { AddQuestion } from "./implementations/AddQuestion";
import { AskQuestion } from "./implementations/AskQuesetion";
import { DeleteQuestion } from "./implementations/DeleteQuestion";

export class FeatureClassifier {
    private readonly userMsg: string;

    private readonly addQuestion: RegExp 
    = /^(tambahkan|input|masukkan|simpan) (pertanyaan|query) (.*) dengan (jawaban|respon) (.*) ke (dalam )?(database|basis data)/i; 

    private readonly deleteQuestion: RegExp
    = /^(hapus|hilangkan) (data |informasi )?(pertanyaan|query) (.*) dari (database|basis data)/i;

    private readonly calculator: RegExp
    = /^fill here/i;

    private readonly date: RegExp
    = /^fill here/i;

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

        /* ... */

        // Default case
        return new AskQuestion();
        
    }
}

// // Example case
// const userMessage = "Tambahkan pertanyaan apa ibukota Indonesia dengan jawaban YYY ke dalam database.";
// const userMessage1 = "Hapus pertanyaan XXX dari database";
// let addQuestion: RegExp 
// = /^(tambahkan|input|masukkan|simpan) (pertanyaan|query) (.*) dengan (jawaban|respon) (.*) ke (dalam )?(database|basis data)/i; 
// console.log(addQuestion.exec(userMessage));
// const classifier = new FeatureClassifier(userMessage1);
// const feature = classifier.getFeature();
// console.log(feature.getResponse());