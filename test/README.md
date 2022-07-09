<p align="center"><a href="https://nodei.co/npm/discord-forums/"><img src="https://nodei.co/npm/discord-forums.png"></a></p>
<p align="center"><img src="https://img.shields.io/npm/v/discord-forums"> <img src="https://img.shields.io/github/repo-size/Abdelrahman-Mohammad/discord-forums"> <img src="https://img.shields.io/npm/l/discord-forums"> <img src="https://img.shields.io/github/contributors/Abdelrahman-Mohammad/discord-forums"> <img src="https://img.shields.io/github/package-json/dependency-version/Abdelrahman-Mohammad/discord-forums/mongoose">
  <a href="https://discord.gg/rk7cVyk"><img src="https://discordapp.com/api/guilds/753938142246994031/widget.png" alt="Discord server"/></a></p>

# discord-forums

![discord-forums picture](https://i.ibb.co/DbV86bj/discord-forums.jpg)

# Documentation

You can find the full documentation [here]().

# Download

You can download it from npm:

```cli
npm install discord-forums
```

# Setting Up

First things first, we include the module into the project.

```js
const Forums = require("discord-forums");
```

Then, we connect to our MongoDB database.

```js
Forums.connectionURL("mongodb://...");
```

# Examples

Check [properties](https://github.com/Abdelrahman-Mohammad/discord-forums/tree/main/test#properties) for all the properties of your forum.
_Note: in the examples we will be using a [command handler](https://discordjs.guide/creating-your-bot/command-handling.html)._

## Making a forum command

- Dependencies you need:
  - discord-forums
  - discord.js
  - @discordjs/builders
  - mongoose

```js
// First, we require our dependencies.
const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Forums = require("discord-forums");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder().setName("forum").setDescription("Creates a new forum"),
  async execute(interaction) {
    // We define our client.
    const client = interaction.client;

    // Then, we connect to our database.
    await Forums.connectionURL("mongodb://...");

    // After that we call the .createForum() method to create our forum.
    // We pass in our client as the first parameter and interaction as our seccond.
    // We will also put it in a variable to use it later.
    const myForum = await Forums.createForum(client, interaction);
    console.log(myForum);

    // Then, we make sure that the user doesn't have a forum already open
    if (myForum === false) {
      return interaction.reply("You already have a forum open");
    }

    // Here we will be sending a log message to the moderation channel
    const moderationChannel = await client.channels.cache.get("862503484418687028");

    // Next, let's create an embed with all the Forums information to send
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setTitle("New Forum Created")
      .setDescription(`\`A new forum has been created.\`\n\n> Creator: ${interaction.member}\n> Forum ID: ${myForum.threadID}\n> Forum Title: ${myForum.Title}\n> Forum Description: ${myForum.Description}`);

    // Lastly, we send the embed to the moderation channel.
    await moderationChannel.send({ embeds: [embed] });
  },
};
```

Congrats 🥳! You made your first forum.

## Making a forum deletion command

- Dependencies you need:
  - discord-forums
  - discord.js
  - @discordjs/builders
  - mongoose

```js
// First, we require our dependencies.
const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Forums = require("discord-forums");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder().setName("forum").setDescription("Creates a new forum"),
  async execute(interaction) {
    // We define our client and our other variables.
    const client = interaction.client;
    const userId = interaction.user.id;
    const threadId = "994922705449136139";

    // Then, we connect to our database.
    await Forums.connectionURL("mongodb://...");

    // After that we call the .deleteForum() method to delete our forum.
    // We pass in our client as the first parameter and either user id or thread id as our seccond, I chose user id for this one.
    // We will also put it in a variable to use it later.
    const myDeletedForum = await Forums.deleteForum(client, userId);

    // Then, we make sure that the forum exist
    if (myDeletedForum === false) {
      return interaction.reply("I couldn't find any forums");
    }

    // Here we will be sending a log message to the moderation channel
    const moderationChannel = client.channels.cache.get("753938142246994033");

    // Next, let's create an embed with all the Forums information to send
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setTitle("A Forum Was Deleted")
      .setDescription(`\`A forum has been deleted.\`\n\n> Creator: ${interaction.member}\n> Forum ID: ${myDeletedForum.threadID}\n> Forum Title: ${myDeletedForum.Title}\n> Forum Description: ${myDeletedForum.Description}`);

    // Lastly, we send the embed to the moderation channel.
    await moderationChannel.send({ embeds: [embed] });
  },
};
```

## Properties

```js
const myForum = Forums.deleteForum(...);

myForum.userID // The ID of the user that owns this forum - Snowflake
myForum.messageID // The message ID that the thread(forum) is linked to - Snowflake
myForum.threadID // The thread ID that the forum is in - Snowflake
myForum.channelID // The channel ID that the forum is in - Snowflake
myForum.guildID // The guild ID that the forum is in - Snowflake
myForum.Title // The user specified title of the forum - String
myForum.Description // The user specified description of the forum - String
myForum.MessagesNumber // The number of messages in the forum - Number
myForum.forumUsers // All the users in the forum - Array<Snowflake>
myForum.forumMessages // All the messages in the forum - Array<Message>
```

### Types

- [Snowflake](https://discord.js.org/#/docs/discord.js/stable/typedef/Snowflake)
- [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Message](https://discord.js.org/#/docs/discord.js/stable/class/Message)

Have fun and happy discussions! Made with ❤ by Abdelrahman.
