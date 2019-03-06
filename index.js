// Discord
const Discord = require('discord.js');
const client = new Discord.Client();

// Config
const config = require('../configs/StockBot/StockBotConfig.js');

// Functions
//const help = require('./functions/help.js');
const searchStock = require ('./functions/searchStock.js');

let mainChannel;

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

client.on('message', (recievedMsg) => {
    if (recievedMsg.author == client.user) { return; }
    if (recievedMsg.content.includes(client.user.toString())) {
        recievedMsg.channel.send("Message recieved: " + recievedMsg.content + 
            " from: " + recievedMsg.author.toString())  
    }
    if (recievedMsg.content.startsWith("!")) {
        processCommand(recievedMsg);
    }
})

function processCommand(recievedMsg) {
    let fullCommand = recievedMsg.content.substr(1).toLowerCase();
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);

    console.log("Command recieved: " + primaryCommand + ", from User:" + recievedMsg.author.toString());
    console.log(" - arguments: " + arguments)

    if(primaryCommand == "stock") {
        if(arguments.length == 0) {
            recievedMsg.channel.send("You need to specify what company to look up (for example google).");
            return;
        }
        searchStock.checkStock(arguments, recievedMsg);
    }
}

client.login(config.getToken()).then(() => {
    mainChannel = client.channels.get(config.getChannelId());
    console.log("Logged in to: " + mainChannel.name);
    mainChannel.send("I'm awake!");
});