const lowercaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const uppercaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const specialCharacters = [" ","!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\"", "]", "^", "_", "`" ,"{", "|", "}", "~"];
let lengthDropdown = document.getElementById("password-length");
let generatedPasswordBtn = document.getElementById("generate-password-btn");
let generatedPasswordOutput = document.getElementById("generated-password");
let copyPasswordBtn = document.getElementById("copy-password"); 

generatedPasswordBtn.onclick = function() {
    let length = lengthDropdown.value;
    let numberOfCheckboxesSelected = document.querySelectorAll('input[type="checkbox"]:checked').length;
    if (numberOfCheckboxesSelected != 0) {
        let minimumNumberOfCharactersForEachSet = Math.floor(length/numberOfCheckboxesSelected);
        let remainder = length % numberOfCheckboxesSelected;
        let lowercaseCheckBox =  document.getElementById("lowercase-letters");
        let uppercaseCheckBox = document.getElementById("uppercase-letters");
        let numberCheckBox = document.getElementById("numbers");
        let specialCheckBox  = document.getElementById("special-characters");
        let charactersInPassword =  [];
        if (lowercaseCheckBox.checked) {    
            for (let i = 0; i < minimumNumberOfCharactersForEachSet; i++) {
                charactersInPassword.push(lowercaseLetters[Math.floor(Math.random()*lowercaseLetters.length)]);
            }
        }
        if (uppercaseCheckBox.checked) {    
            for (let i = 0; i < minimumNumberOfCharactersForEachSet; i++) {
                charactersInPassword.push(uppercaseLetters[Math.floor(Math.random()*uppercaseLetters.length)]);
            }
        }
        if (numberCheckBox.checked) {    
            for (let i = 0; i < minimumNumberOfCharactersForEachSet; i++) {
                charactersInPassword.push(numbers[Math.floor(Math.random()*numbers.length)]);
            }        
        }
        if (specialCheckBox.checked) {    
            for (let i = 0; i < minimumNumberOfCharactersForEachSet; i++) {
                charactersInPassword.push(specialCharacters[Math.floor(Math.random()*specialCharacters.length)]);
            }
        }

        if (lowercaseCheckBox.checked && remainder > 0) {
            charactersInPassword.push(lowercaseLetters[Math.floor(Math.random()*lowercaseLetters.length)]);
            remainder --;
        } 
        
        if (uppercaseCheckBox.checked && remainder > 0) {
            charactersInPassword.push(uppercaseLetters[Math.floor(Math.random()*uppercaseLetters.length)]);
            remainder --;
        }
        
        if (numberCheckBox.checked && remainder > 0) {
            charactersInPassword.push(numbers[Math.floor(Math.random()*numbers.length)]);
            remainder --;
        } 

        if (specialCheckBox.checked && remainder > 0) {
            charactersInPassword.push(specialCharacters[Math.floor(Math.random()*specialCharacters.length)]);
            remainder --;
        }

        let password = "";
        while (charactersInPassword.length != 0) {
            let randomIndex = Math.floor(Math.random()*charactersInPassword.length);
            let randomCharacter = charactersInPassword[randomIndex];
            password = password + randomCharacter;
            charactersInPassword.splice(randomIndex, 1);
        }
        
        generatedPasswordOutput.value = password;
        console.log(password);
    } else {
        alert("Please select a checkbox before generating.");
    }
}

copyPasswordBtn.onclick = function() {
    generatedPasswordOutput.select();
    generatedPasswordOutput.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(generatedPasswordOutput.value);
}