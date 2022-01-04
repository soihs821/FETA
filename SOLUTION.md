function dragStart

blocks.forEach

all_slots.forEach

// 각 블록들이 갈 수 있는 슬롯 영역 제한 하기.
if (draggableBlock.getAttribute("id") !== this.id) {
this.style.border = "solid 3px red"; // 못가면 빨강
// 드롭도 안되어야 함.
} else {
this.style.border = "3px dashed gray"; // 갈 수 있는 경우
}

function dragDrop // 가장 뭐가 많이 일어나는 곳

if (draggableBlock.id === "data") {
data_clone = draggableBlock.cloneNode(true);
data_count++;
} else if (draggableBlock.id === "func") {
func_clone = draggableBlock.cloneNode(true);
func_count++;
}

let targetText = e.dataTransfer.getData("targetText"); // drop한 블록의 내용 가져오기
this.innerHTML = targetText;

function checkButton

//x버튼 추가는 data와 func 슬롯을 id로 구분했음.

function delete_data

function delete_func

function resetResult

function onClick
