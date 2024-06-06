const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

(async () => {
  const random = await import("random"); // Dynamic import

  const FILE_PATH = "./data.json";

  const makeCommit = (n) => {
    if (n === 0) return simpleGit().push();
    const x = random.default.int(0, 54); // Use default export
    const y = random.default.int(0, 6);
    const DATE = moment()
      .subtract(1, "y")
      .add(1, "d")
      .add(x, "w")
      .add(y, "d")
      .format();

    const data = {
      data: DATE,
    };

    console.log(DATE);
    jsonfile.writeFile(FILE_PATH, data, () => {
      simpleGit()
        .add([FILE_PATH])
        .commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n));
    });
  };

  makeCommit(100); // Call with desired number of commits
})();
//** fixed "random" package issue
