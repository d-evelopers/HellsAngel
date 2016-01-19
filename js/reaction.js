'use strict';

bind(window, function(){
  document.querySelector("input").focus();

  bind("#editor", function(e){
    switch(true){
      case (e.target.matches(".delete")):
        closest(e.target, "ul").removeChild(closest(e.target, "li"));
        break;

      case (e.target.matches(".addReaction")):
        let target = e.target.parentElement.querySelector(".reactions");
        target.appendChild(getSnippet('reaction'));
        target.querySelector("li:last-of-type > input").focus();
        break;

      case (e.target.matches(".addLevel")):
        e.target.parentElement.querySelector(".levels").appendChild(getSnippet('level'));
        document.querySelector(".level:last-of-type input").focus();
        break;

      default:
    }
  });

  bind("#save", function(){
    var reactions = {};

    reactions[document.querySelector('.name').value] = $$(".level").map(function(level){
      return Array.prototype.map.call(level.querySelectorAll("input"), function(input){
        return input.value;
      });
    });

    var link = document.createElement('a');
    link.download = "reactions.json";
    link.href = "data:text/json;charset=utf-8," + escape(JSON.stringify(reactions));
    link.click();
  });

  bind("#new", function(){
    window.open(window.location.href);
  });
}, 'onload');
