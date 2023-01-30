export const inTeam = async (userId: string, teamId: string) => {
  // not in team -> return 0
  // in team -> return 1
  // captain -> return 2
  let userTeamId = "";
  await fetch(`https://api.hacktues.bg/api/team/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      userTeamId = data.data;
    });

    if (userTeamId !== teamId) return 0;
  
  let captainId = "";
  await fetch(`https://api.hacktues.bg/api/team/${teamId}/captain`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      captainId = data.data;
      
    });
    
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
