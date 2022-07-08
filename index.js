const Discord = require("discord.js");
const mongoose = require("mongoose");
const forums = require("./models/forums.js");
const wait = require("node:timers/promises").setTimeout;

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
   * @param {Discord.Interaction} [interaction] - Interaction
   * @param {string} [modalHeader] - [Optional] Discord modal header (max 100 characters)
   * @param {string} [modalTitleLabel] - [Optional] Discord modal title (max 100 characters)
   * @param {string} [modalDescriptionLabel] - [Optional] Discord modal description (max 100 characters)
   */

  static async createForum(interaction, modalHeader = "New Forum", modalTitleLabel = "Title", modalDescriptionLabel = "Description") {
    const forum = new Discord.Modal().setCustomId("forum").setTitle(modalHeader);
    const forumTitle = new Discord.TextInputComponent().setCustomId("forum-title").setLabel(modalTitleLabel).setStyle("SHORT");
    const forumDescription = new Discord.TextInputComponent().setCustomId("forum-description").setLabel(modalDescriptionLabel).setStyle("PARAGRAPH");
    const firstActionRow = new Discord.MessageActionRow().addComponents(forumTitle);
    const secondActionRow = new Discord.MessageActionRow().addComponents(forumDescription);
    forum.addComponents(firstActionRow, secondActionRow);
    await interaction.showModal(forum);

    const filter = (interaction) => interaction.customId === "forum";
    await interaction.awaitModalSubmit({ filter });

    const Title = interaction.fields.getTextInputValue("forum-title");
    const Description = interaction.fields.getTextInputValue("forum-description");

    const forumEmbed = new Discord.MessageEmbed().setColor("#2F3136").setAuthor({ name: Title, iconURL: interaction.user.displayAvatarURL() }).setDescription(Description).setFooter({ text: `<:bubblechat:994869820300468374> 0` }).setTimestamp();
    const message = await interaction.followUp({ embeds: [forumEmbed] });
    const thread = await message.startThread({ name: Title });

    const Forum = new forums({
      userID: interaction.user.id,
      messageID: message.id,
      channelID: interaction.channel.id,
      threadID: thread.id,
      guildID: interaction.guild.id,
      Title: Title,
      Description: Description,
      MessagesNumber: thread.messageCount,
      forumUsers: thread.members.cache.map((member) => member.id),
      forumMessages: thread.messages.cache.map((message) => message),
    });
    Forum.save().catch((e) => console.log(`Failed to save forum to database: ${e}`));

    async function displayMessagesNumber() {
      for (; thread.messageCount < 50; ) {
        forumEmbed.setFooter({ text: `<:bubblechat:994869820300468374> ${thread.messageCount}` });
        await forums.findOneAndUpdate(
          {
            userID: interaction.user.id,
            messageID: message.id,
            channelID: interaction.channel.id,
            threadID: thread.id,
            guildID: interaction.guild.id,
          },
          {
            MessagesNumber: thread.messageCount,
          }
        );
        await wait(3000);
      }
    }
    await displayMessagesNumber();

    const myForum = forums.findOne({
      userID: interaction.user.id,
      messageID: message.id,
      channelID: interaction.channel.id,
      threadID: thread.id,
      guildID: interaction.guild.id,
    });

    return myForum;
  }
}

module.exports = DiscordForums;
