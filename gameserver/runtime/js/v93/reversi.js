export class Action {
  constructor(){
    this.code = 'NONE';
    this.x = -1;
    this.y = -1;
  }

  putDisk(x, y) {
    this.code = "PUT_DISK"
    this.x = x
    this.y = y
  }
}
