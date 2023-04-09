const Discord = require("discord.js");

class DiscordForums {
  /**
   *  Sets up and creates a Forums channel for your posts.
   * @param {Discord.Guild} guild - Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/Guild Guild}.
   * @param {(Discord.CategoryChannelResolvable|Discord.Snowflake)} parent - Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/CategoryChannel CategoryChannel} or CategoryChannel's {@link https://discord.js.org/#/docs/discord.js/14.9.0/typedef/Snowflake Snowflake}.
   * @param {String} [channelName] - Discord forum's channel name.
   * @param {Array<Discord.OverwriteResolvable>} [permissions] - Array of objects of {@link https://discord.js.org/#/docs/discord.js/14.9.0/typedef/OverwriteData permissions}
   * @returns {Promise<Discord.ForumChannel>} Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/ForumChannel ForumChannel}.
   */

  static async setupForums(
    guild,
    parent,
    channelName = "My Forums",
    permissions = null
  ) {
    if (!guild) return new TypeError("No Guild instance was provided.");
    if (!parent) return new TypeError("No Category Channel was provided.");

    return guild.channels
      .create(parent, {
        name: channelName,
        type: ChannelType.GuildForum,
        permissionOverwrites: permissions,
      })
      .then((forumChannel) => forumChannel)
      .catch(console.error);
  }

  /**
   * Creates a post in a specific forum channel.
   * @param {Discord.ForumChannel} forumChannel - Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/ForumChannel ForumChannel}.
   * @param {String} postName - Post's name.
   * @param {String} postDescription - Post's description.
   * @returns {Promise<Discord.ThreadChannel>} Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/ThreadChannel ThreadChannel}.
   */

  static async createPost(forumChannel, postName, postDescription) {
    if (!forumChannel) return new TypeError("No forum channel was provided");
    if (!postName) return new TypeError("No post name was provided");
    if (!postDescription)
      return new TypeError("No post description was provided");

    return forumChannel.threads
      .create({
        name: postName,
        message: {
          content: postDescription,
        },
      })
      .then((threadChannel) => threadChannel)
      .catch(console.error);
  }

  /**
   *  Deletes a post in a specific forum channel.
   * @param {Discord.Guild} guild - Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/Guild Guild}.
   * @param {Discord.Snowflake} postId - Discord ThreadChannel's {@link https://discord.js.org/#/docs/discord.js/14.9.0/typedef/Snowflake Snowflake}
   * @param {String} [reason] - Reason for deletion.
   * @returns {Promise<Discord.ThreadChannel>} Discord {@link https://discord.js.org/#/docs/discord.js/14.9.0/class/ThreadChannel ThreadChannel}.
   */

  static async deletePost(guild, postId, reason) {
    if (!guild) return new TypeError("No Guild instance was provided.");
    return guild.channels
      .fetch(postId)
      .then((channel) =>
        channel
          .delete(reason)
          .then((deletedThread) => deletedThread)
          .catch(console.error)
      )
      .catch(console.error);
  }
}

module.exports = DiscordForums;
