const { deepEqual } = require("mathjs");

console.log((deepEqual(Array(9).fill(true), Array(9).fill(true))));
let a = Array(9).fill(false);
a[1] = true;

console.log(a.indexOf(true));

console.log([] == []);