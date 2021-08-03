const studentsArray = [];

const houses = {
    gryffindor: "#7F0909",
    hufflepuff: "#EEE117",
    ravenclaw: "#000A90",
    slytherin: "#0D6217"
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
                    <input type="text" class="form-control mx-3" id="student-name" placeholder="Neville Longbottom" required>
                   <button id="sortBtn" class="btn btn-primary mb-2">Sort!</button>
                </div>
            </div>
        </div>
    `;

    renderToDOM("#formContainer", content);
};

const errorMessage = (input) => {
    const msg = document.querySelector("#error-message");

    if (!input) {
        msg.innerHTML = "Please type a name";
    } else {
        msg.innerHTML = "";
    }
};

const randomHouse = () => {
    return Object.keys(houses)[Math.floor(Math.random() * Object.keys(houses).length)];
}

const enrollStudent = (event) => {
    if (event.target.id === "sortBtn"){
        const nameInput = document.querySelector("#student-name");
        errorMessage(nameInput.value);

        if (nameInput.value) {
            studentsArray.push(
                {
                    name: nameInput.value,
                    house: randomHouse()
                });
            nameInput.value = "";
            
            printCards();
        }
    }
};

const expelStudent = (event) => {
    if (event.target.type === 'button') {
        studentsArray[event.target.id].house = "army";
    }

    printCards();
};


const printCards = () => {
    let enrolledString = "";
    let expelledString = "No death eaters...yet!";

    studentsArray.forEach((student, index) => {
        if (student.house === "army"){
            expelledString += `
                <div class="card m-3" style="width: 18rem;">
                    <img class="card-img-top" src="https://m.media-amazon.com/images/I/61LoGfzK8vL._SL1500_.jpg" alt="Death Eater Image">
                    <div class="card-body">
                        <h4 class="card-title"><b>${student.name}</b></h4>
                        <p class="card-text">DEATH EATER</p>
                    </div>
                </div>
            `;
        } else {
            enrolledString += `
                <div class="card m-3" id="${index}">
                    <div class="row no-gutters">
                        <div class="col-md-4" style="min-height: 150px; background-color: ${houses[student.house]}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title">${student.name}</h4>
                                <p class="card-text">${student.house.toUpperCase()}</p>
                                <button type="button" id="${index}" class="btn btn-expel btn-danger">EXPEL</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });


    renderToDOM("#enrolledStudents", enrolledString);
    renderToDOM("#expelledStudents", expelledString);
}


const initPage = () => {
    registerEvents();
};

initPage();