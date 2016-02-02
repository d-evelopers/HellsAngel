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
  messages.className = "visible";

  if(messages.getElementsByTagName('p').length < 2){
    let element = document.createElement('p');
    element.textContent = text;
    messages.appendChild(element);
  } else {
    messages.removeChild(messages.getElementsByTagName('p')[0]);
    showMessage(text);
  }
}

function hideMessages(){
  let messages = document.getElementById("messages");
  messages.className = "";
  messages.innerHTML = "";
}