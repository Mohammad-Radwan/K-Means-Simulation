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

let nodes_ = [];  // Store gray circles for averaging later
let centroids = {
                red :     createCircle(12, am5.color(0xFF0000), am5.percent(50), am5.percent(50)),
                green :   createCircle(12, am5.color(0x00FF00), am5.percent(50), am5.percent(50)),
                blue :    createCircle(12, am5.color(0x0000FF), am5.percent(50), am5.percent(50)),
                black :   createCircle(12, am5.color(0x000000), am5.percent(50), am5.percent(50)), 
                magenta : createCircle(12, am5.color(0xFF00FF), am5.percent(50), am5.percent(50)),
                orange :  createCircle(12, am5.color(0xFFA500), am5.percent(50), am5.percent(50))
              };  // Store cluster references

let clusters = {
                red :     [],
                green :   [],
                blue :    [],
                black :   [],
                magenta : [],
                orange :  []
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

// Create 50 gray circles
for (let i = 0; i < 50; i++) {
  intializeData(i);
}
