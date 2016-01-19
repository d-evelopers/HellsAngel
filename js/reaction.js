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
      default:
    }
  });
}, 'onload');
