"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levenshteinDistance = void 0;
function levenshteinDistance(pattern, data) {
    /**Measures the minimum number of single-character edits (insertion, deletions, or substitutions) */
    var match = [];
    var patternLength = pattern.length;
    var patternLower = pattern.toLowerCase();
    var bestMatch = [];
    for (var i = 0; i < data.length; i++) {
        var question = data[i].question.toLowerCase();
        var questionLength = question.length;
        var getDistance = new Array(patternLength + 1);
        for (var j = 0; j <= patternLength; j++) {
            getDistance[j] = new Array(questionLength + 1);
            getDistance[j][0] = j;
        }
        for (var j = 0; j <= questionLength; j++) {
            getDistance[0][j] = j;
        }
        for (var j = 1; j <= questionLength; j++) {
            for (var k = 1; k <= patternLength; k++) {
                if (patternLower[k - 1] === question[j - 1]) {
                    getDistance[k][j] = getDistance[k - 1][j - 1];
                }
                else {
                    getDistance[k][j] = Math.min(getDistance[k - 1][j], getDistance[k][j - 1], getDistance[k - 1][j - 1]) + 1;
                }
            }
        }
        var percentage = (1 - getDistance[patternLength][questionLength] / Math.max(patternLength, questionLength)) * 100;
        if (percentage >= 50) {
            bestMatch.push({ question: data[i].id, percentage: percentage });
        }
    }
    bestMatch.sort(function (a, b) { return b.percentage - a.percentage; });
    for (var i = 0; i < bestMatch.length; i++) {
        for (var j = 0; j < data.length; j++) {
            if (data[j].id == bestMatch[i].question) {
                match.push({ id: data[j].id, question: data[j].question, answer: data[j].answer });
            }
        }
    }
    return match;
}
exports.levenshteinDistance = levenshteinDistance;
