require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "",  // your bot token
    clientID: process.env.CLIENT_ID || "1119180131504750653", // your bot client id
    prefix: process.env.PREFIX || "_", // bot prefix
    ownerID: ["1111132424844357692", "1001149322001383464"], //your discord id
    SpotifyID: "731ac5bf0603411f80ac446f5c02e290", // spotify id
    SpotifySecret: "cd16a34c385b4fa5915abd596fd4e480", // spotify secret
    mongourl: "mongodb+srv://plasmo:sahilarun1209@cluster0.ej1khbp.mongodb.net/?retryWrites=true&w=majority", // MongoDb URL
    embedColor: '2f3136', // embed colour
    logs: "1111918041891098776", // channel id for guild create and delete logs
    errorLogsChannel: "1111918041891098776", //error logs channel id
    ratelimitlog: "1111918041891098776", // ratelimit log
    removelog: "1111918041891098776", // server remove log
    SearchPlatform: process.env.SEARCH_PLATFORM || "youtube", // Sets the Search Platform. Possibilities: youtube || youtube music || soundcloud 
    AggregatedSearchOrder: process.env.AGGREGATED_SEARCH_ORDER || "youtube music,youtube,soundcloud,Spotify,apple,deezer", // Sets the order of Slash command's AutoComplete results
    links: {
        img: process.env.IMG || 'https://cdn.discordapp.com/attachments/1047818406818230313/1050015082337288212/7B9C5640-833F-4A85-872A-E9BF26F46F44.jpg', //setup system background image 
        support: process.env.SUPPORT || 'https://discord.gg/coderealmhq', //support server invite link
        invite: process.env.INVITE || '', //bot invite link
    }, 
  Webhooks: {
      player_create: 'https://discord.com/api/webhooks/1119721967117926461/MkpUWlQ0CraaugaUbqUX6GxKGkWf50svFMn07IC2x5Or9PNRWANxDT1C_RTM4uWGOkOv',
      player_delete: 'https://discord.com/api/webhooks/1119721967117926461/MkpUWlQ0CraaugaUbqUX6GxKGkWf50svFMn07IC2x5Or9PNRWANxDT1C_RTM4uWGOkOv',
      server_add: 'https://discord.com/api/webhooks/1119721967117926461/MkpUWlQ0CraaugaUbqUX6GxKGkWf50svFMn07IC2x5Or9PNRWANxDT1C_RTM4uWGOkOv',
    },
    nodes: [
         {
            host: process.env.NODE_HOST || "lavalink.invalid-studios.com",
            port: parseInt(process.env.NODE_PORT || "2333"),
            password: process.env.NODE_PASSWORD || "invaliduser",
            secure: parseBoolean(process.env.NODE_SECURE || "false"),

        }
    ],
}

function parseBoolean(value) {
    if (typeof (value) === 'string') {
        value = value.trim().toLowerCase();
    }
    switch (value) {
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}