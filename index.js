// Discord
const Discord = require('discord.js');
const client = new Discord.Client();

// Config
const config = require('../configs/StockBot/StockBotConfig.js');

// Functions
//const help = require('./functions/help.js');
const stockRequests = require ('./functions/stockRequests.js');

const testingIsOn = true;
let testServerId;
let testServerGeneralChannelId;

client.on('ready', () => {
    console.log(client.user.tag + ": I'm awake!");
    client.guilds.forEach((guild) => {
        console.log("Server: " + guild.name)
        console.log("- Channels: ");
        guild.channels.forEach((channel) => {
            console.log("  - " + channel.name + ", " + channel.id)
        })
    })
});

client.on('message', (message) => {
    if (message.author == client.user) { return; }
    if (message.content.includes(client.user.toString())) {
        message.channel.send("Message recieved: " + message.content + 
            " from: " + message.author.toString())  
    }
    if (testingIsOn) {
        if (message.channel.id === testServerGeneralChannelId) {
            if (message.content.startsWith("!")) {
                processCommand(message);
            }
        } else {
            console.log('Message was not sent from TestServer...');
        }
    } else {
        if (message.content.startsWith("!")) {
            processCommand(message);
        }
    }
})

processCommand = function(message) {
    let fullCommand = message.content.substr(1).toLowerCase();
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);

    console.log("Command recieved: " + primaryCommand + ", from User:" + message.author.toString());
    console.log(" - arguments: " + arguments)

    if(primaryCommand == "stock") {
        if(arguments.length == 0) {
            message.channel.send("You need to specify what company to look up (for example google).");
            return;
        }
        stockRequests.checkStock(arguments, message);
    }
}

client.login(config.getToken()).then(() => {
    testServerGeneralChannelId = client.channels.get(config.getTestServerGeneralChannelId()).id;
    testServerId = client.guilds.get(config.getTestServerId()).id;
});