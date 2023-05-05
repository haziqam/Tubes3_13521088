import { QuestionAndAnswer, foundQuestion } from "./interface";

export function levenshteinDistance(pattern: string, data: QuestionAndAnswer[]): QuestionAndAnswer[] {
    /**Measures the minimum number of single-character edits (insertion, deletions, or substitutions) */
    let match: QuestionAndAnswer[] = [];
    let patternLength = pattern.length;
    let patternLower = pattern.toLowerCase();
    let bestMatch: foundQuestion[] = [];

    for (let i = 0; i < data.length; i++) {
        let question = data[i].question.toLowerCase();
        let questionLength = question.length;
        const getDistance: number[][] = new Array(patternLength + 1);

        for (let j = 0; j <= patternLength; j++) {
            getDistance[j] = new Array(questionLength + 1);
            getDistance[j][0] = j;
        }
        for (let j = 0; j <= questionLength; j++) {
            getDistance[0][j] = j;
        }
        for (let j = 1; j <= questionLength; j++) {
            for (let k = 1; k <= patternLength; k++) {
                if (patternLower[k - 1] === question[j - 1]) {
                    getDistance[k][j] = getDistance[k - 1][j - 1];
                } else {
                    getDistance[k][j] = Math.min(getDistance[k - 1][j], getDistance[k][j - 1], getDistance[k - 1][j - 1]) + 1;
                }
            }
        }
        let percentage = (1 - getDistance[patternLength][questionLength] / Math.max(patternLength, questionLength)) * 100;
        if (percentage >= 80) {
            bestMatch.push({ question: data[i].id, percentage: percentage })
        }
    }

    bestMatch.sort((a, b) => b.percentage - a.percentage);
    for (let i = 0; i < bestMatch.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (data[j].id == bestMatch[i].question) {
                match.push({ id: data[j].id, question: data[j].question, answer: data[j].answer });
            }
        }
    }
    return match;
}
