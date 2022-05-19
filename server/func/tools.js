/*
 * @Description: 工具方法
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-09 20:09:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-09 20:13:00
 */

function mergeMap(...args) {
  let mayMap = new Map();
  args.forEach(item => {
    for (let [key, value] of item) mayMap.set(key, value);
  });
  return mayMap;
}

module.exports = {
  mergeMap
};
