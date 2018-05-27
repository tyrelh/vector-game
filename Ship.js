
function Ship(layer,start_state,lag,c) {
    // instance variables
    this.c1 = c;
    this.r = 15;
    this.pos = createVector(width/2,height/2);
    this.pos_history = [];
    this.direction = 0;
    this.v = createVector(0,0);
    this.acc = 0;
    this.drag = lag;
    this.turn_rate = 0.13;
    this.state = start_state;
    this.visible = true;
    this.update_check = true;

    for (var i = 0; i < 4; i++) {
        this.pos_history.push(this.pos);
    }
    

    // add to draw layer
    layer.children.push(this);

    // draw to canvas
    this.draw = function() {
        if (this.visible) {

            push();
            translate(this.pos_history[2].x, this.pos_history[2].y);
            rotate(this.direction + PI/2);
            fill(color(0, 0, 200, 200));
            noStroke();
            triangle(-this.r,this.r-3,this.r,this.r-3,0,-this.r-3);
            pop();

            push();
            translate(this.pos_history[1].x, this.pos_history[1].y);
            rotate(this.direction + PI/2);
            fill(color(200, 0, 0, 200));
            noStroke();
            triangle(-this.r,this.r-3,this.r,this.r-3,0,-this.r-3);
            pop();
            //console.log(this.v);

            push();
            translate(this.pos.x, this.pos.y);
            rotate(this.direction + PI/2);
            fill(this.c1);
            noStroke();
            triangle(-this.r,this.r-3,this.r,this.r-3,0,-this.r-3);
            pop();
        }
    }

    // update ship logic
    this.update = function() {
        if (this.update_check) {
            this[this.state]();
        }
    }

    // motion
    this.moveState = function() {
        
        if (keyIsDown(LEFT_ARROW)) {
            this.turn(-this.turn_rate);
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.turn(this.turn_rate);
        } else if (keyIsDown(UP_ARROW)) {
            this.thrust();
        } else if (keyIsDown(DOWN_ARROW)) {
            this.deccel();
        }
        
        this.pos.add(this.v);
        this.v.mult(this.drag);
        this.checkEdges();

        this.pos_history.unshift(this.pos.copy());
        this.pos_history.splice(-1,1);
        
    }

    this.idleState = function() {

    }

    this.turn = function(angle) {
        this.direction += angle;
    }

    this.thrust = function() {
        this.acc = p5.Vector.fromAngle(this.direction);
        this.acc.mult(0.3);
        this.v.add(this.acc);
    }

    this.deccel = function() {
        this.acc = p5.Vector.fromAngle(this.direction);
        this.acc.mult(0.1);
        this.v.sub(this.acc);
    }

    this.checkEdges = function() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }
}