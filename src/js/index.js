/*? no js js needed from me */
const board = document.querySelector(".board");
console.log(board);
function randomPosition() {
  return ~~(Math.random() * 15) + 1;
}

let config = {
  speed: 250,
  levelelem: 1, //milli second
  level: 1,
  player: {
    x: randomPosition(),
    y: randomPosition(),
  },
  food: {
    x: randomPosition(),
    y: randomPosition(),
  },
  velocity: {
    x: 0,
    y: 0,
  },
  showTitle1() {
    const title = document.getElementById("tittle1");
    title.style.opacity = "1";
    title.style.visibility = "visible";
    title.style.zIndex = "1";

    setTimeout(function () {
      title.style.opacity = "0";
      title.style.visibility = "hidden";
      title.style.zIndex = "-1";
    }, 500);
  },
  showTitle2() {
    const title = document.getElementById("tittle2");
    title.style.zIndex = "1";

    setTimeout(function () {
      title.style.zIndex = "-1";
    }, 500);
  },
  showTitle3() {
    const title = document.getElementById("tittle3");
    title.style.zIndex = "0";
    title.style.dipslay = "none";
    setTimeout(function () {
      title.style.zIndex = "1";
    }, 500);
  },
};

const games = {
  createFood() {
    board.innerHTML = `<div class="food" style="grid-area: ${config.food.y} / ${config.food.x}"></div>`;
  },
  createPlayer() {
    board.innerHTML += `<div class="player" id="player" style="grid-area: ${config.player.y} / ${config.player.x}"></div>`;
  },
  movePlayer() {
    config.player.x += config.velocity.x;
    config.player.y += config.velocity.y;
  },
  resetPlayerPosition() {
    if (
      config.player.x <= 0 ||
      config.player.x > 15 ||
      config.player.y <= 0 ||
      config.player.y > 15
    ) {
      document.getElementById("level").textContent ="level 1" 
      alert("Game Over")
      config.player.x = 7;
      config.player.y = 7;
      this.randomFoodPosition();
    }
  },
  levelUp() {
    config.level += 1;
    const levelElement = document.getElementById("level");
    levelElement.textContent = `Level: ${config.levelelem}`;

    if (config.level > 3) {
      config.levelelem++;
      levelElement.textContent = `Level: ${config.levelelem}`;
      config.level = 0;
    }
  },
  isWin() {
    if (
      config.player.x === config.food.x &&
      config.player.y === config.food.y
    ) {
      this.levelUp();
      return true;
    }
    return false;
  },
  randomFoodPosition() {
    config.food.x = randomPosition();
    config.food.y = randomPosition();
  },
};

function movement(listen) {
  switch (listen.key) {
    case "ArrowUp": //w
      config.velocity.y = -1;
      config.velocity.x = 0;
      break;
    case "ArrowDown": //s
      config.velocity.y = 1;
      config.velocity.x = 0;
      break;
    case "ArrowLeft": //a
      config.velocity.x = -1;
      config.velocity.y = 0;
      break;
    case "ArrowRight": //d
      config.velocity.x = 1;
      config.velocity.y = 0;
      break;
  }
}

function arrowClick(clickedElement) {
  switch (clickedElement.getAttribute("data-key")) {
    case "38": // up arrow
      config.velocity.y = -1;
      config.velocity.x = 0;
      break;
    case "40": // down arrow
      config.velocity.y = 1;
      config.velocity.x = 0;
      break;
    case "37": // left arrow
      config.velocity.x = -1;
      config.velocity.y = 0;
      break;
    case "39": // right arrow
      config.velocity.x = 1;
      config.velocity.y = 0;
      break;
  }
}

function headmovement() {
  const playerEL = document.getElementById("player");
  if (config.velocity.x == -1) playerEL.style.transform = "scaleX(-1)";
  if (config.velocity.y == -1) playerEL.style.transform = "rotate(-120deg)";
  if (config.velocity.x == 1) playerEL.style.transform = "scaleX(1)";
  if (config.velocity.y == 1) playerEL.style.transform = "rotate(120deg)";
}

function start() {
  games.createFood();
  games.createPlayer();
  games.movePlayer();
  headmovement();
  games.resetPlayerPosition();
  const win = games.isWin();
  if (win) {
    games.randomFoodPosition();
  }
  if (config.levelelem == 3) {
    config.showTitle1();
  } else if (config.levelelem == 2) {
    config.showTitle2();
  } else if (config.levelelem == 1) {
    config.showTitle3();
  }
}

setInterval(start, config.speed);
document.addEventListener("keydown", movement);

// const input = document.getElementById("input");
// const myhobby = document.getElementById("myhobby");
// const from = document.getElementById("from");
// const to = document.getElementById("to");

// let hobbyList = [];

// function gethobby() {
//   const hobby = input.value;
//   hobbyList.push(hobby);
//   console.log(hobbyList);
//   myhobby.innerHTML = hobbyList;
//   // return myhobby.value
// }

// function swich() {
//   const fr = from.value;
//   const to_ = to.value;
//   const temp = hobbyList[fr - 1];

//   hobbyList[fr - 1] = hobbyList[to_ - 1];
//   hobbyList[to - 1] = temp;
//   myhobby.innerHTML = hobbyList;
// }

// function checkuserinput(from,to){
//     if(from){
//         return
//     }
//     if()
// }
