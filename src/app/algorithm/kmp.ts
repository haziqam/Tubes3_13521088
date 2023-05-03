import { foundQuestion, QuestionAndAnswer } from "./interface";


function LPS(toMatch: string): number[]{
    let start: number = 0;
    let i:number = 1;
    const pattern: string = toMatch;
    const stringLength: number = toMatch.length;
    let lps: number[] = [];
    lps[0] = 0;
    while(i < stringLength){
        if(toMatch[start] === pattern[i]){
            start++;
            lps[i] = start;
            i++;
        } else { //Not match
            if(start === 0){
                lps[i] = 0;
                i++;
            } else {
                start = lps[start-1];
            }
        }
    }
    return lps;
}

export function knuthMorrisPratt(pattern: string, data:QuestionAndAnswer[]): QuestionAndAnswer{
    let result: QuestionAndAnswer = {id: -1, question:"" ,answer:""};
    for(let i = 0; i < data.length; i++){
        let questionLength = data[i].question.length;
        let patternLength = pattern.length;
        let patternLower = pattern.toLowerCase();
        let questionLower = data[i].question.toLowerCase();
        let k = 0;
        let j = 0;
        let lps = LPS(pattern);
        
        while(k < questionLength){ //As long as the text length is not 0
            if (patternLower[k] === questionLower[j]){
                k++;
                j++;
                if (j === patternLength){ //If it reaches the pattern length, 
                    j = lps[j-1]; 
                }
            } else {
                if (j != 0){
                    j = lps[j-1];
                } else{
                    k++;
                }
            }
        }
        if(j==1){
            result = data[i];
        }
    }
    return result;
}

