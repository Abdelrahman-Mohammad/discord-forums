const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
  userID: { type: String },
  messageID: { type: String },
  threadID: { type: String },
  channelID: { type: String },
  guildID: { type: String },
  Title: { type: String },
  Description: { type: String },
  MessagesNumber: { type: Number },
  forumUsers: { type: [String] },
  forumMessages: { type: Array },
});

const forums = mongoose.model("Forums", ForumSchema);

module.exports = forums;
