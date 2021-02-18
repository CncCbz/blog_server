const { ValidatorBase } = require('./base/index');
const { SuccessModel, FailModel } = require('./model/index');

/**
 * UserNameValidatorBase
 * @classdesc 用户名校验
 * @argument ManageBase
 * @argument ValidatorBase
 */

class UserNameValidatorBase extends ValidatorBase {
  constructor() {
    super();
    this.addRule(`user-name-rule`, `^([\\u4e00-\\u9fa5]|[a-zA-Z]){0,}$`);
  }
  check(val) {
    const success_model = new SuccessModel();
    const fail_model = new FailModel();

    const len_result = this.testLen(val);
    const rule_result = this.testRule(`user-name-rule`, val);

    const len_condition = len_result === `正确`;
    const rule_condition = rule_result;
    if (len_condition && rule_result) {
      success_model.setMessage(`用户名长度正确，格式正确`);
      return success_model;
    }
    fail_model.setMessage(`用户名长度${len_result}，格式${rule_result ? '正确' : '错误'}`);
    return fail_model;
  }
}

module.exports = {
  UserNameValidatorBase
};
