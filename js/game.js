'use strict';

// The modules
const IPC = require('electron').ipcRenderer;
const DevilGirl = require('./js/DevilGirl');

// Populating game data from the server...eventually
IPC.on('devil-girl-quotes', function(event, quotes){
  const girl = new DevilGirl(quotes);
});
