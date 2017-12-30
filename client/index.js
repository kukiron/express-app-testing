document.addEventListener("DOMContentLoaded", () => {
  selectors.teamsPerMatch.addEventListener("keyup", submitOnEnter);
  selectors.numberOfTeams.addEventListener("keyup", submitOnEnter);
  selectors.startButton.addEventListener("click", handleTournament, false);
});

function submitOnEnter(e) {
  if (e.which === 13) {
    selectors.startButton.click();
  }
}

function handleTournament() {
  const teamsPerMatch = parseInt(selectors.teamsPerMatch.value);
  const numberOfTeams = parseInt(selectors.numberOfTeams.value);

  const render = new Render();
  render.renderMsg("");
  render.reset();

  if (isNaN(teamsPerMatch) || isNaN(numberOfTeams)) {
    render.renderMsg(ERRORS.NO_INPUT);
  } else if (teamsPerMatch <= 1) {
    render.renderMsg(ERRORS.INVALID_TEAM_NUMBER);
  } else {
    const newTournament = new Tournament(teamsPerMatch, numberOfTeams);
    newTournament.runSimulation();
  }
}
