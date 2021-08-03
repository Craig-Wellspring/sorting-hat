const studentsArray = [];

const houses = {
    gryffindor: "img/Gryffindor_img.png",
    hufflepuff: "img/Hufflepuff_img.png",
    ravenclaw: "img/Ravenclaw_img.png",
    slytherin: "img/Slytherin_img.png",
    deatheater: "img/DeathEater_img.jpg"
};



const registerEvents = () => {
    document
        .querySelector("#displayFormBtn")
        .addEventListener("click", displayForm);

    document
        .querySelector("#formContainer")
        .addEventListener("click", enrollStudent);

    document
        .querySelector("#enrolledStudents")
        .addEventListener("click", expelStudent);

    // document
    //         .querySelector(".btn-filter")
    //         .addEventListener("click", filterStudents);
};

const renderToDOM = (divId, content) => {
    document
        .querySelector(divId)
        .innerHTML = content;
};

const displayForm = () => {
    const content = `
        <div class="card m-3 justify-content-center">
            <div class="card-body text-center">  
                <h2>Enter Student's Name</h2>
                <div id="error-message"></div>
                <div class="d-flex col-md-6 offset-md-3">
                    <input required type="text" class="form-control mx-3" id="student-name" placeholder="Neville Longbottom">
                   <button id="sortBtn" class="btn btn-primary mb-2">Sort!</button>
                </div>
            </div>
        </div>
    `;

    renderToDOM("#formContainer", content);
};


const newStudentCard = (student, index, includeButton) => {
    let newCard = `
        <div class="student-card m-3" id="${index}">
            <img class="card-img" src="${houses[student.house]}" alt="${houses[student.house]} Image">
            <div class="card-body">
                <h4 class="card-title"><b>${student.name}</b></h4>
                <p class="card-text">${student.house.toUpperCase()}</p>
    `;

    if (includeButton) {
        newCard += `
            <button type="button" id="${index}" class="btn btn-expel btn-danger">EXPEL</button>
        `;
    }

    newCard += `
            </div>
        </div>
    `;

    return newCard;
};



const printCards = () => {
    let enrolledString = "";
    let expelledString = "";

    studentsArray.forEach((student, index) => {
        if (student.house === Object.keys(houses)[Object.keys(houses).length - 1]){
            expelledString += newStudentCard(student, index, false);
        } else {
            enrolledString += newStudentCard(student, index, true);
        };
    });

    renderToDOM("#enrolledStudents", enrolledString);

    if (expelledString) {
        renderToDOM("#expelledStudents", expelledString);
    };
};

const errorMessage = (input) => {
    const msg = document.querySelector("#error-message");

    if (!input) {
        msg.innerHTML = "Please type a name";
    } else {
        msg.innerHTML = "";
    }

    return msg.innerHTML;
};


const randomHouse = () => {
    return Object.keys(houses)[Math.floor(Math.random() * (Object.keys(houses).length - 1))];
};

const newStudent = (nameInput) => {
    return {
        name: nameInput,
        house: randomHouse()
    };
};


const enrollStudent = (event) => {
    if (event.target.id === "sortBtn"){
        const nameInput = document.querySelector("#student-name");

        if (!errorMessage(nameInput.value)) {
            studentsArray.push(newStudent(nameInput.value));
            nameInput.value = "";
            
            printCards();
        }
    }
};

const expelStudent = (event) => {
    if (event.target.type === 'button') {
        studentsArray[event.target.id].house = Object.keys(houses)[Object.keys(houses).length - 1];
    }

    printCards();
};



const initPage = () => {
    registerEvents();
};

initPage();