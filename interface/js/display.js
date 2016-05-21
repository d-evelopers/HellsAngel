'use strict';

const messages = document.getElementById("messages");
const messageBox = document.getElementById("messagebox");
const arrowBox = document.getElementById("arrowbox");
const nameBox = document.getElementById("namebox");

/**
 * Displays a message in the message dialogue.
 *
 * @param <String>: The text to display in the buffer.
 */
module.exports.showMessage = function(text){
  let element = document.createElement("p");

  element.textContent = text;
  messages.insertBefore(element, messages.querySelector("p"));
  messageBox.className = "visible";
  arrowBox.className = "";
};

/**
 * Hides the message dialogue from the interface..
 */
module.exports.hideMessages = function(){
  messageBox.className = "";
  messages.innerHTML = "";
  arrowBox.className = "hidden";
  nameBox.className = "hidden";
};

/**
 * Sets the name on the text box to something.
 *
 * If set to nothing, the name field is hidden instead.
 */
module.exports.setName = function(name){
  if(name){
    nameBox.className = "";
    nameBox.textContent = name;
  } else {
    nameBox.className = "hidden";
  }
};
