// Config
const config = require('../../configs/StockBot/StockBotConfig.js');

// Required
const baseUrl = "https://www.alphavantage.co/query?";
const symbolParam = "&symbol=";
const api_key_param = "&apikey=";

const URLUtils = {
    // 1. Stock Time Series Data
    interval: "&interval=",
    STOCK_TIME_SERIES: {
        keywords: "&keywords=",
        INTRA_DAY: 'function=TIME_SERIES_INTRADAY',
        GLOBAL_QUOTE: "function=GLOBAL_QUOTE",
        SEARCH: "function=SYMBOL_SEARCH"
    },

    // 2. Physical and Digital/Crypto Currencies

    // 3. Technical Indicators

    // 4. Sector Performances
}

// exports.buildObject = function(object) {
//     if (object.arguments.length === 1) {
//         object.name = arguments[0];
//         object.isSingleStock = true;
//     }
//     return object;
// }

exports.getStock = function(name) {
    return buildURL(name);
}

buildURL = function (name) {
    console.log('name--->',name)
    let url = baseUrl;
    return url.concat(URLUtils.STOCK_TIME_SERIES.SEARCH, URLUtils.STOCK_TIME_SERIES.keywords, name, api_key_param, getAPIkey());
}

getAPIkey = function() {
    return config.getAVkey();
}
