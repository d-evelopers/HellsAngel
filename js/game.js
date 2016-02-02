'use strict';

// The modules
const IPC = require('electron').ipcRenderer;
const DevilGirl = require('./js/DevilGirl');
const girl = new DevilGirl();

// Populating game data from the server...eventually
IPC.on('devil-girl-reactions', function(event, reactions){
  girl.addReactions(reactions);
});

// Elements
function showMessage(text){
  let messages = document.getElementById("messages");
  let lines = messages.getElementsByTagName('p');

  messages.className = "visible";

  if(lines.length < 2){
    let element = document.createElement('p');
    element.textContent = text;

    messages.appendChild(element);
  } else {
    let target = lines[0];
    target.className = "removed";

    setTimeout(function(){
      messages.removeChild(target);
      showMessage(text);
    }, 300);
  }
}

function hideMessages(){
  let messages = document.getElementById("messages");
  messages.className = "";
  messages.innerHTML = "";
}
