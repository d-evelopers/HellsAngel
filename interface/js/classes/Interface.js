'use strict';

module.exports = class Interface {
  /**
   * Displays a message in the message dialogue.
   *
   * @param <String>: The text to display in the buffer.
   */
  static showMessage(text){
    let messages = document.getElementById("messages");
    let arrowBox = document.getElementById("arrowbox");
    let element = document.createElement("p");

    element.textContent = text;
    messages.insertBefore(element, messages.querySelector("p"));
    messages.className = "visible";
    arrowBox.className = "";
  }

  /**
   * Hides the message dialogue from the interface..
   */
  static hideMessages(){
    let messages = document.getElementById("messages");
    let arrowBox = document.getElementById("arrowbox");

    messages.className = "";
    messages.innerHTML = "";
    arrowBox.className = "hidden";
  }
};
