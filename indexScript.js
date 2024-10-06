const introSound = new Audio("audio/intro.mp3");

document.addEventListener("mousemove", () => {
  introSound.play();
});

document.addEventListener("touchmove", () => {
  introSound.play();
});

let highScore = localStorage.getItem("highScore") || -1;
const highScoreElm = document.getElementById("high-score");
if (highScore !== -1) {
  if (highScore >= 10)
    highScoreElm.innerHTML = `Highest Score: ${highScore}/15`;
  else highScoreElm.innerHTML = `Highest Score: 0${highScore}/15`;
  highScoreElm.style.display = "block";
}
