export const inTeam = (userId: string, teamId: string) => {
  // not in team -> return 0
  // in team -> return 1
  // captain -> return 2

  const userTeamId = "userTeamId"; // call api to get userTeamId
  if (userTeamId !== teamId) return 0;

  const captainId = "captainId"; // call api to get captainId
  if (userId === captainId) return 2;

  return 1;
};

export const isUser = (thisUserId: string, userId: string) => {
  // not user -> return 0
  // is user -> return 1
  const user = thisUserId; // call api to get user
  if (userId === user) return 1;
  return 0;
};
