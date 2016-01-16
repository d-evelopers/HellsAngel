'use strict';

// The modules
const IPC = require('electron').ipcRenderer;
const DevilGirl = require('./js/DevilGirl');

// Populating game data from the server...eventually
IPC.on('devil-girl-quotes', function(event, quotes){
  const girl = new DevilGirl(quotes);
});

/**
 * Selects elements by selector and returns them in an Array.
 */
function $$(selector){
  return Array.apply(null, document.querySelectorAll(selector));
}

/**
 * Binds the target node, selector, or otherwise to the passed in
 * callback function without unbinding any previous callbacks.
 *
 * @param <String/Element/Array>: An array of elements, an element,
 * or a selector to bind to.
 * @param <Function>: A function to call when the specified event occurs.
 * @param <String> (optional): The name of the event to bind. By default
 * is "onclick"
 *
 * @return An array of all the elements bound. Useful for chaining.
 */
function bind(target, callback, event){
  var targets = typeof target === 'string' ? $$(target) : [].concat(target);
  event = event || "onclick";

  return targets.map(function(targ){
    targ[event] = targ[event] ? (function(previous){
      return function(){
        previous.apply(targ);
        callback.apply(targ);
      };
    })(targ[event]) : callback;
  });
}