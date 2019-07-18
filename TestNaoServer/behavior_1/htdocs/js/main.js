var application = function(){
    RobotUtils.onService(function(ALTextToSpeech) {
        // Bind button callbacks
        $(".naoSpeak").click(function() {
            ALTextToSpeech.say($(this).html());
        });
    });
}
