var application = function(){
    RobotUtils.onService(function(ALTextToSpeech) {
        this.ALTextToSpeech = ALTextToSpeech;

        // Bind button callbacks
        $("#sendInputButton").click(function() {
            handleInput();
        });

        $("#inputTextArea").keypress((event) => {
            const keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13') {
                event.preventDefault();
                handleInput();
            }
        });

    });
}

function handleInput() {
    const inputText = $("#inputTextArea").val();
    // parseInput();
    console.log(inputText);
    say(inputText);
    addToHistory(inputText);
    clearTextInput();
}

function say(utterance) {
    ALTextToSpeech.say(utterance);
}

function addToHistory(inputText) {
    $("#historyTextArea").append(inputText + "&#13;&#10;");
}

function clearTextInput() {
    $("#inputTextArea").focus().val('').selectRange(0,0);
}


