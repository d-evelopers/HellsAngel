'use strict';

/**
 * The DevilGirl class, where all of the AI for the devil girl will
 * go.
 */
module.exports = class DevilGirl {
  /**
   * The constructor for DevilGirl objects, accepts an object with
   * keys pointing to array of arrays of quotes. As the DevilGirl gets
   * more and more of her mind back, the responses for various things
   * will be fetched further and further down the array.
   *
   * @param <Object>: The object of arrays of arrays of quotes to
   * fetch the things the devil girl says from. For example:
   *
   *   {
   *    'pat-on-head': [
   *      ["What are you doing?", "...", "Do you enjoy this?"],
   *      ["Ok..", "Again?"],
   *      ["That feels nice!", "Mmmmm!"]
   *    ],
   *    'talk': [
   *        etc...
   *    ]
   *  }
   *
   * Basically, the more affectionate, the further down the list of
   * arrays responses might come from for a particular section.
   */
  constructor(quotes){
    this.quotes = quotes;
    this.affection = 0;
  }

  /**
   * Pulls a random element from the passed-in array.
   *
   * @param <Array>: The array to pick from.
   * @returns a random element from said Array.
   */
  pick(array){
    return array[Math.round(Math.random() * array.length)];
  }

  /**
   * Fetches a random reaction for the current affection level in the
   * specified section of the quotes object.
   *
   * @param <String>: Which kind of action should the quote be fetched
   * for?
   * @return <String>: a random reaction according to the current
   * affection and the passed-in action.
   */
  getReaction(action){
    let quotes = this.quotes[action];
    let index = Math.round(Math.random()) + Math.floor(this.affection / 100);

    return this.pick(quotes[Math.min(quotes.length, index)]);
  }

  /**
   * @return <String>: a JSON version of the fields of this DevilGirl
   * object.
   */
  save(){
    return JSON.stringify(this);
  }

  /**
   * Restores the state of this DevilGirl from an object created by
   * calling JSON.parse() on the return of save().
   *
   * @param <Object>: An object with keys referring to the state of
   * this DevilGirl you want to restore.
   */
  restore(state){
    for(var i in state){
      this[i] = state[i];
    }
  }
};
