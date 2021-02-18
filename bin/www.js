const { app } = require('../app');
const { PORT_CONFIG } = require('../config');

app.listen(PORT_CONFIG, () => {
  console.log(`服务已开启:http://localhost:${PORT_CONFIG}`);
});
