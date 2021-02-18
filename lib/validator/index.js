const { PasswordValidatorBase } = require('./password');
const { UserNameValidatorBase } = require('./user-name');

const user_name_validator = new UserNameValidatorBase();
const password_validator = new PasswordValidatorBase();

module.exports = {
  checkUserName: str => user_name_validator.check(str),
  checkPassword: str => password_validator.check(str)
};
