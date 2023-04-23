import { foundQuestion } from "./interface";
import { getQnA } from "./question";

function badCharacter(pattern: string): number[] {
  const last = new Array(256).fill(-1);
  for (let i = 0; i < pattern.length; i++) {
    last[pattern.charCodeAt(i)] = i;
  }
  return last;
}

async function boyerMoore(pattern: string): Promise<foundQuestion[]> {
  const patternLower = pattern.toLowerCase();
  const patternLength = pattern.length; //m
  const last = badCharacter(patternLower);
  const data = await getQnA();
  const found: foundQuestion[] = [];
  let s = 0;

  for (let i = 0; i < data.length; i++) {
    const textLower = data[i].question.toLowerCase(); //n
    const textLength = textLower.length;
    let matches = 0;

    while (s <= textLength - patternLength) {
      let j = patternLength - 1;

      while (j >= 0 && patternLower[j] == textLower[s + j]) {
        j--;
      }

      if (j < 0) {
        // pattern found
        matches++;
        console.log(matches);
        s += patternLength - last[textLower.charCodeAt(s + patternLength)];
        console.log(s);
      } else {
        s += Math.max(1, j - last[textLower.charCodeAt(s + j)]);
        console.log(s);
      }
    }

    if (matches > 0) {
      const percentage = (matches / textLength) * 100;
      found.push({
        question: data[i].question,
        percentage: percentage,
      });
    }
  }

  return found;
}

boyerMoore("Apa ibutkota indonesia").then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error);
});


async function boyerMooreWithPercentage(pattern: string): Promise<foundQuestion[]> {
  const patternLower = pattern.toLowerCase();
  const patternLength = pattern.length;
  const last = badCharacter(patternLower);
  const data = await getQnA();
  const found: foundQuestion[] = [];

  for (const questionData of data) {
    const textLower = questionData.question.toLowerCase();
    const textLength = textLower.length;
    let i = patternLength - 1;
    let j = patternLength - 1;
    let matches = 0;

    while (i < textLength) {
      if (patternLower.charCodeAt(j) === textLower.charCodeAt(i)) {
        if (j === 0) {
            matches++;
            console.log(matches)
          i += patternLength;
          j = patternLength - 1;
        } else {
          i--;
          j--;
        }
      } else {
        const lo = last[textLower.charCodeAt(i)];
        i += patternLength - Math.min(j, 1 + lo);
        j = patternLength - 1;
      }
    }

    if (matches > 0) {
      const percentage = (matches / textLength) * 100;
      found.push({
        question: questionData.question,
        percentage: percentage,
      });
    }
  }

  return found;
}