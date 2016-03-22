'use strict';

// The modules
const IPC = require('electron').ipcRenderer;
const DevilGirl = require('./js/classes/DevilGirl');
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

function showArrow(){
  document.getElementById('arrowbox').className = '';
}

function hideArrow(){
  document.getElementById('arrowbox').className = 'hidden';
}

// Warning about no scenario, because there is no story yet.
bind(window, function(){
  showMessage("Sorry to say, but there is no scenario for this game... (Yet!)");
  showMessage("Most new work is only visible in Developer mode. (Which you can get to with \"npm run dev\")");
  showArrow();

  bind("body", function(){
    hideArrow();
    hideMessages();
  });
}, 'onload');
