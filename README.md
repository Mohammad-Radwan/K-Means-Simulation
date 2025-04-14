# K-Means Clustering Visualization

An interactive web-based visualization of the K-Means clustering algorithm using amCharts. This visualization demonstrates how the K-Means algorithm organizes random data points into distinct clusters through multiple iterations.

## Overview

K-Means is one of the most popular unsupervised machine learning algorithms used for clustering data. This project provides a step-by-step visual demonstration of how K-Means works:

1. Random data points are generated and scattered across the visualization area
2. Initial centroids are placed strategically on the canvas
3. Points are assigned to their nearest centroid, forming initial clusters
4. Centroids are recalculated based on their assigned points
5. Multiple iterations of the algorithm are performed to refine clusters
6. Final clusters are displayed with distinct colors

## Features

- Animated visualization of the K-Means algorithm
- Multiple iterations showing how clusters evolve
- Color-coded points to indicate cluster membership
- Dynamic centroid recalculation and movement
- Smooth transitions between algorithm steps

## Demo

To run the demo:

1. Clone this repository
2. Open `index.html` in your web browser
3. Watch the K-Means clustering algorithm in action!

## Technical Implementation

The visualization is built using:

- HTML5/CSS3 for page structure and styling
- JavaScript for implementing the K-Means algorithm
- [amCharts 5](https://www.amcharts.com/docs/v5/) library for smooth animations and data visualization

## Code Structure

- `index.html`: Main HTML file to display the visualization
- `style.css`: Styling for the visualization
- `script.js`: Implementation of the K-Means algorithm and visualization logic

## Algorithm Details

The implementation follows these key steps:

1. **Initialization**: 50 random data points are generated
2. **Initial Centroid Placement**: Starting with 2 centroids, then expanding to 6
3. **Assignment**: Each point is assigned to the nearest centroid
4. **Update**: Centroids are recalculated based on the mean position of all points in their cluster
5. **Iteration**: Steps 3-4 are repeated for `NumOfIterations` (currently set to 10)

## Future Improvements

Potential enhancements for this project:

- Add user controls to adjust parameters (number of points, clusters, iterations)
- Implement different initialization methods (random, k-means++, etc.)
- Add metrics to show clustering quality
- Allow users to draw their own datasets
