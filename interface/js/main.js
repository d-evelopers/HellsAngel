const ipc = require('electron').ipcRenderer;

bind(window, function(){
  ipc.on('flags', function(e, flags){
    require("./js/game")(flags);
  });

  ipc.send('flags');
}, 'onload');
