const container = document.querySelector(".container");

const makeRows = (rows, cols) => {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    cell.innerText = i + 1;
    container.appendChild(cell).className = "grid-item";
  }
};

makeRows(10, 10);

const special = (l) => {
  const divAll = document.querySelectorAll(".grid-item");
  let indexArr = [];
  for (i = 0; i < l; i++) {
    const randomIndex = Math.floor(Math.random() * divAll.length);
    if (indexArr.includes(randomIndex)) {
      i--;
      continue;
    } else {
      const randomDiv = divAll[randomIndex];
      randomDiv.classList.add("gridSpecial");
      indexArr.push(randomIndex);
    }
  }
};

special(10);
