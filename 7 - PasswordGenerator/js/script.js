//создать input
//Добавить class к input
//добавить placeholder
//Сбросить стандартное поведение input
//Добавить обработчик по нажатию
//Добавить кнопку скопировать
//Добавить кнопку сгенерировать
//Создать функцию генерации пароля

const mainEl = document.querySelector(".main");
const passwordEl = document.createElement("input");

passwordEl.classList.add("password");

passwordEl.setAttribute("placeholder", "Сгенерировать пароль");
passwordEl.addEventListener("keypress", (e) => {
    e.preventDefault();
});

// passwordEl.addEventListener("focus", (e) => {
//     navigator.clipboard.writeText(passwordEl.value);
// });

const copyButton = document.createElement("button");
copyButton.classList.add("password-button");
copyButton.innerText = "Скопировать";
copyButton.addEventListener("click", () => {
    passwordEl.select();
    passwordEl.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(passwordEl.value);
});

const generateButton = document.createElement("button");
generateButton.classList.add("password-button");
generateButton.innerText = "Сгенерировать";
generateButton.addEventListener("click", () => {
    let password = generatePassword(12);
    passwordEl.value = password;
});


function generatePassword(passwordLength){
    const numberChars = "123456789";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const symbolChars = "~!@#$%^&*()-_+={}[]|;'<>,.?/";
    const allChars = numberChars + upperChars + lowerChars + symbolChars;
    let randomString = "";
    for(let i = 0; i < passwordLength; i++ ){
        let randomNumber = Math.floor(Math.random() * allChars.length);
        randomString += allChars[randomNumber];
    }

    return randomString;
};

mainEl.appendChild(passwordEl);
mainEl.appendChild(copyButton);
mainEl.appendChild(generateButton);