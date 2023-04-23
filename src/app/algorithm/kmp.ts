import { getQnA } from "./question";
import { foundQuestion } from "./interface";


function LPS(toMatch: String): number[]{
    let start: number = 0;
    let i:number = 1;
    const pattern: String = toMatch;
    const stringLength: number = toMatch.length;
    let lps: number[] = [];
    lps[0] = 0
    while(i < stringLength){
        if(toMatch[start] === pattern[i]){
            start++;
            lps[i] = start;
            i++;
        } else { //Not mactch
            if(start === 0){
                lps[i] = 0 
                i++;
            } else {
                start = lps[start-1];
            }
        }

    }
    return lps;
}

async function KMP(pattern: string): Promise<foundQuestion[]>{
    let found: foundQuestion[] = [];
    const data = await getQnA();
    for(let i = 0; i < data.length; i++){
        let questionLength = data[i].question.length;
        let patternLength = pattern.length;
        let patternLower = pattern.toLowerCase();
        let questionLower = data[i].question.toLowerCase();
        let k = 0;
        let j = 0;
        let lps = LPS(pattern);
        let matches = 0;
    
        while(k < questionLength){ //As long as the text length is not 0
            if (patternLower[k] === questionLower[j]){
                k++;
                j++;
                matches++;
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
        if (matches > 0) {
            let percentage = (matches / questionLength) * 100;
            found.push({
                question: data[i].question,
                percentage: percentage,
            });
        }
    }
    return found;
}

KMP("Apa ibutkota indonesia?").then((result) => {
    console.log(result);
  }).catch((error) => {
    console.error(error);
  });
