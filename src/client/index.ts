import { connect, play } from "./networking";
import { startRendering, stopRendering } from "./render/render";
import { startCapturingInput, stopCapturingInput } from "./input";
import { downloadAssets } from "./assets";
import { initState } from "./state";

import "./css/main.css";

const playMenu = document.getElementById("play-menu")!;
const playButton = document.getElementById("play-button")!;
const usernameInput = document.getElementById("username-input") as HTMLInputElement;

function onGameOver() {
  stopCapturingInput();
  stopRendering();
  playMenu.classList.remove("hidden");
  usernameInput.focus();
}

Promise.all([connect(onGameOver), downloadAssets()]).then(() => {
  playMenu.classList.remove("hidden");
  usernameInput.focus();
  playButton.onclick = () => {
    play(usernameInput.value);
    playMenu.classList.add("hidden");
    initState();
    startCapturingInput();
    startRendering();
  };
});
