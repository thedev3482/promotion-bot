const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("claim").setDescription("Generates individual Surgence PFPs."),
};
