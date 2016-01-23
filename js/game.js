'use strict';

// The modules
const IPC = require('electron').ipcRenderer;
const DevilGirl = require('./js/DevilGirl');
const girl = new DevilGirl();

// Populating game data from the server...eventually
IPC.on('devil-girl-reactions', function(event, reactions){
  girl.addReactions(reactions);
});
