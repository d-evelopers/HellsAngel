'use strict';

// Modules
const Electron = require('electron');
const fs = require('fs');
const path = require('path');

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

/*
 * When we get a request-script request-script request from the
 * client, we want to try and read it in and send the contents back.
 */
ipc.on("request-script", function(e, script){
  fs.readFile(path.join(__dirname, "scripts", script.replace(/\.{2,}/g, ".")), function(err, data){
    if(!err){
      e.sender.send("script-response", data);
    } else {
      console.error("Failed to open file requested by client:", script, "\n", err);
    }
  });
});

/*
 * When we get a "flags" request, we will send back an object
 * containing a select number of flags from the main process
 */
ipc.on("flags", function(e){
  e.sender.send("flags", {
    'devMode': devMode
  });
});

  });

/*
 * Loads the main game window, and calls back anything that tried to
 * require this file with it
 */
app.on('ready', function(){
  let window = new BrowserWindow({
    'width': config.width,
    'height': config.height
  });

  /*
   * In the event the user is in dev mode, drop to the REPL in
   * dev-tools.js
   */
  if(devMode){
    require('./dev-tools')({
      'app': app,
      'ipc': ipc,
      'window': window,
      'BrowserWindow': BrowserWindow
    });
  } else {
    window.setMenu(null);
  }

  window.loadURL("file://" + __dirname + "/interface/interface.html");

  window.on('closed', function(){
    window = null;
  });
});
