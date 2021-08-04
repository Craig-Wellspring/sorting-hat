import { renderToDOM } from "./renderToDOM.js";
import { studentsArray, setStudents, houses } from "./schoolData.js";
import { displayStudentsContainer, displayStudentForm, displayArmyContainer, generateStudentCard } from "./domElements.js";


const sortByName = (array) => {
    const sortedArray = array.sort(function (a, b) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
});

    return sortedArray;
};

const sortByHouse = (array) => {
    const sortedArray = array.sort(function (a, b) {
        const nameA = a.house.toUpperCase();
        const nameB = b.house.toUpperCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
});

    return sortedArray;
};


const printCards = () => {
    let enrolledString = "";
    let expelledString = "";

    const sortedArray = sortByHouse(sortByName(studentsArray));

    sortedArray.forEach((student, index) => {
        if (student.house === Object.keys(houses)[Object.keys(houses).length - 1]){
            expelledString += generateStudentCard(student, index);
        } else {
            enrolledString += generateStudentCard(student, index, true);
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
    };

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
            setStudents(newStudent(nameInput.value));
            nameInput.value = "";
            
            if (!document.querySelector("#firstYearsContainer")) {
                displayStudentsContainer();
            };

            printCards();
        };
    };
};


const expelStudent = (event) => {
    if (event.target.type === 'button') {
        studentsArray[event.target.id].house = Object.keys(houses)[Object.keys(houses).length - 1];
        
        if (!document.querySelector("#armyContainer")) {
            displayArmyContainer();
        };

        printCards();
    };
};


const registerEvents = () => {
    document
        .querySelector("#displayFormBtn")
        .addEventListener("click", displayStudentForm);

    document
        .querySelector("#formContainer")
        .addEventListener("click", enrollStudent);

    document
        .querySelector("#studentsContainer")
        .addEventListener("click", expelStudent);
};


export const initPage = () => {
    registerEvents();
};