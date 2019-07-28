{
  "path": "/m/test",
  "type": "POST",
  "time": "5000",
  "reqtxt": "{\n    \"s\":1,\n    \"b\":2\n}",
  "restxt": "function(){\n    return {\n        'list|20': [{\n            'id|+1': 1,\n            'serial_number|1-100': 1,\n            'warn_number|1-100': 1,\n            'warn_name|1': ['报警类型1', '报警类型2', '报警类型3'],\n            'warn_level|1': ['紧急', '重要'],\n            'warn_detail': '环境IP:10.114.123.12,服务名称:XX',\n            'create_time': Random.datetime(),\n            'finish_time': Random.datetime(),\n            'contact|4': 'abc'\n        }]\n    }\n}"
}