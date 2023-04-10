<p align="center"><a href="https://nodei.co/npm/discord-forums/"><img src="https://nodei.co/npm/discord-forums.png"></a></p>
<p align="center"><img src="https://img.shields.io/npm/v/discord-forums"> <img src="https://img.shields.io/github/repo-size/Abdelrahman-Mohammad/discord-forums"> <img src="https://img.shields.io/npm/l/discord-forums"> <img src="https://img.shields.io/github/contributors/Abdelrahman-Mohammad/discord-forums"> <img src="https://img.shields.io/github/package-json/dependency-version/Abdelrahman-Mohammad/discord-forums/mongoose">
  <a href="https://discord.gg/rk7cVyk"><img src="https://discordapp.com/api/guilds/753938142246994031/widget.png" alt="Discord server"/></a></p>

# **discord-forums/examples**

## **📄 | Documentation**

You can find the full documentation [here](https://github.com/Abdelrahman-Mohammad/discord-forums/).

---

## **📁 | Download & Update**

You can download it from npm:

```cli
npm install discord-forums@latest
```

```cli
npm update discord-forums
```

---

## **🔧 | Setting Up**

First things first, include the module into your file.

```js
require("discord-forums");
```

---

## **🧪 | Examples**

_Note: in the examples we will be using a [command handler](https://discordjs.guide/creating-your-bot/command-handling.html)._

- Dependencies you need:
  - discord-forums
  - @discordjs/builders

```js
// First, make sure to import the dependencies in each file.
const { SlashCommandBuilder } = require("@discordjs/builders");
require("discord-forums");
```

### **`setup-forums` Command**

```js
module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-forums")
    .setDescription("Creates a new forum channel")
    .addStringOption((option) => {
      option
        .setName("forum-name")
        .setDescription("The name of your forums channel.");
    }),
  async execute(interaction) {
    // Variables we need:
    const guild = interaction.guild;
    const parentCategoryId = "355897081333940227";
    const name = interaction.options.getString("forum-name");
    const permissions = [
      {
        id: "547905866255433758",
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
        ],
        deny: [
          PermissionFlagsBits.ManageMessages,
          PermissionsFlagsBits.AttachFiles,
        ],
      },
    ];

    // Call the `setupForums` method to create our forum channel.
    const myForum = await setupForums(
      guild,
      parentCategoryId,
      name,
      permissions
    );
    console.log(myForum);
  },
};
```

Congrats 🥳! You made your first forum channel. Let's create a post.

### **`create-post` Command**

```js
module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-post")
    .setDescription("Creates a new post in the forums channel")
    .addStringOption((option) => {
      option.setName("post-name").setDescription("The name of your post.");
    })
    .addStringOption((option) => {
      option
        .setName("post-message")
        .setDescription("The message of your post.");
    }),
  async execute(interaction) {
    // Variables we need:
    const forumChannel = interaction.guild.channels.fetch("1006698887605653");
    const name = interaction.options.getString("post-name");
    const message = interaction.options.getString("post-message");

    // Call the `createPost` method to create our post.
    const myPost = await createPost(forumChannel, name, message);
    console.log(myPost);
  },
};
```

### **`delete-post` Command**

```js
module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete-post")
    .setDescription("Deletes a post in the forums channel")
    .addStringOption((option) => {
      option.setName("post-id").setDescription("The id of your post.");
    }),
  async execute(interaction) {
    // Variables we need:
    const guild = interaction.guild;
    const postId = interaction.options.getString("post-id");

    // Call the `deletePost` method to delete our post.
    await deletePost(guild, postId, "I don't need that post anymore.");
  },
};
```

---

## Types

- [ForumChannel](https://discord.js.org/#/docs/discord.js/14.9.0/class/ForumChannel)
- [ThreadChannel](https://discord.js.org/#/docs/discord.js/14.9.0/class/ThreadChannel)
- [Snowflake](https://discord.js.org/#/docs/discord.js/14.9.0/typedef/Snowflake)
- [Guild](https://discord.js.org/#/docs/discord.js/14.9.0/class/Guild)
- [CategoryChannel](https://discord.js.org/#/docs/discord.js/14.9.0/class/CategoryChannel)
- [OverwriteResolvable](https://discord.js.org/#/docs/discord.js/14.9.0/typedef/OverwriteResolvable)

Have fun and happy discussions! Made with ❤ by Abdelrahman.
