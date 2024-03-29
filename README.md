<p align="center"><a href="https://nodei.co/npm/discord-forums/"><img src="https://nodei.co/npm/discord-forums.png"></a></p>
<p align="center"><img src="https://img.shields.io/npm/v/discord-forums"> <img src="https://img.shields.io/github/repo-size/Abdelrahman-Mohammad/discord-forums"> <img src="https://img.shields.io/npm/l/discord-forums"> <img src="https://img.shields.io/github/contributors/Abdelrahman-Mohammad/discord-forums"> <img src="https://img.shields.io/github/package-json/dependency-version/Abdelrahman-Mohammad/discord-forums/mongoose">
  <a href="https://discord.gg/rk7cVyk"><img src="https://discordapp.com/api/guilds/753938142246994031/widget.png" alt="Discord server"/></a></p>

# **discord-forums** 💬

![discord-forums picture](https://i.ibb.co/DbV86bj/discord-forums.jpg)

discord-forums is a lightweight, powerfull npm package that lets you make a forums channel for your server where members can discuss questions and ideas.

**Notice:**

- This package is built with Discord.js v14.9.0 _(not tested on v13)_
- If you need help feel free to join our <a href="https://discord.gg/hnzXhDh">discord server</a> to talk and get help.
- If you encounter any of issues fell free to open an issue in our <a href="https://github.com/Abdelrahman-Mohammad/discord-forums/issues">github repository</a>.

---

## **📁 | Download & Update**

You can download the package from npm:

```cli
npm install discord-forums
```

You can update to a newer version to receive updates using npm:

```cli
npm update discord-forums
```

---

## **📰 | Changelog**

- **9 April, 2023** (v2.0.1) - Added Exampes in [/examples](https://github.com/Abdelrahman-Mohammad/discord-forums/tree/main/examples)
- **8 April, 2023** (v2.0.0) - Removed all previous methods. Added **setupForums**, **createPost**, and **deletePost**.
- **8 April, 2023** (v2.0.0) - Switched to Discord's ForumChannel.
- **8 July, 2022** (v1.2.0) - Added **createForum** and **deleteForum** methods.
- **8 July, 2022** (v1.0.0) - Grand Launch.

---

## **✍ | Quick Example**

```js
// Import the package to access it's methods.
const Forums = require("discord-forums");

// Create the Forums channel.
const myForums = Forums.setupForums(guild, "355897081333940227", "My Forums", [...]);

// Create a new post in your forums channel.
Forums.createPost(myForums, "My Post", "This is my first post!");
```

---

## **⚡ | Setting Up**

First things first, download the package.

```cli
npm install discord-forums@latest
```

then, include the module into your project.

```js
const Forums = require("discord-forums");
```

---

## **🔧 | Methods**

### **setupForums** - Creates a new forums channel.

> ```js
> Forums.setupForums(<Discord.Guild>, <Discord.CategoryChannelResolvable|Discord.Snowflake>, <String>, <Array<Discord.OverwriteResolvable>>);
> ```
>
> Returns: `Promise<Discord.ForumChannel>`

### **createPost** - Creates a new post in a specific forum channel.

> ```js
> Forums.createPost(<Discord.ForumChannel>, <String>, <String>);
> ```
>
> Returns: `Promise<Discord.ThreadChannel>`

### **deletePost** - Deletes a forum post in a specific guild.

> ```js
> Forums.deletePost(<Discord.Guild>, <Discord.Snowflake>, <String>);
> ```
>
> Returns: `Promise<Discord.ThreadChannel>`

---

## 📝 | Examples

_Examples can be found in [/examples](https://github.com/Abdelrahman-Mohammad/discord-forums/tree/main/examples)_

---

## Types

- [ForumChannel](https://discord.js.org/#/docs/discord.js/14.9.0/class/ForumChannel)
- [ThreadChannel](https://discord.js.org/#/docs/discord.js/14.9.0/class/ThreadChannel)
- [Snowflake](https://discord.js.org/#/docs/discord.js/14.9.0/typedef/Snowflake)
- [Guild](https://discord.js.org/#/docs/discord.js/14.9.0/class/Guild)
- [CategoryChannel](https://discord.js.org/#/docs/discord.js/14.9.0/class/CategoryChannel)
- [OverwriteResolvable](https://discord.js.org/#/docs/discord.js/14.9.0/typedef/OverwriteResolvable)

Have fun and happy discussions! Made with ❤ by Abdelrahman.
