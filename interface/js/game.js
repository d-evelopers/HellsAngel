'use strict';

// The modules
const ipc = require('electron').ipcRenderer;
const display = require('./display');

const DevilGirl = require('./classes/DevilGirl');

const girl = new DevilGirl();

/**
 * Handles the parsing and playing of story script files.
 *
 * @param script: An object with a toString() containing a valid story
 * script.
 */
function playScript(script){
  JSON.parse(script.toString()).forEach(function(line){
    let text = line.text;

    display.setName(line.name);
    display.showMessage(text.shift(), (function next(line){
      register(function(){
        registered = null;
        if(text.length){
          display.showMessage(text.shift(), next);
        } else {
          display.hideMessages();
        }
      });
    }));
  });
}


// Populating game data from the server...eventually
ipc.on('devil-girl-reactions', function(event, reactions){
  girl.addReactions(reactions);
});

// Getting story information from the server
ipc.on('script-response', function(e, script){
  playScript(script);
});

/*
 * Function registration occurs here. nextAction() will call whatever
 * is in this variable, (To progress text, or have-at-you) and
 * nextAction() is called by clicking the screen.
 */
var registered;
function register(callback){
  registered = callback;
}

function nextAction(){
  if(typeof registered === 'function'){
    registered();
  }
}

module.exports = function(flags){
  // Warning about no scenario, because there is no story yet.
  ipc.send('request-script', flags.devMode ? "dev-mode.json" : "empty.json");

  // Clicking the body should trigger the nextAction() function.
  bind("body", function(){
    nextAction();
  });
};
