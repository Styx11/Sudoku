function KeyboardManager (bus) {
  this.bus = bus;
  this.listen();
}
KeyboardManager.prototype.listen = function () {
  var _this = this;
  var maps = {
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9
  }

  document.addEventListener('keydown', function (e) {
    var modifier = e.ctrlKey || e.altKey || e.shiftKey || e.metaKey;
    var map = maps[e.keyCode];

    if (!modifier && map) {
      _this.bus.$emit('inputNum', map);
      e.preventDefault();
    }
  })
}