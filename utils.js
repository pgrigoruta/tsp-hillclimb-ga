var tspUtils = (function() {

    this.nodes = [];

    return {
        startSimulation: function(canvasId, algo, numIterations,population,mutation) {
            $('#'+canvasId).empty(); 
        
            var start = new Date().getTime();
        
            let numPoints =  parseInt($('#num_points').val());
            this.nodes = this.createNodes(numPoints);
            let state = '';
            switch(algo) {
                case 'hill_climb':            
                    state = hillClimbAlgorithm.execute(numIterations);
                    break;
                case 'ga':
                    state = gaAlgorithm.execute(numIterations,population,mutation);
                    break;
            }
            
            console.log(state,this.getStateScore(state));
        
            var end = new Date().getTime();
            console.log('Execution time: ' + (end - start)/1000 + 's' );
            
            let graph = this.getGraph(state);
            s = new sigma({
                container: canvasId,
                graph: graph
            });
            s.refresh();
        },

        shuffleStateString:function(state) {
            arr = state.split('-')
            //First and last nodes remain in poistion
            for (let i = arr.length - 2; i > 1; --i) {
                const j = 1 + Math.floor(Math.random() * i);
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            
            return arr.join('-')
        },
        
        createNodes: function(numPoints) {
            let nodes = [];
            for(let i=1;i<=numPoints;i++) {
                nodes.push({
                    id: i,
                    label: String(i),
                    x: this.randomIntFromInterval(-100,100),
                    y: this.randomIntFromInterval(-100,100),
                    color: '#666',
                    size: 10
                });
            }
            return nodes;
        },
        
        getStateAsString: function() {
            let stateStr = '';
            for(let i=0;i<this.nodes.length;i++) {
                stateStr+=this.nodes[i].id+'-';
            }
            stateStr+=this.nodes[0].id;//add link back to first item
            return stateStr;
        },
        
        findNodeById: function(id) {
            for (var j=0; j<this.nodes.length; j++) {
                if(this.nodes[j].id == id) {
                    return this.nodes[j];
                }
            }
            return null;
        },
        
        euclideanDistance: function(firstNode, secondNode) {
            return Math.sqrt( Math.pow(firstNode.x - secondNode.x, 2) + Math.pow(firstNode.y - secondNode.y,2 ) );
        },
        
        getGraph: function(state) {
            var graph = {nodes:[],edges:[]}
        
            const nodeLabels = state.split('-');
        
            for(let i=1;i<=nodeLabels.length-1;i++) {
                graph.nodes.push(this.findNodeById(i,this.nodes));
            }
        
            for(let i=0;i<nodeLabels.length-1;i++) {
                
                let firstId = nodeLabels[i];
                let secondId = nodeLabels[i+1];
                graph.edges.push({
                    id: "e_"+firstId+'_'+secondId,
                    source: firstId,
                    target:secondId,
                    type: 'line',
                    size: 1,
                    color: '#ccc'
                });
                
            }
            return graph;
        },
        
        randomIntFromInterval: function(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        
        getStateScore: function(state) {
        
            var stateStr = state;
            state = state.split('-');
            let totalDistance = 0;
            for(var j=0;j<state.length-1;j++) {
                var firstNode = this.findNodeById(state[j]);
                var secondNode = this.findNodeById(state[j+1]);
                
                totalDistance+=this.euclideanDistance(firstNode, secondNode);
            }
        
            return totalDistance;
        },
        
        chooseWeighted: function(items, chances) {
            var sum = chances.reduce((acc, el) => acc + el, 0);
            var acc = 0;
            chances = chances.map(el => (acc = el + acc));
            var rand = Math.random() * sum;
            return items[chances.filter(el => el <= rand).length];
        }

    }

})();




