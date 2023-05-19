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

special(95);

//jezeli pole zostało klikniete'
const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.classList.contains("gridSpecial")) {
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
  let responder = array.solution;
  const answer = prompt(`${question} is?`);
  if (answer == responder) {
    console.log(`congrats: solution ${responder} you type ${answer}`);
    element.classList.remove("gridSpecial");
  } else {
    console.log(`try again: solution ${responder} you type ${answer}`);
    wrongSolution();
    element.classList.remove("gridSpecial");
  }
};
const wrongSolution = () => {
  const randomIndex = Math.floor(Math.random() * gridItems.length);
  const changePosition = gridItems[randomIndex];
  if (
    changePosition.classList.contains("gridSpecial") ||
    changePosition.classList.contains("gridSpecialThre")
  ) {
    changePosition.classList.add("gridSpecialThre");
    wrongSolution();
  } else {
    console.log(`2`);
    changePosition.classList.add("gridSpecialTwo");
  }
};

//sprawdzić czy div ma klase gridSpecial
//jezeli nie to doda do niego klase
//sprawdzić czy nie jest to ten sam div
