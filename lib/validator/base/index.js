const { ManageBase } = require('./manage');

/**
 * ValidatorBase
 * @classdesc 校验基类
 * @argument ManageBase
 */

class ValidatorBase extends ManageBase {
  /**
   * 测试长度
   * @param {String} val 被校验的字符串
   * @returns 正确 太短 太长
   */
  testLen(val) {
    const str = String(val);
    const len = str.length;

    const tooLong = len > this.maxLen;
    const tooShort = len < this.minLen;

    let result = `正确`;
    if (tooShort) result = `太短`;
    if (tooLong) result = `太长`;

    return result;
  }
  /**
   * 测试规则
   * @param {String} name 规则名称
   * @param {String} val 被测试的字符串
   * @returns true false
   */
  testRule(name, val) {
    const str = String(val);
    const rule = this.getRule(name);

    const result = rule.test(str);

    return result;
  }
}
module.exports = {
  ValidatorBase
};
