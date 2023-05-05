import { Feature } from "../feature";
import { getQnA } from "../../request/request";
import { QuestionAndAnswer, foundQuestion } from "../../algorithm/interface";
import { knuthMorrisPratt } from "../../algorithm/kmp";
import { boyerMoore } from"../../algorithm/bm"
import { levenshteinDistance } from "../../algorithm/leveinshteinDistance";


export class AskQuestion extends Feature {
    private readonly userMsg: string;
    private readonly algorithm: string;


    constructor(userMsg: string, algorithm: string) {
        super();
        this.userMsg = userMsg;
        this.algorithm = algorithm;
    }
    
    getQuestionandAnswer = async () => {
        const data = await getQnA();
        return data;
    }


    
    async getResponse(): Promise<string> {
        let res: string = "";
        let result: QuestionAndAnswer[] = [];

        if (this.algorithm == "KMP") {
            result = knuthMorrisPratt(this.userMsg, await this.getQuestionandAnswer());
        } else if (this.algorithm == "BM") {
            result = boyerMoore(this.userMsg, await this.getQuestionandAnswer());
        } else {
            res = "Kamu belum memilih algoritma";
            return res;
        }

        if (result.length == 0) {
            result = await levenshteinDistance(this.userMsg, await this.getQuestionandAnswer());
            if (result.length == 0) {
                res = "Pertanyaan tidak dapat diproses";
            } else {
                res = "Pertanyaan yang mirip:\n";
                if(result.length >= 3){
                    for (let i = 0; i < 3; i++) {
                        if(i == 2){
                            res += result[i].question;
                        } else {
                            res += result[i].question + "\n";
                        }
                    }
                } else {
                    for (let i = 0; i < result.length; i++) {
                        if(i == result.length-1){
                            res += result[i].question;
                        } else {
                            res += result[i].question + "\n";
                        }
                    }
                }
            }
        } else{
            res = result[0].answer;
        }
        return res;
    }
      
}