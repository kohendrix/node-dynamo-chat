import { MySqlClient } from './MySqlClient';
import config from 'config';
const master = new MySqlClient(config.mysql.master, 'master');
// const slave1 = new MySqlClient(config.mysql.slave1, 'slave1');
// const slave2 = new MySqlClient(config.mysql.slave2, 'slave2');

// function randomClient() {
//   var i = Date.now() / 3;
//   return i == 0 ? master : 1 ? slave1 : slave2;
// }

export {
  master
  // slave1: slave1,
  // slave2: slave2,
  // write: master,
  // read: randomClient()
};
