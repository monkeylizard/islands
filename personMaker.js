var coordToPixels = function (coords) {
    var yCo = coords[0] * 20 + 10;
    var xCo = coords[1] * 20 + 10;
    return [yCo, xCo];
}

function human(world) {
    this.world = world;
    this.yCo = this.world.spawns[0][0];
    this.xCo = this.world.spawns[0][1];
    this.y = coordToPixels(this.world.spawns[0])[0] + 10;
    this.x = coordToPixels(this.world.spawns[0])[1] + 10;
    this.body = this.world.svg.append("circle")
        .attr("cy", this.y)
        .attr("cx", this.x)
        .attr("r", 9)
        .attr("fill", "#E0701B");
    this.moveLeft = function() {
  if (this.xCo > 0) {
      if (this.world.chart[this.yCo][this.xCo-1] === 1) { 
    this.x -=20;
    this.xCo -= 1;
    this.body.transition().attr("cx", player.x).attr("cy", player.y);
      }
  }
    }
    this.moveRight = function() {
  if (this.xCo < this.world.width) {
      if (this.world.chart[this.yCo][this.xCo+1] === 1) { 
    this.x +=20;
    this.xCo +=1;
    this.body.transition().attr("cx", player.x).attr("cy", player.y);
      }
  }
    }
    this.moveUp = function() {
  if (this.yCo > 0) {
      if (this.world.chart[this.yCo-1][this.xCo] === 1) { 
    this.y -=20;
    this.yCo -=1;
    this.body.transition().attr("cx", player.x).attr("cy", player.y);
      }
  }
    }
    this.moveDown = function() {
  if (this.yCo < this.world.height) {
      if (this.world.chart[this.yCo+1][this.xCo] === 1) { 
    this.y +=20;
    this.yCo +=1;
    this.body.transition().attr("cx", player.x).attr("cy", player.y);
      }
  }
    }
}
