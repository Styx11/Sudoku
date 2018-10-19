function Grid (size) {
  this.size = size ? size : 9;
  this.cells = [];
}
Grid.prototype.randomIndex = function (min, max) {
  if (!max) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}
Grid.prototype.shuffle = function (arr) {
  var length = arr.length,
    shuffled = new Array(length);
  for (var index=0; index<length; index++) {
    var random = this.randomIndex(0, index);
    if (random !== index) shuffled[index] = shuffled[random];
    shuffled[random] = arr[index];
  }
  return shuffled;
}