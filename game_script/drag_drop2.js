<script id="rendered-js">
const brands = [
{
  iconName: "https://kuruchon.github.io/1000.png",
  brandName: "หนึ่งพัน" },

{
  iconName: "https://kuruchon.github.io/5000.png",
  brandName: "ห้าพัน" },

{
  iconName: "https://kuruchon.github.io/300.png",
  brandName: "สามร้อย" },

{
  iconName: "https://kuruchon.github.io/janggut.png",
  brandName: "เครา" },

{
  iconName: "https://kuruchon.github.io/logo_256.png",
  brandName: "โลโก้คุรุชน(สี)" },

{
  iconName: "https://kuruchon.github.io/logo_bw.png",
  brandName: "โลโก้คุรุชน(ขาวดำ)" },

{
  iconName: "https://kuruchon.github.io/obec.png",
  brandName: "โลโก้ สพฐ."},

{
  iconName: "https://kuruchon.github.io/simple1.jpg",
  brandName: "เบอร์ 1" },

{
  iconName: "https://kuruchon.github.io/simple2.jpg",
  brandName: "เบอร์ 2" },

{
  iconName: "https://kuruchon.github.io/simple3.jpg",
  brandName: "เบอร์ 3"},

{
  iconName: "https://kuruchon.github.io/simple4.jpg",
  brandName: "เบอร์ 4"},

{
  iconName: "https://kuruchon.github.io/takasila_logo_400.png",
  brandName: "โลโก้ตักศิลา"},

];


let correct = 0;
let total = 0;
const totalDraggableItems = 8;
const totalMatchingPairs = 6; // จะต้องน้อยกว่าหรือเท่ากับ totalDraggableItems

const scoreSection = document.querySelector(".score");
const correctSpan = scoreSection.querySelector(".correct");
const totalSpan = scoreSection.querySelector(".total");
const playAgainBtn = scoreSection.querySelector("#play-again-btn");

const draggableItems = document.querySelector(".draggable-items");
const matchingPairs = document.querySelector(".matching-pairs");
let draggableElements;
let droppableElements;

initiateGame();


function begin(){
	document.querySelector('#begin').setAttribute('style','display:none;');
	document.querySelector('#login-user').removeAttribute('style');
	if(localStorage.getItem('user')+localStorage.getItem('org') != ''){
	  document.querySelector('#user').value = localStorage.getItem('user');
	  document.querySelector('#school').value = localStorage.getItem('org');
	  document.querySelector('#user').readOnly = true;
	  document.querySelector('#school').readOnly = true;
	}
}

function logout(){
	localStorage.clear();
	document.querySelector('#user').value = '';
	document.querySelector('#school').value = '';
	document.querySelector('#user').readOnly = false;
	document.querySelector('#school').readOnly = false;
}

function login(user,school){
	if(document.querySelector('#user').value == ''){
		document.querySelector('#user').setAttribute('placeholder','กรุณาพิมพ์ชื่อ-นามสกุล')}else if(document.querySelector('#school').value == ''){
		document.querySelector('#school').setAttribute('placeholder','กรุณาพิมพ์โรงเรียน')
	}else{
	  //console.log(user.value,school.value)
	  localStorage.setItem("user", user.value);
	  localStorage.setItem("org", school.value);
	  document.querySelector('.login').setAttribute('style','display:none;');
	  document.querySelector('.score').removeAttribute('style');
	  document.querySelector('.info').removeAttribute('style');
	  document.querySelector('.draggable-items').removeAttribute('style');
	  document.querySelector('.matching-pairs').removeAttribute('style');
	  document.querySelector('.user').innerHTML = localStorage.getItem('user');
	  document.querySelector('.org').innerHTML = localStorage.getItem('org');
	  }
	}

function initiateGame() {
  if(document.querySelector('.developer').innerHTML != unescape('%u0E1E%u0E31%u0E12%u0E19%u0E32%u0E42%u0E14%u0E22%3A%20%u0E04%u0E23%u0E39%u0E2D%u0E31%u0E1A%u0E14%u0E38%u0E25%u0E40%u0E25%u0E32%u0E30')){
	document.querySelector('.draggable-items').innerHTML = unescape('%3Ccenter%3E%u0E40%u0E01%u0E21%u0E19%u0E35%u0E49%u0E44%u0E21%u0E48%u0E2A%u0E32%u0E21%u0E32%u0E23%u0E16%u0E17%u0E33%u0E07%u0E32%u0E19%u0E44%u0E14%u0E49%u0E16%u0E49%u0E32%u0E40%u0E1B%u0E25%u0E35%u0E48%u0E22%u0E19%u0E2B%u0E23%u0E37%u0E2D%u0E25%u0E1A%u0E40%u0E04%u0E23%u0E14%u0E34%u0E15%u0E1C%u0E39%u0E49%u0E1E%u0E31%u0E12%u0E19%u0E32%20%3Cbr%3E%u0E04%u0E23%u0E39%u0E2D%u0E31%u0E1A%u0E14%u0E38%u0E25%u0E40%u0E25%u0E32%u0E30%3C/center%3E')
  }else{
  const randomDraggableBrands = generateRandomItemsArray(totalDraggableItems, brands);
  const randomDroppableBrands = totalMatchingPairs < totalDraggableItems ? generateRandomItemsArray(totalMatchingPairs, randomDraggableBrands) : randomDraggableBrands;
  const alphabeticallySortedRandomDroppableBrands = [...randomDroppableBrands].sort((a, b) => a.brandName.toLowerCase().localeCompare(b.brandName.toLowerCase()));

  // Create "draggable-items" and append to DOM
  for (let i = 0; i < randomDraggableBrands.length; i++) {if (window.CP.shouldStopExecution(0)) break;
    draggableItems.insertAdjacentHTML("beforeend", `
      <img src="${randomDraggableBrands[i].iconName}" class="draggable" draggable="true" id="${randomDraggableBrands[i].iconName}">
    `);
  }

  // Create "matching-pairs" and append to DOM
  window.CP.exitedLoop(0);for (let i = 0; i < alphabeticallySortedRandomDroppableBrands.length; i++) {if (window.CP.shouldStopExecution(1)) break;
    matchingPairs.insertAdjacentHTML("beforeend", `
      <div class="matching-pair">
        <span class="label">${alphabeticallySortedRandomDroppableBrands[i].brandName}</span>
        <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].iconName}"></span>
      </div>
    `);
	}
  }window.CP.exitedLoop(1);

  draggableElements = document.querySelectorAll(".draggable");
  droppableElements = document.querySelectorAll(".droppable");

  draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
    // elem.addEventListener("drag", drag);
    // elem.addEventListener("dragend", dragEnd);
  });

  droppableElements.forEach(elem => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
  });
}

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); // or "text/plain"
}

//Events fired on the drop target

function dragEnter(event) {
  if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.preventDefault();
  }
}

function dragLeave(event) {
  if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("droppable-hover");
  const draggableElementBrand = event.dataTransfer.getData("text");
  const droppableElementBrand = event.target.getAttribute("data-brand");
  const isCorrectMatching = draggableElementBrand === droppableElementBrand;
  total++;
  if (isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementBrand);
    event.target.classList.add("dropped");
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.innerHTML = `<img src="${draggableElementBrand}" style="width:5rem;height:5rem;">`;
    correct++;
  }
  scoreSection.style.opacity = 0;
  setTimeout(() => {
    correctSpan.textContent = correct;
    totalSpan.textContent = total;
    scoreSection.style.opacity = 1;
  }, 200);
  if (correct === Math.min(totalMatchingPairs, totalDraggableItems)) {// Game Over!!
    playAgainBtn.style.display = "block";
    setTimeout(() => {
      playAgainBtn.classList.add("play-again-btn-entrance");
    }, 200);
  }
}

// Other Event Listeners
playAgainBtn.addEventListener("click", playAgainBtnClick);
function playAgainBtnClick() {
  playAgainBtn.classList.remove("play-again-btn-entrance");
  correct = 0;
  total = 0;
  draggableItems.style.opacity = 0;
  matchingPairs.style.opacity = 0;
  setTimeout(() => {
    scoreSection.style.opacity = 0;
  }, 100);
  setTimeout(() => {
    playAgainBtn.style.display = "none";
    while (draggableItems.firstChild) {if (window.CP.shouldStopExecution(2)) break;draggableItems.removeChild(draggableItems.firstChild);}window.CP.exitedLoop(2);
    while (matchingPairs.firstChild) {if (window.CP.shouldStopExecution(3)) break;matchingPairs.removeChild(matchingPairs.firstChild);}window.CP.exitedLoop(3);
    initiateGame();
    correctSpan.textContent = correct;
    totalSpan.textContent = total;
    draggableItems.style.opacity = 1;
    matchingPairs.style.opacity = 1;
    scoreSection.style.opacity = 1;
  }, 500);
}

// Auxiliary functions
function generateRandomItemsArray(n, originalArray) {
  let res = [];
  let clonedArray = [...originalArray];
  if (n > clonedArray.length) n = clonedArray.length;
  for (let i = 1; i <= n; i++) {if (window.CP.shouldStopExecution(4)) break;
    const randomIndex = Math.floor(Math.random() * clonedArray.length);
    res.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }window.CP.exitedLoop(4);
  return res;
}
//# sourceURL=pen.js
    </script>
