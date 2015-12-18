var order = 0;

function clearText() {
	$( "#textOutput").text("");
}

// Runs the correct function based on dropdown
function generateText() {
	if (order==0) {
		generateText0();
	} else if (order==1) {
		generateText1();
	} else if (order==2) {
		generateText2();
	}
}

// Randomly generates text, no probability/weight
function generateText0 () {
	var input = $( "#textInput" ).val();
	var characters = [];
	var prob = [];
	for (var i = 0; i < input.length; i++) {
		var character = input.substr(i,1);
		if(characters.indexOf(character) == -1) {
			characters.unshift(character);
			prob.unshift(1/input.length);
		}
	}
	var output = [];
	for (var i = 0; i < input.length; i++) {
		output.push(getRandomItem(characters, prob));
	}
	$( "#textOutput").text(output.join(""));
}

// Randomly generates text with probability
function generateText1 () {
	var input = $( "#textInput" ).val();
	var characters = [];
	var prob = [];
	for (var i = 0; i < input.length; i++) {
		var character = input.substr(i,1);
		if(characters.indexOf(character) == -1) {
			characters.unshift(character);
			prob.unshift(1/input.length);
		} else {
			prob[characters.indexOf(character)] += (1/input.length);
		}
	}
	var output = [];
	for (var i = 0; i < input.length; i++) {
		output.push(getRandomItem(characters, prob));
	}
	$( "#textOutput").text(output.join(""));
}

// Randomly generates text with probability and reliance on previous character
function generateText2 () {
	var input = $( "#textInput" ).val();
	var characters = [];
	var prob = [];
	for (var i = 0; i < input.length-1; i++) {
		var character = input.substr(i,2);
		if(characters.indexOf(character) == -1) {
			characters.unshift(character);
			prob.unshift(1/input.length);
		} else {
			prob[characters.indexOf(character)] += (1/input.length);
		}
	}
	var output = [];
	for (var i = 0; i < input.length; i++) {
		output.push(getRandomItem(characters, prob));
	}
	$( "#textOutput").text(output.join(""));
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
};
 
function getRandomItem(array, prob) {
    var totalProb = prob.reduce(function(a, b) {
		return a + b;
	});
    var randomValue = getRandomNumber(0, totalProb);
    var probValue = 0;
    for (var i = 0; i < array.length; i++) {
        probValue += prob[i];
        if (randomValue <= probValue) {
            return array[i];
        }
    }
};

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