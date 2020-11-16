
var hillClimbAlgorithm = (function() {
    return {
        execute: function(numIterations) {
            let bestStateEver = tspUtils.getStateAsString();
            let bestScoreEver = Number.MAX_SAFE_INTEGER;
        
            for(let i=0;i<numIterations;i++) {
                let state = tspUtils.shuffleStateString(bestStateEver);
        
                let bestLocalScore = Number.MAX_SAFE_INTEGER;
                let bestLocalState = null;
                while(true) {
                    let currentScore = tspUtils.getStateScore(state);
        
                    let nextStates = this.getNextStatesHillClimbing(state);
                    for(let i=0;i<nextStates.length;i++) {
                        let nextScore = tspUtils.getStateScore(nextStates[i])
                        if(nextScore < bestLocalScore) {
                            bestLocalScore = nextScore;
                            bestLocalState = nextStates[i]
                        }
                    }
        
                    if(bestLocalScore < currentScore) {
                        state = bestLocalState;
                        currentScore = bestLocalScore;
                        //console.log("Best next state is now", state,currentScore)
                    }
                    else {
                        break;
                    }
                }
        
                if(bestLocalScore < bestScoreEver) {
                    bestStateEver = bestLocalState;
                    bestScoreEver = bestLocalScore;
                    console.log("Best state is now ",bestStateEver,bestScoreEver)
                }
            }
        
            return bestStateEver;
        },
        
        /**
         * Swap the second town with all the subsequent ones. Not the the first and last though since they define the tour.
         */
        getNextStatesHillClimbing: function(state) {
            var state = state.split('-');
            let ret = [];
            for(let i=2;i<=state.length-2;i++) {
                let newState = state;
                let tmp = newState[1];
                newState[1] = newState[i];
                newState[i] = tmp;
                newState = newState.join('-')
                ret.push(newState);
            }
            return ret;
        }
    }
})();





