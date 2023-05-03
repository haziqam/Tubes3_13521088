import { Feature } from "../feature";
import { addQnA } from "../../algorithm/question";
// import FeatureClassifier from "../featureClassifier";

// const prisma = new PrismaClient();

export class AddQuestion extends Feature {
    private readonly regexMatch: string[];

    // addQuestionToDB = async () => {
    //     const addedQnA = await prisma.questionandAnswer.create({
    //         data: {
    //             question: this.extractQuestion(),
    //             answer: this.extractAnswer()
    //         }
            
    //     });
    //     //console.log(addedQnA);
    // }

    constructor (regexMatch: string[]) {
        super();
        this.regexMatch = regexMatch;
    }

    /*
    * Regex: /^(tambahkan|input|masukkan|simpan) (pertanyaan|query) (.*) dengan (jawaban|respon) (.*) ke (dalam )?(database|basis data)/i
    *                      ^idx 1                     ^idx2          ^idx3            ^idx4       ^idx5    ^idx6          ^idx7
    * Note: index 0 is the whole regex match.
    */

    // Extracts question from regex match
    private extractQuestion(): string {
        return this.regexMatch[3];
    }

    // Extracts answer from regex match
    private extractAnswer(): string {
        return this.regexMatch[5];
    }

    async getResponse(): Promise<string> {
        const question: string = this.extractQuestion();
        const answer: string = this.extractAnswer();
        let response: string = "";
        
        try {
            await addQnA(question, answer);
            response =  "Pertanyaan " + question + " dengan jawaban " + answer + " berhasil ditambahkan!";
        }
        catch (error){
            response =  "Pertanyaan gagal ditambahkan.";
        }

        return response;
    }
}

// const userMsg = "Tambahkan pertanyaan aaaa dengan jawaban bbbbb ke database";
// const classsifier = new FeatureClassifier(userMsg, "KMP");
// const feature = classsifier.getFeature();
// console.log(feature.getResponse());

