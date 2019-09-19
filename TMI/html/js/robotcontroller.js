function RobotController() {
    this.init = function (onFinishLoading) {
        this.robotReady = true;
        // this.behaviors = ["Stand/Emotions/Negative/Angry_1", "Stand/Emotions/Negative/Angry_2", "Stand/Emotions/Negative/Angry_3", "Stand/Emotions/Negative/Angry_4", "Stand/Emotions/Negative/Anxious_1", "Stand/Emotions/Negative/Bored_1", "Stand/Emotions/Negative/Bored_2", "Stand/Emotions/Negative/Disappointed_1", "Stand/Emotions/Negative/Exhausted_1", "Stand/Emotions/Negative/Exhausted_2", "Stand/Emotions/Negative/Fear_1", "Stand/Emotions/Negative/Fear_2", "Stand/Emotions/Negative/Fearful_1", "Stand/Emotions/Negative/Frustrated_1", "Stand/Emotions/Negative/Humiliated_1", "Stand/Emotions/Negative/Hurt_1", "Stand/Emotions/Negative/Hurt_2", "Stand/Emotions/Negative/Late_1", "Stand/Emotions/Negative/Sad_1", "Stand/Emotions/Negative/Sad_2", "Stand/Emotions/Negative/Shocked_1", "Stand/Emotions/Negative/Sorry_1", "Stand/Emotions/Negative/Surprise_1", "Stand/Emotions/Negative/Surprise_2", "Stand/Emotions/Negative/Surprise_3", "Stand/Emotions/Neutral/Alienated_1", "Stand/Emotions/Neutral/Annoyed_1", "Stand/Emotions/Neutral/AskForAttention_1", "Stand/Emotions/Neutral/AskForAttention_2", "Stand/Emotions/Neutral/AskForAttention_3", "Stand/Emotions/Neutral/Cautious_1", "Stand/Emotions/Neutral/Confused_1", "Stand/Emotions/Neutral/Determined_1", "Stand/Emotions/Neutral/Embarrassed_1", "Stand/Emotions/Neutral/Hello_1", "Stand/Emotions/Neutral/Hesitation_1", "Stand/Emotions/Neutral/Innocent_1", "Stand/Emotions/Neutral/Lonely_1", "Stand/Emotions/Neutral/Mischievous_1", "Stand/Emotions/Neutral/Puzzled_1", "Stand/Emotions/Neutral/Sneeze", "Stand/Emotions/Neutral/Stubborn_1", "Stand/Emotions/Neutral/Suspicious_1", "Stand/Emotions/Positive/Amused_1", "Stand/Emotions/Positive/Confident_1", "Stand/Emotions/Positive/Ecstatic_1", "Stand/Emotions/Positive/Enthusiastic_1", "Stand/Emotions/Positive/Excited_1", "Stand/Emotions/Positive/Excited_2", "Stand/Emotions/Positive/Excited_3", "Stand/Emotions/Positive/Happy_1", "Stand/Emotions/Positive/Happy_2", "Stand/Emotions/Positive/Happy_3", "Stand/Emotions/Positive/Hungry_1", "Stand/Emotions/Positive/Hysterical_1", "Stand/Emotions/Positive/Interested_1", "Stand/Emotions/Positive/Interested_2", "Stand/Emotions/Positive/Laugh_1", "Stand/Emotions/Positive/Laugh_2", "Stand/Emotions/Positive/Laugh_3", "Stand/Emotions/Positive/Mocker_1", "Stand/Emotions/Positive/Optimistic_1", "Stand/Emotions/Positive/Peaceful_1", "Stand/Emotions/Positive/Proud_1", "Stand/Emotions/Positive/Proud_2", "Stand/Emotions/Positive/Proud_3", "Stand/Emotions/Positive/Relieved_1", "Stand/Emotions/Positive/Shy_1", "Stand/Emotions/Positive/Shy_2", "Stand/Emotions/Positive/Sure_1"];

        RobotUtils.onServices(async function (
            ALMemory,
            ALTextToSpeech,
            ALBehaviorManager,
            ALRobotPosture,
            ALAutonomousLife,
            ALMotion,
            ALAudioDevice,
            ALAnimatedSpeech
        ) {
            this.ALMemory = ALMemory;
            this.ALAnimatedSpeech = ALAnimatedSpeech;
            this.ALTextToSpeech = ALTextToSpeech;
            this.ALBehaviorManager = ALBehaviorManager;
            this.ALRobotPosture = ALRobotPosture;
            this.ALAutonomousLife = ALAutonomousLife;
            this.ALMotion = ALMotion;
            this.ALAudioDevice = ALAudioDevice;

            const loadedBehaviors = await ALBehaviorManager.getLoadedBehaviors();
            this.sitBehaviors = loadedBehaviors.filter((bhv) => {
                return bhv.includes('/Sit/');
            });
            this.standBehaviors = loadedBehaviors.filter((bhv) => {
                return bhv.includes('/Stand');
            });

            onFinishLoading({ sitBehaviors: this.sitBehaviors, standBehaviors: this.standBehaviors });
        });
    };

    // Execute command on robot
    this.executeCommand = function (command) {
        switch (command) {
            case 'wake':
                ALMotion.wakeUp();
                ALRobotPosture.goToPosture('Stand', 1.0);
                // ALAutonomousLife.setState("disabled");
                break;
            case 'sit':
                ALRobotPosture.goToPosture('Sit', 1.0);
            case 'rest':
                ALMotion.rest();
                ALAutonomousLife.setState('solitary');
                break;
            case 'shout':
                ALAudioDevice.setOutputVolume(100);
                break;
            case 'mute':
                ALAudioDevice.setOutputVolume(0);
                break;
            case 'kill':
                ALMotion.killAll();
                break;
            case 'stop':
                ALBehaviorManager.stopAllBehaviors();
                break;
            case '':
                break;
            default:
                console.log('Error: Command ' + command + ' not recognized.');
        }
    };

    // Split animation into behavior and/or speech, then do/say both
    this.animate = async function (animation) {
        anitoks = animation.split(';');
        if (anitoks[1] != undefined) {
            behavior = anitoks[0];
            speech = anitoks[1];
        } else {
            behavior = '';
            speech = anitoks[0];
        }

        if (behavior.length > 0) {
            posture = await ALRobotPosture.getPosture();
            switch (posture) {
                case 'Sit':
                    behaviorList = sitBehaviors;
                    break;
                case 'Stand':
                case 'StandInit':
                    behaviorList = standBehaviors;
                    break;
            }
            candidateBehaviors = behaviorList.filter((bhv) => {
                return bhv.includes(behavior[0].toUpperCase() + behavior.slice(1));
            });
            // console.log(candidateBehaviors);
            if (candidateBehaviors.length > 0) {
                randB = Math.floor(Math.random() * candidateBehaviors.length);
                ALBehaviorManager.runBehavior(candidateBehaviors[randB]);
                // console.log(candidateBehaviors[randB]);
            }
            if (speech.length > 0) {
                ALTextToSpeech.say(speech);
            }
        } else {
            ALAnimatedSpeech.say(speech);
        }
    };

    this.speechStatusChanged = function (value) {
        console.log(value);
    };

    // Query status of robot
    this.getStatus = async function () {
        var textDone, animationDone;

        await ALMemory.getData('ALTextToSpeech/TextDone').then(function (TextDone) {
            textDone = TextDone;
        });

        await ALBehaviorManager.getRunningBehaviors().then((behaviorList) => {
            // console.log(behaviorList);
            animationDone = !behaviorList.some((behavior) => {
                return behavior.includes('animations');
            });
        });

        if (textDone && animationDone) {
            // console.log('ready');
        } else {
            // console.log('busy');
        }

        return textDone && animationDone;
    };

    // Send speech to robot to say
    this.say = function (utterance) {
        // ALBehaviorManager.runBehavior("Stand/Emotions/Neutral/Hello_1");
        ALTextToSpeech.say(utterance);
        console.log(utterance);
    };
}
