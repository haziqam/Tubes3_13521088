import { Feature } from "../feature";

export class AddQuestion extends Feature {
    private readonly regexMatch: string[];

    constructor (regexMatch: string[]) {
        super();
        this.regexMatch = regexMatch;
    }

    private getQuestion(): string {
        return this.regexMatch[3];
    }

    private getAnswer(): string {
        return this.regexMatch[5];
    }

    getResponse(): string {
        const question: string = this.getQuestion();
        const answer: string = this.getAnswer();

        /* Adds question and answser to db */

        let successful: boolean = true;
        if (successful) {
            return "Pertanyaan " + question + " dengan jawaban " + answer + "berhasil ditambahkan!";
        }
        else {
            return "gagal"
        }
    }
}