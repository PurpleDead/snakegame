function Food() {
  this.color = 'white';

  this.show = function() {
    fill(this.color);
    rect(this.x, this.y, scl, scl);
  }


  this.new_pos = function() {
    this.x = floor(random(width/scl)) * scl;
    this.y = floor(random(height/scl)) * scl;
  }
}
