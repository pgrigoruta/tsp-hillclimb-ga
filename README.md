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

[SigmaJs](http://sigmajs.org/) is used to render the graph, so the above format was tweaked a bit to fit Sigma well.

States are repsenting as strings:

```1-3-2-4-5-6-7-8-9-10-1```

They always represent complete tours and they always start and end with 1. 

Scoring is done by calculating the [Euclidean Distance](https://en.wikipedia.org/wiki/Euclidean_distance) between all steps, i.e. in the example above we would calulate it between 1 and 3, 3 an 2, 2 and 4 etc, then add them all up. Note that a high score means a bad solution.

### Hill climbing

Hill climbing needs only one specific parameter: number of iterations. In our instance we do not stop when we find a solution. All states are possible solutions, so we are looking for the best solution (smallest cost). Hence, we simply iterate through the algo a number of time, keeping the best solution and presenting it at the end, hoping that it is good enough.

Some rough measurements (in all cases, most found solutions are optimal/very good):

|Nodes|Iterations|Run time|
|-----|----------|--------|
|10   |10000     |0.9s    |
|15   |20000     |7s      |
|20   |40000     |44s     |
|25   |50000     |105s    |

### Genetic Algorithm

The representation above (1-3-2-4-5-6-7-8-9-10-1) is considered the "gene". First, we generate a random population of valid states (genes). Each gene has it's performance measured (lower score is better), then based on that, it gets a lower/higher chance to crossover. In the crossover step, two parents will generate a child by:

 * getting the first half from parent 1
 * iterating through parent 2 and getting all digits not already present in the child 

 This ensures the child will also be a valid state. At the end of the crossover stage, we will have a new population of the same size as the parent population.

 Finaly there are two more steps that happen:
  * Elitism - the best 2 parents will automatically move to the next generation, without crossover.
  * Mutation - each child has a (configurable) 10% chance of mutating. Mutation simply means that 2 digits inside the tour get swapped. The resulting gene, as any other operation in this algorithm, still represents a valid solution.

After all this, the crossover/elitism/mutation step repeats for a number of iterations. At the end, we simply present the the best gene in the last generation as the solution.


  Some rough measurements:

  |Nodes|Iterations|Population|Mutation rate|Run time|
  |-----|----------|----------|-------------|--------|
  |10   |100       |1000      |10           |1.66    |
  |15   |300       |1000      |10           |5.6     |

  I stopped at 15 as the quality for 20 nodes and up was poor, no matter my iteration/population/mutation rate changes.

  Overall, at least for this specific problem and implementation, hill climbing is a much better approach than genetic algorithms.