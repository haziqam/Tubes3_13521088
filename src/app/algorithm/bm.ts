import { QuestionAndAnswer } from "./interface";

function badCharacter(pattern: string): number[] {
  const last = new Array(256).fill(-1);
  for (let i = 0; i < pattern.length; i++) {
    last[pattern.charCodeAt(i)] = i;
  }
  return last;
}

export function boyerMoore(pattern: string, data: QuestionAndAnswer[]): QuestionAndAnswer[] {
  const patternLower = pattern.toLowerCase();
  const patternLength = pattern.length; //m
  const last = badCharacter(patternLower);
  let result: QuestionAndAnswer[] = [];
  
  
  for (let i = 0; i < data.length; i++) {
    const textLower = data[i].question.toLowerCase(); //n
    const textLength = textLower.length;
    let s = 0;
    let matches = 0;

    while (s <= textLength - patternLength) {
      let j = patternLength - 1;

      while (j >= 0 && patternLower[j] == textLower[s + j]) {
        j--;
      }

      if (j < 0) {
        matches++;
        s += patternLength - last[textLower.charCodeAt(s + patternLength)];
      } else {
        s += Math.max(1, j - last[textLower.charCodeAt(s + j)]);
      }
    }

    if (matches == 1) {
      result.push({
        id: data[i].id,
        question: data[i].question,
        answer: data[i].answer
      });
    }
  }

  return result;
}



// boyerMoore("Apa IbuKota Indonesia?").then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.error(error);
// });