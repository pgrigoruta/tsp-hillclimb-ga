var gaAlgorithm = (function() {

    return {
        execute: function(numIterations,populationNum,mutationRate) {
            let populationData = this.createInitialPopulation(populationNum);
        
            for(let currentGeneration = 1;currentGeneration <= numIterations;currentGeneration++) {
                let population = this.measurePopulation(populationData);
                let geneParents = this.selectGenerForReproduce(population);
        
                children = [];
                //last place reserved for elite solutions
                for(let i = 0;i<geneParents.length-2;i++) {
                    let parent1 = this.getRandomElement(geneParents);
                    let parent2 = this.getRandomElement(geneParents);
                    let child = this.crossover(parent1,parent2);
        
                    child = this.mutate(child,mutationRate);
        
                    children.push(child);
                }
                //First two solutuons travel directly to the next generation
                const max1 = population.reduce(function(prev, current) {
                    return (prev.score > current.score) ? prev : current
                });
                const max2 = population.reduce(function(prev, current) {
                    return (prev.score > current.score && prev != max1) ? prev : current
                });
                children.push(max1.gene);
                children.push(max2.gene);
        
                //console.log(children);
                populationData = children;
            }
        
            
            let finalPopulation = this.measurePopulation(populationData);
            const best = finalPopulation.reduce(function(prev, current) {
                return (prev.score > current.score) ? prev : current
            });
            return best.gene;
        },
        
        createInitialPopulation: function(populationNum) {
            var populationData = [];
            var initialState = tspUtils.getStateAsString();
            for(let i=0;i<populationNum;i++) {
                populationData.push(tspUtils.shuffleStateString(initialState));
            }
            return populationData;
        },
        
        measurePopulation: function(populationData) {
            var population = [];
            for(let i=0;i<populationData.length;i++) {
                population.push({
                    gene: populationData[i],
                    score: 1/ tspUtils.getStateScore(populationData[i]),
                    percent: 0 //adding the real value below
                });
            }
        
            let sum = Object.keys(population).reduce((s,k) => s += population[k].score, 0);
            population = Object.keys(population).map(k => {
                ret = population[k];
                population[k].percent = (population[k].score/sum * 100).toFixed(2)
                return population[k];
            });
        
            return population;
        },
        
        selectGenerForReproduce: function(population) {
            let ret = [];
            const items = Object.keys(population).map(k => population[k].gene);
            const chances = Object.keys(population).map(k => parseFloat(population[k].percent));;
        
            for(let i=0;i<population.length;i++) {
                ret.push(tspUtils.chooseWeighted(items,chances));
            }
            return ret;
        },
        
        getRandomElement: function(items) {
            return items[Math.floor(Math.random() * items.length)];
        }, 
        
        crossover: function(parent1, parent2) {
            parent1 = parent1.split('-');
            parent2 = parent2.split('-');
        
            let child = [];
            child.push(1);
            let middle = Math.floor((parent1.length-1)/2);
        
            //Copy half of the first parent. For the second part, copy the bits from the second parent if they are not already present
            for(let i=1;i<parent1.length-1;i++) {
                if(i<=middle) {
                    child.push(parent1[i])
                }
                else {
                    for(let j=1;j<parent2.length-1;j++) {
                        if(!child.includes(parent2[j])) {
                            child.push(parent2[j])
                        }
                    }
                }
            }
        
            child.push(1);
            return child.join('-');
        },
        
        mutate: function(gene,mutationRate) {
            if(Math.floor(Math.random() * 100) <= mutationRate) { 
                gene = gene.split('-');
                var i = Math.floor(1 + Math.random() * (gene.length - 2));
                var j = i;
        
                while (i == j) {
                    j = Math.floor(1 + Math.random() * (gene.length - 2));
                }
                //console.log('chose ',i,j)
                let tmp = gene[i];
                gene[i] = gene[j];
                gene[j] = tmp;
                //console.log(gene);
        
                return gene.join('-');
            }
            else {
                return gene;
            }
        }
    }



})();