export const renderToDOM = (divId, content, clear = true) => {
    const targetDiv = document.querySelector(divId);

    clear ? targetDiv.innerHTML = content : targetDiv.innerHTML += content;
};