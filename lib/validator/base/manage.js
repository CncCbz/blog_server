/**
 * ManageBase
 * @classdesc 管理基类
 */

class ManageBase {
  constructor() {
    /**
     * 规则集
     */
    this.rules = new Map();
    /**
     * 最小长度
     */
    this.minLen = 6;
    /**
     * 最大长度
     */
    this.maxLen = 20;
  }
  /**
   * 增加规则
   */
  addRule(name, rule) {
    const reg_rule = new RegExp(rule);
    this.rules.set(name, reg_rule);
  }
  /**
   * 删除规则
   */
  deleteRule(name) {
    this.rules.delete(name);
  }
  /**
   * 修改规则
   */
  updateRule(name, rule) {
    const reg_rule = new RegExp(rule);
    this.rules.set(name, reg_rule);
  }
  /**
   * 查找规则
   */
  getRule(name) {
    return this.rules.get(name);
  }
  /**
   * 设置最小长度
   */
  setMinLen(len) {
    this.minLen = Number(len);
  }
  /**
   * 设置最大长度
   */
  setMaxLen(len) {
    this.maxLen = Number(len);
  }
}

module.exports = {
  ManageBase
};
