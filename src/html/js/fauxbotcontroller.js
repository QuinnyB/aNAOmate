function FauxbotController() {
    this.robotReady = true;

    this.getStatus = function() {
        return this.robotReady;
    }

    this.say = async function(utterance) {
        this.robotReady = false;
        console.log('processing...');
        await sleep(3000);
        console.log(utterance);
        this.robotReady = true;
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
