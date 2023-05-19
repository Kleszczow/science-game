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
  const gridItems = document.querySelectorAll(".grid-item");
  let indexArr = [];
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

special(10);

//jezeli pole zostało klikniete'
const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.classList.contains("gridSpecial")) {
      showQuestion();
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

const showQuestion = () => {
  const array = randomQuestion();
  const question = array.quest;
  let responder = array.solution;
  const answer = prompt(`${question} is?`);
  if (answer == responder) {
    console.log(`congrats: solution ${responder} you type ${answer}`);
  } else {
    console.log(`try again: solution ${responder} you type ${answer}`);
  }
};
