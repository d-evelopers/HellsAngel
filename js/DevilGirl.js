'use strict';

const Actor = require("./Actor");

/**
 * The DevilGirl class, where all of the AI for the devil girl will
 * go. (Eventually)
 */
module.exports = class DevilGirl extends Actor {
  /**
   * The constructor for DevilGirl objects. Basically an Actor with
   * affection, fear, and discipline stats that the game will revolve
   * around.
   */
  constructor(){
    super();
    this.affection = 0;
    this.fear = 0;
    this.discipline = 0;
  }
};
