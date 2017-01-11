function Snake() {

  this.head = [floor(random(width/scl)) * scl, floor(random(height/scl)) * scl];
  this.body = [];
  this.color = 'purple';
  this.vel_x = 0;
  this.vel_y = 0;
  this.sen = 0;

  this.grow = function() {
    var x;
    var y;
    var length = this.body.length;

    if (length >= 2) {
      x = (this.body[length - 1][0]) - (this.body[length - 2][0]);
      y = (this.body[length - 1][1]) - (this.body[length - 2][1]);
    }else if (length == 1) {
      x = (this.body[0][0]) - (this.head[0]);
      y = (this.body[0][1]) - (this.head[1]);
    }else {
      x = this.head[0] - (this.head[0] * this.vel_x);
      y = this.head[1] - (this.head[1] * this.vel_y);
    }

    this.body.push([x, y]);
  }



  this.update = function() {
    if(this.body.length > 0){
      for(var i = this.body.length - 1; i >= 0; i--) {
        if(i != 0){
          this.body[i][0] = this.body[i - 1][0];
          this.body[i][1] = this.body[i - 1][1];
        }else {
          this.body[i][0] = this.head[0];
          this.body[i][1] = this.head[1];
        }
      }
    }

    this.head[0] = this.head[0] + this.vel_x * scl;
    this.head[1] = this.head[1] + this.vel_y * scl;

    if(this.head[0] > width - scl) this.head[0] = 0;
    if(this.head[1] > height - scl) this.head[1] = 0;

    if(this.head[0] <  0) this.head[0] = width;
    if(this.head[1] < 0) this.head[1] = height;
  }



  this.show = function() {
    if(this.body.length > 0) {
      for(var i = this.body.length - 1; i >= 0; i--){
        this.coloring(0.01);
        fill(this.r, this.g, this.b);
        rect(this.head[0], this.head[1], scl, scl);
        rect(this.body[i][0], this.body[i][1], scl, scl);
      }
    }else {
      this.coloring(0.01);
      fill(this.r, this.g, this.b);
      rect(this.head[0], this.head[1], scl, scl);
    }
  }



  this.dir = function(vel_x, vel_y) {
    this.vel_x = vel_x;
    this.vel_y = vel_y;
  }



  this.eat = function(food) {

    d = dist(food.x, food.y, this.head[0], this.head[1]);

    if(d < scl) {
      this.grow();
      food.new_pos();
    }
  }



  this.collides = function() {
    if(this.body.length > 0){
      for(var i = 0; i < this.body.length; i++){
        for(var j = 0; j < this.body.length; j++){
          d1 = dist(this.body[i][0], this.body[i][1], this.body[j][0], this.body[j][1]);
          d2 = dist(this.body[i][0], this.body[i][1], this.head[0], this.head[1]);

          if((d1 < scl || d2 < scl) && i != j){
            return true;
          }
        }
      }
    }
  }



  this.vel = function(x, y) {
    return (this.vel_x == x && this.vel_y == y);
  }



  this.coloring = function(f) {
    this.r = sin(f * this.sen + 0) * 127 + 128;
    this.g = sin(f * this.sen + 2 * PI / 3) * 127 + 128;
    this.b = sin(f * this.sen + 4 * PI / 3) * 127 + 128;

    this.sen ++;

    if(this.sen * f >= 2 * PI) this.sen = 0;
  }



  this.change_dir = function (up, right, down, left, key_press) {
    if(key_press === up && !(this.vel(0, 1))){
      this.dir(0, -1);
    }

    else if(key_press === right && !(this.vel(-1, 0))){
      this.dir(1, 0);
    }

    else if(key_press === down && !(this.vel(0, -1))){
      this.dir(0, 1);
    }

    else if(key_press === left && !(this.vel(1, 0))){
      this.dir(-1, 0);
    }
  }
}
