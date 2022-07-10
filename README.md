<p align="center"><a href="https://nodei.co/npm/discord-forums/"><img src="https://nodei.co/npm/discord-forums.png"></a></p>
<p align="center"><img src="https://img.shields.io/npm/v/discord-forums"> <img src="https://img.shields.io/github/repo-size/Abdelrahman-Mohammad/discord-forums"> <img src="https://img.shields.io/npm/l/discord-forums"> <img src="https://img.shields.io/github/contributors/Abdelrahman-Mohammad/discord-forums"> <img src="https://img.shields.io/github/package-json/dependency-version/Abdelrahman-Mohammad/discord-forums/mongoose">
  <a href="https://discord.gg/rk7cVyk"><img src="https://discordapp.com/api/guilds/753938142246994031/widget.png" alt="Discord server"/></a></p>

# discord-forums

![discord-forums picture](https://i.ibb.co/DbV86bj/discord-forums.jpg)

**DISCLAIMER:** This is not an official package from Discord.

- discord-forums is a lightweight, powerfull npm package that lets you make a forums channel for your server where members can discuss questions and ideas.
- If you need help feel free to join our <a href="https://discord.gg/hnzXhDh">discord server</a> to talk and help you with your code.
- If you encounter any of issues fell free to open an issue in our <a href="https://github.com/Abdelrahman-Mohammad/discord-forums/issues">github repository</a>.

# 📁 | Download & Update

You can download it from npm:

```cli
npm install discord-forums
```

You can update to a newer version to receive updates using npm.

```cli
npm update discord-forums
```

# ⚙ | Changelog

- **8 July 2022** (v1.2.0) - Added **createForum** and **deleteForum** methods.
- **8 July 2022** (v1.1.0) - Grand Launch.

# ✍ | Quick Example

```js
const Forums = require("discord-forums");
Forums.connectionURL("mongodb://..."); // First, we connect to the database.
const myForum = Forums.createForum(client, interaction, "Issues Forum", "Issue Title", "Issue Description"); // Then, we create our forum.
```

# 📜 | Setting Up

First things first, we include the module into the project.

```js
const Forums = require("discord-forums");
```

Then, we connect to our MongoDB database.

```js
Forums.connectionURL("mongodb://...");
```

# 📝 | Examples

_Examples can be found in [/test](https://github.com/Abdelrahman-Mohammad/discord-forums/tree/main/test#discord-forums)_

# Methods

### **createForum**

Creates a new forum.

```js
Forums.createForum(<Client - Discord.Client>, <Interaction - Discord.Interaction>, <ForumHeader - String | "New Forum">, <ForumTitleLabel - String | "Title">, <ForumDescriptionLabel - String | "Description">);
```

- Output:

```
Promise<Object>
```

#### **createForum properties**

```js
const myForum = Forums.createForum(...);

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

### **deleteForum**

Deletes a forum, if it exists.

```js
Forums.deleteForum(<Client - Discord.Client>, <UserID - String>, <ThreadID - String>);
```

_note: You can only provide one of UserID or ThreadID and it would still work._

- Output:

```
Promise<Object>
```

#### **deleteForum properties**

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

### **getForum**

Gets a forum, if it exists.

```js
Forums.getForum(<UserID - String>, <ThreadID - String> );
```

_note: You can only provide one of UserID or ThreadID and it would still work._

- Output:

```
Promise<Object>
```

#### **getForum properties**

```js
const myForum = Forums.getForum(...);

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

## Types

- [Snowflake](https://discord.js.org/#/docs/discord.js/stable/typedef/Snowflake)
- [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Message](https://discord.js.org/#/docs/discord.js/stable/class/Message)

Have fun and happy discussions! Made with ❤ by Abdelrahman.
