const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("claim")
        .setDescription("Generates individual Surgence PFPs.")
        .addSubcommand((subcommand) => subcommand.setName("card").setDescription("Claim your id card!"))
        .addSubcommand((subcommand) => subcommand.setName("banner").setDescription("Claim your banner!")),
};
