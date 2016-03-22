'use strict';

bind(window, function(){
  document.querySelector("input").focus();

  // The editor bindings
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

  // The save button
  bind("#save", function(){
    var reactions = {};
    var name = document.querySelector('.name').value;

    reactions[name] = $$(".level").map(function(level){
      return Array.prototype.map.call(level.querySelectorAll("input"), function(input){
        return input.value;
      });
    });

    var link = document.createElement('a');
    link.download = name + ".json";
    link.href = "data:text/json;charset=utf-8," + escape(JSON.stringify(reactions));
    link.click();
  });

  // The new window button
  bind("#new", function(){
    window.open(window.location.href);
  });

  // The open file dialog
  bind("div.open", function(e){
    var reader = new FileReader();

    reader.onload = function(){
      var reactions = JSON.parse(reader.result);
      var name = Object.keys(reactions)[0];
      var levels = document.querySelector('.levels');
      var fileDiv = document.querySelector('div.open');

      levels.innerHTML = '';
      fileDiv.innerHTML = fileDiv.innerHTML;

      document.querySelector(".name").value = name;

      reactions[name].forEach(function(reactions){
        var level = getSnippet('level');

        reactions.forEach(function(reaction){
          var reactionElement = getSnippet('reaction');
          reactionElement.querySelector('input').value = reaction;
          level.querySelector('.reactions').appendChild(reactionElement);
        });

       var emptyRow = level.querySelector(".reactions > li");
       emptyRow.parentElement.removeChild(emptyRow);

        levels.appendChild(level);
      });
    };

    reader.readAsText(e.target.files[0]);
  }, "onchange");
}, 'onload');
