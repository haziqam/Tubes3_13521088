"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knuthMorrisPratt = void 0;
function LPS(toMatch) {
    var start = 0;
    var i = 1;
    var pattern = toMatch;
    var stringLength = toMatch.length;
    var lps = [];
    lps[0] = 0;
    while (i < stringLength) {
        if (toMatch[start] === pattern[i]) {
            start++;
            lps[i] = start;
            i++;
        }
        else { //Not match
            if (start === 0) {
                lps[i] = 0;
                i++;
            }
            else {
                start = lps[start - 1];
            }
        }
    }
    return lps;
}
function knuthMorrisPratt(pattern, data) {
    var found = [];
    for (var i = 0; i < data.length; i++) {
        var questionLength = data[i].question.length;
        var patternLength = pattern.length;
        var patternLower = pattern.toLowerCase();
        var questionLower = data[i].question.toLowerCase();
        var k = 0;
        var j = 0;
        var lps = LPS(pattern);
        var matches = 0;
        while (k < questionLength) {
            if (patternLower[k] === questionLower[j]) {
                k++;
                j++;
                matches++;
                if (j === patternLength) {
                    j = lps[j - 1];
                }
            }
            else {
                if (j != 0) {
                    j = lps[j - 1];
                }
                else {
                    k++;
                }
            }
        }
        var percentage = matches;
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
exports.knuthMorrisPratt = knuthMorrisPratt;
