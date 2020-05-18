export default interface GameStateSchema {
  states: {
    waitPlayers: {};
    prepareGame: {};
    game: {
      states: {
        choiceWord: {};
        inputAssociations: {};
        filterAssociations: {};
        answering: {};
      };
    };
    showResult: {};
  };
}
