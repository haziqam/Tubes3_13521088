import { QuestionAndAnswer } from "./interface";


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

export function knuthMorrisPratt(pattern: string, data: QuestionAndAnswer[]): QuestionAndAnswer[] {
    let found: QuestionAndAnswer[] = [];
    for (let i = 0; i < data.length; i++) {
        let questionLength = data[i].question.length;
        let patternLength = pattern.length;
        let patternLower = pattern.toLowerCase();
        let questionLower = data[i].question.toLowerCase();
        let k = 0;
        let j = 0;
        let lps = LPS(pattern);
        let matches = 0;

        while (k < questionLength) {
            if (patternLower[k] === questionLower[j]) {
                k++;
                j++;
                matches++;
                if (j === patternLength) {
                    j = lps[j - 1];
                }
            } else {
                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    k++;
                }
            }
        }
        let percentage = matches;
        if (percentage == data[i].question.length) {
            found.push({
                id: data[i].id,
                question: data[i].question,
                answer: data[i].answer
            });
        }
    }
    return found;
}

