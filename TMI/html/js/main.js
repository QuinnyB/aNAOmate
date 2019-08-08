var application = function () {  
    
    if (robotIP != null) {
        this.robotController = new RobotController();
    }
    else {
        this.robotController = new FauxbotController();
    }

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

function submitInput() {
    const inputText = $("#inputTextArea").val();
    addToHistory(inputText);
    clearTextInput();
    if (this.robotController.robotReady) {
        inputManager();
    }
}

async function inputManager() {
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

 function handleInput(inputText) {
    // const inputText = $("#inputTextArea").val();
    // console.log(inputText);
    // parseInput();
     this.robotController.say(inputText);
}
