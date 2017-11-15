class Tournament {
  constructor(teamsPerMatch, numberOfTeams) {
    this.teamsPerMatch = teamsPerMatch;
    this.numberOfTeams = numberOfTeams;
  }

  async runSimulation() {
    const render = new Render(this.getRounds());
    const numberOfRounds = this.getNumberOfRounds();

    if (numberOfRounds == null || numberOfRounds <= 0) {
      render.renderMsg(ERRORS.INVALID_ROUND_NUMBER);
    } else {
      render.drawMatches();

      const newTournament = await TournamentAPI.createTournament(
        this.teamsPerMatch,
        this.numberOfTeams
      );
      const tournamentId = newTournament.tournamentId;
      const currentMatchUps = newTournament.matchUps;

      const teamsManager = new TeamsManager();
      const roundManager = new RoundsManager(
        tournamentId,
        currentMatchUps,
        this.teamsPerMatch,
        teamsManager,
        render
      );

      await roundManager.runMatchUps();
      const winner = teamsManager.findTeam(roundManager.winner);
      render.showWinner(winner.name);
    }
  }

  getRounds() {
    let roundsArr = [];
    let numberOfTeams = this.numberOfTeams;

    while (numberOfTeams % this.teamsPerMatch === 0) {
      numberOfTeams /= this.teamsPerMatch;

      let round = [];
      for (let i = 0; i < numberOfTeams; i++) {
        round.push(i);
      }
      roundsArr.push(round);
    }

    return roundsArr;
  }

  getNumberOfRounds() {
    let rounds = 1;
    let teamCount;

    for (
      teamCount = this.teamsPerMatch;
      teamCount < this.numberOfTeams;
      teamCount *= this.teamsPerMatch
    ) {
      rounds++;
    }

    return teamCount === this.numberOfTeams ? rounds : null;
  }
}
