'use strict';

const Electron = require('electron');
const repl = require('repl');
const fs = require('fs');

const BrowserWindow = Electron.BrowserWindow;

const defaultContext = {
  /**
   * The neat reaction editor. Call it and you will get a new reaction
   * editor window to play with.
   */
  'reactionEditor': function(){
    let editor = new BrowserWindow({
      'width': 800,
      'height': 600
    });

    editor.loadURL("file://" + __dirname + "/interface/editor.html");
  },
  'help': function(){
    console.log("Available variables are are: " + Object.keys(this).filter(
      key => typeof this[key] !== 'function'
    ).join(", ") + ".\n\nAvailable functions are: " + Object.keys(this).filter(
      key => typeof this[key] === 'function'
    ).join("(), ") + "().");
  }
};

// No garbage collection please
var replContext = null;

module.exports = function(context){
  console.log("Welcome to Hell's Angel Developer mode.\n");
  console.log("You can get a list of available functions and variables you can play with by");
  console.log("typing help().\n");

  replContext = repl.start({
    'prompt': "Hells Angel> ",
    'input': process.stdin,
    'output': process.stdout
  }).context;

  for(let i in defaultContext){
    replContext[i] = defaultContext[i].bind(replContext);
  }

  for(let i in context){
    replContext[i] = context[i];
  }

  return replContext;
};
