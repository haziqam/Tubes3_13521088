import { Feature } from "../feature";
import { addQnA, getQnA } from "../../request/request";
import { knuthMorrisPratt } from "../../algorithm/kmp";
import { boyerMoore } from "../../algorithm/bm";
import { QuestionAndAnswer } from "../../algorithm/interface";

// import FeatureClassifier from "../featureClassifier";

// const prisma = new PrismaClient();

export class AddQuestion extends Feature {
    private readonly regexMatch: string[];
    private readonly algorithm: string;

    constructor (regexMatch: string[], algorithm: string) {
        super();
        this.regexMatch = regexMatch;
        this.algorithm = algorithm;
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
        let result: QuestionAndAnswer[]
        
        try {
            // Cari apakah ada pertanyaan yang sama di database
            const allQnA =  await getQnA();
            
            if (this.algorithm == "KMP") {
                result = knuthMorrisPratt(question, allQnA);
            } 
            else if (this.algorithm == "BM") {
                result = boyerMoore(question, allQnA);
            }
             else {
                return "Invalid algorithm type";
            }

            // Jika tidak ada pertanyaan yang sama di database, pertanyaan baru akan ditambahkan
            if (result.length == 0) {
                await addQnA(question, answer);
                response =  "Pertanyaan " + question + " dengan jawaban " + answer + " berhasil ditambahkan!";
            }
            else {
                response = "Pertanyaan sudah ada di database!"
            }
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

