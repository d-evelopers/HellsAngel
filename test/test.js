var assert = require("chai").assert;

describe("DevilGirl", function(){
  var DevilGirl = require("../js/DevilGirl");
  var devilGirl = new DevilGirl();

  it("should be initialized with empty fields", function(){
    assert.lengthOf(Object.keys(devilGirl.reactions), 0);
    assert.equal(devilGirl.fear, 0);
    assert.equal(devilGirl.affection, 0);
    assert.equal(devilGirl.discipline, 0);
  });

  it("should be able to accept new reactions, and work with them", function(){
    devilGirl.addReactions({'words': [
      ["A sentence"]
    ]});

    assert.lengthOf(Object.keys(devilGirl.reactions), 1);
    assert.equal(devilGirl.getReaction('words'), "A sentence");
  });

  it("should be able to accept more than one reaction object", function(){
    devilGirl.addReactions({'other': [
      ["Something else"]
    ]});
    assert.lengthOf(Object.keys(devilGirl.reactions), 2);
    assert.equal(devilGirl.getReaction('words'), "A sentence");
    assert.equal(devilGirl.getReaction('other'), "Something else");
  });
});
