'use strict';

/**
 * Actors will be everyting in the world that can react in some way to
 * something... They don't always have to be human, they just need to
 * have reactions.
 */
module.exports = class Actor {
  /**
   * The constructor for an Actor, the only thing this populates is an
   * empty "reactions" field.
   */
  constructor(){
    this.reactions = {};
  }

  /**
   * Adds reactions that the Actor can utilize.
   *
   * @param <Object>: The object with the keys being a reaction type,
   * and the array it is attached to is the arrays of quotes the
   * things the Actor can say things from.
   *
   * For example:
   *
   *   {'pat-on-head': [
   *      ["What are you doing?", "...", "Do you enjoy this?"],
   *      ["Ok..", "Again?"],
   *      ["That feels nice!", "Mmmmm!"]
   *   ]}
   */
  addReactions(reaction){
    for(var type in reaction){
      this.reactions[type] = reaction[type];
    }
  }

  /**
   * Pulls a random element from the passed-in array.
   *
   * @param <Array>: The array to pick from.
   * @returns a random element from said Array.
   */
  pick(array){
    return array ? array[Math.floor(Math.random() * array.length)] : null;
  }

  /**
   * Fetches a random reaction for the passed-in intensity level in
   * the specified section of the quotes object.
   *
   * @param <String>: Which kind of action should the quote be fetched
   * for?
   * @param <Number>: What is the intensity of the reaction we want?
   *
   * @return <String>: a random reaction according to the current
   * intensity and the passed-in action.
   */
  getReaction(type, intensity){
    intensity = intensity || 0;
    let quotes = this.reactions[type];
    let index = Math.round(Math.random()) + Math.floor(intensity / 100);

    return this.pick(quotes[Math.min(quotes.length - 1, index)]);
  }

  /**
   * @return <String>: a JSON version of the fields of this Actor
   * object.
   */
  save(){
    return JSON.stringify(this);
  }

  /**
   * Restores the state of this Actor from an object created by
   * calling JSON.parse() on the return of save().
   *
   * @param <Object>: An object with keys referring to the state of
   * the Actor you want to restore.
   */
  restore(state){
    for(var i in state){
      this[i] = state[i];
    }
  }
};
