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


    
    async getResponse(): Promise<string> {
        /* Searches question in db */
        let algorithmResult: QuestionAndAnswer = {id: -1, question:"" ,answer:""};
        let leveinshteinResult : QuestionAndAnswer[] = [];
        if (this.algorithm == "KMP") {
            this.getQuestionandAnswer().then((questionAndAnswerArray) => {
                algorithmResult = knuthMorrisPratt(this.userMsg, questionAndAnswerArray);
            });
        } else if (this.algorithm == "BM") {
            this.getQuestionandAnswer().then((questionAndAnswerArray) => {
                algorithmResult = boyerMoore(this.userMsg, questionAndAnswerArray);
            });
        }
    
        if (algorithmResult.id == -1) {
            this.getQuestionandAnswer().then((questionAndAnswerArray) => {
               leveinshteinResult = levenshteinDistance(this.userMsg, questionAndAnswerArray);
            });

        } else{
            return algorithmResult.answer;
        }

        let result: String= "Do you mean this question?";
        let addanswer: String = "";
        for(let i = 0; i < leveinshteinResult.length; i++){
            result += " " + leveinshteinResult[i].answer  + "\n";
        }
    
        return "";
    }
    
}