function getRandomLetter () {
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
	return getRandomItem(characters, prob);
}

function refreshText() {
	var input = document.getElementById("textInput").innerHTML;
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
	document.getElementById("textInput").innerHTML = output.join("");
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