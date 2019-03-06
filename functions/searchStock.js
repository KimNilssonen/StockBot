const request = require('request');

exports.checkStock = function(arguments, recievedMsg) {
    request(`https://www.avanza.se/_mobile/market/search/STOCK?query=${encodeURI(arguments)}`, (error, response, body) => {
        if(response.statusCode === 200) {
            console.log("Response OK! (200)");
            body = JSON.parse(body);
            
            if(body.totalNumberOfHits > 1) {
                console.log("Found multiple items.");
                let items = "";
                body.hits[0].topHits.forEach(stock => {
                    items += stock.name + ", Last Price: " + stock.lastPrice + " " + stock.currency + ", Change Percent: " + stock.changePercent + "%\n";
                });
                recievedMsg.channel.send("I found these items:\n" + items);
                
            } else if (body.totalNumberOfHits === 1) {
                console.log("Found one item.");
                const item = body.hits[0].topHits[0];
                let msg = item.name + ", last price was: " + item.lastPrice + " " + item.currency + ", with a change percent of: " + item.changePercent+"%";
                recievedMsg.channel.send(msg);
            } else {
                console.log("Found nothing.");
            }
        } else {
            console.log("Bad request. Response code:" + response.statusCode);
            console.log("Error was:" + error);
        }
    });
}