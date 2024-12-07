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

let circles = [];  // Store gray circles for averaging later
let clusters = {};  // Store cluster references
let counter = 0;

// Function to create and animate gray circles
function createCircle(index) {
  var circle = container.children.push(
    am5.Circle.new(root, {
      radius: 5,            // Smaller circle size
      fill: am5.color(0xCCCCCC),  // Gray color
      x: am5.percent(50),   // Start at center
      y: am5.percent(50)
    })
  );

  circles.push(circle);

  setTimeout(() => {
    let randomX = Math.random() * 100;
    let randomY = Math.random() * 100;

    circle.animate({
      key: "x",
      to: am5.percent(randomX),
      duration: 2000 + index * 10,
      easing: am5.ease.out(am5.ease.quad)
    });

    circle.animate({
      key: "y",
      to: am5.percent(randomY),
      duration: 2000 + index * 10,
      easing: am5.ease.out(am5.ease.quad)
    });

    if (index === 49) {
      setTimeout(createRedCircle, 2500);  // Trigger after animation
    }
  }, 500);  // Delay before animation
}

// Create red circle with fade-in
function createRedCircle() {
  let sumX = 0, sumY = 0;

  circles.forEach(circle => {
    sumX += circle.x();
    sumY += circle.y();
  });

  let avgX = sumX / circles.length;
  let avgY = sumY / circles.length;

  let redCircle = container.children.push(
    am5.Circle.new(root, {
      radius: 10,            // Bigger size
      fill: am5.color(0xFF0000),  // Red color
      x: avgX,
      y: avgY,
      opacity: 0
    })
  );

  redCircle.animate({
    key: "opacity",
    to: 1,              
    duration: 1000,     
    easing: am5.ease.out(am5.ease.cubic)
  });

  setTimeout(() => splitRedCircle(avgX, avgY, redCircle), 1500);  // Split after fade-in
}


function splitRedCircle(x, y, redCircle) {
  // Instantly remove the red circle
  container.children.removeValue(redCircle);

  // Create the green and blue circles at the red circle's position
  clusters.green = container.children.push(
    am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(0x00FF00),  // Green
      x: x,
      y: y
    })
  );

  clusters.blue = container.children.push(
    am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(0x0000FF),  // Blue
      x: x,
      y: y
    })
  );

  // Animate the green circle outward
  clusters.green.animate({
    key: "x",
    to: x + 20,              // Move right
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });

  clusters.green.animate({
    key: "y",
    to: y - 20,              // Move up
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });

  // Animate the blue circle outward
  clusters.blue.animate({
    key: "x",
    to: x - 20,             // Move left
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });

  clusters.blue.animate({
    key: "y",
    to: y + 20,             // Move down
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });

  // Proceed to cluster assignment after animation
  setTimeout(assignClusters, 1500); 
}




// Calculate Euclidean distance
function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

// Assign circles to clusters
function assignClusters() {
  let greenGroup = [];
  let blueGroup = [];

  circles.forEach(circle => {
    const x = circle.x();
    const y = circle.y();

    const distToGreen = distance(x, y, clusters.green.x(), clusters.green.y());
    const distToBlue = distance(x, y, clusters.blue.x(), clusters.blue.y());

    if (distToGreen < distToBlue) {
      greenGroup.push(circle);
    } else {
      blueGroup.push(circle);
    }
  });

  animateClustersAndCircles(greenGroup, blueGroup);
}

// Move clusters and change circles' colors simultaneously
function animateClustersAndCircles(greenGroup, blueGroup) {
  let greenX = 0, greenY = 0;
  let blueX = 0, blueY = 0;

  greenGroup.forEach(c => {
    greenX += c.x();
    greenY += c.y();
  });

  blueGroup.forEach(c => {
    blueX += c.x();
    blueY += c.y();
  });

  if (greenGroup.length > 0) {
    greenX /= greenGroup.length;
    greenY /= greenGroup.length;

    clusters.green.animate({
      key: "x",
      to: greenX,
      duration: 1500,
      easing: am5.ease.out(am5.ease.cubic)
    });

    clusters.green.animate({
      key: "y",
      to: greenY,
      duration: 1500,
      easing: am5.ease.out(am5.ease.cubic)
    });

    greenGroup.forEach(circle => {
      circle.animate({
        key: "fill",
        to: am5.color(0x00FF00),  // Green color
        duration: 1500,
        easing: am5.ease.out(am5.ease.cubic)
      });
    });
  }

  if (blueGroup.length > 0) {
    blueX /= blueGroup.length;
    blueY /= blueGroup.length;

    clusters.blue.animate({
      key: "x",
      to: blueX,
      duration: 1500,
      easing: am5.ease.out(am5.ease.cubic)
    });

    clusters.blue.animate({
      key: "y",
      to: blueY,
      duration: 1500,
      easing: am5.ease.out(am5.ease.cubic)
    });

    blueGroup.forEach(circle => {
      circle.animate({
        key: "fill",
        to: am5.color(0x0000FF),  // Blue color
        duration: 1500,
        easing: am5.ease.out(am5.ease.cubic)
      });
    });
  }

  // Proceed to split clusters after assignment
  setTimeout(splitClusters, 1500);
}

// Function to split clusters and animate
function splitClusters() {
  // Remove old clusters
  container.children.removeValue(clusters.green);
  container.children.removeValue(clusters.blue);

  // Create new clusters from Green
  clusters.yellow = container.children.push(
    am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(0xFFFF00), // Yellow
      x: clusters.green.x(),
      y: clusters.green.y()
    })
  );

  clusters.magenta = container.children.push(
    am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(0xFF00FF), // Magenta
      x: clusters.green.x(),
      y: clusters.green.y()
    })
  );

  // Create new clusters from Blue
  clusters.black = container.children.push(
    am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(0x000000), // Black
      x: clusters.blue.x(),
      y: clusters.blue.y()
    })
  );

  clusters.orange = container.children.push(
    am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(0xFFA500), // Orange
      x: clusters.blue.x(),
      y: clusters.blue.y()
    })
  );

  // Animate splitting
  animateSplit(clusters.yellow, clusters.green.x() + 15, clusters.green.y() - 15);
  animateSplit(clusters.magenta, clusters.green.x() - 15, clusters.green.y() + 15);
  animateSplit(clusters.black, clusters.blue.x() + 15, clusters.blue.y() - 15);
  animateSplit(clusters.orange, clusters.blue.x() - 15, clusters.blue.y() + 15);

  // Proceed with reassignment after split
  setTimeout(reassignClusters, 1500); 
}

// Animation function for cluster splitting
function animateSplit(cluster, targetX, targetY) {
  cluster.animate({
    key: "x",
    to: targetX,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });

  cluster.animate({
    key: "y",
    to: targetY,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });
}

// Function to reassign circles to nearest cluster
function reassignClusters() {
  const clusterList = [clusters.yellow, clusters.magenta, clusters.black, clusters.orange];
  const assignments = { yellow: [], magenta: [], black: [], orange: [] };

  // Assign circles to nearest clusters
  circles.forEach(circle => {
    const distances = clusterList.map(cluster => ({
      cluster,
      distance: distance(circle.x(), circle.y(), cluster.x(), cluster.y())
    }));

    const nearest = distances.reduce((a, b) => (a.distance < b.distance ? a : b));
    assignments[nearest.cluster === clusters.yellow ? "yellow" :
                nearest.cluster === clusters.magenta ? "magenta" :
                nearest.cluster === clusters.black ? "black" : "orange"].push(circle);
  });

  // Move clusters and change colors
  animateClustersAndCircles2(assignments);
}

// Reuse this function to animate movement and color change
function animateClustersAndCircles2(assignments) {
  for (const [key, group] of Object.entries(assignments)) {
    if (group.length === 0) continue;

    // Calculate new cluster center
    let avgX = group.reduce((sum, c) => sum + c.x(), 0) / group.length;
    let avgY = group.reduce((sum, c) => sum + c.y(), 0) / group.length;

    // Move cluster to new center
    clusters[key].animate({
      key: "x",
      to: avgX,
      duration: 1500,
      easing: am5.ease.out(am5.ease.cubic)
    });

    clusters[key].animate({
      key: "y",
      to: avgY,
      duration: 1500,
      easing: am5.ease.out(am5.ease.cubic)
    });

    // Change color of assigned circles
    group.forEach(circle => {
      circle.animate({
        key: "fill",
        to: clusters[key].get("fill"),  // Color of the cluster
        duration: 1500,
        easing: am5.ease.out(am5.ease.cubic)
      });
    });
  }
  counter++;
  if (counter < 10) {
    setTimeout(reassignClusters, 1500);
  }
}



for (let i = 0; i < 50; i++) {
  createCircle(i);
}
