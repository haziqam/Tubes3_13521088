import { Feature } from "../feature";
import { deleteQnA, getQnA } from "../../request/request";
import { knuthMorrisPratt } from "../../algorithm/kmp";
import { boyerMoore } from "../../algorithm/bm";
import { QuestionAndAnswer } from "../../algorithm/interface";
import { levenshteinDistance } from "../../algorithm/leveinshteinDistance";

export class DeleteQuestion extends Feature {
    private readonly regexMatch: string[];
    private readonly algorithm: string;

    constructor (regexMatch: string[], algorithm: string) {
        super();
        this.regexMatch = regexMatch;
        this.algorithm = algorithm;
    }

    private getQuestion(): string {
        return this.regexMatch[4];
    }

    async getResponse(): Promise<string> {
        const question: string = this.getQuestion();
        let response: string = "";
        let result: QuestionAndAnswer[];

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

            if (result.length == 0) {
                // Jika tidak ada exact match, sarankan maksimal 3 pertanyaan yang serupa
                const distanceResult = levenshteinDistance(question, allQnA);
                if (distanceResult.length == 0) {
                    response =  "Tidak ada pertanyaan tersebut di database!"
                }
                else {
                    response = "Pertanyaan tidak ditemukan. Pertanyaan serupa: \n"
                    let similiarCount: number = (result.length >= 3) ? 3 : result.length;
                    for (let i = 0; i < similiarCount; i++) {
                        response += result[i].question;
                        if (i !== similiarCount - 1) response += "\n";
                    }    
                }
            }
            else {
                // Jika ada exact match, langsung hapus pertanyaan
                const id = result[0].id;
                await deleteQnA(id);
                response = "Pertanyaan " + question + " berhasil dihapus dari database!"
            }
        }
        catch (error) {
            response =  "Pertanyaan gagal dihapuskan.";
        }

        return response;

    }
}