'use strict';

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

/**
 * Traverses up the DOM, until it finds an element that matches the
 * passed-in selector.
 */
function closest(element, selector){
  var parent = element.parentElement;
  if(!parent){
    return element;
  }

  return parent.matches(selector) ? parent : closest(parent, selector);
}

/**
 * Fetches a snippet from the page source. Snippets are script tags of
 * the type "snippet".
 *
 * @param <String>: The name of the snippet to fetch.
 * @returns the contents of the snippet.
 */
function getSnippet(name){
  var selector = "script[type='snippet'][data-name='" + encodeURIComponent(name) + "']";
  var element = document.createElement('div');

  element.innerHTML =  $$(selector)[0].innerHTML;
  return element.children[0];
}
