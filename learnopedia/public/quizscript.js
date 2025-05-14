// const form = document.getElementById('form');
// const username = document.getElementById('username');
// const email = document.getElementById('email');
// const password = document.getElementById('password');
// const password2 = document.getElementById('password2');

// form.addEventListener('submit',e =>
//     {
//         e.preventDefault();
//         validateInputs();
//     }

// );
// const setError  = (element,message) =>
//     {
//         const inputControl = element.parentElement;
//         const errorDisplay = inputControl.querySelector('.error');
//         errorDisplay.innerText = message;
//         inputControl.classlist.add('error');
//         inputControl.classlist.remove('success');
//     }
// const setSuccess = element  =>
//     {
//         const inputControl = element.parentElement;
//         const errorDisplay = inputControl.querySelector('.error');
//         errorDisplay.innerText = '';
//         inputControl.classlist.add('success');
//         inputControl.classlist.remove('error');
//     };
//     const isvalidEmail = email =>
//         {
//             const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//             return re.test(String(email).toLowerCase());
//         }
// const validateInputs = () =>
//     {
//         const usernameValue = username.value.trim();
//         const emailValue = email.value.trim();
//         const passwordValue = password.value.trim();
//         const password2Value = password2.value.trim();

//         if(usernameValue === '')
//             {
//                 setError(username,'Username is required');
//             } else
//             {
//                 setSuccess(username);
//             }
//         if(emailValue === '')
//             {
//                 setError(email,'Email is required');
//             // }else if(!isvalidEmail(emailValue))
//             // {
//             //     setError(email,'Provide a valid email address');
//             // }else
//             // {
//             //     setSuccess(email);
//             // 
// }
//         if(passwordValue === '')
//             {
//                 setError(password,'Password is required');
//             // }else if(passwordValue.length()<8)
//             //     {
//             //         setError(password,'Password must be at least 8 characters long');
//             //     }else
//             //     {
//             //         setSuccess(password);
//             //     
// }
//        if(password2 === '')
//         {
//             setError(password2,'Please confirm your password');   
//         // }else if(password2Value !== passwordValue)
//         //     {
//         //         setError(password2,"password doesn't match")
//         //     }
//         //     else
//         //     {
//         //         setSuccess(password2);
//         //     
// }
//     };

const startbtn = document.querySelector('.start-btn');
const popupinfo = document.querySelector('.popup-info');
const exitbtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const conbtn = document.querySelector('.con-btn');
const quizsection = document.querySelector('.quiz-section');
const quizbox = document.querySelector('.quiz-box');
const ressultbox = document.querySelector('.result-box');
const tryagainbutton = document.querySelector('.tryagain-btn');
const gohomebtn = document.querySelector('.gohome-btn');
const timecount = document.querySelector('.timing');
const none = document.querySelector('.option');
const downloadCertificateBtn = document.querySelector('.download-certificate-btn'); // Certificate button

let studentName = ''; // Store the student's name
let userscore = 0; // Store the user's score

// Start quiz flow
startbtn.onclick = () => {
    popupinfo.classList.add('active');
    main.classList.add('active');
};

// Exit the quiz flow
exitbtn.onclick = () => {
    popupinfo.classList.remove('active');
    main.classList.remove('active');
};

// Start quiz after confirming
conbtn.onclick = () => {
    studentName = prompt("Enter your name:"); // Ask for student's name
    quizsection.classList.add('active');
    popupinfo.classList.remove('active');
    main.classList.remove('active');
    quizbox.classList.add('active');
    showquestion(0);
    questioncounter(1);
    starttime(15);
};

// Retry quiz
tryagainbutton.onclick = () => {
    quizbox.classList.add('active');
    nextbtn.classList.remove('active');
    ressultbox.classList.remove('active');
    quescount = 0;
    quesnumber = 1;
    userscore = 0;
    showquestion(quescount);
    questioncounter(quesnumber);
    headerscore();
};

// Go back to home page
gohomebtn.onclick = () => {
    quizsection.classList.remove('active');
    nextbtn.classList.remove('active');
    ressultbox.classList.remove('active');
    quescount = 0;
    quesnumber = 1;
    userscore = 0;
    showquestion(quescount);
    questioncounter(quesnumber);
    headerscore();
};

let quescount = 0;
let quesnumber = 1;
let time_count;
let timevalue = 15;
const nextbtn = document.querySelector('.next-btn');
nextbtn.onclick = () => {
    if (quescount < question.length - 1) {
        quescount++;
        showquestion(quescount);
        nextbtn.classList.remove('active');
        clearInterval(time_count);
        starttime(timevalue);
    } else {
        showresult();
    }

    if (quesnumber < question.length) {
        quesnumber++;
        questioncounter(quesnumber);
    }
};

// Show the current question
const optionlist = document.querySelector('.option-list');
function showquestion(index) {
    const questiontext = document.querySelector('.question-text');
    questiontext.textContent = `${question[index].numb}. ${question[index].question}`;
    let optiontag = `<div class="option">${question[index].options[0]}<span></span></div>
    <div class="option">${question[index].options[1]}<span></span></div>
    <div class="option">${question[index].options[2]}<span></span></div>
    <div class="option">${question[index].options[3]}<span></span></div>`;
    optionlist.innerHTML = optiontag;
    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionselected(this)');
    }
}

// Update question counter
function questioncounter(index) {
    const questiontotal = document.querySelector('.total');
    questiontotal.textContent = `${index} of ${question.length} Questions`;
}

// Option selected handler
function optionselected(answer) {
    let useranswer = answer.textContent;
    let correctanswer = question[quescount].answer;
    let alloption = optionlist.children.length;
    clearInterval(time_count);

    if (useranswer == correctanswer) {
        answer.classList.add('correct');
        userscore += 1;
        headerscore();
    } else {
        answer.classList.add('incorrect');
        for (let i = 0; i < alloption; i++) {
            if (optionlist.children[i].textContent == correctanswer) {
                optionlist.children[i].setAttribute('class', 'option correct');
            }
        }
    }
    for (let i = 0; i < alloption; i++) {
        optionlist.children[i].classList.add('disabled');
    }
    nextbtn.classList.add('active');
}

// Update score in header
function headerscore() {
    const headerscoretext = document.querySelector('.header-score');
    headerscoretext.textContent = `Score : ${userscore} / ${question.length}`;
}

// Show results after quiz
function showresult() {
    quizbox.classList.remove('active');
    ressultbox.classList.add('active');
    const scoretext = document.querySelector('.score-text');
    scoretext.textContent = `Your Score: ${userscore} out of ${question.length}`;
    const passtext = document.querySelector('.pf');
    if (userscore >= 3) {
        passtext.textContent = 'Passed';
        downloadCertificateBtn.classList.remove('hidden'); // Show certificate button
    } else {
        passtext.textContent = 'Failed';
        downloadCertificateBtn.classList.add('hidden'); // Hide certificate button
    }

    const circularprogress = document.querySelector('.circular-progress');
    const progressvalue = document.querySelector('.progress-value');
    let progressstartvalue = -1;
    let progressendvalue = (userscore * 100) / question.length;

    let speed = 20;
    let progress = setInterval(() => {
        progressstartvalue++;
        progressvalue.textContent = `${progressstartvalue}%`;
        circularprogress.style.background = `conic-gradient(#c40094 ${progressstartvalue * 3.6}deg , rgba(255,255,255,0.1) 0deg)`;
        if (progressstartvalue == progressendvalue) {
            clearInterval(progress);
        }
    }, speed);
}

// Timer function
function starttime(time) {
    time_count = setInterval(timer, 1000);
    function timer() {
        timecount.textContent = `: ${time}s Left`;
        time--;
        if (time < 10) {
            timecount.textContent = `: 0${time}s Left`;
        }
        if (time == 0) {
            clearInterval(time_count);
        }
    }
}

// Certificate download function
downloadCertificateBtn.onclick = () => {
    if (userscore >= 3) {
        generateCertificatePDF();
    } else {
        alert('You need to pass the quiz to download the certificate!');
    }
};

// Function to generate the certificate PDF
function generateCertificatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Certificate content
    const title = 'Certificate of Completion';
    const name = `Student Name: ${studentName}`; // Use the dynamic student name
    const score = `Score: ${userscore} out of ${question.length}`;
    const date = `Date: ${new Date().toLocaleDateString()}`;
    const appreciation = 'Congratulations on passing the quiz!';

    // Set the background color
    doc.setFillColor(255, 223, 186); // Light yellow color
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F'); // Fill the background

    // Set up the title
    doc.setFontSize(22);
    doc.setTextColor(0); // Black text color
    doc.text(title, 105, 50, null, null, 'center'); // Title at the top

    // Set up the student's name
    doc.setFontSize(16);
    doc.text(name, 105, 70, null, null, 'center'); // Student name below the title

    // Set up the score
    doc.text(score, 105, 90, null, null, 'center'); // Score display

    // Set up the date
    doc.text(date, 105, 110, null, null, 'center'); // Date display

    // Set up the appreciation message
    doc.setFontSize(14);
    doc.text(appreciation, 105, 130, null, null, 'center'); // Appreciation message

    // Add a border (optional)
    doc.setLineWidth(1);
    doc.setDrawColor(0); // Black border
    doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20); // Border around the page

    // Save the PDF as a file
    doc.save('certificate.pdf');
}
