"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boyerMoore = void 0;
function badCharacter(pattern) {
    var last = new Array(256).fill(-1);
    for (var i = 0; i < pattern.length; i++) {
        last[pattern.charCodeAt(i)] = i;
    }
    return last;
}
function boyerMoore(pattern, data) {
    var patternLower = pattern.toLowerCase();
    var patternLength = pattern.length; //m
    var last = badCharacter(patternLower);
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var textLower = data[i].question.toLowerCase(); //n
        var textLength = textLower.length;
        var s = 0;
        var matches = 0;
        while (matches <= textLength - patternLength) { /**Kalo lebih panjang otomtis ga masuk loop jadi langsung ke levenshtein */
            var j = patternLength - 1;
            while (j >= 0 && patternLower[j] == textLower[matches + j]) {
                j--;
            }
            if (j < 0) {
                if (matches + patternLength < textLength) {
                    matches += patternLength - last[textLower.charCodeAt(s + patternLength)];
                }
                else {
                    matches += 1;
                }
            }
            else {
                matches += Math.max(1, j - last[textLower.charCodeAt(s + j)]);
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
exports.boyerMoore = boyerMoore;
