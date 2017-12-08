class TournamentAPI {
  static encodeItem(arr) {
    let str = [];
    arr.forEach(e => {
      str.push(`${CONSTANTS.TEAMSCORES}=${encodeURIComponent(e)}`);
    });
    return str.join("&");
  }

  static async createTournament(teamsPerMatch, numberOfTeams) {
    let params = `teamsPerMatch=${teamsPerMatch}&numberOfTeams=${
      numberOfTeams
    }`;
    let req = new Request("/tournament", {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: params
    });

    try {
      let response = await fetch(req);
      return await response.json();
    } catch (err) {
      return err;
    }
  }

  static async getTeam(tournamentId, teamId) {
    let params = `tournamentId=${tournamentId}&teamId=${teamId}`;
    let req = new Request(`/team?${params}`, { method: "GET" });

    try {
      let response = await fetch(req);
      return await response.json();
    } catch (err) {
      return err;
    }
  }

  static async getMatchScore(tournamentId, round, match) {
    let params = `tournamentId=${tournamentId}&round=${round}&match=${match}`;
    let req = new Request(`/match?${params}`, { method: "GET" });

    try {
      let response = await fetch(req);
      return await response.json();
    } catch (err) {
      return err;
    }
  }

  static async getRoundWinner(tournamentId, teamScores, matchScore) {
    let params = `tournamentId=${tournamentId}&${teamScores}&matchScore=${
      matchScore
    }`;
    let req = new Request(`/winner?${params}`, { method: "GET" });

    try {
      let response = await fetch(req);
      return await response.json();
    } catch (err) {
      return err;
    }
  }
}
