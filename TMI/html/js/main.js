var application = async function () {
    this.paused = false;
    this.inputManagerRunning = false;
    this.historyRetrieveRow = null; // Row for tracking which row in history is being retrieved when using up/down arrow
    if (robotIP != null) {
        this.robotController = new RobotController();
        this.robotController.init(populateSidebar);
    } else {
        this.robotController = new FauxbotController();
    }

    // Bind Sidebar collapse button
    $('#sidebarCollapse').on('click', function () {
        // open or close navbar
        $('#sidebar').toggleClass('collapsed');
        // close dropdowns
        $('.collapse.in').toggleClass('in');
        // and also adjust aria-expanded attributes we use for the open/closed arrows
        // in our CSS
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    // $('#sidebarCollapse').on('click', function() {
    //     $('#sidebar').toggleClass('collapsed');
    // });

    $(document).on('click', '.sidebarItem', function (event) {
        const inputTextArea = $('#inputTextArea');
        inputTextArea.val(event.target.innerText + ';');
        inputTextArea.focus();
    });

    $('#sidebar').mCustomScrollbar({
        theme: 'minimal',
    });

    // Bind "Submit" input button callback
    $('#sendInputButton').click(() => submitInput());

    // Bind Next button
    $('#playBtn').click(() => {
        if (this.paused) {
            this.paused = false;
        } else {
            if (!this.inputManagerRunning) {
                inputManager();
            }
        }
    });

    $('#stopBtn').click(() => {
        this.robotController.executeCommand("stop");
    });

    $('#wakeBtn').click(() => {
        this.robotController.executeCommand("wake");
    });

    $('#sleepBtn').click(() => {
        this.robotController.executeCommand("rest");
    });

    $('sidebarItem').click((event) => {
        console.log(event.target);
    });
    $('#myModalForm').on('submit', function (event) {
        event.preventDefault();
        const filename = $.trim($('#filename').val());
        if (filename != '') {
            // Save all entered commands to a file
            textArray = [];
            $('#historyList tbody tr td').each(function () {
                textArray.push($(this).text());
            });

            let link = document.getElementById('downloadLink');
            link.setAttribute('download', filename);
            link.href = makeTextFile(textArray.join('\n'));
            link.click();
        }
        $('#myModal').modal('hide');
    });
    $('#filename').on('change paste keyup', function () {
        const filename = $.trim($('#filename').val());
        if (filename == '') {
            $('#invalidFilename').show();
        } else {
            $('#invalidFilename').hide();
        }
    });

    // Bind Save button
    var textFile = null;
    $('#modalSave').click(() => {
        const filename = $.trim($('#filename').val());
        if (filename != '') {
            // Save all entered commands to a file
            textArray = [];
            $('#historyList tbody tr td').each(function () {
                textArray.push($(this).text());
            });

            let link = document.getElementById('downloadLink');
            link.setAttribute('download', filename);
            link.href = makeTextFile(textArray.join('\n'));
            link.click();
        }
    });

    // Bind Clear History button
    $('#clearBtn').on('click', function () {
        $('#historyList tbody').empty();
        $('#historyList tbody').append(`
            <tr id = "historyPlaceholder" >
                <td>Input History</td>
            </tr >`
        );
    });

    // Bind Load button
    $('#loadBtn').on('click', function () {
        $('#loadFile').trigger('click');
    });

    // Set up listener for state change in load file
    $('#loadFile').change(function () {
        var $input = $(this);
        var inputFiles = this.files;
        if (inputFiles == undefined || inputFiles.lengh == 0) return;
        var inputFile = inputFiles[0];

        var reader = new FileReader();
        reader.onload = function (event) {
            $('#clearBtn').click();
            inputLines = event.target.result.split('\n');
            inputLines.forEach(function (element) {
                addToHistory(element);
            }, this);
        };
        reader.onloadend = function (event) {
            // Clear the loaded filename so that it will allow a file of the same name to be uploaded again
            document.getElementById('loadFile').value = "";
        }
        reader.onerror = function (event) {
            alert('I AM ERROR: ' + event.target.code);
        };
        reader.readAsText(inputFile);
    });

    // Bind Enter key press to same callback as Submit button, when focussed on input text field,
    $('#inputTextArea').keydown((event) => {
        const keycode = event.keyCode ? event.keyCode : event.which;
        // Bind Enter key press to same callback as Submit button, when focussed on input text field
        if (keycode == '13') {
            event.preventDefault(); // Prevent line return behaviour
            submitInput();
        }
        // Bind up arrow key press to get previous input
        else if (keycode == '38') {
            getPreviousInput();
        }
        // Bind down arrow key press to get nex input
        else if (keycode == '40') {
            getNextInput();
        }
    });
};

async function populateSidebar(behaviors) {
    const { sitBehaviors, standBehaviors } = behaviors;

    standBehaviors.forEach((bhv) => {
        $('#standSubmenu').append(`
            <li class="sidebarItem">
            <a>${bhv.split('/').pop()}</a>
            </li>
        `);
    });

    sitBehaviors.forEach((bhv) => {
        $('#sitSubmenu').append(`
            <li>
            <a href="#">${bhv.split('/').pop()}</a>
            </li>
        `);
    });
}

async function submitInput() {
    const inputText = $('#inputTextArea').val();
    addToHistory(inputText);
    clearTextInput();

    if ((await this.robotController.getStatus()) && !this.paused && !inputManagerRunning) {
        inputManager();
    }
}

async function inputManager() {
    // Check if there is an active row in history table
    this.inputManagerRunning = true;
    const lastActiveRow = $('.table-info');
    let activeRow;
    if (lastActiveRow.length) {
        // Yes: Remove from current row and add to next row and get input text from that row
        lastActiveRow.removeClass('table-info');
        activeRow = lastActiveRow.next();
    } else {
        // No: Add it to first row and get inputText from first row
        activeRow = $('#historyList tbody tr').first();
    }

    // Scroll until the active row is in view
    const lineNum = activeRow.find('th').text();
    const rows = document.querySelectorAll('#historyList tr');
    const line = rows[lineNum - 1];
    if (line) {
        line.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    }

    activeRow.addClass('table-info');

    handleInput($('#historyList tbody .table-info td').text());

    // Wait for robot ready
    await sleep(1000); // We have to wait half a second before calling getStatus

    let ready = await this.robotController.getStatus();
    // console.log("before loop " + ready)

    while (!ready || this.paused) {
        // Check every 100 milliseconds
        await sleep(100);

        ready = await this.robotController.getStatus();
        // console.log("in loop " + ready)
    }

    // Check if there is a row below the current row in input history
    if (activeRow.next().length) {
        // Yes: call self
        inputManager();
    } else {
        //console.log("Reached End");
        this.inputManagerRunning = false;
    }
}

// Add input to input history table
function addToHistory(inputText) {
    // Add input text to history and go to next line
    $('#historyPlaceholder').remove();
    var count = $('#historyList tbody').children().length;
    $('#historyList tbody').append(
        `<tr>
            <th scope="row">` +
        (count + 1) +
        `</th>
            <td>` +
        inputText +
        `</td>
        </tr>`
    );

    // Scroll until the new row is in view
    const rows = document.querySelectorAll('#historyList tr');
    const line = rows[rows.length - 1];
    if (line) {
        line.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    }

    // Update up arror row variable
    this.historyRetrieveRow = rows.length;
}

function clearTextInput() {
    $('#inputTextArea')
        .val('')
        .focus();
}

function handleInput(inputText) {
    tokens = inputParse(inputText);
    for (i = 0; i < tokens.repitions; i++) {
        if (tokens.command != null) {
            if (tokens.command == 'pause') {
                this.paused = true;
            } else {
                this.robotController.executeCommand(tokens.command);
            }
        }
        if (tokens.animation != null) {
            this.robotController.animate(tokens.animation);
        }
    }
}

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function inputParse(inputString) {
    command = /(?<=\{).+?(?=\})/g.exec(inputString);

    conditionals = /(?<=\().+?(?=\))/g.exec(inputString);
    repitions = /(?<=\[).+?(?=\])/g.exec(inputString);
    animation = inputString
        .replace(/\{.+\}/gi, '')
        .replace(/ *\([^)]*\) */g, '')
        .replace(/\[.+\]/gi, '');

    return {
        repitions: repitions == undefined ? 1 : repitions[0],
        command: command == undefined ? null : command[0].toLowerCase(),
        animation: animation,
        conditionals: conditionals == undefined ? null : conditionals[0].split('|'),
    };
}

function getPreviousInput() {
    if (this.historyRetrieveRow != null) {
        const rows = document.querySelectorAll('#historyList tr');
        this.historyRetrieveRow--;
        if (this.historyRetrieveRow < 0) {
            // historyRetrieveRow = 0;
            this.historyRetrieveRow = rows.length - 1; // Loop back around to bottom of list
        }
        const previousInput = rows[this.historyRetrieveRow].lastElementChild.textContent;
        const inputTextArea = $('#inputTextArea');
        inputTextArea.val(previousInput);
        inputTextArea.focus();
        inputTextArea[0].setSelectionRange(previousInput.length, previousInput.length); // Move cursor to end of line
    }
}

function getNextInput() {
    if (this.historyRetrieveRow != null) {
        const rows = document.querySelectorAll('#historyList tr');
        this.historyRetrieveRow++;
        if (this.historyRetrieveRow > rows.length - 1) {
            this.historyRetrieveRow = rows.length - 1;
        }
        const nextInput = rows[this.historyRetrieveRow].lastElementChild.textContent;
        const inputTextArea = $('#inputTextArea');
        inputTextArea.val(nextInput);
        inputTextArea.focus();
        inputTextArea[0].setSelectionRange(nextInput.length, nextInput.length); // Move cursor to end of line
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
}
