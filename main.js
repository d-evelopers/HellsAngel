'use strict';

// Modules
const Electron = require('electron');
const fs = require('fs');

// Module immutable assignment
const app = Electron.app;
const ipc = Electron.ipcMain;
const BrowserWindow = Electron.BrowserWindow;

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
  } else {
    window.setMenu(null);
  }

  window.loadURL("file://" + __dirname + "/interface/interface.html");

  window.on('closed', function(){
    exports.window = null;
  });

  // If we require this file, we can play with the window instance.
  exports.window = window;
});

if(devMode){
  require('./dev-tools')({
    'app': app,
    'ipc': ipc,
    'BrowserWindow': BrowserWindow
  });
}
