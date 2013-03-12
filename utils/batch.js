'use strict';
var fs = require('fs');

// List out the possible ways to divide a word into squares with 2 or 3 letters.
var squaresList = {};
squaresList[2] = [
    {wordlen: 4, squares: [2,2] },
    {wordlen: 5, squares: [2,3] },
    {wordlen: 5, squares: [3,2] },
    {wordlen: 6, squares: [3,3] }
];
squaresList[3] = [
    {wordlen: 6, squares: [2,2,2] },
    {wordlen: 7, squares: [2,2,3] },
    {wordlen: 7, squares: [2,3,2] },
    {wordlen: 7, squares: [3,2,2] },
    {wordlen: 8, squares: [3,3,2] },
    {wordlen: 8, squares: [3,2,3] },
    {wordlen: 8, squares: [2,3,3] },
    {wordlen: 9, squares: [3,3,3] },
];
squaresList[4] = [
    {wordlen: 8, squares: [2,2,2,2] },
    {wordlen: 9, squares: [2,2,2,3] },
    {wordlen: 9, squares: [2,2,3,2] },
    {wordlen: 9, squares: [2,3,2,2] },
    {wordlen: 9, squares: [3,2,2,2] },
    {wordlen: 10, squares: [3,3,2,2]},
    {wordlen: 10, squares: [3,2,3,2]},
    {wordlen: 10, squares: [3,2,2,3]},
    {wordlen: 10, squares: [2,2,3,3]},
    {wordlen: 10, squares: [2,3,2,3]}
];

// To fill 30 squares with
var squaresWordLengths = [
    [4, 4, 3, 3, 3, 3, 3, 3, 2, 2],
    [4, 4, 4, 3, 3, 3, 3, 2, 2, 2]
];




// pull in the word list, divide into lists by word length
var lines = fs.readFileSync('./words.txt').toString().split('\n');

var words = {};

for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if(line !== ''){
        var ln = line.split(' - ');
        var s = ln[0].length;
        if(!words[s]){
            words[s] = [];
        }
        words[s].push({
            word: ln[0],
            def : ln[1].charAt(0).toUpperCase() + ln[1].substr(1) + '.'
        });
        
    }
}

// generate puzzles
var puzzles = [];

for(var p = 1; p <= 1000; p++){

    var puzzle = {};
    var cwords = [];
    var csquares = [];

    var squaresNeeded = squaresWordLengths[Math.floor(Math.random() * squaresWordLengths.length)];

    for (var i = 0; i < squaresNeeded.length; i++) {

        var squareTypes = squaresList[squaresNeeded[i]];

        var squareType = squareTypes[Math.floor((Math.random() * squareTypes.length))];
        
        var wordlist = words[squareType.wordlen];
        
        var entry = wordlist[Math.floor((Math.random() * wordlist.length))];

        cwords.push({
            word: rot13(entry.word), 
            def: entry.def
        });

        var start = 0;

        var squares = squareType.squares;

        for (var x = 0; x < squares.length; x++) {
            var letnum = squares[x];

            csquares.push(entry.word.substr(start, letnum));
            
            start += letnum;
            
        }

    }

    cwords = shuffle(cwords);
    csquares = shuffle(csquares);

    puzzle['clues'] = cwords;
    puzzle['squares'] = csquares;

    puzzles.push(puzzle);

}

var json = JSON.stringify(puzzles);

var js = 'var puzzles = ' + json;

fs.writeFileSync('../puzzles.js', js);




function rot13(str) {
  return str.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  });
}
    
function shuffle(arr) {
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}


