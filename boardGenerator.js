const container = document.querySelector(".container");
const subtext = document.querySelector(".subtext");
const wining = document.querySelector(".wining");
const winText = document.querySelector(".winText");
const resetGame = document.querySelector("#resetGame");
const resetGameLost = document.querySelector("#resetGameLost");
const lost = document.querySelector(".lost");

let data = { bugs: 19, rows: 4, cols: 5 };

const makeRows = (rows, cols) => {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    cell.innerText = i + 1;
    container.appendChild(cell).className = "grid-item";
  }
};
let { cols, rows, bugs } = data;

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
    { quest: "2 x 2", solution: "1" },
    { quest: "6 x 6", solution: "1" },
    { quest: "4 x 4", solution: "1" },
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
      winGame();
      // container.setAttribute("disabled", "true");
      console.log("3 if");
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
const winGame = () => {
  wining.style.display = "flex";
};
const lostGame = () => {
  lost.style.display = "flex";
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
  try {
    changePosition.classList.add("gridSpecialThre");
  } catch (error) {
    lostGame();
  }
};

const imagesData = [
  '<img class="wegetables" src="./pictures/wegetables/fruit-tomato-vegetables-svgrepo-com.svg" alt="tomato"></img>',
  '<img class="wegetables" src="./pictures/wegetables/carrot-salad-vegetables-svgrepo-com.svg" alt="carrot"></img>',
  '<img class="wegetables" src="./pictures/wegetables/eggplant-salad-vegetables-svgrepo-com.svg" alt="eggplant"></img>',
  '<img class="wegetables" src="./pictures/wegetables/broccoli-cabbage-health-svgrepo-com.svg" alt="broccoli"></img>',
  '<img class="wegetables" src="./pictures/wegetables/fruit-paprika-salad-svgrepo-com.svg" alt="paprika"></img>',
  '<img class="wegetables" src="./pictures/wegetables/pumpkin-salad-vegetables-svgrepo-com.svg" alt="pumpkin"></img>',
  '<img class="wegetables" src="./pictures/wegetables/onion-seasoning-vegetables-svgrepo-com.svg" alt="onion"></img>',
  '<img class="wegetables" src="./pictures/wegetables/cabbage-health-salad-svgrepo-com.svg" alt="cabbage"></img>',
];

const addImgToGrid = (i, y) => {
  const gridItems = document.querySelectorAll(".grid-item");
  const randomNumber = Math.floor(Math.random() * imagesData.length);
  for (i; i < y; i++) {
    const newSpan = document.createElement("span");
    newSpan.innerHTML = imagesData[randomNumber];
    gridItems[i].appendChild(newSpan);
  }
};

const generateImg = () => {
  let i = 0;
  let y = cols;
  let r = rows;

  for (let j = 1; j <= r; j++) {
    addImgToGrid(i, y);
    i = y;
    y = cols * (j + 1);
  }
};

generateImg();

resetGame.addEventListener("click", () => {
  const gridItems = document.querySelectorAll(".grid-item");
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].classList.remove(
      "gridSpecial",
      "gridSpecialTwo",
      "gridSpecialThre"
    );
  }
  replayGameWin();
});

const replayGameWin = () => {
  bugs++;
  indexArr.length = 0;
  special(bugs);
  scores = bugs;
  wining.style.display = "none";
  subtext.innerHTML = `Bugs Left: ${scores}`;
};

const replayGameLost = () => {
  indexArr.length = 0;
  bugs = 1;
  special(bugs);
  scores = bugs;
  subtext.innerHTML = `Bugs Left: ${scores}`;
  lost.style.display = "none";
};

resetGameLost.addEventListener("click", () => {
  const gridItems = document.querySelectorAll(".grid-item");
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].classList.remove(
      "gridSpecial",
      "gridSpecialTwo",
      "gridSpecialThre"
    );
  }
  replayGameLost();
});
