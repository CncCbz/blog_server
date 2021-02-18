const { judgeAuth } = require('./unit');

const test = async () => {
  const ret = await judgeAuth('adminadmin', 'supersuper');
  console.log(ret);
};
test();
