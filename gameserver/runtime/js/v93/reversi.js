exports.Action = function(){
  var self = {};
    self.code = 'NONE';
    self.x = -1;
    selfy = -1;

  self.putDisk = function(x, y) {
    this.code = "PUT_DISK"
    this.x = x
    this.y = y
  }

  return self;
}
