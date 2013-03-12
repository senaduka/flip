# Utils

The utils directory contain Node.js Javascript files to create a word dictionary and generate a puzzle.

* import.js - Imports Princeton's WordNet open dictionary database files into a words.txt file
* batch.js - Creates a new puzzle.js file containing 999 word puzzles from the words.txt file created above.



# import.js instructions

Imports and cleans dictionary files provided by WordNet 3.0

Download dictionary file (look for "DATABASE FILES ONLY" package):

http://wordnet.princeton.edu/wordnet/download/current-version/

Decompress and copy data.adj, data.adv, data.noun and data.verb files 
to same directory as this script, then run:

	$ node import.js 

This will produce a words.txt dictionary file of 4-10 letter words 
to be used by batch.js puzzle generator.



# batch.js instructions

After creating a words.txt dictionary, run:

	$ node batch.js

This will create a puzzles.js file in the root directory of the project.