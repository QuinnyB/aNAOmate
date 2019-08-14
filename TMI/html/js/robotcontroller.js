function RobotController() {
    this.robotReady = true;
    RobotUtils.onServices(function (ALTextToSpeech, ALBehaviorManager) {
        this.ALTextToSpeech = ALTextToSpeech;
        this.ALBehaviorManager = ALBehaviorManager;
    });

    this.getStatus = function() {
        // TODO: need to query status of robot
        //return this.robotReady;
    }

    this.say = function(utterance) {
        ALBehaviorManager.runBehavior("Stand/Emotions/Neutral/Hello_1");
        ALTextToSpeech.say(utterance);
        console.log(utterance);
    }
}





