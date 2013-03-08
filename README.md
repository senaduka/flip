# [Flip.io Puzzle](http://flip.io)

An HTML5 puzzle app, and puzzle file generator. MIT licensed. Code is running at http://flip.io

Here's a quick rundown of the files:

* app.js - Main logic for the HTML5 GUI
* batch.js - Node.js batch program which generates a new puzzle.js file containing 1000 puzzles.
* flip.manifest_ - unused, but ready to be used for offline Web App
* index.html - HTML5 page with templates using Underscore templating (ejs).
* main.css - style for GUI
* LICENSE - MIT license for project
* puzzles.js - generated JSON list of puzzles using batch
* words.txt - dictionary list of 23,570 words used to generate puzzle.js
* fonts/ - offline cache of web fonts used in various formats (included for convenience)
* lib/ - directory containing third party libraries (included for convenience): backbone, lodash, jquery, normalize.css
* media/ - folder for sound files and images
