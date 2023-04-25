window.HUB_EVENTS = {
    ASSET_ADDED: "ASSET_ADDED",
    ASSET_DELETED: "ASSET_DELETED",
    ASSET_DESELECTED: "ASSET_DESELECTED",
    ASSET_SELECTED: "ASSET_SELECTED",
    ASSET_UPDATED: "ASSET_UPDATED",
    CONSOLE_CHANGE: "CONSOLE_CHANGE",
    CONSOLE_CLOSED: "CONSOLE_CLOSED",
    CONSOLE_EVENT: "CONSOLE_EVENT",
    CONSOLE_OPENED: "CONSOLE_OPENED",
    CONSOLE_RUN_COMMAND: "CONSOLE_RUN_COMMAND",
    CONSOLE_SERVER_CHANGE: "CONSOLE_SERVER_CHANGE",
    EMBED_ACTIVE_PEN_CHANGE: "EMBED_ACTIVE_PEN_CHANGE",
    EMBED_ACTIVE_THEME_CHANGE: "EMBED_ACTIVE_THEME_CHANGE",
    EMBED_ATTRIBUTE_CHANGE: "EMBED_ATTRIBUTE_CHANGE",
    EMBED_RESHOWN: "EMBED_RESHOWN",
    FORMAT_FINISH: "FORMAT_FINISH",
    FORMAT_ERROR: "FORMAT_ERROR",
    FORMAT_START: "FORMAT_START",
    IFRAME_PREVIEW_RELOAD_CSS: "IFRAME_PREVIEW_RELOAD_CSS",
    IFRAME_PREVIEW_URL_CHANGE: "IFRAME_PREVIEW_URL_CHANGE",
    KEY_PRESS: "KEY_PRESS",
    LINTER_FINISH: "LINTER_FINISH",
    LINTER_START: "LINTER_START",
    PEN_CHANGE_SERVER: "PEN_CHANGE_SERVER",
    PEN_CHANGE: "PEN_CHANGE",
    PEN_EDITOR_CLOSE: "PEN_EDITOR_CLOSE",
    PEN_EDITOR_CODE_FOLD: "PEN_EDITOR_CODE_FOLD",
    PEN_EDITOR_ERRORS: "PEN_EDITOR_ERRORS",
    PEN_EDITOR_EXPAND: "PEN_EDITOR_EXPAND",
    PEN_EDITOR_FOLD_ALL: "PEN_EDITOR_FOLD_ALL",
    PEN_EDITOR_LOADED: "PEN_EDITOR_LOADED",
    PEN_EDITOR_REFRESH_REQUEST: "PEN_EDITOR_REFRESH_REQUEST",
    PEN_EDITOR_RESET_SIZES: "PEN_EDITOR_RESET_SIZES",
    PEN_EDITOR_SIZES_CHANGE: "PEN_EDITOR_SIZES_CHANGE",
    PEN_EDITOR_UI_CHANGE_SERVER: "PEN_EDITOR_UI_CHANGE_SERVER",
    PEN_EDITOR_UI_CHANGE: "PEN_EDITOR_UI_CHANGE",
    PEN_EDITOR_UI_DISABLE: "PEN_EDITOR_UI_DISABLE",
    PEN_EDITOR_UI_ENABLE: "PEN_EDITOR_UI_ENABLE",
    PEN_EDITOR_UNFOLD_ALL: "PEN_EDITOR_UNFOLD_ALL",
    PEN_ERROR_INFINITE_LOOP: "PEN_ERROR_INFINITE_LOOP",
    PEN_ERROR_RUNTIME: "PEN_ERROR_RUNTIME",
    PEN_ERRORS: "PEN_ERRORS",
    PEN_LIVE_CHANGE: "PEN_LIVE_CHANGE",
    PEN_LOGS: "PEN_LOGS",
    PEN_MANIFEST_CHANGE: "PEN_MANIFEST_CHANGE",
    PEN_MANIFEST_FULL: "PEN_MANIFEST_FULL",
    PEN_PREVIEW_FINISH: "PEN_PREVIEW_FINISH",
    PEN_PREVIEW_START: "PEN_PREVIEW_START",
    PEN_SAVED: "PEN_SAVED",
    POPUP_CLOSE: "POPUP_CLOSE",
    POPUP_OPEN: "POPUP_OPEN",
    POST_CHANGE: "POST_CHANGE",
    POST_SAVED: "POST_SAVED",
    PROCESSING_FINISH: "PROCESSING_FINISH",
    PROCESSING_START: "PROCESSED_STARTED"
  }, "object" != typeof window.CP && (window.CP = {}), window.CP.PenTimer = {
    programNoLongerBeingMonitored: !1,
    timeOfFirstCallToShouldStopLoop: 0,
    _loopExits: {},
    _loopTimers: {},
    START_MONITORING_AFTER: 2e3,
    STOP_ALL_MONITORING_TIMEOUT: 5e3,
    MAX_TIME_IN_LOOP_WO_EXIT: 2200,
    exitedLoop: function(E) {
      this._loopExits[E] = !0
    },
    shouldStopLoop: function(E) {
      if (this.programKilledSoStopMonitoring) return !0;
      if (this.programNoLongerBeingMonitored) return !1;
      if (this._loopExits[E]) return !1;
      var _ = this._getTime();
      if (0 === this.timeOfFirstCallToShouldStopLoop) return this.timeOfFirstCallToShouldStopLoop = _, !1;
      var o = _ - this.timeOfFirstCallToShouldStopLoop;
      if (o < this.START_MONITORING_AFTER) return !1;
      if (o > this.STOP_ALL_MONITORING_TIMEOUT) return this.programNoLongerBeingMonitored = !0, !1;
      try {
        this._checkOnInfiniteLoop(E, _)
      } catch {
        return this._sendErrorMessageToEditor(), this.programKilledSoStopMonitoring = !0, !0
      }
      return !1
    },
    _sendErrorMessageToEditor: function() {
      try {
        if (this._shouldPostMessage()) {
          var E = {
            topic: HUB_EVENTS.PEN_ERROR_INFINITE_LOOP,
            data: {
              line: this._findAroundLineNumber()
            }
          };
          parent.postMessage(E, "*")
        } else this._throwAnErrorToStopPen()
      } catch {
        this._throwAnErrorToStopPen()
      }
    },
    _shouldPostMessage: function() {
      return document.location.href.match(/boomboom/)
    },
    _throwAnErrorToStopPen: function() {
      throw "Loop ซ้ำๆ หาจุดจบไม่เจอ"
    },
    _findAroundLineNumber: function() {
      var E = new Error("ignored"),
        _ = 0;
      if (E.stack) {
        var o = E.stack.match(/boomboom\S+:(\d+):\d+/);
        o && (_ = o[1])
      }
      return _
    },
    _checkOnInfiniteLoop: function(E, _) {
      if (!this._loopTimers[E]) return this._loopTimers[E] = _, !1;
      if (_ - this._loopTimers[E] > this.MAX_TIME_IN_LOOP_WO_EXIT) throw "Infinite Loop found on loop: " + E
    },
    _getTime: function() {
      return Date.now()
    }
  }, window.CP.shouldStopExecution = function(E) {
    var _ = window.CP.PenTimer.shouldStopLoop(E);
    return !0 === _ && console.warn("Loop ยาวเกินไป"), _
  }, window.CP.exitedLoop = function(E) {
    window.CP.PenTimer.exitedLoop(E)
  };


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
  //document.querySelector('.developer').innerHTML = unescape('%u0E1E%u0E31%u0E12%u0E19%u0E32%u0E42%u0E14%u0E22%3A%20%u0E04%u0E23%u0E39%u0E2D%u0E31%u0E1A%u0E14%u0E38%u0E25');
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
