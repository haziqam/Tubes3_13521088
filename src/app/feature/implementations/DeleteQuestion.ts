import { Feature } from "../feature";

export class DeleteQuestion extends Feature {
    private readonly regexMatch: string[];

    constructor (regexMatch: string[]) {
        super();
        this.regexMatch = regexMatch;
    }

    private getQuestion(): string {
        return this.regexMatch[4];
    }

    async getResponse(): Promise<string> {
        const question: string = this.getQuestion();

        /* Deletes question and answser to db */

        let successful: boolean = true;
        if (successful) {
            return "Pertanyaan " + question + " berhasil dihapuskan!";
        }
        else {
            return "gagal"
        }
    }
}