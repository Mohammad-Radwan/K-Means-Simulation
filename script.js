// Create root
var root = am5.Root.new("chartdiv");

// Apply themes
root.setThemes([am5themes_Animated.new(root)]);

// Create a container
var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.p100,
    height: am5.p100
  })
);

let nodes_ = []; 
let color = [0xFF0000, 0x00FF00, 0x0000FF, 0x000000, 0xFF00FF, 0xFFA500];
let centroids = {
                red :     createCircle(10, am5.color(0xFF0000), am5.percent(100), am5.percent(100)),
                green :   createCircle(10, am5.color(0x00FF00), am5.percent(100), am5.percent(100)),
                blue :    createCircle(10, am5.color(0x0000FF), am5.percent(100), am5.percent(100)),
                black :   createCircle(10, am5.color(0x000000), am5.percent(100), am5.percent(100)), 
                magenta : createCircle(10, am5.color(0xFF00FF), am5.percent(100), am5.percent(100)),
                orange :  createCircle(10, am5.color(0xFFA500), am5.percent(100), am5.percent(100))
              };  

let clusters = {
                red :     [],
                green :   [],
                blue :    [],
                black :   [],
                magenta : [],
                orange :  []
              };  

let index = {
            0 : "red",
            1 : "green",
            2 : "blue",
            3 : "black",
            4 : "magenta",
            5 : "orange"
            };

function createCircle(radius, color, x, y)
{
  var circle = am5.Circle.new(root, {
                              radius: radius,           
                              fill:   color,
                              x:      x,
                              y:      y
                                    });
  return circle;
}


function createNode() {
  node = createCircle(5, am5.color(0xCCCCCC), am5.percent(50), am5.percent(50));
  return node;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function intializeData(index) {
  node = createNode();
  container.children.push(node);

  nodes_.push(node);

  let randomX = Math.random() * 100;
  let randomY = Math.random() * 100;
  node.animate({
    key: "x",
    to: am5.percent(randomX),
    duration: 2000 + index * 10,
    easing: am5.ease.out(am5.ease.quad)
  });

  node.animate({
    key: "y",
    to: am5.percent(randomY),
    duration: 2000 + index * 10,
    easing: am5.ease.out(am5.ease.quad)
  });
}


function CalcCentroid(cluster) {
  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < cluster.length; i++) {
    sumX += cluster[i].x();
    sumY += cluster[i].y();
  }
  return [sumX / cluster.length, sumY / cluster.length];
}

function createClusterCentriod(centroid, X_start, Y_start, X_end, Y_end) 
{
  centroid.set("x", X_start);
  centroid.set("y", Y_start);

  container.children.push(centroid);

  centroid.animate({
    key: "x",
    to: X_start + (X_end),
    duration: 2000,
    easing: am5.ease.out(am5.ease.quad)
  });

  centroid.animate({
    key: "y",
    to: Y_start + (Y_end),
    duration: 2000,
    easing: am5.ease.out(am5.ease.quad)
  });
  
}

function assignCluster()
{
  for (let i = 0; i < nodes_.length; i++) 
    {
      let x = nodes_[i].x();
      let y = nodes_[i].y();
      let nearest_cluster = findNearestCluster(x, y);
      clusters[nearest_cluster].push(nodes_[i]);
    }
}

function findNearestCluster(x, y)
{
  let MinDis = 0;
  let Min = Number.MAX_VALUE;
  let dis = 0;
  let cluster_ = "";
  for (let i = 0; i < 6; i++) 
  {
    if (container.children.indexOf(centroids[index[i]]) !== -1)
      {
        dis = distance(x, y, centroids[index[i]].x(), centroids[index[i]].y());
        if (dis < Min) 
        {
          Min = dis;
          MinDis = i;
        }
      }
  }

  return index[MinDis];
}

function resetCentroids(centroid, cluster)
{
  let x, y;
  [x, y] = CalcCentroid(cluster);
  centroid.animate({
    key: "x",
    to: x,
    duration: 2000,
    easing: am5.ease.out(am5.ease.quad)
  });

  centroid.animate({
    key: "y",
    to: y,
    duration: 2000,
    easing: am5.ease.out(am5.ease.quad)
  });
  
}


function ChangeClusterColor(cluster, color)
{
  for (let i = 0; i < cluster.length; i++) 
  {
    cluster[i].animate({
      key: "fill",
      to: am5.color(color),
      duration: 2000,
      easing: am5.ease.out(am5.ease.quad)
    });
  }
}

function changeNodesColor()
{
  for (let i = 0; i < 6; i++) 
  {
    if (container.children.indexOf(centroids[index[i]]) !== -1)
    {
      ChangeClusterColor(clusters[index[i]], color[i]);
    }
  }
}


// Create 50 gray circles
for (let i = 0; i < 50; i++) {
  intializeData(i);
}
setTimeout(() => {
  let x, y;
  [x, y] = CalcCentroid(nodes_);
  createClusterCentriod(centroids.red, x, y, 20, -20);
  createClusterCentriod(centroids.green, x, y, -20, +20);
}, 3500);

setTimeout(() => {
  assignCluster();
  resetCentroids(centroids.red, clusters.red);
  resetCentroids(centroids.green, clusters.green);
  changeNodesColor();
}, 5500);



function Hello()
{
    // Create a label
  let label = am5.Label.new(root, {
    text: "Hello, amCharts!",
    fontSize: 25,
    fontWeight: "bold",
    centerX: am5.percent(50),
    centerY: am5.percent(50),
    x: am5.percent(50),
    y: am5.percent(50)
  });

  // Add label to the container
  container.children.push(label);

}