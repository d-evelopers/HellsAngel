'use strict';

const ipc = require('electron').ipcRenderer;

function loadScript(script){
  return script.map(function(scene){
    var name = document.createElement('input');
    name.value = scene.name;

    var character = document.createElement('img');
    character.src = scene.character.src;

    var textList = document.createElement('ol');
    scene.text.forEach(function(line){
      var row = document.createElement('li');
      var text = document.createElement('input');

      text.value = line;
      row.appendChild(text);
      textList.appendChild(row);
    });

    var container = document.createElement('dev');
    container.appendChild(name);
    container.appendChild(character);
    container.appendChild(textList);

    return container;
  });
}

ipc.on('script-response', function(e, script){
  loadScript(JSON.parse(script)).forEach(function(node){
    document.getElementById('editor').appendChild(node);
  });
});

bind(window, function(){
  ipc.send('request-script', "dev-mode.json");
}, 'onload');
