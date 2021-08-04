import { renderToDOM } from "./renderToDOM.js";
import { houses } from "./schoolData.js";


const displayStudentForm = () => {
    const element = `
        <div class="card m-3 justify-content-center">
            <div class="form-body text-center">  
                <h2>Enter Student's Name</h2>
                <div id="error-message"></div>
                <div class="d-flex col-md-6 offset-md-3">
                    <input required type="text" class="form-control mx-3" id="student-name" placeholder="Neville Longbottom">
                   <button id="sortBtn" class="btn btn-primary mb-2">Sort!</button>
                </div>
            </div>
        </div>
    `;

    renderToDOM("#formContainer", element);
};

const displayStudentsContainer = () => {
    const element = `
        <div class="cardContainers" id="firstYearsContainer">
            <h3>First Year Students</h3>
            <div class="filterButtonsTray">
                <button class="btn btn-filter btn-secondary" id="gryffindor-btn">Gryffindor</button>
                <button class="btn btn-filter btn-secondary" id="hufflepuff-btn">Hufflepuff</button>
                <button class="btn btn-filter btn-secondary" id="ravenclaw-btn">Ravenclaw</button>
                <button class="btn btn-filter btn-secondary" id="slytherin-btn">Slytherin</button>
            </div>
            <div class="studentCardDrawer" id="enrolledStudents"></div>
        </div>
    `;
    
    renderToDOM("#studentsContainer", element, false); 
};

const displayArmyContainer = () => {
    const element = `
    <div class="cardContainers" id="armyContainer">
        <h3>Voldemort's Army</h3>
        <div class="studentCardDrawer" id="expelledStudents">No death eaters...yet!</div>
    </div>
    `;

    renderToDOM("#studentsContainer", element, false);
};

const generateStudentCard = (student, index, includeButtons = false) => {
    let newCard = `
        <div class="student-card" id="${index}">
            <img class="card-img" src="${houses[student.house]}" alt="${houses[student.house]} Image">
            <div class="card-body">
                <h4 class="card-title"><b>${student.name}</b></h4>
                <p class="card-text">${student.house.toUpperCase()}</p>
    `;

    if (includeButtons) {
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

export { displayStudentForm, displayStudentsContainer, displayArmyContainer, generateStudentCard};