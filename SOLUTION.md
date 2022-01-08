*아래의 모든 설명은 main.js 에 있는 함수들에 대한 설명입니다.*



* **blocks.forEach**

  : class를 block으로 설정해 놓은 블록들에 드래그 이벤트를 추가합니다.



* **function dragStart**

   : 블록이 드래그 되기 시작하면, 작동하는 함수입니다. 드롭 된 후에는 슬롯의 내용이 해당 블록의 문구로 변경되어야 하므로, '''e.dataTransfer.setData'''를 이용해 해당 블록으로 넘길 데이터를 지정합니다. 블록이 드래그 될 때, 좌측 상단에 해당 블록이 data 인지 func 인지 알려주는 now 변수의 텍스트도 해당 블록의 id 값을 이용해 변경해줍니다.



*  **all_slots.forEach**

  : 블록과 마찬가지로, class를 .droppable로 설정한 슬롯에 대해서도 드래그 및 드롭 이벤트를 추가합니다.



* **각 블록들이 갈 수 있는 슬롯 영역 제한**

  ```javascript
  * if (draggableBlock.getAttribute("id") !== this.id) {
  this.style.border = "solid 3px red"; // 못가면 빨강
  } else {
  this.style.border = "3px dashed gray"; // 갈 수 있는 경우
  }
  ```

  : 각 블록과 슬롯의 id를 이용하여, 만약 data, data과 같이 id 값이 같으면 갈 수 있는 경우에 해당되어 dashed 선이 슬롯의 테두리에 적용되며, data,  func 과 같이 블록과 슬롯의 id가 동일하지 않다면 슬롯의 테두리에는 빨간 선이 적용됩니다.

  

* **function dragDrop** 

  : 블록이 드롭 될 때 실행되는 함수입니다. 

  ```javascript
  if (draggableBlock.id === "data") {
      data_clone = draggableBlock.cloneNode(true);
    } else if (draggableBlock.id === "func") {
      func_clone = draggableBlock.cloneNode(true);
    }
  ```

  함수의 앞 부분에 있는 해당 조건문은 블록의 id를 이용해 데이터 블록인지 함수 블록인지 검사합니다. 슬롯에 채워진 블록을 x버튼을 이용해 지울 때, 다시 원래 블록의 자리로 되돌려 놓기 위해 데이터와 함수를 구분하여 cloneNode를 이용해 복제해 둡니다.

  그리고 슬롯에 드롭된 블록을 appendChild를 이용해 추가 후, dragStart에서 setData로 넘겨준 블록의 내용을 getData를 이용해 가져와 슬롯의 내용을 변경해줍니다. 

  

  ```javascript
  if (count >= 2) {
      count = 2;
    } else {
      count++; // 슬롯 채워지면 count 증가
    }
  ```

  count는 실행하기 버튼의 활성화 여부를 결정하기 위해 채워진 슬롯의 수를 카운트 합니다.

  슬롯이 모두 차있을 때 (count === 2) , 한 블록을 삭제 후 (count === 1) 다시 드래그 하는 것이 아닌 블록에 덧씌울 경우 (count === 3), 이후 한 블록을 삭제 (count === 2) 해서 두 슬롯이 모두 차있지 않더라도 실행하기 버튼의 활성화 조건을 만족하기 때문에 해당 부분을 해결하기 위해 count 가 2 이상인 경우에는 count를 그대로 2로 유지합니다.

  

  ```javascript
  if (draggableBlock.id === "data") {
      data = targetText;
      this.innerHTML += '<div class="delete" id="data-x">x</div>';
    } else if (draggableBlock.id === "func") {
      func = draggableBlock.getAttribute("class");
      this.innerHTML += '<div class="delete" id="func-x">x</div>';
    }
  ```

  블록이 슬롯에 드롭되고 나면, 슬롯의 내용과 스타일이 변경됨과 동시에 x 버튼이 생깁니다.

  이 때 결과 계산을 위해 조건문을 통해 블록의 id를 검사하여 드롭된 데이터와 함수를 저장해둡니다. 또, x버튼의 id를 data와 func로 구분해서 각각 다른 함수를 실행하여 블록을 지울 때 돌아가야 하는 위치를 다르게 설정했습니다.

  

  위의 코드 아래에 나오는 코드들은 x 버튼을 눌렀을 경우 동작되는 코드입니다. (100번 줄 ~)

  조건문 중 마지막 조건인 ```else if (close_data !== null && close_func !== null)``` 은 두 슬롯이 모두 차있을 경우에 x버튼을 누름을 의미하는데, 이 때 close_data.addEventListener가 두번실행되는 문제 때문에 count-- 가 아닌 count -= 2가 되어버려 우선 count = 1로 두었습니다.

  

* **function checkButton**

  : 실행하기 버튼의 활성화 여부를 체크하는 함수입니다. 



* **function delete_data**

  : 데이터 슬롯의 x 버튼을 눌렀을 때 실행되는 함수입니다. 

  

* **function delete_func**

  : 함수 슬롯의 x 버튼을 눌렀을 때 실행되는 함수입니다.



* **function resetResult**

  : 데이터 슬롯과 함수 슬롯의 x 버튼이 눌렸을 때, 결과 슬롯도 원상태로 돌려주는 함수입니다. 

  

* **function onClick**

  : 실행하기 버튼이 눌렸을 때 실행되는 함수입니다.

  각각의 함수를 조건문으로 판별하여 해당하는 함수를 적용 후, result_val 에 넣어 결과 슬롯의 문구를 변경해줍니다.


- 슬롯에 블록이 덧씌워졌을 때 기존 블록이 그대로 사라지지 않고 제자리로 돌아가는 것과, 
슬롯에 채워진 블록을 삭제 할 때 기존 순서대로 돌아가지 않는 점은 해결하지 못했습니다 ... !


+ event.stopPropagation()과 이벤트 위임을 사용했더라면 ...!
