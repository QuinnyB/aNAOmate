function FauxbotController() {
    this.robotReady = true;

    this.say = async function(utterance) {
        console.log('processing...');
        await sleep(2000);
        console.log(utterance);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
