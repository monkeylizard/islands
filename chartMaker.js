var chart2 = [
                        [1,0,0,0,0,1,0,1,0],
                        [0,1,1,0,0,1,0,1,1],
                        [0,0,1,0,1,1,0,1,1],
                        [0,0,0,1,1,1,0,1,0],
                        [0,0,0,0,0,1,0,1,1]
            ]


var randInt = function (min, max) {
    return Math.floor(Math.random()*(max-min) + min);
}

var newChart = function (height, width) {
    var chart = []
    for (i = 0; i < height; i++) {
	var row = []
	for (j = 0; j < width; j++) {
	    row.push(0);
	}
	chart.push(row)
    }
    return chart
}

var getNeighbors = function(chart, point) {
    var height = chart.length;
    var width = chart[0].length;
    var nbrs = [];
    if (point[1] > 0) {
	nbrs.push([point[0], point[1]-1]);
    }
    else {
	nbrs.push(false);
    }
    if (point[1] < width-1) {
	nbrs.push([point[0], point[1]+1]);
    }
    else {
	nbrs.push(false);
    }
    if (point[0] > 0) {
	nbrs.push([point[0]-1, point[1]]);
    }
    else {
	nbrs.push(false);
    }
    if (point[0] < height-1) {
	nbrs.push([point[0]+1, point[1]]);
    }
    else {
	nbrs.push(false);
    }
    return nbrs;  
}

var makeIsland = function (chart, weight) {
    var damping = 1.0;
    var height = chart.length;
    var width = chart[0].length;
    var nexus = [randInt(2,height-2), randInt(2,width-2)]
    var island = [nexus]
    while (damping > 0.1) {
	for (i = 0; i < island.length; i++) {
	    nbrs = getNeighbors(chart, island[i]);
	    for (j = 0; j < nbrs.length; j++) {
		if (nbrs[j]) {
		    if (Math.random() < damping * weight) {
			island.push(nbrs[j]);
		    }
		}
	    }
	}
	damping = damping * 0.88;
    }
    return [island, nexus];
}


var addIslands = function (chart, islands) {
    for (i = 0; i < islands.length; i++) {
	for (j = 0; j < islands[i].length; j++) {
	    var y = islands[i][j][0];
	    var x = islands[i][j][1];
	    chart[y][x] = 1;
	}
    }
    return chart;
}

var makeCave = function (chart, weight) {
    var height = chart.length;
    var width = chart[0].length;
    var point1 = [randInt(2,height-2), randInt(2,width-2)];
    var point2 = [randInt(2,height-2), randInt(2,width-2)];
    var cave = [point1,point2];
    var check = false;
    var count = 0
    caveVec = [point2[0]-point1[0],point2[1]-point2[0]];
    vLen = Math.sqrt(caveVec[0]*caveVec[0] + caveVec[1]*caveVec[1]);
    unVec = [caveVec[0]/vLen, caveVec[1]/vLen];
    for (i = 0; i < vLen; i++) {
	a = [Math.floor(point1[0] + unVec[0]*i), Math.floor(point1[1] + unVec[1]*i)];
	cave.push(a);
    }
    l = cave.length;
    for (i = 0; i < l; i++) {
	n = getNeighbors(chart,cave[i]);
	for (j = 0; j < n.length; j++) {
	    if (n[j] !== false) {
		cave.push(n[j]);
	    }
	}
    }
    return cave;
}




function world(height, width) {
    this.height = height;
    this.width = width;
    this.svg = d3.select("body")
                        .append("svg")
                        .attr("height", this.height*20+10)
                        .attr("width", this.width*20+10)
                        .attr("id", "svgMain")
                        .style("background", "#9CB4D6");
    this.chart = newChart(this.height, this.width);
    this.islands = [];
    this.spawns = [];
    this.spawn = [0,0];
    this.makeIslands = function (numIslands, islandMaker) {
	for (x = 0; x < numIslands; x++) {
	    var island = islandMaker(this.chart, Math.random()/10 + 0.07);
	    this.islands.push(island[0]);
	    this.spawns.push(island[1]);
	}
    };
    this.addIslands = function () {
	for (i = 0; i < this.islands.length; i++) {
	    for (j = 0; j < this.islands[i].length; j++) {
		var y = this.islands[i][j][0];
		var x = this.islands[i][j][1];
		this.chart[y][x] = 1;
	    }
	}
    };
    }

