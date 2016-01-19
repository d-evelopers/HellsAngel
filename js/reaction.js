bind(window, function(){
  bind("#editor", function(e){
    switch(true){
      case (e.target.matches(".delete")):
        closest(e.target, "ul").removeChild(closest(e.target, "li"));
        break;
      case (e.target.matches(".addReaction")):
        e.target.parentElement.querySelector(".reactions").appendChild(getSnippet('reaction'));
        break;
      case (e.target.matches(".addLevel")):
        e.target.parentElement.querySelector(".levels").appendChild(getSnippet('level'));
      default:
    }
  });
}, 'onload');
