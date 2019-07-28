/**
 * 根据url规则,判断地址是否匹配，并解析参数
 * @param {*} apiPath /user/tom
 * @param {*} apiRule /user/:username
 */
function matchApi(apiPath, apiRule) {
  let apiRules = apiRule.split('/');
  let apiPaths = apiPath.split('/');
  let pathParams = {
    __weight: 0
  };

  if (apiPaths.length !== apiRules.length) {
    return false;
  }
  for (let i = 0; i < apiRules.length; i++) {
    if (apiRules[i]) {
      apiRules[i] = apiRules[i].trim();
    } else {
      continue;
    }
    if (
      apiRules[i].length > 2 &&
      apiRules[i][0] === '{' &&
      apiRules[i][apiRules[i].length - 1] === '}'
    ) {
      pathParams[apiRules[i].substr(1, apiRules[i].length - 2)] = apiPaths[i];
    } else if (apiRules[i].indexOf(':') === 0) {
      pathParams[apiRules[i].substr(1)] = apiPaths[i];
    } else if (
      apiRules[i].length > 2 &&
      apiRules[i].indexOf('{') > -1 &&
      apiRules[i].indexOf('}') > -1
    ) {
      let params = [];
      apiRules[i] = apiRules[i].replace(/\{(.+?)\}/g, function (src, match) {
        params.push(match);
        return '([^\\/\\s]+)';
      });
      apiRules[i] = new RegExp(apiRules[i]);
      if (!apiRules[i].test(apiPaths[i])) {
        return false;
      }

      let matchs = apiPaths[i].match(apiRules[i]);

      params.forEach((item, index) => {
        pathParams[item] = matchs[index + 1];
      });
    } else {
      if (apiRules[i] !== apiPaths[i]) {
        return false;
      } else {
        pathParams.__weight++;
      }
    }
  }
  return pathParams;
}