'use strict';

// Modules
const electron = require('electron');

// Module immutable assignment
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// If we pass in -dev to the runtime, we will open a debugger and show
// the menu.
const devMode = !!(process.argv.filter(function(arg){
  return arg == "-dev";
}).length);

app.on('ready', function(){
  var window = new BrowserWindow({
    'width': 800,
    'height': 600
  });

  if(devMode){
    window.webContents.openDevTools();
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
