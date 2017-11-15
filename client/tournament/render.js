class Render {
  constructor(rounds) {
    this.rounds = rounds;
    this.matchNo = 0;
    this.tournamentBody = selectors.tournamentElem;
  }

  drawMatches() {
    let matchNo = 0;
    this.showSpinner();

    for (let round of this.rounds) {
      let roundDiv = document.createElement("div");
      roundDiv.className = "tournament__round";
      this.tournamentBody.appendChild(roundDiv);

      for (let match of round) {
        let matchDiv = document.createElement("div");
        matchDiv.setAttribute("id", `match ${matchNo}`);
        matchDiv.className = "tournament__match";
        roundDiv.appendChild(matchDiv);
        matchNo++;
      }
    }
  }

  fillMatches() {
    let matchDiv = document.getElementById(`match ${this.matchNo}`);
    matchDiv.className += " tournament__match--filled";
    this.matchNo++;
  }

  showWinner(winner) {
    selectors.winnerElem.innerHTML = winner;
    selectors.winnerCelebrate.style.display = "";
    this.hideSpinner();
  }

  renderMsg(message) {
    selectors.inputErrors.innerHTML = `${message}`;
    this.hideSpinner();
  }

  showSpinner() {
    selectors.spinner.style.display = "";
  }

  hideSpinner() {
    selectors.spinner.style.display = "none";
  }

  reset() {
    selectors.winnerElem.innerHTML = "";
    selectors.winnerCelebrate.style.display = "none";

    while (this.tournamentBody.firstChild) {
      this.tournamentBody.removeChild(this.tournamentBody.firstChild);
    }
    this.matchNo = 0;
  }
}
