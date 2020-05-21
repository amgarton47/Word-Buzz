# A recreation of the 'Spelling Bee', a NYT online word puzzle game.

## Rules:

- The game starts off with seven letter tiles, one of which is the 'center letter' (is yellow while the rest are colored black gray)
- The objective of the game is to find as many valid words as possible, racking up points based on the length of the word
- A word is considered valid based on these rules:
  - it is four or more letters long
  - it contains letters only listed among the 7 tiles
  - it must contain the center letter
  - it is an actual word (according to our dictionary data)

Note that letters can be used more than once and each puzzle includes at least one pangram (a word that contains at least one instance of each of the 7 letters).

## Scoring:

A player is awarded points based on the following:

- four letter words are awarded 1 point
- pangram words (words that utilize each of the seven letter at least once) are awarded 14 points
- any other word receives points equal to the word length

## About

This game was based off of the NYT Spelling Bee which can be found here: https://www.nytimes.com/puzzles/spelling-bee

The graphics in this project were programmed using p5.js : https://p5js.org/

This solo project was created out of my love for the spelling bee game and to give me something to do during this crazy quarantine era!

The dictionary of words used in this project came from the Word Game Dictionary website: https://www.wordgamedictionary.com/
