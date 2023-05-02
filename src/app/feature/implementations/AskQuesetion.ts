import { Feature } from "../feature";

export class AskQuestion extends Feature {
    constructor() {
        super();
    }

    getResponse(): string {
        /* Searches question in db */
        return "jawaban";
    }
}