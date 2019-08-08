function RobotController() {
    this.robotReady = true;
    RobotUtils.onServices(function (ALTextToSpeech, ALBehaviorManager) {
        this.ALTextToSpeech = ALTextToSpeech;
        this.ALBehaviorManager = ALBehaviorManager;
    });

    this.say = async function(utterance) {
        ALBehaviorManager.runBehavior("Stand/Emotions/Neutral/Hello_1");
        ALTextToSpeech.say(utterance);
        console.log(utterance);
    }
}





