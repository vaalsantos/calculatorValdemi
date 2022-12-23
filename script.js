// GLOBAL DATA CAPTURE
const body = document.querySelector("body");
const response = document.getElementById("response");
const listButtons = document.querySelectorAll("button");

// GLOBAL KEY LIST
const numericKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operatingKeys = ["+", "-", "/", "÷", "*", "."];
const functionKeys = ["=", "Backspace", "Delete"];
const allKeys = ["Delete", "Backspace", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "0", ".", "="];

// FLOATING KEY IDENTIFIER
body.addEventListener("keydown", (keyBorardEvent) => {
    let key = keyBorardEvent.key;
    if(numericKeys.includes(key) || operatingKeys.includes(key)){
        adjustIndex(key);
        if(key == "/"){key = "÷";}
        controlKeyPressed(key);
    } else if(functionKeys[0] == key){
        adjustIndex(key);
        calculateResult();
    } else if(functionKeys[1] == key){
        adjustIndex(key);
        removeCharacter();
    } else if(functionKeys[2] == key){
        adjustIndex(key);
        removeAllCharacters();
    }
});

// CONTROL CONDITIONS FOR ADDING THE CHARACTER
function controlKeyPressed(key, index){
    checkIndexValue(index);
    if(response.innerText.length == 13 && key != "="){
        return;
    } else if(operatingKeys.includes(response.innerText.slice(-1)) && operatingKeys.includes(key)){
        return;
    } else if(response.innerText == "" && key == "÷"){
        return;
    } else if(response.innerText == "" && key == "*"){
        return;
    }else if(key != "="){
        response.innerText += key;
    } else{
        calculateResult();
    }
}

// REMOVE ALL CHARACTERS
function removeAllCharacters(index){
    checkIndexValue(index);
    if(response.innerText == ""){
        response.innerText = "0";
    } else{
        response.innerHTML = "";
    }
}

// REMOVE ONE CHARACTER AT A TIME
function removeCharacter(index){
    checkIndexValue(index);
    response.innerText = response.innerText.slice(0, -1);
}

// CHECK IF THE INDEX IS NOT UNDEFINED
function checkIndexValue(index){
    if(index != undefined){
        activateAnimation(index);
    }
}

// ADJUST THE FLOATING KEYS INDEX
function adjustIndex(key){
    const indice = allKeys.indexOf(key);
    activateAnimation(indice);
}

// ENABLE AND DISABLE ANIMATION
function activateAnimation(index){
    listButtons[index].classList.toggle("active");
    setTimeout(() => {
        listButtons[index].classList.toggle("active");
    }, 200);
}

// CALCULATES FINAL RESULT AND IDENTIFIES ERRORS
function calculateResult(){
    const expression = response.innerText.replace(/÷/g, "/");

    if(response.innerText == ""){
        return;
    }

    try{
        let finalResult = parseFloat(eval(expression)).toFixed(6);

        while(String(finalResult).slice(-1) == "0"){
            finalResult = finalResult.slice(0, -1);
        }

        while(String(finalResult).slice(-1) == "."){
            finalResult = finalResult.slice(0, -1);
        }

        response.innerText = finalResult;
    } catch{
        response.innerText = "UNDEFINED";
        setTimeout(() => {
            response.innerText = "0";
        }, 1000);
    }
}