Color = {Red : 0xFF0000, Green : 0x00FF00, Blue : 0x0000FF};
index = {1: "Red", 2: "Green", 3: "Blue", 4: "White"};
console.log(Color[index[1]]); // 16711680
Color[index[4]] = 200;
console.log(Color); // 200
