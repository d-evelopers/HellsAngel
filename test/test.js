var assert = require("chai").assert;

describe("Actor", function(){
  var Actor = require("../js/Actor");
  var actor = new Actor();

  it("should be initialized with an empty reaction object", function(){
    assert.lengthOf(Object.keys(actor.reactions), 0);
  });

  it("should be able to accept new reactions, and work with them", function(){
    actor.addReactions({'words': [
      ["A sentence"]
    ]});

    assert.lengthOf(Object.keys(actor.reactions), 1);
    assert.equal(actor.getReaction('words'), "A sentence");
  });

  it("should be able to accept more than one reaction object", function(){
    actor.addReactions({'other': [
      ["Something else"]
    ]});

    assert.lengthOf(Object.keys(actor.reactions), 2);
    assert.equal(actor.getReaction('words'), "A sentence");
    assert.equal(actor.getReaction('other'), "Something else");
  });
});

describe("DevilGirl", function(){
  var DevilGirl = require("../js/DevilGirl");
  var devilGirl = new DevilGirl();

  it("should be initialized with empty fields", function(){
    assert.lengthOf(Object.keys(devilGirl.reactions), 0);
    assert.equal(devilGirl.fear, 0);
    assert.equal(devilGirl.affection, 0);
    assert.equal(devilGirl.discipline, 0);
  });
});
