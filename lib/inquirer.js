const inquirer  = require('inquirer');

module.exports ={
    askClassificationCategories: () => {
        const question = {
            name: 'classifications',
            type: 'input',
            message: 'List the classifications separated with a space.'
        };

        return inquirer.prompt(question);
    },
    mainMenu: () => {
        const question = {
            name: 'mainMenuChoices',
            type: 'list',
            message: 'Select an option.',
            choices: ["Add classifications", "Train classification", "Test", "View classifications", "Save training", "Load training", "Quit"],
            default: ["Add classifications"]
        };
        return inquirer.prompt(question);
    },
    trainClassifier: (classifications) => {
        const question = {
            name: 'trainClassifier',
            type: 'list',
            message: 'Select an classifier to train.',
            choices: classifications
        };
        return inquirer.prompt(question);
    },
    questionClassifier: (answer) => {
        const question = {
            name: 'questionClassifier',
            type: 'confirm',
            message: `${answer}?`
        };
        return inquirer.prompt(question);
    },
    corrrectClassifier: (classifications, phrase) => {
        const question = {
            name: 'corrrectClassifier',
            type: 'list',
            message: `${phrase} belongs to which classifier?`,
            choices: classifications
        };
        return inquirer.prompt(question);
    },
    testClassifier: () => {
        const question = {
            name: 'testClassifier',
            type: 'input',
            message: 'Enter a test phrase or done! to quit.'
        };
        return inquirer.prompt(question);
    },
    train: () => {
        const question = {
            name: 'input',
            type: 'input',
            message: 'Enter a phrase or "done!" to finish.'
        };

        return inquirer.prompt(question);
    },
    askForSaveName: () => {
        const question = {
            name: 'input',
            type: 'input',
            message: 'Save as: ',
        };
        return inquirer.prompt(question);
    },
    askForLoad: () => {
        const question = {
            name: 'input',
            type: 'input',
            message: 'Load file named: ',
        };
        return inquirer.prompt(question);
    }
}