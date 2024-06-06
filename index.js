//creating past commits with information
const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

(async () => {
  const FILE_PATH = "./data.json";

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateCommitMessage = () => {
    const options = [
      "Fixed a bug related to [function name]", // Example 1
      "Improved performance for [function name]", // Example 2
      "Added support for [new feature]", // Example 3
      "Refactored code in [file name]", // Example 4
      "Updated dependencies", // Example 5
      "Minor code style adjustments", // Example 6 (optional)
    ];

    const randomIndex = getRandomInt(0, options.length - 1);
    let message = options[randomIndex];

    // Optionally customize messages with placeholders
    switch (randomIndex) {
      case 0: // Fixed a bug
      case 1: // Improved performance
        const functions = ["parseData()", "renderChart()"]; // Replace with actual functions
        message = message.replace(
          "[function name]",
          functions[getRandomInt(0, functions.length - 1)]
        );
        break;
      case 2: // Added support
        const features = ["new data format", "customization options"]; // Replace with actual features
        message = message.replace(
          "[new feature]",
          features[getRandomInt(0, features.length - 1)]
        );
        break;
      case 3: // Refactored code
        const files = ["main.js", "utils.js"]; // Replace with actual files
        message = message.replace(
          "[file name]",
          files[getRandomInt(0, files.length - 1)]
        );
        break;
    }

    return message;
  };

  const makeCommit = (n) => {
    if (n === 0) return simpleGit().push();

    const DATE = moment()
      .subtract(1, "y")
      .add(1, "d")
      .add(getRandomInt(0, 54), "w")
      .add(getRandomInt(0, 6), "d")
      .format();

    const data = {
      data: DATE,
    };

    console.log(`Commit message: ${generateCommitMessage()}`);
    jsonfile.writeFile(FILE_PATH, data, () => {
      simpleGit()
        .add([FILE_PATH])
        .commit(
          generateCommitMessage(),
          { "--date": DATE },
          makeCommit.bind(this, --n)
        );
    });
  };

  makeCommit(100); // Call with desired number of commits
})();
