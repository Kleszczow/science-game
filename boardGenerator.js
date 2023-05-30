const container = document.querySelector(".container");
const subtext = document.querySelector(".subtext");
const wining = document.querySelector(".wining");
const resetGame = document.querySelector("#resetGame");
const resetGameLost = document.querySelector("#resetGameLost");
const lost = document.querySelector(".lost");
const inputValue = document.querySelector("#inputValue");
const questionP = document.querySelector(".questionP");
const submit = document.querySelector("#submit");
const inputFail = document.querySelector("#inputFail");
const leaderboard = document.querySelector("#leaderboard");
const rules = document.querySelector("#rules");
const body = document.getElementsByTagName("body");
const leaderboardDiv = document.querySelector(".leaderboardDiv");
const emptyResolut = document.querySelector("#emptyResolut");
const stats = document.querySelector(".stats");
const carrotInHand = document.querySelector("#carrotInHand");
const statsistic = document.querySelector("#statsistic");
const staisicDiv = document.querySelector(".staisicMath");
const statisticWorng = document.querySelector(".statisticWorng");
const emptyStats = document.querySelector("#emptyStats");
const rulesDiv = document.querySelector(".rulesDiv");
const reportBug = document.querySelector("#reportBug");
const main = document.querySelector("body > main");
const buttons = document.querySelector("#buttons");
const bugDiv = document.querySelector(".bugDiv");
const leadybird = document.querySelector(".leadybird");

let data = { bugs: 1, rows: 4, cols: 5 };

//creates any number of grids

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

//adds "infected" tiles to random tiles

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
winerBugs = false;

container.style.pointerEvents = "auto";
submit.disabled = true;

//analyzes the clicked field

const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.add("clicked");
    oneAnswer = true;
    if (answer) {
      fall = true;
      answer = false;
      if (element.classList.contains("gridSpecial")) {
        elementArr.push(element);
        showQuestion(element);
        nextQuest();
        container.style.pointerEvents = "none";
        submit.disabled = false;
      }
      if (element.classList.contains("gridSpecialThre")) {
        elementArr.push(element);
        showQuestion(element);
        nextQuest();
        container.style.pointerEvents = "none";
        submit.disabled = false;
      }
      if (
        !element.classList.contains("gridSpecial") &&
        !element.classList.contains("gridSpecialTwo") &&
        !element.classList.contains("gridSpecialThre")
      ) {
        answer = true;
        fall = true;
        oneAnswer = true;
        container.style.pointerEvents = "auto";
        submit.disabled = true;
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
    if (element.classList.contains("gridSpecialTwo")) {
      answer = true;
      fall = false;
    }
  });
});

const nextQuest = () => {
  let newQuestion = randomQuestion();
  quest = newQuestion.quest;
  solution = newQuestion.solution;
  questionP.innerHTML = quest;
};

//generate mutation and push it to the array in object [{quest: '1 x 1', solution: 1}]

const allQuestion = [];
const finalLength = 10;

for (let i = 1; i <= 10; i++) {
  let j = 1;
  if (allQuestion.length >= finalLength) {
    j + 1;
  }
  for (j = 1; ; j++) {
    const person = {};

    person.quest = `${i} x ${j}`;
    person.solution = i * j;
    allQuestion.push(person);
    if (j >= 10) {
      break;
    }
  }
}

//generate random quest from allQuestion

const randomQuestion = () => {
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

//checks whether the answer given in the input field is correct

const checkQuestion = () => {
  let number = getValue();
  let element = elementArr.slice(-1);
  let lastElement = element[0];
  container.style.pointerEvents = "auto";
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
        wining.classList.add("fadeIn");
      }
    } else {
      wrongSolution();
      getStatistic(number);
      container.style.pointerEvents = "auto";
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

const submnitFuncion = () => {
  if (oneAnswer) {
    if (inputValue.value.length === 0) {
      console.log("Pole input jest puste!");
      inputFail.innerHTML = "input is empty";
    } else {
      container.style.pointerEvents = "auto";
      inputFail.innerHTML = "";
      oneAnswer = false;
      checkQuestion();
      submit.disabled = true;
    }
  }
};

submit.addEventListener("click", submnitFuncion);
inputValue.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    submnitFuncion();
  }
});

const winGame = () => {
  if (winerBugs) {
    wining.style.display = "none";
  } else {
    wining.style.display = "flex";
  }
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
      !item.classList.contains("gridSpecialThre") &&
      !item.classList.contains("clicked")
    ) {
      index.push(i);
    }
  }

  givClass(index);
  return index;
};

//moves the infected field to another possible location after a wrong answer
let allResoluts = [];

const givClass = (index) => {
  const randomIndex = Math.floor(Math.random() * index.length);
  const position = index[randomIndex];
  const changePosition = gridItems[position];
  try {
    changePosition.classList.add("gridSpecialThre");
  } catch (error) {
    lostGame();
    allResoluts.push(bugs);
    newResolut();
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

//generates random vegetables and enters them into grid fields

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
      "gridSpecialThre",
      "clicked"
    );
    wegetables[i].classList.remove("falling");
  }

  resetImg();
  replayGameWin();
  generateImg();
});

const replayGameWin = () => {
  bugs++;
  indexArr.length = 0;
  special(bugs);
  scores = bugs;
  wining.style.display = "none";
  subtext.innerHTML = `Bugs Left: ${scores}`;
  if (bugs > 19) {
    winerBugs = true;
  }
};

const replayGameLost = () => {
  indexArr.length = 0;
  bugs = 1;
  special(bugs);
  scores = bugs;
  subtext.innerHTML = `Bugs Left: ${scores}`;
  lost.style.display = "none";
  leaderboard.style.display = "block";
};

resetGameLost.addEventListener("click", () => {
  const gridItems = document.querySelectorAll(".grid-item");
  const wegetables = document.querySelectorAll(".wegetables");
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].classList.remove(
      "gridSpecial",
      "gridSpecialTwo",
      "gridSpecialThre",
      "clicked"
    );
    wegetables[i].classList.remove("falling");
  }
  resetImg();
  replayGameLost();
  generateImg();
});

for (let i = 0; i < gridItems.length; i++) {
  let divElement = gridItems[i];
  divElement.addEventListener("click", function () {
    let divElement = gridItems[i];
    let wegetables = document.querySelectorAll(".wegetables");
    let imgElement = divElement.querySelector("img");
    let imgSpan = document.querySelectorAll(".imgSpan");
    const worm = [
      '<img class="wegetables" src="./pictures/aniamls/bug-svgrepo-com.svg" alt="worm"></img>',
    ];
    if (fall) {
      fall = false;
      imgElement.classList.add("falling");
      if (
        divElement.classList.contains("gridSpecial") ||
        divElement.classList.contains("gridSpecialThre")
      ) {
        wegetables[i].addEventListener("animationend", () => {
          container.style.pointerEvents = "none";
          imgElement.classList.remove("falling");
          imgSpan[i].classList.add("showItem");
          imgSpan[i].innerHTML = worm[0];
        });
      }
    }

    //after correcting the given answer, it removes the worm from the "infected" field

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList" && mutation.target === subtext) {
          container.style.pointerEvents = "auto";
          imgSpan[i].classList.remove("showItem");
          imgSpan[i].classList.add("rotateWorm");
        }
      });
    });

    const config = { childList: true, subtree: true };

    observer.observe(subtext, config);
  });
}

//regenerates vegetables after the end of the round

const resetImg = () => {
  const newSpan = document.querySelectorAll(".imgSpan");
  const gridItems = document.querySelectorAll(".grid-item");
  for (let i = 0; i < gridItems.length; i++) {
    newSpan[i].remove();
  }
  container.style.pointerEvents = "auto";
};

leaderboard.addEventListener("click", () => {
  leaderboardDiv.classList.toggle("show");
});

//creating a scoreboard

let allItems = 0;

const newResolut = () => {
  allItems++;
  if (allResoluts.length > 0) {
    allResoluts.forEach((element) => {
      emptyResolut.style.display = "none";
      let list = document.createElement("div");
      stats.appendChild(list).classList = "newContent";
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0");

      list.innerHTML = `You scored ${element} points at ${currentHour}:${currentMinute}!`;
      allResoluts.length = 0;
    });
  }
  if (allItems >= 7) {
    const firstItem = document.querySelectorAll(".newContent");
    firstItem[0].remove();
  }
};

//Adds animations to the farmer

inputValue.addEventListener("input", () => {
  const animations = [
    "carotMoveOne",
    "carotMoveTwo",
    "carotMoveThre",
    "carotMoveFour",
  ];
  const randomNumber = Math.floor(Math.random() * animations.length);
  let randomAnimation = animations[randomNumber];
  if (carrotInHand.classList.length <= 0) {
    carrotInHand.classList.add(randomAnimation);
    carrotInHand.addEventListener("animationend", () => {
      carrotInHand.classList.remove(randomAnimation);
    });
  }
});

//animation of bug

setInterval(() => {
  const animationsBug = ["leadybirdOne", "leadybirdTwo"];

  const randomNumber = Math.floor(Math.random() * animationsBug.length);
  let randomAnimation = animationsBug[randomNumber];
  leadybird.classList.add(randomAnimation);
  leadybird.addEventListener("animationend", () => {
    leadybird.classList.remove(randomAnimation);
  });
}, 25000);

//Updating stats

const wrongAnsewer = [];

const getStatistic = (number) => {
  const wrongScores = {};
  wrongScores.question = quest;
  wrongScores.userAnswer = number;
  wrongScores.corectAnswer = solution;
  wrongAnsewer.push(wrongScores);
};

const showStatistic = () => {
  if (wrongAnsewer.length > 0) {
    emptyStats.style.display = "none";

    let wrongAnswerList = document.querySelector(".newContent");

    if (!wrongAnswerList) {
      wrongAnswerList = document.createElement("div");
      statisticWorng.appendChild(wrongAnswerList).classList = "newContent";
    }

    wrongAnswerList.innerHTML = "";

    wrongAnsewer.forEach((element) => {
      let wrongAnswerItem = document.createElement("div");
      wrongAnswerList.appendChild(wrongAnswerItem);
      wrongAnswerItem.innerHTML = `The question is <span id="questSpan">${element.question}</span> correct answer it <span id="corectSpan">${element.corectAnswer}</span> and your answer is <span id="incorectSpan">${element.userAnswer}</span>`;
    });
    const divHeight = staisicDiv.offsetHeight;
    const answerDiv = wrongAnswerList.offsetHeight;
    if (answerDiv > divHeight - 100) {
      wrongAnswerList.style.overflow = "auto";
    }
  }
};

statsistic.addEventListener("click", () => {
  staisicDiv.classList.toggle("show");
  showStatistic();
});

rules.addEventListener("click", () => {
  rulesDiv.classList.toggle("show");
});
reportBug.addEventListener("click", () => {
  main.classList.toggle("hide");
  buttons.style.display = "none";
  bugDiv.classList.toggle("show");
});
