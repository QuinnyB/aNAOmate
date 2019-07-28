var application = function () {   
    this.useRobotUtils = true;
    
    if (robotIP != null) {
        RobotUtils.onService(function (ALTextToSpeech) {
        // Adding ALTextTpSpeech to global scope - should probably handle this better eventually
            this.ALTextToSpeech = ALTextToSpeech;

            // Bind "Submit" input button callback
            $("#sendInputButton").click(function () {
                submitInput();
            });

            // Bind Enter key press to same callback as Submit button, when focussed on input text field, 
            $("#inputTextArea").keypress((event) => {
                const keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13') {
                    event.preventDefault();     // Prevent line return behaviour
                    submitInput();
                }
            });

        });
    }
    else {
        this.useRobotUtils = false;

        // Bind "Submit" input button callback
        $("#sendInputButton").click(function () {
            submitInput();
        });

        // Bind Enter key press to same callback as Submit button, when focussed on input text field, 
        $("#inputTextArea").keypress((event) => {
            const keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                event.preventDefault();     // Prevent line return behaviour
                submitInput();
            }
        });
    }

    this.robotReady = true; // State of robot, false if currently executing input
}

function submitInput() {
    const inputText = $("#inputTextArea").val();
    addToHistory(inputText);
    clearTextInput();
    if (this.robotReady) {
        inputManager();
    }
}

async function inputManager() {
    this.robotReady = false;
    // Check if there is an active row in history table
    const lastActiveRow = $('.table-info');
    let activeRow;
    if (lastActiveRow.length) {
        // Yes: Remove from current row and add to next row and get input text from that row 
        lastActiveRow.removeClass('table-info');
        activeRow = lastActiveRow.next();
    }
    else {
        // No: Add it to first row and get inputText from first row
        activeRow = $("#historyList tbody tr").first()
    }

    // scroll until the row is in view
    const lineNum = activeRow.find('th').text();
    const rows = document.querySelectorAll('#historyList tr');
    const line = rows[lineNum-1];   
    line.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });

    activeRow.addClass('table-info');

    await handleInput($("#historyList tbody .table-info td").text());
    // Check if there is a row below the current row in input history
    if (activeRow.next().length) {
        // Yes: call self
        inputManager();
    }
    else {
        // No: this.robotReady = true
        this.robotReady = true;
        console.log("Robot ready");
    }
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

    // scroll until the row is in view
    const rows = document.querySelectorAll('#historyList tr');
    const line = rows[rows.length-1];   
    line.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}

function clearTextInput() {
    $("#inputTextArea").val('').focus();
}

async function handleInput(inputText) {
    // const inputText = $("#inputTextArea").val();
    // console.log(inputText);
    // parseInput();
    await say(inputText);
}

async function say(utterance) {
    if (this.useRobotUtils == true){
        await ALTextToSpeech.say(utterance);
    }
    else {
        console.log('processing...');
        await sleep(2000);
    }
    console.log(utterance);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
