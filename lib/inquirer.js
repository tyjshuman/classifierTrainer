const inquirer  = require('inquirer');

module.exports ={
    askClassificationCategories: () => {
        const question = {
            name: 'classifications',
            type: 'input',
            message: 'List the classification separated with a space.'
        };

        return inquirer.prompt(question);
    },
    mainMenu: () => {
        const question = {
            name: 'mainMenuChoices',
            type: 'list',
            message: 'Select an option.',
            choices: ["Add classifications", "Train classification","View classifications", "Save training", "Load training", "Quit"],
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
        console.log(classifications)
        return inquirer.prompt(question);
    },
    train: () => {
        const question = {
            name: 'input',
            type: 'input',
            message: 'Enter a phrase or "done!" to finish.'
        };

        return inquirer.prompt(question);
    }
}