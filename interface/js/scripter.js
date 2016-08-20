'use strict';

const ipc = require('electron').ipcRenderer;

/**
 * Given a parsed script, this function will attempt to load its
 * contents and generate editor elements for it that can be
 * appendChild'd to a section of the editor..
 *
 * @param <Object> script: The parsed script, as read by JSON.parse()
 */
function loadScript(script){
  return script.map(function(scene){
    var name = document.createElement('input');
    name.className = 'characterName';
    name.value = scene.name;

    var character = document.createElement('img');
    character.src = scene.character.src;
    character.className = 'sprite';

    var textList = document.createElement('ol');
    textList.className = 'textList';
    scene.text.forEach(function(line){
      var row = document.createElement('li');
      var text = document.createElement('input');

      text.value = line;
      row.appendChild(text);
      textList.appendChild(row);
    });

    var container = document.createElement('div');
    container.className = 'container';
    container.appendChild(character);
    container.appendChild(name);
    container.appendChild(textList);

    return container;
  });
}

/**
 * Requests a script from the main process.
 *
 * This function also sets the passed-in filename to the scriptName
 * input, and the response will automagically load the script into the
 * editor.
 *
 * @param <String> name: The filename of the script to load.
 */
function requestScript(name){
  ipc.send('request-script', name);
  document.getElementById("scriptName").value = name;
}

/**
 * Clears the script area.
 */
function clearScript(){
  document.getElementById('editor').innerHTML = "";
}

/*
 * When we get a response after requesting a script, we want to load
 * it right away!
 */
ipc.on('script-response', function(e, script){
  loadScript(JSON.parse(script)).forEach(function(node){
    document.getElementById('editor').appendChild(node);
  });
});

// As soon as the window finishes loading, request the default script.
bind(window, function(){
  requestScript("dev-mode.json");
}, 'onload');
