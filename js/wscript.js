var order = 0;

function clearText() {
	$( "#textOutput").text("");
}

// Runs the correct function based on dropdown
function generateText() {
	var length = $("#length").val();
	if (length == "") {
		length = $("#textInput").val().split(" ").length;
	}
	if (order==0) {
		generateText0(length);
	} else if (order==1) {
		generateText1(length);
	} else if (order==2) {
		generateText2(length);
	} else if (order==3) {
		generateText3(length);
	}
}

function getRandomWord () {
	var input = $( "#textInput" ).val().split(" ");
	var words = [];
	var prob = [];
	for (var i = 0; i < input.length; i++) {
		var word = input[i];
		if(words.indexOf(word) == -1) {
			words.unshift(word);
			prob.unshift(1/input.length);
		} else {
			prob[words.indexOf(word)] += (1/input.length);
		}
	}
	return getRandomItem(words, prob);
}

// Randomly generates text with probability
function generateText0 (length) {
	var input = $( "#textInput" ).val().split(" ");
	var words = [];
	var prob = [];
	for (var i = 0; i < input.length; i++) {
		var word = input[i];
		if(words.indexOf(word) == -1) {
			words.unshift(word);
			prob.unshift(1/input.length);
		} else {
			prob[words.indexOf(word)] += (1/input.length);
		}
	}
	var output = [];
	for (var i = 0; i < length; i++) {
		output.push(getRandomItem(words, prob));
	}
	$( "#textOutput").text(output.join(" "));
}

// Randomly generates text with probability and reliance on previous character
function generateText1 (length) {
	var input = $( "#textInput" ).val().split(" ");
	var words = [];
	var prob = [];
	for (var i = 0; i < input.length-1; i++) {
		var word = input[i];
		if(words.indexOf(word) == -1) {
			words.unshift(word);
			prob.unshift(1/input.length);
		} else {
			prob[words.indexOf(word)] += (1/input.length);
		}
	}
	var output = [getRandomWord()];
	for (var i = 0; i < length-1; i++) {
		var word = input[i];
		var subWords = [];
		var subProb = [];
		for (var j = 0; j < words.length; j++) {
			if (words[j] == word) {
				subWords.push(words[j]);
				subProb.push(prob[j]);
			}
		}
		word = getRandomItem(subWords, subProb);
		output.push(word);
	}
	$( "#textOutput").text(output.join(" "));
}

// Randomly generates text with probability and reliance on two previous characters
// function generateText1 (length) {
// 	var input = $( "#textInput" ).val().split(" ");
// 	var words = [];
// 	var prob = [];
// 	for (var i = 0; i < input.length-2; i++) {
// 		var word = input[i];
// 		if(words.indexOf(word) == -1) {
// 			words.unshift(word);
// 			prob.unshift(1/input.length);
// 		} else {
// 			prob[words.indexOf(word)] += (1/input.length);
// 		}
// 	}
// 	var output = [getRandomWord(),getRandomWord()];
// 	for (var i = 0; i < length-2; i++) {
// 		var word = input[i] + " " + input[i-1];
// 		var tword = words[i] + " " + words[i-1];
// 		var subWords = [];
// 		var subProb = [];
// 		for (var j = 0; j < words.length; j++) {
// 			if (tword == word) {
// 				subWords.push(words[j]);
// 				subProb.push(prob[j]);
// 			}
// 		}
// 		word = getRandomItem(subWords, subProb);
// 		output.push(word);
// 	}
// 	$( "#textOutput").text(output.join(" "));
// }

// Randomly generates text with probability and reliance on three previous characters
function generateText3 (length) {
	var input = $( "#textInput" ).val();
	var characters = [];
	var prob = [];
	for (var i = 0; i < input.length-3; i++) {
		var character = input.substr(i,4);
		if(characters.indexOf(character) == -1) {
			characters.unshift(character);
			prob.unshift(1/input.length);
		} else {
			prob[characters.indexOf(character)] += (1/input.length);
		}
	}
	var output = [getRandomLetter(),getRandomLetter(),getRandomLetter()];
	for (var i = 0; i < length-3; i++) {
		var character = input.substr(i,3);
		var subCharacters = [];
		var subProb = [];
		for (var j = 0; j < characters.length; j++) {
			if (characters[j].substr(0,3) == character) {
				subCharacters.push(characters[j].substr(3,1));
				subProb.push(prob[j]);
			}
		}
		character = getRandomItem(subCharacters, subProb);
		output.push(character);
	}
	$( "#textOutput").text(output.join(""));
}

function add(a, b) {
    return a + b;
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
};
 
function getRandomItem(array, prob) {
    var totalProb = prob.reduce(add, 0);
    var randomValue = getRandomNumber(0, totalProb);
    var probValue = 0;
    for (var i = 0; i < array.length; i++) {
        probValue += prob[i];
        if (randomValue <= probValue) {
			return array[i];
        }
    }
}

function setOrder0 () {
	$( "#dropdown").text("0th Order \u25BC");
	order = 0;
}

function setOrder1 () {
	$( "#dropdown").text("1st Order \u25BC");
	order = 1;
}

function setOrder2 () {
	$( "#dropdown").text("2nd Order \u25BC");
	order = 2;
}

function setOrder3 () {
	$( "#dropdown").text("3rd Order \u25BC");
	order = 3;
}