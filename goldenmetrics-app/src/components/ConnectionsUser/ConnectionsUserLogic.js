const connectionsUserLogic = (usersLoaded, id) => {
  const userSelected = usersLoaded.filter(userId => userId.id === id);
  const nameSelected = userSelected[0].name;
  const avatar = userSelected[0].avatar;
  const userIdConnections = userSelected[0].connections;
  const userConnections = [];
  for (let i = 0; i < userIdConnections.length; i++) {
    if (usersLoaded.find(x => x.id === userIdConnections[i])) {
      userConnections.push(
        usersLoaded.find(x => x.id === userIdConnections[i])
      );
    }
  }
  const sortedUserConnections = userConnections.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  return {nameSelected, avatar, sortedUserConnections};
};

export default connectionsUserLogic;
