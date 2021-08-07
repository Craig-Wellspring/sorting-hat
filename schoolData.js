export const studentsArray = [];

export const addStudent = (_object) => {
    studentsArray.push(_object);
    return studentsArray;
};

export const houses = {
    gryffindor: "img/Gryffindor_img.png",
    hufflepuff: "img/Hufflepuff_img.png",
    ravenclaw: "img/Ravenclaw_img.png",
    slytherin: "img/Slytherin_img.png",
    deatheater: "img/DeathEater_img.jpg"
};

export const deathEater = Object.keys(houses)[Object.keys(houses).length -1];