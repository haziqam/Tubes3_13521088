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
        let res: string = "tes";
        let result: QuestionAndAnswer[] = [];

        if (this.algorithm == "KMP") {
            result = knuthMorrisPratt(this.userMsg, await this.getQuestionandAnswer());
        } else if (this.algorithm == "BM") {
            result = boyerMoore(this.userMsg, await this.getQuestionandAnswer());
        } else {
            res = "Invalid algorithm type";
            return res;
        }

        if (result.length == 0) {
            result = await levenshteinDistance(this.userMsg, await this.getQuestionandAnswer());
            if (result.length == 0) {
                res = "Question cannot be processed";
            } else {
                res = "Similar question:\n";
                for (let i = 0; i < 3; i++) {
                    if(i == 2){
                        res += result[i].question;
                    } else {
                        res += result[i].question + "\n";
                    }
                }
            }
        } else {
            res = result[0].answer;
        }

        return res;
    }
      
}