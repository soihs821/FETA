const blocks = document.querySelectorAll(".block");
const all_slots = document.querySelectorAll(".droppable");
let draggableBlock = null;

const now = document.querySelector("#now");
const result_slot = document.querySelector("#result");

const data_parent = document.querySelector(".db");
const func_parent = document.querySelector(".fb");

// 결과 슬롯 계산용
let data = "";
let func = "";

// x 버튼을 누르면 다시 기존 위치로 되돌리기 위해 클론.
let data_clone = "";
let func_clone = "";

const exec = document.getElementById("exec");
let count = 0; // 슬롯 채워진 여부 판단용

blocks.forEach((block) => {
  block.addEventListener("dragstart", dragStart);
  block.addEventListener("dragend", dragEnd);
});

function dragStart(e) {
  draggableBlock = this;
  e.dataTransfer.setData("targetText", e.target.textContent);
  now.innerText = this.id;
}

function dragEnd() {
  draggableBlock = null;
  now.innerText = "";
}

all_slots.forEach((slot) => {
  slot.addEventListener("dragover", dragOver);
  slot.addEventListener("dragenter", dragEnter);
  slot.addEventListener("dragleave", dragLeave);
  slot.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  // 각 블록들이 갈 수 있는 슬롯 영역 제한 하기.
  if (draggableBlock.getAttribute("id") !== this.id) {
    this.style.border = "solid 3px red"; // 못가면 빨강
  } else {
    this.style.border = "3px dashed gray"; // 갈 수 있는 경우
  }
}

function dragEnter(e) {
  if (draggableBlock.getAttribute("id") !== this.id) {
    this.style.border = "solid 3px red";
  } else {
    this.style.border = "3px dashed gray";
  }
}

function dragLeave() {
  this.style.border = "none";
}

function dragDrop(e) {
  if (draggableBlock.id === "data") {
    data_clone = draggableBlock.cloneNode(true);
    //data_count++;
  } else if (draggableBlock.id === "func") {
    func_clone = draggableBlock.cloneNode(true);
    //func_count++;
  }

  this.appendChild(draggableBlock);

  let targetText = e.dataTransfer.getData("targetText"); // drop한 블록의 내용 가져오기
  this.innerHTML = targetText;

  this.style.border = "solid 1px";
  this.style.background = "white";

  if (count >= 2) {
    count = 2;
  } else {
    count++; // 슬롯 하나 채워질 때마다 count 증가
  }
  checkButton(); // 실행하기 버튼 활성화 여부 체크

  if (draggableBlock.id === "data") {
    // 결과 계산에 필요한 data와 func 저장해두고, x버튼 추가
    data = targetText;
    this.innerHTML += '<div class="delete" id="data-x">x</div>';
  } else if (draggableBlock.id === "func") {
    func = draggableBlock.getAttribute("class");
    this.innerHTML += '<div class="delete" id="func-x">x</div>';
  }

  // x 버튼 누르면 다시 블록 위치로 돌아가기
  const close_data = document.querySelector("#data-x");
  const close_func = document.querySelector("#func-x");

  if (close_data === null && close_func !== null) {
    close_func.addEventListener("click", () => {
      delete_func(func_clone);
      count--;
      checkButton();
    });
  } else if (close_data !== null && close_func === null) {
    close_data.addEventListener("click", () => {
      delete_data(data_clone);
      count--;
      checkButton();
    });
  } else if (close_data !== null && close_func !== null) {
    close_data.addEventListener("click", () => {
      delete_data(data_clone);
      count = 1;
      checkButton();
    });
    close_func.addEventListener("click", () => {
      delete_func(func_clone);
      count = 1;
      checkButton();
    });
  }
}

function delete_data(data_clone) {
  data_parent.appendChild(data_clone);
  data_parent.childNodes[1].addEventListener("dragstart", dragStart);
  data_parent.childNodes[1].addEventListener("dragend", dragEnd);
  document.querySelector(".data").style.background = "#d8dce2";
  document.querySelector(".data").style.border = "none";
  document.querySelector(".data").innerHTML = "데이터 슬롯";

  resetResult(); // 결과 슬롯도 초기화 되어야 함.
}

function delete_func(func_clone) {
  func_parent.appendChild(func_clone);
  func_parent.childNodes[1].addEventListener("dragstart", dragStart);
  func_parent.childNodes[1].addEventListener("dragend", dragEnd);
  document.querySelector(".func").style.background = "#d8dce2";
  document.querySelector(".func").style.border = "none";
  document.querySelector(".func").innerHTML = "함수 슬롯";

  resetResult();
}

function checkButton() {
  if (count >= 2) {
    // 데이터, 함수 슬롯이 모두 차면
    exec.disabled = false; //실행하기 버튼 활성화
    exec.id = "exec-possible";
  } else {
    exec.disabled = true; //실행하기 버튼 비활성화
    exec.id = "exec";
  }
}

function resetResult() {
  result_slot.style.border = "none";
  result_slot.style.background = "#d8dce2";
  result_slot.innerHTML = "결과 슬롯";
}

// 결과 슬롯 계산
function onClick() {
  result_slot.style.border = "solid 1px";
  result_slot.style.background = "white";
  let result_val = ""; // 일단 빈 문자열로 세팅

  if (func === "block function-block toUpperCase") {
    result_val = data.toUpperCase();
  } else if (func === "block function-block wordNum") {
    data = data.trim();
    result_val = data.split(" ").length;
  } else if (func === "block function-block reverse") {
    result_val = data.split("").reverse().join("");
  }
  result_slot.innerHTML = result_val;
}
