const Discord = require("discord.js");
const mongoose = require("mongoose");
const forums = require("./models/forums.js");
let mongoUrl;

class DiscordForums {
  /**
   * @param {string} [dbUrl] - A valid mongo database URI.
   */

  static async connectionURL(dbUrl) {
    if (!dbUrl) throw new TypeError("A database url was not provided.");
    mongoUrl = dbUrl;
    return await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  /**
   * @param {Discord.Client} [client] - Discord Client instance
   * @param {Discord.Interaction} [interaction] - Interaction
   * @param {string} [modalHeader] - [Optional] Discord modal header (max 100 characters)
   * @param {string} [modalTitleLabel] - [Optional] Discord modal title (max 100 characters)
   * @param {string} [modalDescriptionLabel] - [Optional] Discord modal description (max 100 characters)
   */

  static async createForum(client, interaction, modalHeader = "New Forum", modalTitleLabel = "Title", modalDescriptionLabel = "Description") {
    if (modalHeader.length > 100) return new TypeError("A modal's header can't exceed 100 characters.");
    if (modalTitleLabel.length > 100) return new TypeError("A modal's title label can't exceed 100 characters.");
    if (modalDescriptionLabel.length > 100) return new TypeError("A modal's description label can't exceed 100 characters.");

    const isForum = await forums.findOne({ userID: interaction.user.id });
    if (isForum) return false;

    const forumModal = new Discord.Modal().setCustomId("forum").setTitle(modalHeader);
    const forumTitle = new Discord.TextInputComponent().setCustomId("forum-title").setLabel(modalTitleLabel).setStyle("SHORT").setRequired(true);
    const forumDescription = new Discord.TextInputComponent().setCustomId("forum-description").setLabel(modalDescriptionLabel).setStyle("PARAGRAPH").setRequired(true);
    const firstActionRow = new Discord.MessageActionRow().addComponents(forumTitle);
    const secondActionRow = new Discord.MessageActionRow().addComponents(forumDescription);
    forumModal.addComponents(firstActionRow, secondActionRow);
    await interaction.showModal(forumModal);

    const filter = (interaction) => interaction.customId === "forum";
    const modalInteraction = await interaction.awaitModalSubmit({ filter, time: 360000000 });
    const title = await modalInteraction.fields.getTextInputValue("forum-title");
    const description = await modalInteraction.fields.getTextInputValue("forum-description");

    const forumEmbed = new Discord.MessageEmbed().setColor("#2F3136").setAuthor({ name: title, iconURL: interaction.user.displayAvatarURL() }).setDescription(`**${interaction.user.username}:** ${description}\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`).setFooter({ text: "0", iconURL: "https://i.ibb.co/fqMkfNJ/afafafafafafaf.jpg" }).setTimestamp();
    const message = await interaction.followUp({ embeds: [forumEmbed], fetchReply: true });
    const thread = await message.startThread({ name: title });

    const Forum = new forums({
      userID: interaction.user.id,
      messageID: message.id,
      channelID: interaction.channel.id,
      threadID: thread.id,
      guildID: interaction.guild.id,
      Title: title,
      Description: description,
      MessagesNumber: thread.messageCount,
      forumUsers: thread.members.cache.map((member) => member.id),
      forumMessages: thread.messages.cache.map((message) => message),
    });
    await Forum.save().catch((e) => console.log(`Failed to save forum to database: ${e}`));

    let messageNumber = 0;
    client.on("messageCreate", async (messageCreated) => {
      if (messageCreated.author.bot) return;
      if (messageCreated.channel.parent.id !== thread.parent.id) return;
      messageNumber++;
      await forums
        .findOneAndUpdate(
          {
            userID: interaction.user.id,
            messageID: message.id,
            channelID: interaction.channel.id,
            threadID: thread.id,
            guildID: interaction.guild.id,
          },
          {
            MessagesNumber: messageNumber,
          }
        )
        .catch((e) => console.log(`Failed to find document: ${e}`));

      const embed = forumEmbed.setFooter({ text: messageNumber.toString(), iconURL: "https://i.ibb.co/fqMkfNJ/afafafafafafaf.jpg" });
      await message.edit({ embeds: [embed] });
    });
    return Forum;
  }

  /**
   *
   * @param {Discord.Client} [client] - Discord Client instance
   * @param {string} [userId] - Discord user ID
   * @param {string} [threadId] - Discord thread ID
   * @returns
   */
  static async deleteForum(client, userId, threadId) {
    if (!userId && !threadId) return new TypeError("Neither a user ID nor a thread ID was provided.");
    const isForum = forums.fineOne({ userID: userId, threadID: threadId }).catch((e) => console.log(`Failed to find document: ${e}`));
    if (!isForum) return false;

    if (threadId) {
      forums.findOneAndDelete({ threadID: threadId }).catch((e) => console.log(`Failed to delete document: ${e}`));
    } else {
      forums.findOneAndDelete({ userID: userId }).catch((e) => console.log(`Failed to delete document: ${e}`));
    }

    return isForum;
  }

  /**
   *
   * @param {string} [userId] - Discord user ID
   * @param {string} [threadId] - Discord thread ID
   * @returns
   */

  static async getForum(userId, threadId) {
    let myForum;
    if (threadId) {
      myForum = await forums.findOne({ threadID: threadId });
    } else {
      myForum = await forums.findOne({ userID: userId });
    }

    if (!myForum) return false;

    return myForum;
  }
}

module.exports = DiscordForums;
