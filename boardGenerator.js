const container = document.querySelector(".container");
const subtext = document.querySelector(".subtext");

const makeRows = (rows, cols) => {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    cell.innerText = i + 1;
    container.appendChild(cell).className = "grid-item";
  }
};

makeRows(6, 5);

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
let bugs = 5;
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
  const array = randomQuestion();
  const question = array.quest;
  const responder = array.solution;
  const answer = prompt(`${question} is?`);
  if (answer == responder) {
    console.log(`congrats: solution ${responder} you type ${answer}`);
    element.classList.remove("gridSpecial");
    element.classList.add("gridSpecialTwo");
    if (element.classList.contains("gridSpecialThre")) {
      element.classList.remove("gridSpecialThre");
      element.classList.add("gridSpecialTwo");
    }
    scores--;
    subtext.innerHTML = `Bugs Left: ${scores}`;
    if (scores == 0) {
      alert("you win");
      container.setAttribute("disabled", "true");
    }
  } else {
    console.log(`try again: solution ${responder} you type ${answer}`);
    wrongSolution();
    element.classList.remove("gridSpecial");
    element.classList.add("gridSpecialTwo");
    if (element.classList.contains("gridSpecialThre")) {
      element.classList.remove("gridSpecialThre");
      element.classList.add("gridSpecialTwo");
    }
  }
};

const wrongSolution = () => {
  const index = [];
  for (let i = 0; i < gridItems.length; i++) {
    if (!gridItems[i].classList.contains("gridSpecial")) {
      if (!gridItems[i].classList.contains("gridSpecialTwo")) {
        if (!gridItems[i].classList.contains("gridSpecialThre")) {
          index.push(i);
          continue;
        }
      }
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

//problem z niebieskim divem nie ma obslugi poprawnosic odpiwedzi!!!
