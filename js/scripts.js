// Seleçao de Elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");
     
 const openCloseGeneratorButton = document.querySelector("#open-generate-password")
 const generatePasswordContainer = document.querySelector("#generate-options")
 const lengthInput = document.querySelector("#length")
 const lettersInput = document.querySelector("#letters")
 const numbersInput = document.querySelector("#numbers")
 const symbolsInput = document.querySelector("#symbols")
 const copyPasswordButton = document.querySelector("#copy-password")

// Funções

const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  };
  
  const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  };
  
  const getNumber = () => {
    return Math.floor(Math.random() * 11).toString();
  };
  
  const getSymbol = () => {
    const symbols = "(){}[]=<>/,.!@#$%^&*-+";
    return symbols[Math.floor(Math.random() * symbols.length)];
  };
  
  const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    let password = "";
    const passwordLength = Math.min(+lengthInput.value, 18);
    const generators = [];

    if (lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase);
    }

    if (numbersInput.checked) {
        generators.push(getNumber);
    }

    if (symbolsInput.checked) {
        generators.push(getSymbol);
    }

    if (generators.length === 0) {
        return;
    }

    const maxIterations = Math.ceil(passwordLength / generators.length);

    for (let i = 0; i < maxIterations; i++) {
        generators.forEach(generator => {
            const randomValue = generator();
            if (password.length < passwordLength) {
                password += randomValue;
            }
        });
    }

    password = password.slice(0, passwordLength);

    
    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;
};



// Eventos
generatePasswordButton.addEventListener("click", () => {
    generatePassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    )
  });

 openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide")
 })


 copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault()
  
    const password = generatedPasswordElement.querySelector("h4").innerText

    navigator.clipboard.writeText(password).then(() => {
      
        copyPasswordButton.innerText = "Senha copiada!"

        setTimeout(() => {
         copyPasswordButton.innerText = "Copiar"
        }, 1000)
    })

 })
