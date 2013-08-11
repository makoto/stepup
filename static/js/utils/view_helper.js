(function() {
  var ViewHelper = {
    formatTime: function(time){
      var total = Math.floor(parseFloat(time, 10)),
          minutes = Math.floor(total / 60),
          seconds = total - (60 * minutes)

      var pad = function (n) {
        var length = ("" + n).length
        if (length == 2) {
          return n
        } else {
          return "0" + n
        }
      }
      return [pad(minutes), pad(seconds)].join(':')
    }
  }
  App.ViewHelper = ViewHelper;
}());
