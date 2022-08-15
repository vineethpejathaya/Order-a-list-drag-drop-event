const dragabble_list = document.getElementById("draggable-list");
const check_button = document.getElementById("check");

let richestPeople = [
  "Elon Musk",
  "Bernard Arnault",
  "Jeff Bezos",
  "Bill Gates",
  "Larry Page",
  "Gautam Adani",
  "Larry Ellison",
  "Warren Buffett",
  "Sergey Brin",
  "Mukesh Ambani",
];

let listItems = [];
let dragStartIndex;
createList();

function createList() {
  [...richestPeople]
    .map((item) => ({ value: item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value)
    .forEach((person, index) => {
      let listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        </div>`;

      listItems.push(listItem);

      dragabble_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  //   console.log("dragStart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(e) {
  //   console.log("dragOver");
  e.preventDefault();
}
function dragEnter() {
  //   console.log("dragEntere");
  this.classList.add("over");
}

function dragDrop() {
  //   console.log("dragDrop");
  let dragEndIndex = +this.getAttribute("data-index");
  swap(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function dragLeave() {
  //   console.log("dragLeave");
  this.classList.remove("over");
}
function swap(fromIndex, toIndex) {
  //   console.log(fromIndex, toIndex);
  let fromItem = listItems[fromIndex].querySelector(".draggable");
  let toItem = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(toItem);
  listItems[toIndex].appendChild(fromItem);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    let personName = listItem.querySelector(".draggable").innerText.trim();
    if (personName === richestPeople[index]) {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    } else {
      listItem.classList.add("wrong");
    }
  });
}
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItem = document.querySelectorAll(".draggable-list li");
  draggables.forEach((dragItem, index) => {
    dragItem.addEventListener("dragstart", dragStart);
  });
  dragListItem.forEach((item, index) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check_button.addEventListener("click", checkOrder);
