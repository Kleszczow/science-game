const container = document.querySelector(".container");

let array = [];

function makeRows(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    array.push(cell);
    cell.innerText = i + 1;
    container.appendChild(cell).className = "grid-item";
  }
}

makeRows(10, 10);

const special = () => {
  const divAll = document.querySelectorAll(".grid-item");
  console.log(divAll);
  const randomIndex = Math.floor(Math.random() * divAll.length);
  const randomDiv = divAll[randomIndex];
  console.log(randomDiv);
  randomDiv.classList.add("gridSpecial");
};
special();
