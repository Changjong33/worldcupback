export class WorldCupMapper {
  static mapTeamSquad(team: any) {
    const grouped = {
      Goalkeeper: [],
      Defender: [],
      Midfielder: [],
      Attacker: [],
    };

    (team.squad || []).forEach((p: any) => {
      if (grouped[p.position]) {
        grouped[p.position].push(p);
      }
    });

    return {
      id: team.id,
      name: team.name,
      tla: team.tla,
      crest: team.crest,
      squad: grouped,
    };
  }

  static organizeGroups(standings: any[]) {
    const groups = {};
    standings.forEach((s) => {
      if (s.type === 'TOTAL') {
        groups[s.group] = s.table;
      }
    });
    return groups;
  }
}
