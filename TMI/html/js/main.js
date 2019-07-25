var application = function(){
    RobotUtils.onService(function(ALTextToSpeech) {
        // Adding ALTextTpSpeech to global scope - should probably handle this better eventually
        this.ALTextToSpeech = ALTextToSpeech;

        // Bind "Submit" input button callback
        $("#sendInputButton").click(function() {
            handleInput();
        });

        // When focussed on input text field, bind Enter key press to same callback as Submit button
        $("#inputTextArea").keypress((event) => {
            const keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13') {
                event.preventDefault();     // Prevent line return behaviour
                handleInput();
            }
        });
    });
}

function handleInput() {
    const inputText = $("#inputTextArea").val();
    // console.log(inputText);
    // parseInput();
    say(inputText);
    addToHistory(inputText);
    clearTextInput();
}

function say(utterance) {
    ALTextToSpeech.say(utterance);
    console.log(utterance);
}

function addToHistory(inputText) {
    // Add input text to history and go to next line
    $("#historyPlaceholder").remove();
    var count = $("#historyList tbody").children().length;
    $("#historyList tbody").append(
        `<tr>
            <th scope="row">` + (count + 1) + `</th>
            <td>` + inputText + `</td>
        </tr>`
     );

}

function clearTextInput() {
    $("#inputTextArea").val('').focus();
}


