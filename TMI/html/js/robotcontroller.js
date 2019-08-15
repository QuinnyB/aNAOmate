function RobotController() {
    this.robotReady = true;
    RobotUtils.onServices(function (ALTextToSpeech, ALBehaviorManager) {
        this.ALTextToSpeech = ALTextToSpeech;
        this.ALBehaviorManager = ALBehaviorManager;
    });

    this.getStatus = async function() {
        // Query status of robot
        return await ALBehaviorManager.getRunningBehaviors()
        .then(behaviorList => {
            console.log(behaviorList);
            const ready = !behaviorList.some(behavior => {
                return behavior.includes('animations')
            });

            console.log('Ready: ' + ready);
            return ready;
        });
    }

    this.say = function(utterance) {
        ALBehaviorManager.runBehavior("Stand/Emotions/Neutral/Hello_1");
        ALTextToSpeech.say(utterance);
        console.log(utterance);
    }
}





