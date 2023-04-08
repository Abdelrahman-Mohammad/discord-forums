const Discord = require("discord.js");

class DiscordForums {
  /**
   *  Sets up and creates a Forums channel for your posts.
   * @param {Discord.Guild} guild - Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/Guild Guild}.
   * @param {(Discord.CategoryChannelResolvable|Discord.Snowflake)} [parent] - Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/CategoryChannel CategoryChannel} or CategoryChannel's {@link https://discord.js.org/#/docs/discord.js/14.9.0/typedef/Snowflake Snowflake}.
   * @param {String} [channelName] - Discord forum's channel name.
   * @param {Array<Discord.OverwriteResolvable>} [permissions] - Array of objects of {@link https://discord.js.org/#/docs/discord.js/14.9.0/typedef/OverwriteData permissions}
   * @returns {Discord.ForumChannel} Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/ForumChannel ForumChannel}.
   */

  static async setupForums(
    guild,
    parent = null,
    channelName = "My Forums",
    permissions = null
  ) {
    if (!guild) return new TypeError("No Guild instance was provided.");

    guild.channels
      .create(parent, {
        name: channelName,
        type: ChannelType.GuildForum,
        permissionOverwrites: permissions,
      })
      .then((forumChannel) => {
        return forumChannel;
      })
      .catch(console.error);
  }

  /**
   * Creates a post in a specific forum channel.
   * @param {Discord.ForumChannel} forumChannel - Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/ForumChannel ForumChannel}.
   * @param {String} postName - Post's name.
   * @param {String} postDescription - Post's description.
   * @returns {Discord.ThreadChannel} Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/ThreadChannel ThreadChannel}.
   */

  static async createPost(forumChannel, postName, postDescription) {
    if (!forumChannel) return new TypeError("No forum channel was provided");
    if (!postName) return new TypeError("No post name was provided");
    if (!postDescription)
      return new TypeError("No post description was provided");

    forumChannel.threads
      .create({
        name: postName,
        message: {
          content: postDescription,
        },
      })
      .then((threadChannel) => {
        return threadChannel;
      })
      .catch(console.error);
  }

  /**
   *  Deletes a post in a specific forum channel.
   * @param {Discord.Guild} guild - Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/Guild Guild}.
   * @param {Discord.Snowflake} forumId - Discord ThreadChannel's {@link https://discord.js.org/#/docs/discord.js/14.9.0/typedef/Snowflake Snowflake}
   * @param {String} [reason] - Reason for deletion.
   * @returns {void}
   */

  static async deletePost(guild, forumId, reason) {
    if (!guild) return new TypeError("No Guild instance was provided.");
    guild.channels
      .fetch(forumId)
      .then((channel) => channel.delete(reason))
      .catch(console.error);
  }
}

module.exports = DiscordForums;
