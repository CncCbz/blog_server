/**
 * ModelBase
 * @classdesc 返回基类
 */
class ModelBase {
  constructor() {
    this.correct = false;
    this.message = ``;
  }
  /**
   * 设置是否正确
   * @param {Boolean} bol
   */
  setCorrect(bol) {
    this.correct = bol;
  }
  /**
   * 设置返回信息
   * @param {String} msg
   */
  setMessage(msg) {
    this.message = msg;
  }
}

/**
 * SuccessModel
 * @classdesc 正确返回基类
 * @argument ModelBase
 */
class SuccessModel extends ModelBase {
  constructor() {
    super();
    this.setCorrect(true);
  }
}
/**
 * FailModel
 * @classdesc 失败返回基类
 * @argument ModelBase
 */
class FailModel extends ModelBase {
  constructor() {
    super();
    this.setCorrect(false);
  }
}

module.exports = {
  SuccessModel,
  FailModel
};
