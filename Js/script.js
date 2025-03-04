//utility functions //
function textAreaValue(classname) {
    return $(classname).val();
}
function textAreaValueToLowerCase(word) {
    return word.toLowerCase();
}

function textAreaValueToArray(word) {
    return word.split(" ");
}
function offensiveWord() {
    let bad = ["bad", "bitch", "stupid", "motherfucker", "dick", "pussy", "cunt", "nonsense", "crazy", "fool", "foolish", "mad", "idiot", "bastard", "idiots", "nincompoop", "scallywag", "mumu", "buffon", "dunce", "oaf", "fuck", "idiotic", "rubbish", "bastards", "ode"];
    return bad
}

function noInputtedWord() {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i].trim().length === 0) {
            return true;
        }
    }
    return false;
}

//BUSINESS-LOGIC//

function wordCounter(word) {
    let wordCount = 0;
    let wordArray = textAreaValueToArray(textAreaValue(word));
    wordArray.forEach(function (element) {
        if (word !== "" && element !== "" && !Number(element)) {
            wordCount++;
        }
    })
    return wordCount;
}

function offensiveWordCount(text) {
    let curseWords = offensiveWord();
    let wordArray = textAreaValueToArray(textAreaValueToLowerCase(textAreaValue(text)));
    let wordCount = 0;
    curseWords.forEach(function (element) {
        wordArray.forEach(function (text) {
            if (text === element) {
                wordCount++;
            }
        })
    })
    return wordCount;

}

function maskedoffensiveWord(word) {
    let curseWords = offensiveWord();
    let wordArray = textAreaValueToArray(textAreaValueToLowerCase(textAreaValue(word)));
    for (let i = 0; i < wordArray.length; i++) {
        if (curseWords.includes(wordArray[i])) {
            let masked = wordArray[i][0] + "*".repeat(wordArray[i].length - 2) + wordArray[i][wordArray[i].length - 1];
            wordArray[i] = masked;

        }
    }   

    return wordArray.join(" ");
}


function totalOccurences(word, search) {
    let wordCount = 0;
    let wordArray = textAreaValueToArray(textAreaValueToLowerCase(textAreaValue(word)));
    let wordArray2 = textAreaValueToArray(textAreaValueToLowerCase(textAreaValue(search)));
    wordArray.forEach(function (element) {
        wordArray2.forEach(function (e) {
            if (e === element && e !== "" && element !== "" && !Number(element)) {
                wordCount++;
            }
        })
    })
    return wordCount;
}


function highlightMatchedWords(searchWord, textArea) {
    if (noInputtedWord(searchWord) || noInputtedWord(textArea)) {
        return "";
    }

    let words = textAreaValueToLowerCase(textAreaValue(textArea));
    let search = textAreaValueToLowerCase(textAreaValue(searchWord));
    let wordArray = textAreaValueToArray(words);
    let highlightedText = "<p class='textal'>";

    wordArray.forEach(function (word, index) {
        if (word === search) {
            highlightedText += `<b style='background-color: yellow; color: black;'>${word}</b>`;
        } else {
            highlightedText += word;
        }
        if (index !== wordArray.length - 1) {
            highlightedText += " ";
        }
    });

    highlightedText += "</p>";
    return highlightedText;
}



// function mostCommonWords(word) {
//     let wordArray = textAreaValueToArray(textAreaValueToLowerCase(textAreaValue(word)));
//     let newWords = [...new Set(wordArray)];
//     let topWords = [];

//     newWords.forEach(function (element) {
//         let count = 0
//         wordArray.forEach(function (e) {
//             if (element === e) {
//                 count++;
//             }
        })
        if (element !== "" && !Number(element)) {
            topWords.push([element, count])
        }
    });
    topWords.sort((a, b) => b[1] - a[1]);
    let top3Words = topWords.slice(0, 3);
    let new2 = "<ul>";

    top3Words.forEach(function (top3Word) {
        new2 += "<li>" + top3Word[0] + " : " + "<b style = 'color:#14213d;'>" + top3Word[1] + "</b>" + "</li>";
    });
    new2 += "</ul>"
    return new2
}



//USER INTERPHASE//

$(document).ready(function () {
    $("#areatext").on("input", function () {
        let areaValue = "#areatext";
        let maskedText = maskedoffensiveWord(areaValue);
        $("#writer").html(maskedText);
        $("#countWord").text(wordCounter(areaValue));
        $("#Offensive").text(offensiveWordCount(areaValue));
        $("#Topwords-list").html(mostCommonWords(areaValue));
    });
    
    $("#input").on("input", function () {
        $("#writer").html(highlightMatchedWords("#input", "#areatext"));
        $("#Ocurred-no").text(totalOccurences("#input", "#areatext"));
    });

    $(".clearbtn").click(function () {
        $("#areatext").val("");
        $("#input").val("");
        $("#writer").text("");
        $("#countWord").text("0");
        $("#Offensive").text("0");
        $("#Ocurred-no").text("0");
        $("#Topwords-list").html("");
        $(".result").html("");
    });
});
