const blocks = document.querySelectorAll(".block");
const all_slots = document.querySelectorAll(".droppable");
let draggableBlock = null;

const now = document.querySelector("#now");
const result_slot = document.querySelector("#result");

// 결과 슬롯 계산용
let data = "";
let func = "";

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
    // 드롭도 안되어야 함.
  } else {
    this.style.border = "3px dashed gray"; // 갈 수 있는 경우
  }
}

function dragEnter(e) {
  if (draggableBlock.getAttribute("id") !== this.id) {
    this.style.border = "solid 3px red";
    // 드롭도 안되어야 함.
  } else {
    this.style.border = "3px dashed gray";
  }
}

function dragLeave() {
  this.style.border = "none";
}

function dragDrop(e) {
  let clone = e.target.cloneNode(true);
  // let nodelist = document.getElementById("block").childNodes;

  this.style.border = "solid 1px";
  this.style.background = "white";
  this.style.display = "table";
  // 수직 정렬도 해야 함 !
  draggableBlock.style.display = "table-cell";
  draggableBlock.style.textAlign = "center";
  draggableBlock.style.verticalAlign = "middle";
  this.appendChild(draggableBlock);

  let targetText = e.dataTransfer.getData("targetText"); // drop한 블록의 내용 가져오기

  this.innerHTML = targetText; // 가져온 내용으로 슬롯 문구 변경하기
  count++; // 채워진 슬롯 체크
  checkButton();

  if (draggableBlock.id === "data") {
    // 결과 계산에 필요한 데이터와 함수 저장해두고, x버튼 추가
    data = targetText;
    this.innerHTML += '<div class="close" id="data-x">x</div>';
  } else if (draggableBlock.id === "func") {
    func = draggableBlock.getAttribute("class");
    this.innerHTML += '<div class="close" id="func-x">x</div>';
  }

  // x 버튼 누르면 다시 블록 위치로 돌아가기
  const close_data = document.querySelector("#data-x");
  const close_func = document.querySelector("#func-x");

  close_data.addEventListener("click", () => {
    this.style.background = "#d8dce2";
    this.style.border = "none";
    this.innerText = "데이터 슬롯";
    resetResult();

    count--;
    checkButton();
  });

  close_func.addEventListener("click", () => {
    this.style.background = "#d8dce2";
    this.style.border = "none";
    this.innerText = "함수 슬롯";
    resetResult();

    count--;
    checkButton();
  });

  console.log("count: ", count);

  // const close_btns = document.querySelectorAll(".close");

  // close_btns.forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     console.log(btn.id);
  //     this.style.background = "#d8dce2";
  //     this.style.border = "none";
  //     if (btn.id === "data-x") {
  //       this.innerText = "데이터 슬롯";
  //       resetResult();
  //     } else if (btn.id === "func-x") {
  //       this.innerText = "함수 슬롯";
  //       resetResult();
  //     }
  //     count--;
  // checkButton();
  //   });
  // });
}

function checkButton() {
  if (count === 2) {
    // 데이터, 함수 슬롯이 모두 차면
    exec.disabled = false; //실행하기 버튼 활성화
    exec.id = "exec-possible";
  } else if (count < 2) {
    exec.disabled = true; //실행하기 버튼 비활성화
    exec.id = "exec";
  }
}

function resetResult() {
  result_slot.style.border = "none";
  result_slot.style.background = "#d8dce2";
  result_slot.style.display = "table";
  result_slot.style.verticalAlign = "center";
  result_slot.innerHTML = "결과 슬롯";
}

// 결과 슬롯

function onClick() {
  console.log("clicked");
  result_slot.style.border = "solid 1px";
  result_slot.style.background = "white";
  let result_val = ""; // 일단 빈 문자열로 세팅

  if (func === "block function-block toUpperCase") {
    result_val = data.toUpperCase();
  } else if (func === "block function-block wordNum") {
    result_val = data.split(" ").length;
  } else if (func === "block function-block reverse") {
    result_val = data.split("").reverse().join("");
  }

  result_slot.innerText = result_val;
}
