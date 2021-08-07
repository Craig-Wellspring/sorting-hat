import { renderToDOM } from "./renderToDOM.js";
import { houses } from "./schoolData.js";


export const displayStudentForm = () => {
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

export const displayStudentsContainer = () => {
    const element = `
        <div class="cardContainers" id="firstYearsContainer">
            <h3>First Year Students</h3>
            <div id="filterButtonsTray">
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

export const displayArmyContainer = () => {
    const element = `
    <div class="cardContainers" id="armyContainer">
        <h3>Voldemort's Army</h3>
        <div class="studentCardDrawer" id="expelledStudents">No death eaters...yet!</div>
    </div>
    `;

    renderToDOM("#studentsContainer", element, false);
};

export const generateStudentCard = (_student, _index, _includeButtons = false) => {
    let newCard = `
        <div class="student-card" id="card--${_index}">
            <img class="card-img" src="${houses[_student.house]}" alt="${houses[_student.house]} Image">
            <div id="card-body--${_index}">
                <h4 class="card-title"><b>${_student.name}</b></h4>
                <p class="card-text">${_student.house.toUpperCase()}</p>
                `;

    if (_includeButtons) {
        newCard += `
            <button type="button" id="edit--${_index}" class="btn btn-edit btn-primary">Manage</button>
            <button type="button" id="expel--${_index}" class="btn btn-expel btn-danger">Expel</button>
            `;
    };

    newCard += `
            </div>
        </div>
        `;

    return newCard;
};


export const studentUpdateForm = (_index, _name, _house) => {
    const housesList = Object.keys(houses).filter(house => house !== _house);

    const element = `
        <div class="updateForm update-student">
          <div class="form-container" id="update-form--${_index}">
            <form>
              <div class="mb-3 update-input">
                <label for="updateName" class="form-label">Student Name</label>
                <input type="text" class="form-control name-input text-center font-weight-bold" id="updateName--${_index}" value="${_name}"/>
              </div>
              <label for="houseSelector" class="form-label">House</label>
              <select class="form-select" id="houseSelector--${_index}">
                <option selected >${_house.toUpperCase()}</option>
                <option value="${housesList[0].toUpperCase()}">${housesList[0].toUpperCase()}</option>
                <option value="${housesList[1].toUpperCase()}">${housesList[1].toUpperCase()}</option>
                <option value="${housesList[2].toUpperCase()}">${housesList[2].toUpperCase()}</option>
              </select>
              <button type="button" class="btn btn-success" id="submitUpdateButton--${_index}">Submit</button>
              <button type="button" class="btn btn-danger" id="cancelUpdateButton--${_index}">Cancel</button>
            </form>
          </div>
        </div>
    `;

    renderToDOM("#card-body--"+_index, element);
  };
