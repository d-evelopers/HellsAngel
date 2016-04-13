'use strict';

module.exports = class Interface {
  /**
   * Displays a message in the message dialogue.
   *
   * @param <String>: The text to display in the buffer.
   */
  static showMessage(text){
    let messages = document.getElementById("messages");
    let lines = messages.getElementsByTagName('p');
    let arrowBox = document.getElementById('arrowbox');

    arrowBox.className = "hidden";
    messages.className = "visible";

    if(lines.length < 2){
      let element = document.createElement('p');
      element.textContent = text;
      messages.appendChild(element);

      arrowBox.className = '';
    } else {
      setTimeout(function(){
        let target = lines[0];
        target.className = "removed";
        messages.removeChild(target);
        Interface.showMessage(text);
      }, 300);
    }
  }

  /**
   * Hides the message dialogue from the interface..
   */
  static hideMessages(){
    let messages = document.getElementById("messages");
    messages.className = "";
    messages.innerHTML = "";
    document.getElementById('arrowbox').className = 'hidden';
  }
};
