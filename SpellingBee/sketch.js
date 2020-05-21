// constants
const TILE_SIZE = 60;
const TILE_MARGIN = 10;

let otherTiles = [];

// will hold 'dictionary' of words
let svnLttrWrds = []; // only has words with unique letters
let sixLttrWrds = [];
let fivLttrWrds = [];
let fourLttrWrds = [];
let svnLttrWrdsWithDupes = []; // has words with duplicate letters

// reformat data to be array of strings
SixLetterWords.forEach(dict => sixLttrWrds.push(dict["word"]));
FiveLetterWords.forEach(dict => fivLttrWrds.push(dict["word"]));
FourLetterWords.forEach(dict => fourLttrWrds.push(dict["word"]));
SevenLetterWords.forEach(dict => svnLttrWrdsWithDupes.push(dict["word"]));

let word; // original 7-letter word (i.e. Pangram)
let centerLetter, otherLetters; // split up word into center letter and the rest of the letters

let userScore = 0;
let foundWords = []; // list of 'valid' words found by user

// html elements
const inputField = document.getElementById("userInput");
const ul = document.getElementById("userWords");
let wordAmmount = document.getElementById("wordAmmount");

let font;

function preload() {
  font = loadFont("../libraries/LMB.otf");
}

// p5.js setup function
// - grabs random word
// - picks center letter at random from word
// - creates letter tiles accordingly
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);

  svnLttrWrds = svnLttrWrdsWithDupes.filter(wrd => hasUniqueLetters(wrd));

  word = random(svnLttrWrds);
  console.log(word);

  let r = Math.floor(random(0, 7));
  centerLetter = word[r];

  otherLetters =
    word.slice(0, word.indexOf(centerLetter)) +
    word.slice(word.indexOf(centerLetter) + 1, word.length);

  otherLetters = scramble(otherLetters);

  tilePositions = [
    {
      x: (width - TILE_SIZE) / 2,
      y: (height - TILE_SIZE) / 2 - (TILE_SIZE * 3) / 1.75 - TILE_MARGIN,
    },
    {
      x: width / 2 - TILE_SIZE * 2 - TILE_MARGIN,
      y: height / 2 - TILE_SIZE * 2 + TILE_MARGIN * 3.5,
    },
    {
      x: width / 2 - TILE_SIZE * 2 - TILE_MARGIN,
      y: height / 2 + TILE_SIZE / 2,
    },
    {
      x: (width - TILE_SIZE) / 2,
      y: (height - TILE_SIZE) / 2 + (TILE_SIZE * 3) / 1.75 + TILE_MARGIN,
    },
    {
      x: width / 2 + TILE_SIZE + TILE_MARGIN,
      y: height / 2 - TILE_SIZE * 2 + TILE_MARGIN * 3.5,
    },
    { x: width / 2 + TILE_SIZE + TILE_MARGIN, y: height / 2 + TILE_SIZE / 2 },
  ];

  new Tile(
    (width - TILE_SIZE) / 2,
    (height - TILE_SIZE) / 2,
    centerLetter,
    true
  );

  for (let i = 0; i < otherLetters.length; i++) {
    otherTiles[i] = new Tile(
      tilePositions[i]["x"],
      tilePositions[i]["y"],
      otherLetters[i],
      false
    );
  }

  let combos = combinations(word);

  for (let i = 0; i < combos.length; i++) {
    let perms = permut(combos[i]);

    for (let j = 0; j < perms.length; j++) {
      submitGuess(perms[j]);
    }
  }
}

// called on "ENTER" key press

//    - checks to see if the user input is a valid word
//          - a word is valid if :
//                - it's length is > 3
//                - it only contains the allowed letters
//                - it contains the center letter
//                - it wasn't already found by the user
//                - it's a word found in our dictionary data

//    - if the input word IS valid, we add the word to the found words array,
//      we update the user's score, and we update the appropriate html elements accordingly

//    - if the input word IS NOT valid, we log an informative message (as to why the word is not valid) //      to the user and break out of this function
function submitGuess(str) {
  let isLongEnough = str.length > 3;

  let containsCenter = str.indexOf(centerLetter) !== -1;

  let isAWord =
    svnLttrWrdsWithDupes.includes(str) ||
    sixLttrWrds.includes(str) ||
    fivLttrWrds.includes(str) ||
    fourLttrWrds.includes(str);

  let alreadyGuessed = foundWords.includes(str);

  if (isLongEnough) {
    if (noBadLetters(str)) {
      if (containsCenter) {
        if (!alreadyGuessed) {
          if (isAWord) {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(str));
            ul.appendChild(li);

            let inc = 0;

            if (str.length == 4) {
              userScore += 1;
              inc += 1;
            } else if (isPangram(str)) {
              userScore += 14;
              inc += 14;
            } else {
              userScore += str.length;
              inc += str.length;
            }

            foundWords.push(str);

            wordAmmount.innerHTML = `You have ${foundWords.length} words. Your score is ${userScore}.`;

            let alertWindow = document.getElementById("alertWindow");

            let msg = document.createElement("p");

            msg.innerHTML = `+ ${inc}`;

            msg.classList.add("hideMe");
            msg.classList.add("fade-out");

            alertWindow.appendChild(msg);

            return;
          }
          console.log("Not in word list");
          return;
        }
        console.log("Already Found");
        return;
      }
      console.log("Missing center letter");
      return;
    }
    console.log("Bad letters");
    return;
  }
  console.log("Word is too short");
  return;
}

// key event handler
//   - on "ENTER", submit user input
//   - on "SPACE BAR", shuffle letter positions
function keyPressed() {
  switch (key) {
    case "Enter":
      submitGuess(inputField.value);
      inputField.value = "";
      break;
    case " ":
      shuffleArray(tilePositions);
      for (let i = 0; i < otherLetters.length; i++) {
        new Tile(
          tilePositions[i]["x"],
          tilePositions[i]["y"],
          otherLetters[i],
          false
        );
      }
  }
}
inputField.focus();
// inputField.select();

function permut(string) {
  if (string.length < 2) return string; // This is our break condition

  var permutations = []; // This array will hold our permutations
  for (var i = 0; i < string.length; i++) {
    var char = string[i];

    // Cause we don't want any duplicates:
    if (string.indexOf(char) != i)
      // if char was used already
      continue; // skip it this time

    var remainingString =
      string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS

    for (var subPermutation of permut(remainingString))
      permutations.push(char + subPermutation);
  }
  return permutations;
}

var combinations = function (string) {
  var result = [];

  var loop = function (start, depth, prefix) {
    for (var i = start; i < string.length; i++) {
      var next = prefix + string[i];
      if (depth > 0) loop(i + 1, depth - 1, next);
      else result.push(next);
    }
  };

  for (var i = 0; i < string.length; i++) {
    loop(0, i, "");
  }

  for (c in result) {
    c += centerLetter;
  }

  return result;
};
