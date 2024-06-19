// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {
      for (const pointValue in oldPointStructure) {
         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }
      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

console.log("Let's play some Scrabble!");

function initialPrompt() {
   return input.question("Enter a word to score: "); 
};

let newPointStructure = transform(oldPointStructure);


let simpleScorer = function (word) {
   word = word.toUpperCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      score = score + 1
   }
   return score;
};

let vowelBonusScorer = function (word) {
   word = word.toUpperCase();
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   let consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score = score + 3;
      } else {
         score = score + 1;
      }
   }
   return score;
};

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      for (item in newPointStructure) {
         if (item.includes(word[i])) {
            score = score + newPointStructure[item];
         }
      }
   }
   return score;
};

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use? ");


   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");

   let selectScoringAlgorithm = input.question("Enter 0, 1, or 2: ");
   let word = initialPrompt();
   if (Number(selectScoringAlgorithm) === 0) {
      return `score for '${word}': ${simpleScorer(word)}`;
   } else if (Number(selectScoringAlgorithm) === 1) {
      return `score for '${word}': ${vowelBonusScorer(word)}`;
   } else if (Number(selectScoringAlgorithm) === 2) {
      return `score for '${word}': ${scrabbleScorer(word)}`;
   } else {
      return selectScoringAlgorithm;
   }
}

function transform(obj) {
   let newObj = {};
   for (item in obj) {
      let keys = obj[item];
      for (let i = 0; i < keys.length; i++) {
         newObj[keys[i].toLowerCase()] = Number(item);
      }
   }
   return newObj;
};

function runProgram() {
   // initialPrompt();
   //console.log(oldScrabbleScorer(initialPrompt()));
   //console.log(simpleScorer(initialPrompt()));
   //console.log(vowelBonusScorer(initialPrompt()));
   console.log(scorerPrompt());
   // console.log(newPointStructure);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
