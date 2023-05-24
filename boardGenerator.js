const container = document.querySelector(".container");
const subtext = document.querySelector(".subtext");
const wining = document.querySelector(".wining");
const resetGame = document.querySelector("#resetGame");
const resetGameLost = document.querySelector("#resetGameLost");
const lost = document.querySelector(".lost");
const inputValue = document.querySelector("#inputValue");
const questionP = document.querySelector(".questionP");
const submit = document.querySelector("#submit");

let data = { bugs: 10, rows: 4, cols: 5 };

const makeRows = (rows, cols) => {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
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
let elementArr = [];
let answer = true;
let fall = true;
let oneAnswer = false;

const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((element) => {
  element.addEventListener("click", () => {
    oneAnswer = true;
    if (answer) {
      fall = true;
      answer = false;
      if (element.classList.contains("gridSpecial")) {
        elementArr.push(element);
        showQuestion(element);
        nextQuest();
      }
      if (element.classList.contains("gridSpecialThre")) {
        elementArr.push(element);
        showQuestion(element);
        nextQuest();
      }
      if (
        !element.classList.contains("gridSpecial") &&
        !element.classList.contains("gridSpecialTwo") &&
        !element.classList.contains("gridSpecialThre")
      ) {
        answer = true;
        fall = true;
        oneAnswer = false;
      }
      if (
        element.classList.contains("gridSpecial") &&
        element.classList.contains("gridSpecialTwo") &&
        element.classList.contains("gridSpecialThre")
      ) {
        answer = false;
        fall = false;
        oneAnswer = true;
      }
    }
  });
});

const nextQuest = () => {
  let newQuestion = randomQuestion();
  quest = newQuestion.quest;
  solution = newQuestion.solution;
  questionP.innerHTML = quest;
};

const randomQuestion = () => {
  const allQuestion = [
    { quest: "2 x 2", solution: "4" },
    { quest: "6 x 6", solution: "36" },
    { quest: "4 x 4", solution: "16" },
  ];
  const randomNumber = Math.floor(Math.random() * allQuestion.length);
  const newQuestion = allQuestion[randomNumber];
  return newQuestion;
};

let { quest, solution } = randomQuestion();

const getValue = () => {
  const value = inputValue.value;
  return value;
};

const showQuestion = (element) => {
  let newElement = element;
  return newElement;
};

const waitToCheck = () => {
  checkQuestion();
};

const checkQuestion = () => {
  let number = getValue();
  let element = elementArr.slice(-1);
  let lastElement = element[0];
  if (number.length > 0) {
    answer = true;
    if (number == solution) {
      lastElement.classList.remove("gridSpecial");
      lastElement.classList.add("gridSpecialTwo");

      if (lastElement.classList.contains("gridSpecialThre")) {
        lastElement.classList.replace("gridSpecialThre", "gridSpecialTwo");
      }
      scores--;
      subtext.innerHTML = `Bugs Left: ${scores}`;

      if (scores == 0) {
        winGame();
      }
    } else {
      wrongSolution();

      lastElement.classList.remove("gridSpecial");
      lastElement.classList.add("gridSpecialTwo");
      if (lastElement.classList.contains("gridSpecialThre")) {
        lastElement.classList.replace("gridSpecialThre", "gridSpecialTwo");
      }
    }
  }
  questionP.innerHTML = "find next worms!";
  inputValue.value = "";
};

submit.addEventListener("click", () => {
  if (oneAnswer) {
    oneAnswer = false;
    checkQuestion();
  }
});

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
    newSpan.classList.add("imgSpan");
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
  const wegetables = document.querySelectorAll(".wegetables");
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].classList.remove(
      "gridSpecial",
      "gridSpecialTwo",
      "gridSpecialThre"
    );
    wegetables[i].classList.remove("falling");
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
  const wegetables = document.querySelectorAll(".wegetables");
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].classList.remove(
      "gridSpecial",
      "gridSpecialTwo",
      "gridSpecialThre"
    );
    wegetables[i].classList.remove("falling");
  }
  replayGameLost();
});

for (let i = 0; i < gridItems.length; i++) {
  let divElement = gridItems[i];
  let imgElement = divElement.querySelector("img");
  const wegetables = document.querySelectorAll(".wegetables");

  divElement.addEventListener("click", function () {
    const imgSpan = document.querySelectorAll(".imgSpan");
    const worm = [
      '<img class="worm" src="./pictures/aniamls/bug-svgrepo-com.svg" alt="worm"></img>',
    ];

    if (fall) {
      fall = false;
      imgElement.classList.add("falling");
      if (
        divElement.classList.contains("gridSpecial") ||
        divElement.classList.contains("gridSpecialThre")
      ) {
        wegetables[i].addEventListener("animationend", () => {
          imgElement.classList.remove("falling");
          imgSpan[i].classList.add("showItem");
          imgSpan[i].innerHTML = worm[0];
        });
      }
    }

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList" && mutation.target === subtext) {
          imgSpan[i].classList.remove("showItem");
          imgSpan[i].classList.add("rotateWorm");
          console.log(wegetables[i]);
        }
      });
    });

    const config = { childList: true, subtree: true };

    observer.observe(subtext, config);
  });
}
