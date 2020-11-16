# Travelling Salesman Problem with Hill Climbing and Genetic Algorithms

## General

Travelling Salesman problem (TSP) javascript implementation using hill climbing and genetic algorithms. Not really performant, mostly for educational purposes.

![demo](https://github.com/pgrigoruta/tsp-hillclimb-ga/blob/main/demo.gif?raw=true)


## Running

Click [here](https://pgrigoruta.github.io/tsp-hillclimb-ga/) for a live demo, or open index.html in your browser.

## Description

The program acccepts a number of point (cities) as an input and will generate a map based on them. Note that the actual city coordinates are randomyl generated. Then, the program will try to find the best cyclic path starting from 1, visting all cities once and then returing to 1. This is done both with hill climbing and genetic algorithms.

### General representation

We are storing the nodes (cities) as :

```javascript
{
    id: i, #uniqe id for the node, we use numbers from 1 to N 
    label: String(i), # same as Id for now
    x: this.randomIntFromInterval(-100,100), #x coordinate
    y: this.randomIntFromInterval(-100,100), # y coordinate
    color: '#666', # color for drawing
    size: 10 # size for drawing
}
```

[SigmaJs][http://sigmajs.org/] is used to render the graph, so the above format was tweaked a bit to fit Sigma well.

States are repsenting as strings:

```1-3-2-4-5-6-7-8-9-10-1```

They always represent complete tours and they always start and end with 1. 

Scoring is done by calculating the [Euclidean Distance](https://en.wikipedia.org/wiki/Euclidean_distance) between all steps, i.e. in the example above we would calulate it between 1 and 3, 3 an 2, 2 and 4 etc, then add them all up. Note that a high score means a bad solution.

### Hill climbing

Hill climbing needs only one specific parameter: number of iterations. In our instance we do not stop when we find a solution. All states are possible solutions, so we are looking for the best solution (smallest cost). Hence, we simply iterate through the algo a number of time, keeping the best solution and presenting it at the end, hoping that it's good enough.
