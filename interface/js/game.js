'use strict';

// The modules
const ipc = require('electron').ipcRenderer;

const Interface = require('./js/classes/Interface');
const DevilGirl = require('./js/classes/DevilGirl');

const girl = new DevilGirl();

// Populating game data from the server...eventually
ipc.on('devil-girl-reactions', function(event, reactions){
  girl.addReactions(reactions);
});

function playScript(script){
  JSON.parse(script.toString()).forEach(function(line){
    line.text.forEach(Interface.showMessage);
  });
}

ipc.on('script-response', function(e, script){
  playScript(script);
});

// Warning about no scenario, because there is no story yet.
bind(window, function(){
  ipc.send('request-script', "empty.json");
  bind("body", function(){
    Interface.hideMessages();
  });
}, 'onload');
