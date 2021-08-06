import { renderToDOM } from "./renderToDOM.js";
import { studentsArray, setStudents, houses } from "./schoolData.js";
import { displayStudentsContainer, displayStudentForm, displayArmyContainer, generateStudentCard } from "./DOMElements.js";

const  deathEater = Object.keys(houses)[Object.keys(houses).length -1];

const sortArray = (_array) => {
    return _array.sort(function (_a, _b) {
        if (_a.name < _b.name) return -1;
        if (_a.name > _b.name) return 1;
        return 0;
    })
    .sort(function(_a, _b) {
        if (_a.house < _b.house) return -1;
        if (_a.house > _b.house) return 1;
        return 0;
    });
};


const printCards = (_filter = null) => {
    let enrolledString = "";
    let expelledString = "";

    sortArray(studentsArray).forEach((_student, _index) => {
        if (_student.house === deathEater){
            expelledString += generateStudentCard(_student, _index);
        } else {
            if (_filter) {
                if (_student.house === _filter) {
                    enrolledString += generateStudentCard(_student, _index, true);
                };
            } else {
                enrolledString += generateStudentCard(_student, _index, true);
            };
        };
    });


    renderToDOM("#enrolledStudents", enrolledString);

    if (expelledString) {
        renderToDOM("#expelledStudents", expelledString);
    };
};

const inputError = (_input) => {
    const msg = document.querySelector("#error-message");
    const errorText = "Please type a name";

    _input ? msg.innerHTML = "" : msg.innerHTML = errorText;

    return msg.innerHTML;
};


const randomHouse = () => {
    return Object.keys(houses)[Math.floor(Math.random() * (Object.keys(houses).length - 1))];
};

const newStudent = (_nameInput) => {
    return {
        name: _nameInput,
        house: randomHouse()
    };
};


const enrollStudent = (_event) => {
    if (_event.target.id === "sortBtn"){
        const nameInput = document.querySelector("#student-name");

        if (!inputError(nameInput.value)) {
            setStudents(newStudent(nameInput.value));
            nameInput.value = "";
            
            if (!document.querySelector("#firstYearsContainer")) {
                displayStudentsContainer();
                registerStudentButtons();
            };

            printCards(currentFilter);
        };
    };
};


const expelStudent = (_event) => {
    if (_event.target.type === 'button') {
        studentsArray[_event.target.id].house = deathEater;
        
        if (!document.querySelector("#armyContainer")) {
            displayArmyContainer();
            registerStudentButtons();
        };

        printCards(currentFilter);
    };
};

let currentFilter = null;
const houseFilterBtn = (_event) => {
    const targetID = _event.target.id.slice(0, -4);

    if (targetID !== "filterButtons") {
        currentFilter === targetID ? currentFilter = null : currentFilter = targetID;
        
        printCards(currentFilter);
    };
};


const registerSortingButtons = () => {
    document
        .querySelector("#displayFormBtn")
        .addEventListener("click", displayStudentForm);

    document
        .querySelector("#formContainer")
        .addEventListener("click", enrollStudent);
};

const registerStudentButtons = () => {
    document
        .querySelector("#filterButtonsTray")
        .addEventListener("click", houseFilterBtn);

    document
        .querySelector("#enrolledStudents")
        .addEventListener("click", expelStudent);
};


export const initPage = () => {
    registerSortingButtons();
};