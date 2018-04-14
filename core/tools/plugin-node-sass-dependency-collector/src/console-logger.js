let chalk = require('chalk');

class ConsoleLogger {
  static info(text) {
    //console.log(chalk.white(text));
  }

  static warn(text) {
    //console.log(chalk.yellow(text));
  }

  static error(text) {
    console.log(chalk.red(text));
  }

  static progress(text) {
    console.log(chalk.gray(text));
  }

  static success(text) {
    console.log(chalk.green(text));
  }

  static separator() {
    console.log(chalk.gray("--------------------------------------------------------------------------------"));
  }
}

module.exports = ConsoleLogger;
