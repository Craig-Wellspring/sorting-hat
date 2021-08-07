import { renderToDOM } from "./renderToDOM.js";
import { studentsArray, addStudent, houses, deathEater } from "./schoolData.js";
import { displayStudentsContainer, displayStudentForm, displayArmyContainer, generateStudentCard } from "./DOMElements.js";


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
        _student.house === deathEater ?
            expelledString += generateStudentCard(_student, _index)
            : _filter ?
                _student.house === _filter ? enrolledString += generateStudentCard(_student, _index, true) : null
                : enrolledString += generateStudentCard(_student, _index, true)
    });

    renderToDOM("#enrolledStudents", enrolledString);
    expelledString ? renderToDOM("#expelledStudents", expelledString) : null;
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


const inputError = (_input) => {
    return document.querySelector("#error-message").innerHTML = _input ? "" : "Please type a name";
};


const enrollStudent = (_event) => {
    if (_event.target.id === "sortBtn"){
        const nameInput = document.querySelector("#student-name");

        if (!inputError(nameInput.value)) {
            addStudent(newStudent(nameInput.value));
            nameInput.value = "";
            
            if (!document.querySelector("#firstYearsContainer")) {
                displayStudentsContainer();
                registerStudentButtons();
            };

            currentFilter = null;
            printCards();
        };
    };
};


const updateStudent = (_event) => {
    const [btnClass, btnID] = _event.target.id.split("--");
    
    switch (btnClass) {
        case "expel":
            studentsArray[btnID].house = deathEater;
            
            if (!document.querySelector("#armyContainer")) {
                displayArmyContainer();
                registerStudentButtons();
            };
    
            printCards(currentFilter);
            break;
        
        case "edit":
            // studentsArray[btnID].name = deathEater;
            const newButton = `<input required type="text" class="form-control mx-3" id="student-name" placeholder="Neville Longbottom">`;
            renderToDOM("#card--" + btnID, newButton)
            printCards(currentFilter);
            break;
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
        .addEventListener("click", updateStudent);
};


export const initPage = () => {
    registerSortingButtons();
};