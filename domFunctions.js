import { renderToDOM } from "./renderToDOM.js";
import { studentsArray, addStudent, houses, deathEater as expelled } from "./schoolData.js";
import { displayStudentsContainer, displayStudentForm, displayArmyContainer, generateStudentCard, studentUpdateForm } from "./DOMElements.js";


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
        _student.house === expelled ?
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
            studentsArray[btnID].house = expelled;
            
            if (!document.querySelector("#armyContainer")) {
                displayArmyContainer();
                registerStudentButtons();
            };
    
            printCards(currentFilter);
            break;
        
        case "edit":
            studentUpdateForm(btnID, studentsArray[btnID].name, studentsArray[btnID].house);
            registerUpdateButtons(btnID);
            break;
    };
};




const submitUpdateButton = (_event) => {
    const [btnClass, btnID] = _event.target.id.split("--");

    studentsArray[btnID].name = document
        .querySelector("#updateName--" + btnID).value;
    studentsArray[btnID].house = document
        .querySelector("#houseSelector--" + btnID).value.toLowerCase();

    printCards(currentFilter);
};
  

const cancelUpdateButton = () => {
    printCards(currentFilter);
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

const registerUpdateButtons = (_index) => {
    document
        .querySelector("#submitUpdateButton--" + _index)
        .addEventListener("click", submitUpdateButton);
    document
        .querySelector("#cancelUpdateButton--" + _index)
        .addEventListener("click", cancelUpdateButton);
};


export const initPage = () => {
    registerSortingButtons();
};