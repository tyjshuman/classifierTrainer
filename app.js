const chalk             = require('chalk');
const clear             = require('clear');
const figlet            = require('figlet');
const inquirer          = require('./lib/inquirer');
var natural             = require('natural')

var classifier          = new natural.BayesClassifier();
var classifications     = []
var mainMenuOption      = null;
var trainingClassifier  = "";

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
            }        }else if(mainMenuOption.mainMenuChoices == "View classifications"){
            console.log(classifications);

        }else if(mainMenuOption.mainMenuChoices == "Test"){

        }else if(mainMenuOption.mainMenuChoices == "Save training"){

        }else if(mainMenuOption.mainMenuChoices == "Load training"){

        }else{
            process.exit(1);
        }
    }
}

run();