'use strict';

// Modules
const Electron = require('electron');
const fs = require('fs');

// Module immutable assignment
const app = Electron.app;
const BrowserWindow = Electron.BrowserWindow;
const IPC = Electron.ipcMain;

// If we pass in -dev to the runtime, we will open a debugger and show
// the menu.
const devMode = !!(process.argv.filter(function(arg){
  return arg == "-dev";
}).length);

// Read in the configuration
const config = JSON.parse(fs.readFileSync("config.json"));

app.on('ready', function(){
  var window = new BrowserWindow({
    'width': config.width,
    'height': config.height
  });

  if(devMode){
    let editor = new BrowserWindow({
      'width': config.width,
      'height': config.height
    });

    editor.loadURL("file://" + __dirname + "/editor.html");
  } else {
    window.setMenu(null);
  }

  window.loadURL("file://" + __dirname + "/interface.html");

  window.on('closed', function(){
    exports.window = null;
  });

  // If we require this file, we can play with the window instance.
  exports.window = window;
});
