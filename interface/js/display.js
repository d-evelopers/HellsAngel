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
module.exports.showMessage = function(text, callback){
  let element = document.createElement("p");
  element.textContent = text;
  element.style.visibility = "hidden";

  messages.appendChild(element);
  arrowBox.className = "hidden";

  let width = element.offsetWidth;
  element.style.width = "0px";
  element.style.visibility = "visible";
  element.style.transition = "width " + (width/400) + "s linear";

  element.addEventListener('transitionend', function once(){
    arrowBox.className = "";
    element.removeEventListener('transitionend', once);
    callback.call(element, text);
  });

  messageBox.className = "visible";

  setTimeout(function(){
    element.style.width = width + "px";
  }, messages.children.length == 1 ? 500 : 100);
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
