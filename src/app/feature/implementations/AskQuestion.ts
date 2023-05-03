import { Feature } from "../feature";
import { getQnA } from "../../algorithm/question";
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

    getResponse(): string {
        let res: string = "";
        let result : QuestionAndAnswer[] = [];
    
        if (this.algorithm == "KMP") {
            this.getQuestionandAnswer().then((questionAndAnswerArray) => {
                result = knuthMorrisPratt(this.userMsg, questionAndAnswerArray);
    
                if (result.length == 0) {
                    this.getQuestionandAnswer().then((questionAndAnswerArray) => {
                        result = levenshteinDistance(this.userMsg, questionAndAnswerArray);
                        if (result.length == 0) {
                            res = "Question cannot be processed";
                        } else {
                            res = "Similar question" + "\n";
                            for(let i = 0; i < result.length; i++){
                                res += result[i].answer;
                            }
                        }
                    });
                } else {
                    res = result[0].answer;
                }
            });
        } else if (this.algorithm == "BM") {
            this.getQuestionandAnswer().then((questionAndAnswerArray) => {
                result = boyerMoore(this.userMsg, questionAndAnswerArray);
    
                if (result.length == 0) {
                    this.getQuestionandAnswer().then((questionAndAnswerArray) => {
                        result = levenshteinDistance(this.userMsg, questionAndAnswerArray);
                        if (result.length == 0) {
                            res = "Question cannot be processed";
                        } else {
                            res = "Similar question" + "\n";
                            for(let i = 0; i < result.length; i++){
                                res += result[i].answer;
                            }
                        }
                    });
                } else {
                    res = result[0].answer;
                }
            });
        } else {
            res = "Invalid algorithm type";
        }
    
        return res;
    }
      
}