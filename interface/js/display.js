'use strict';

/**
 * Displays a message in the message dialogue.
 *
 * @param <String>: The text to display in the buffer.
 */
module.exports.showMessage = function(text){
  let messages = document.getElementById("messages");
  let arrowBox = document.getElementById("arrowbox");
  let element = document.createElement("p");

  element.textContent = text;
  messages.insertBefore(element, messages.querySelector("p"));
  messages.className = "visible";
  arrowBox.className = "";
};


/**
 * Hides the message dialogue from the interface..
 */
module.exports.hideMessages = function(){
  let messages = document.getElementById("messages");
  let arrowBox = document.getElementById("arrowbox");

  messages.className = "";
  messages.innerHTML = "";
  arrowBox.className = "hidden";
};
