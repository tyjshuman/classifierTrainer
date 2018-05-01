const chalk             = require('chalk');
const clear             = require('clear');
const figlet            = require('figlet');
const inquirer          = require('./lib/inquirer');
const natural           = require('natural')
const fs                = require('fs')

var classifier          = new natural.BayesClassifier();
var classifications     = []
var mainMenuOption      = null;
var trainingClassifier  = "";
var raw = "";

const clean = () => {
    clear();
    console.log(
        chalk.yellow(
            figlet.textSync("Classifier Trainer",{horizontalLayout: 'full'})
        )
    );
}

const run = async () => {
    clean();
    while(1==1){
        mainMenuOption = await inquirer.mainMenu();
        if(mainMenuOption.mainMenuChoices == "Add classifications"){
            classifications = classifications.concat((await inquirer.askClassificationCategories()).classifications.split(' '));
        }else if(mainMenuOption.mainMenuChoices == "Train classification"){
            trainingClassifier = (await inquirer.trainClassifier(classifications)).trainClassifier;
            var stop = false;
            while(!stop){
                var input = (await inquirer.train()).input;
                if(input == "done!"){
                    stop = true;
                }else{
                     classifier.addDocument(input, trainingClassifier)
                }
            }        
        }else if(mainMenuOption.mainMenuChoices == "View classifications"){
                console.log(classifications)
        }else if(mainMenuOption.mainMenuChoices == "Test"){

        }else if(mainMenuOption.mainMenuChoices == "Save training"){
            var saveAs = await inquirer.askForSaveName();
            var raw = JSON.stringify(classifier)
            fs.writeFile(saveAs.input, raw, function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The classifier was saved!");
            });
        }else if(mainMenuOption.mainMenuChoices == "Load training"){
            var load = await inquirer.askForLoad();
            fs.readFile(load.input, 'utf8', function (err,data) {
                if (err) {
                    return console.log("UHOH!", err);
                }else{
                    classifier = natural.BayesClassifier.restore(JSON.parse(data))
                    classifier.docs.forEach(function (classifier){
                        if(classifications.find(function(label){return label == classifier.label}) == null){
                            classifications.push(classifier.label)
                        }
                    });
                    }
                });
        }else if(mainMenuOption.mainMenuChoices == "Quit"){
            process.exit(1);
        }
    }
}

run();
