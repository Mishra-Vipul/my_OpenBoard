let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector(".options-cont");
let pencilToolCont = document.querySelector(".pencil");
let eraserToolCont = document.querySelector(".eraser");
let pencil = document.querySelector(".pencil-Tool");
let eraser = document.querySelector(".eraser-Tool");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload-Tool");

let pencilFlag = false;
let eraserFlag = false;
let optionsFlag = false;
//true-> show tools, false->hide tools
optionsCont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag;

    if (optionsFlag) openTools();
    else closeTools();
})

function openTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-circle-xmark");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "flex";
}
function closeTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-circle-xmark");
    toolsCont.style.display = "none";

    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";

}
pencil.addEventListener("click", (e) => {
    //true->show pencil tool, false-> hide pencil tool
    pencilFlag = !pencilFlag;
    if (pencilFlag) pencilToolCont.style.display = "block"

    else pencilToolCont.style.display = "none";
})
eraser.addEventListener("click", (e) => {
    //true->show eraser tool, false-> hide eraser tool
    eraserFlag = !eraserFlag;
    if (eraserFlag) eraserToolCont.style.display = "flex";

    else eraserToolCont.style.display = "none";
})

upload.addEventListener("click", (e) => {
    //Open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
        <div class="header-cont">
                <div class="minimize"></div>
                     <div class="cut"></div>
                 </div>
                <div class="note-cont">
                     <img src = "${url}" />
               </div>`
            ;
        createSticky(stickyTemplateHTML);
    })


})



sticky.addEventListener("click", (e) => {
    let stickyTemplateHTML = ` <div class="header-cont">
                                <div class="minimize"></div>
                                <div class="cut"></div>
                            </div>
                            <div class="note-cont">
                                <textarea spellcheck="false"></textarea>
                            </div>`
        ;
        createSticky(stickyTemplateHTML);

})

function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let cut = stickyCont.querySelector(".cut");

    noteActions(minimize, cut, stickyCont)

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}

function noteActions(minimise, cut, stickyCont) {
    cut.addEventListener("click", (e) => {
        stickyCont.remove();
    })
    minimise.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        console.log(display);
        if (display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })
}


function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the element, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}