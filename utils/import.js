/*
    import.js

    Imports and cleans dictionary files provided by WordNet 3.0

    Download dictionary file (look for "DATABASE FILES ONLY" package):

    http://wordnet.princeton.edu/wordnet/download/current-version/

    Decompress and copy data.adj, data.adv, data.noun and data.verb files 
    to same directory as this script, then run:
    
    $ node import.js 
    
    This will produce a words.txt dictionary file of 4-10 letter words 
    to be used by batch.js puzzle generator.

*/



var fs = require('fs');
var util = require('util');

var files = ['data.adj','data.adv','data.verb','data.noun'];

var text = '';

util.log('Starting import');

for(var f = 0; f < files.length; f++){
    text += fs.readFileSync('./' + files[f]).toString()
}

var lines = text.split('\n');

var wordList = [];
var defList = [];

var perc = Math.floor(lines.length / 100);

for (var i = 0; i < lines.length; i++) {
    if(lines[i].substr(0, 2) == '  '){
        continue;
    }

    if(i % perc == 0){
        util.log(Math.floor((i/lines.length) * 100) + '%');
    }

    var line = lines[i].trim();
    var ln = line.split('|');
    var wordPartStr = ln[0].trim();
    var wordPart = wordPartStr.split(' ');
    if(wordPart[4]){
        var word = wordPart[4].trim();
        var def = ln[1].trim();

        if(wordList.indexOf(word) !== -1 || word.charAt(0).toUpperCase() == word.charAt(0) || word.indexOf('\'') !== -1 || word.indexOf('-') !== -1 || word.indexOf('_') !== -1 || word.indexOf('(') !== -1){
            continue;
        }

        if(def.indexOf(';') !== -1){
            def = def.substr(0, def.indexOf(';'));
        }

        def = def.charAt(0).toUpperCase() + def.substr(1) + '.';

        wordList.push(word);
        defList.push(def);

    }
}

var words = '';

for(var x = 4; x < 11; x++){
    for(var w = 0; w < wordList.length; w++){
        if(wordList[w].length == x){
            //console.log(wordList[w] + ' - ' + defList[w]);
            words += wordList[w] + ' - ' + defList[w] + '\n';
        }
    }
}

fs.writeFileSync('./words.txt', words);


/*
var words = {};

for(var x = 4; x < 11; x++){
    var wordList = [];
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if(line !== ''){
            var ln = line.split('|');
            var word = ln[0].trim();
            var def = ln[1].trim();

            if(wordList.indexOf(word) !== -1){
                continue;
            }

            if(def.indexOf(';') !== -1){
                def = def.substr(0, def.indexOf(';'));
            }

            def = def.charAt(0).toUpperCase() + def.substr(1) + '.';
            var s = word.length;

            if(s == x){
                wordList.push(word);
                console.log(word + ' - ' + def);
            }
            
        }
    }

}

*/
