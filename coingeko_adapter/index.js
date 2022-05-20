     1  const { Requester, Validator } = require('@goplugin/external-adapter')
     2  require("dotenv").config();
     3
     4  const customError = (data) => {
     5    if (data.Response === 'Error') return true
     6    return false
     7  }
     8
     9  const customParams = {
    10    endpoint: ['endpoint']
    11  }
    12
    13  const createRequest = (input, callback) => {
    14
    15    const url = `https://api1.binance.com/api/v3/ticker/price?symbol=${input.data.fromsystem}`
    16
    17    const config = {
    18      url
    19    }
    20
    21    if (process.env.API_KEY) {
    22      config.headers = {
    23        "api_key": process.env.API_KEY
    24      }
    25    }
    26    Requester.request(config, customError)
    27      .then(response => {
    28        
    29        //console.log("response value is ",response.data[input.data.fromsystem][input.data.tosystem]);
    30        
    31        const res = {
    32          data: {
    33            "result": response.data.price.toString()
    34  //       "result": response.data[input.data.fromsystem][input.data.tosystem].toString()
    35          }
    36        }
    37        callback(response.status, Requester.success(input.id, res));
    38      })
    39      .catch(error => {
    40        callback(500, Requester.errored(input.id, error))
    41      })
    42  }
    43
    44  module.exports.createRequest = createRequest
