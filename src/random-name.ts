
import { players } from './players.js'
import { firstNames, lastNames } from './names'
//console.log(firstNames, lastNames)
const queryFirstNameInput = document.querySelector(".first-nickname-input") as HTMLInputElement;
const queryLastNameInput = document.querySelector(".second-nickname-input") as HTMLInputElement;
function randomNickname(e) {
  let FirstRanNum: number = Math.floor(Math.random() * 59);
  let SecRanNum: number = Math.floor(Math.random() * 59);

  if (e.target.getAttribute("id") == "1") {
    players.player_1.nickname = `${firstNames[FirstRanNum]} ${lastNames[SecRanNum]}`;
    queryFirstNameInput.value = players.player_1.nickname;
  } else {
    players.player_2.nickname = `${firstNames[FirstRanNum]} ${lastNames[SecRanNum]}`;
    queryLastNameInput.value = players.player_2.nickname;

  }
}
export {randomNickname};