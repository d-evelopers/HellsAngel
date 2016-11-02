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
 * When we get a script to write with content, we write the file, then
 * depending on the success, we write back either a "write-status"
 * with a true or false value and the script name,
 *
 * A write fail includes a fourth piece of data, which is the error
 * that occured.
 */
ipc.on("write-script", function(e, script, content){
  let name = path.join(__dirname, "scripts", script.replace(/\.{2,}/g, ".") + ".json");

  fs.writeFile(name, content, function(err){
    if(!err){
      e.sender.send("write-status", true, script);
    } else {
      e.sender.send("write-status", false, script, e);
      console.error("Failed to write the script:", script, "\n", err);
    }
  });
});

/*
 * When we get a deletion request, whelp, gg script.
 *
 * It deletes the script from the sciprts folder.
 */
ipc.on("delete", function(e, script){
  fs.unlink(path.join(__dirname, "scripts", script.replace(/\.{2,}/g, ".")), function(){
    e.sender.send("deleted", script);
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

/*
 * When we get a "scripts" request, we should spit out the ".json"
 * files in the "scripts" folder.
 *
 * If there is an error reading this, we just return as if there are
 * no files to work with.
 */
ipc.on("scripts", function(e){
  fs.readdir(path.join(__dirname, "scripts"), function(err, scripts){
    e.sender.send("scripts", err ? [] : scripts.filter(function(script){
      return /\.json$/.test(script);
    }).map(function(script){
      return script.replace(/\.json$/, "");
    }));
  });
});

/*
 * Allow those who require this file to have access to the window
 * object via a callback.
 */
let callback;
exports = function(fn){
  callback = fn;
};

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

  // If we require this file, we can play with the window instance.
  if(typeof callback === 'function'){
    callback(window);
  }
});
