// HELPER FUNCTIONS *+*+*+*+*+*+*+*+*+*++*+*+*+*+*+

// returns false if user input uses letters outside of letter list
// returns true if user only uses allowed letters
function noBadLetters(str) {
  for (let i = 0; i < str.length; i++) {
    if (word.indexOf(str[i]) == -1) {
      return false;
    }
  }

  return true;
}

// creates the hexagon shapes for the tiles
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// returns true if user input uses all seven letters at least once
// returns false otherwise
function isPangram(str) {
  for (let i = 0; i < word.length; i++) {
    if (str.indexOf(word[i]) === -1) {
      return false;
    }
  }
  return true;
}

// randomizes the order of letters in a given word
function scramble(str) {
  var a = str.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}

// randomizes the order of elements in a given array
function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

// returns true if given str has all unique letters
// returns false if otherwise
function hasUniqueLetters(str) {
  let pastLetters = [];

  for (let i = 0; i < str.length; i++) {
    if (pastLetters.includes(str[i])) {
      return false;
    }
    pastLetters.push(str[i]);
  }

  return true;
}

// HELPER FUNCTIONS *+*+*+*+*+*+*+*+*+*++*+*+*+*+*+
