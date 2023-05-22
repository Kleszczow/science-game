const container = document.querySelector(".container");
const subtext = document.querySelector(".subtext");

const data = { bugs: 5, rows: 3, cols: 5 };

const makeRows = (rows, cols) => {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    cell.innerText = i + 1;
    container.appendChild(cell).className = "grid-item";
  }
};
const { cols, rows, bugs } = data;
console.log(cols);

makeRows(rows, cols);

let indexArr = [];

const special = (l) => {
  const gridItems = document.querySelectorAll(".grid-item");

  for (i = 0; i < l; i++) {
    const randomIndex = Math.floor(Math.random() * gridItems.length);
    if (indexArr.includes(randomIndex)) {
      i--;
      continue;
    } else {
      const randomDiv = gridItems[randomIndex];
      randomDiv.classList.add("gridSpecial");
      indexArr.push(randomIndex);
    }
  }
};

let scores = bugs;
subtext.innerHTML = `Bugs Left: ${scores}`;

special(bugs);

//jezeli pole zostało klikniete'

const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.classList.contains("gridSpecial")) {
      showQuestion(element);
    }
    if (element.classList.contains("gridSpecialThre")) {
      showQuestion(element);
    }
  });
});

const randomQuestion = () => {
  const allQuestion = [
    { quest: "2 x 2", solution: "4" },
    { quest: "6 x 6", solution: "36" },
    { quest: "4 x 4", solution: "16" },
  ];
  const randomNumber = Math.floor(Math.random() * allQuestion.length);
  const newobejct = allQuestion[randomNumber];
  return newobejct;
};

const showQuestion = (element) => {
  const { quest, solution } = randomQuestion();
  const answer = prompt(`${quest} is?`);

  if (answer == solution) {
    console.log(`congrats: solution ${solution}, you typed ${answer}`);
    element.classList.remove("gridSpecial");
    element.classList.add("gridSpecialTwo");
    if (element.classList.contains("gridSpecialThre")) {
      element.classList.replace("gridSpecialThre", "gridSpecialTwo");
    }
    scores--;
    subtext.innerHTML = `Bugs Left: ${scores}`;
    if (scores == 0) {
      alert("you win");
      container.setAttribute("disabled", "true");
    }
  } else {
    console.log(`try again: solution ${solution}, you typed ${answer}`);
    wrongSolution();
    element.classList.remove("gridSpecial");
    element.classList.add("gridSpecialTwo");
    if (element.classList.contains("gridSpecialThre")) {
      element.classList.replace("gridSpecialThre", "gridSpecialTwo");
    }
  }
};

const wrongSolution = () => {
  const index = [];
  for (let i = 0; i < gridItems.length; i++) {
    const item = gridItems[i];
    if (
      !item.classList.contains("gridSpecial") &&
      !item.classList.contains("gridSpecialTwo") &&
      !item.classList.contains("gridSpecialThre")
    ) {
      index.push(i);
    }
  }
  givClass(index);
  return index;
};

const givClass = (index) => {
  const randomIndex = Math.floor(Math.random() * index.length);
  const position = index[randomIndex];
  const changePosition = gridItems[position];
  changePosition.classList.add("gridSpecialThre");
};

const addImg = () => {
  const gridItems = document.querySelectorAll(".grid-item");
  for (let i = 0; i < cols; i++) {
    const newSpan = document.createElement("span");
    newSpan.innerHTML =
      '<img class="wegetables" src="./pictures/wegetables/fruit-tomato-vegetables-svgrepo-com.svg" alt="tomato"></img>';
    gridItems[i].appendChild(newSpan);
  }
  for (let i = cols; i < cols * 2; i++) {
    const newSpan = document.createElement("span");
    newSpan.innerHTML =
      '<img class="wegetables" src="./pictures/wegetables/broccoli-cabbage-health-svgrepo-com.svg" alt="tomato"></img>';
    gridItems[i].appendChild(newSpan);
    console.log(i);
  }
  for (let i = cols * 2; i < cols * 3; i++) {
    const newSpan = document.createElement("span");
    newSpan.innerHTML =
      '<img class="wegetables" src="./pictures/wegetables/pumpkin-salad-vegetables-svgrepo-com.svg" alt="tomato"></img>';
    gridItems[i].appendChild(newSpan);
    console.log(i);
  }
};

addImg();
