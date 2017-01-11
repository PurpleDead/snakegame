var scl;

var snake;
var cobra;
var food = [];

function setup() {

  createCanvas(2700, 990);

  scl = 30;

  snake = new Snake();
  cobra = new Snake();

  for(var i = 0; i < 2; i ++) {
    food.push(new Food());
    food[i].new_pos();
  }

  frameRate(10);

}

function draw() {

  background(51);

  for(var i = 0; i < food.length; i ++) {
    food[i].show();
  }

  snake.update();
  snake.show();

  cobra.update();
  cobra.show();

  for(var i = 0; i < food.length; i ++) {
    snake.eat(food[i]);
    cobra.eat(food[i]);
  }
}

function keyPressed() {

  snake.change_dir("W", "D", "S", "A", key);

  cobra.change_dir(UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW, keyCode);

}
