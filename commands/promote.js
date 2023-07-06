const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("promote")
        .setDescription("Generates a promotion image!")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption((option) => option.setName("user").setDescription("The user to be promoted!").setRequired(true))
        .addStringOption((option) => option.setName("twitter").setDescription("Enter the Twitter handle of the user you want to promote").setRequired(true))
        .addStringOption((option) => option.setName("description").setDescription("Enter a description about the user you want to promote").setRequired(false)),
};
