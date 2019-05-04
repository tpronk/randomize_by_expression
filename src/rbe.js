import _ from 'underscore';
import jsep from 'jsep';
class rbe {
  /*
   * Randomizes a set of elements based on an expression. In this expression the following functions are supported:
   * - seq to keep a set of elements in the order specified
   * - rnd to randomize the order of a set of elements
   * - shu to randomize all elements
   * - one to randomly pick one out of a set of elements
   * For example: rnd(seq(b_1,b_2),c) will randomize b_1, b_2, and c, such that b_1 is always followed by b_2. Hence,
   * the two valid sequences that can be produced are: [b_1, b_2, c] and [c, b_1, b]
   * @param {string}  expression  expression describing the desired randomization
   * @returns {array} Randomization 
   */
  static randomizeExpression(expression, sets) { 
    sets = sets === undefined? {}: sets;
      
    // Randomizes tree nodes depending on callee: none, "rand", or else (assumed seq)
    var randomizeTree = function (subTree) {
      // No callee? Return elements of this subtree
      if (subTree["callee"] === undefined) {
        if (!sets.hasOwnProperty(subTree["name"])) {
          return (subTree["name"]);
        } else {
          return sets[subTree["name"]];
        }
      }
      // There is a callee, collect randomizeTree from arguments
      var result = [], i;
      switch (subTree["callee"]["name"]) {
        // collect subtree elements in sequence
        case "seq":
          for (i in subTree["arguments"]) {
            result.push(randomizeTree(subTree["arguments"][i], sets));
          }
          break;
        // randomize order of subtrees, but collect elements of randomized subtrees in sequence
        case "rnd":
          var randomSubTree = _.shuffle(subTree["arguments"]);
          for (i in randomSubTree) {
            result.push(randomizeTree(randomSubTree[i], sets));
          }
          break;        
        // collect subtree elements in sequence, then randomize them
        case "shu":
          for (i in subTree["arguments"]) {
            result.push(randomizeTree(subTree["arguments"][i], sets));
          }
          result = _.shuffle(_.flatten(result));
          break;
        // randomly pick one subtree, and collect its elements in sequence
        case "one":
          i = Math.floor(Math.random() * subTree["arguments"].length);
          result = randomizeTree(subTree["arguments"][i], sets);
          break;
      }
      return result;
    };

    var tree = jsep(expression);
    tree = randomizeTree(tree);
    tree = _.flatten(tree);
    return (tree);
  };

  /**
   * Creates a sequence of length length, filled with items, such that the number
   * of occurances of each item in the sequence is as similar as possible (differs
   * at most by 1 across items)
   * @param {Array}  items    Value to repeat
   * @param {int}    length   Length of desired sequence
   * @public
   */
  fill(items, length) {
     var result = [];
     var remaining = length;
     while (remaining > 0) {
        if (remaining >= items.length) {
           result = result.concat(JSON.parse(JSON.stringify(items)));
           remaining -= items.length;
        } else {
           items = _.shuffle(items);
           for (var i = 0; i < remaining; i++) {
              result.push(JSON.parse(JSON.stringify(items[i])));
           }
           remaining = 0;
        }
     }
     return result;
  }
}
export { 
    rbe
};
