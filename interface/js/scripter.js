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

    if(scene.character){
      var character = document.createElement('img');
      character.src = scene.character.src;
      character.className = 'sprite';
    }

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
    container.className = 'container scene';
    if(character){
      container.appendChild(character);
    }
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

/**
 * This function will return a JSON representation of this script that
 * can then be saved in a file that is loadable with loadScript();
 */
function buildScript(){
  return JSON.stringify($$("#editor .scene").map(function(scene){
    return {
      "name": scene.querySelector(".characterName").value,
      "character": {
        "src": scene.querySelector(".sprite").getAttribute("src"),
        "position": "left",
        "finish": "fade"
      },
      "text": Array.prototype.map.call(scene.querySelectorAll(".textList input"), function(text){
        return text.value;
      })
    };
  }));
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

/**
 * Get all available scritpts from the main process and pass them
 * through to the passed-in callback.
 *
 * @param <Function> callback (optional): The callback to pass the
 * list of scripts to, the context of this function will become the
 * event if you want to play with that as well.
 *
 * If no callback is specified, the results will just console.log().
 */
function getScripts(callback){
  ipc.once('scripts', function(event, scripts){
    (callback || function(scripts){
      console.log.apply(console, scripts);
    }).call(event, scripts);
  });

  ipc.send('scripts');
}

// As soon as the window finishes loading, request the default script.
bind(window, function(){
  requestScript("dev-mode.json");
}, 'onload');
