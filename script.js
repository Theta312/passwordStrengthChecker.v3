
const eye = document.querySelectorAll('.eye')[0];
const passwordInput = document.querySelector('.passwordInput');
const password = document.querySelector('#inputPassword5');
const userNameQuery = document.querySelector('#userNameQuery');
const checkButton = document.querySelector('.check-password')
const listGroupItem = document.querySelectorAll('.list-group-item');
const listGroupIcon = document.querySelectorAll('.icon');
const toRemove = document.querySelector('#toRemove');
const inputName = document.querySelector('#inputName');

// password requisite obj
let requesites = {
        length: false,
        lowerCaseChar: false,
        upperCaseChar: false,
        oneNum: false,
        oneSpeshChar: false,
        noEasyPassword: false,
    };



// eye logic
eye.src = './images/hide.png';
let visibleEye = false;


// event handlers
function visibleEyeFunction() {
    visibleEye = !visibleEye;
    if (visibleEye === false) {
        eye.src = './images/hide.png';
        password.type = 'password'
    } else {
        eye.src = './images/view.png';
        password.type = 'text';
    };
};

// -----password logic 

function onChangeName(e) {
    if (e.target.value) {
        passwordInput.classList.remove('hidden');
        toRemove.classList.remove('hidden');
        checkButton.classList.remove('hidden');
    } 
}

function onChangePassword() {
    let passwordValue = password.value;
    let str = passwordValue.split('');

    let special = ["!","@","#","$","%","^","&","*","(",")","_","+","-","=","[","]","{","}",";","'",":",",",".","<",">","/","?","`","~"];

    let easyPassword = ['user123', 'admin123', 'password123', 'test123', '12345', 'qwerty123'];

    // check password length
    if (str.length >= 8) {
         requesites.length = true;
    }


    if (str !== '') {
        if (str.length < 8) {
            listGroupItem[0].innerText = `Atleast ${8 - str.length} more. ⚠️`;
            listGroupItem[0].classList.add('rejected')
        } else if (str.length >= 8) {
            listGroupItem[0].innerText = `You have 8 Characters ✔️`;
            listGroupItem[0].classList.remove('rejected');
            listGroupItem[0].classList.add('accepted');
        }   
    }

    //checks everything else but easyPasswords and spech;
    for (let i = 0; i < str.length; i++) {
        if (str[i] >= 'a' && str[i] <= 'z') {
            requesites.lowerCaseChar = true;
        } 

        if (str[i] >= 'A' && str[i] <= 'Z') {
            requesites.upperCaseChar = true;
        } 

        if (!Number.isNaN(Number(str[i])) && str[i] !== ' ') {
            requesites.oneNum = true;
        }  
    };

    //checks for special character
    for (let spech of special) {
        if (str.includes(spech)) {
            requesites.oneSpeshChar = true;
        } 
    };

    //checks for easy password
    for (let char of easyPassword) {
        if (char !== str) {
            requesites.noEasyPassword = true;
        } 
    };

    let { upperCaseChar, lowerCaseChar, oneNum, oneSpeshChar, noEasyPassword } = requesites;
    console.log(upperCaseChar, lowerCaseChar, oneNum, oneSpeshChar, noEasyPassword)

    if (lowerCaseChar) {
        listGroupItem[1].innerText = `You have a lowerCase character ✔️`;
        listGroupItem[1].classList.remove('rejected');
        listGroupItem[1].classList.add('accepted');
        
    } else {
        listGroupItem[1].innerText = `Atleast 1 lowerCase Character ⚠️`;
        listGroupItem[1].classList.add('rejected')
        
    };

    if (upperCaseChar) {
        listGroupItem[2].innerText = `You have a upperCase character ✔️`;
        listGroupItem[2].classList.remove('rejected');
        listGroupItem[2].classList.add('accepted');
    } else {
        listGroupItem[2].innerText = `Atleast 1 upperCase Character ⚠️`;
        listGroupItem[2].classList.add('rejected');
        listGroupItem[2].classList.remove('accepted');
    }

    if (oneNum) {
        listGroupItem[3].innerText = `You have a digit ✔️`;
        listGroupItem[3].classList.remove('rejected');
        listGroupItem[3].classList.add('accepted');
    } else {
        listGroupItem[3].innerText = `Atleast 1 digit ⚠️`;
        listGroupItem[3].classList.add('rejected');
        listGroupItem[3].classList.remove('accepted');
    };

    if (oneSpeshChar) {
        listGroupItem[4].innerText = `You have a special character ✔️`;
        listGroupItem[4].classList.remove('rejected');
        listGroupItem[4].classList.add('accepted');
    } else {
        listGroupItem[4].innerText = `Atleast 1 special character ⚠️`;
        listGroupItem[4].classList.add('rejected');
        listGroupItem[4].classList.remove('accepted');
    };

    if (noEasyPassword) {
        listGroupItem[5].innerText = `password is not easy ✔️`;
        listGroupItem[5].classList.remove('rejected');
        listGroupItem[5].classList.add('accepted');
    } else {
        listGroupItem[5].innerText = `password is easy ⚠️`;
        listGroupItem[5].classList.add('rejected');
        listGroupItem[5].classList.remove('accepted');
    }

};

function checkPassword() {
    let passwordValue = password.value;
    console.log(passwordValue, requesites)
    let str = passwordValue.split('');
    let howStrong = [];

    console.log(str);
    //add style

    //password strength
    let values = Object.values(requesites);

    for (let value of values) {
        if (value) {
            howStrong.push(value);
        }
    };
    
    
    if (howStrong.length === 6) {
        toRemove.classList.remove('disabled');
    }
    
}

function makeAccount() {
    alert('Congrats on Making a Account')
}


eye.addEventListener('click', visibleEyeFunction);
checkButton.addEventListener('click', checkPassword);
password.addEventListener('input', onChangePassword );
toRemove.addEventListener('click', makeAccount);
inputName.addEventListener('input', onChangeName)