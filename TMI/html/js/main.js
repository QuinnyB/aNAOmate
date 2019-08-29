var application = function () {
    this.paused = false;
    this.upArrowRow = null;
    if (robotIP != null) {
        this.robotController = new RobotController();
    }
    else {
        this.robotController = new FauxbotController();
    }

    // Bind "Submit" input button callback
    $("#sendInputButton").click(() => submitInput());

    // Bind Next button
    $("#nextBtn").click(() => {
        this.paused = false;
        inputManager();
    });

    // Bind Save button
    var textFile = null;
    $("#modalSave").click(() => {
        // Save all entered commands to a file
        textArray = [];
        $("#historyList tbody tr td").each(function () {
            textArray.push($(this).text());
        });

        const filename = $('#filename').val();
        let link = document.getElementById('downloadLink');
        link.setAttribute('download', filename);
        link.href = makeTextFile(textArray.join('\n'));
        link.click();
    });

    // Bind Enter key press to same callback as Submit button, when focussed on input text field, 
    $("#inputTextArea").keydown((event) => {
        const keycode = (event.keyCode ? event.keyCode : event.which);
        // Bind Enter key press to same callback as Submit button, when focussed on input text field
        if (keycode == '13') {
            event.preventDefault();     // Prevent line return behaviour
            submitInput();
        }
        // Bind up arrow key press to get previous input
        else if (keycode == '38') {
            getPreviousInput();
        }
    });
}

async function submitInput() {
    const inputText = $("#inputTextArea").val();
    addToHistory(inputText);
    clearTextInput();

    if (await this.robotController.getStatus() && !this.paused) {
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

    // Scroll until the active row is in view
    const lineNum = activeRow.find('th').text();
    const rows = document.querySelectorAll('#historyList tr');
    const line = rows[lineNum - 1];
    if (line) {
        line.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    activeRow.addClass('table-info');

    handleInput($("#historyList tbody .table-info td").text());

    // Wait for robot ready
    await sleep(500); // We have to wait half a second before calling getStatus

    let ready = await this.robotController.getStatus();

    while (!ready && this.paused) {
        // Check every 100 milliseconds
        await sleep(100);

        ready = await this.robotController.getStatus();
    }

    // Check if there is a row below the current row in input history
    if (activeRow.next().length) {
        // Yes: call self
        inputManager();
    }
    else {
        //console.log("Reached End");
    }
}

// Add input to input history table 
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

    // Scroll until the new row is in view
    const rows = document.querySelectorAll('#historyList tr');
    const line = rows[rows.length - 1];
    if (line) {
        line.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    // Update up arror row variable
    this.upArrowRow = rows.length - 1;
}

function clearTextInput() {
    $("#inputTextArea").val('').focus();
}

function handleInput(inputText) {
    tokens = inputParse(inputText);
    for (i = 0; i < tokens.repitions; i++) {
        if (tokens.command != null) {
            if (tokens.command == "pause") {
                this.paused = true;
            }
            else {
                this.robotController.executeCommand(tokens.command);
            }
        }
        if (tokens.animation != null) { this.robotController.animate(tokens.animation); }
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function inputParse(inputString) {

    command = /(?<=\{).+?(?=\})/g.exec(inputString)

    conditionals = /(?<=\().+?(?=\))/g.exec(inputString)
    repitions = /(?<=\[).+?(?=\])/g.exec(inputString)
    animation = inputString.replace(/\{.+\}/gi, "").replace(/ *\([^)]*\) */g, "").replace(/\[.+\]/gi, "")

    return { "repitions": (repitions == undefined) ? 1 : repitions[0], "command": (command == undefined) ? null : command[0].toLowerCase(), "animation": animation, "conditionals": (conditionals == undefined) ? null : conditionals[0].split("|") };
}

function getPreviousInput() {
    if (this.upArrowRow != null) {
        const rows = document.querySelectorAll('#historyList tr');
        const lastInput = rows[this.upArrowRow].lastElementChild.textContent;
        const inputTextArea = $("#inputTextArea");
        inputTextArea.val(lastInput);
        inputTextArea.focus();
        inputTextArea[0].setSelectionRange(lastInput.length, lastInput.length);  // Move cursor to end of line
        this.upArrowRow--;  // Keep going up the list 
        if (this.upArrowRow < 0) {
            this.upArrowRow = rows.length - 1;
        }
    }
}

function makeTextFile(text) {
    var data = new Blob([text], { type: 'text/plain' });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (this.textFile !== null && this.textFile !== undefined) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};