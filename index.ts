import "dotenv/config";
import { getBannerTemplate } from "./template-banner-generation";
import { getIdCardTemplate } from "./template-id-card-generation";
import nodeHtmlToImage = require("node-html-to-image");

const { AttachmentBuilder, Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// When the client is ready, run this code (only once)
client.once("ready", async () => {
    console.log("Promotion Bot is ready!");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "claim") {
        const user = interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        const roles = member._roles;

        let team = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "key operatives");
        let allies = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "allies");
        let battalionLeader = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "battalion leader");
        let surgenceListed = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "surgence listed");
        let specialist = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "specialist");
        let agent = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "agent");

        try {
            // Check if roles are defined
            if (team == undefined || allies == undefined || battalionLeader == undefined || surgenceListed == undefined || specialist == undefined || agent == undefined) {
                await interaction.reply({ content: "Some promotion roles aren't defined!", ephemeral: true });
            } else {
                const avatar = "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".png?size=256";
                const isTeam = roles.find((role) => role === team.id);
                const isAllies = roles.find((role) => role === allies.id);
                const isBattalionLeader = roles.find((role) => role === battalionLeader.id);
                const isSurgenceListed = roles.find((role) => role === surgenceListed.id);
                const isSpecialist = roles.find((role) => role === specialist.id);
                const isAgent = roles.find((role) => role === agent.id);
                const imageName = isBattalionLeader ? "battalion-leader.png" : isSurgenceListed ? "surgence-listed.png" : isSpecialist ? "specialist.png" : "agent.png";

                // Build the Tweet-Button
                const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Tweet").setStyle(ButtonStyle.Link).setURL("https://twitter.com/compose/tweet"));

                if (isTeam && interaction.options._subcommand == "banner") {
                    // Check if Battalion Leader
                    await interaction.deferReply();
                    const attachment = await getBannerAttachment(avatar, user, "Team", imageName);

                    const embed = {
                        color: 0xdfcc21,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(user.username + "#" + user.discriminator + " claimed the Team promotion image!");
                    await interaction.editReply({
                        content: "Congratulation <@" + user.id + ">, this is your banner" + "! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else if (isAllies) {
                    // Check if Battalion Leader
                    await interaction.deferReply();
                    const attachment = interaction.options._subcommand == "card" ? await getIdCardAttachment(avatar, user, 0, imageName) : await getBannerAttachment(avatar, user, "Allies", imageName);

                    const embed = {
                        color: 0xbf4bce,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(user.username + "#" + user.discriminator + " claimed the Allies promotion image!");
                    await interaction.editReply({
                        content:
                            "Congratulation <@" +
                            user.id +
                            ">, this is your " +
                            (interaction.options._subcommand == "card" ? "id card" : "banner") +
                            "! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else if (isBattalionLeader) {
                    // Check if Battalion Leader
                    await interaction.deferReply();
                    const attachment =
                        interaction.options._subcommand == "card" ? await getIdCardAttachment(avatar, user, 1, imageName) : await getBannerAttachment(avatar, user, "Battalion Leader", imageName);

                    const embed = {
                        color: 0x3597c7,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(user.username + "#" + user.discriminator + " claimed the Battalion Leader promotion image!");
                    await interaction.editReply({
                        content:
                            "Congratulation <@" +
                            user.id +
                            ">, this is your " +
                            (interaction.options._subcommand == "card" ? "id card" : "banner") +
                            "! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else if (isSurgenceListed) {
                    // Check if Surgence Listed
                    await interaction.deferReply();
                    const attachment =
                        interaction.options._subcommand == "card" ? await getIdCardAttachment(avatar, user, 2, imageName) : await getBannerAttachment(avatar, user, "Surgence Listed", imageName);

                    const embed = {
                        color: 0x4abbbb,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(user.username + "#" + user.discriminator + " claimed the Surgence Listed promotion image!");
                    await interaction.editReply({
                        content:
                            "Congratulation <@" +
                            user.id +
                            ">, this is your " +
                            (interaction.options._subcommand == "card" ? "id card" : "banner") +
                            "! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else if (isSpecialist) {
                    // Check if Specialist
                    await interaction.deferReply();
                    const attachment =
                        interaction.options._subcommand == "card" ? await getIdCardAttachment(avatar, user, 3, imageName) : await getBannerAttachment(avatar, user, "Specialist", imageName);

                    const embed = {
                        color: 0xfac088,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(user.username + "#" + user.discriminator + " claimed the Specialist promotion image!");
                    await interaction.editReply({
                        content:
                            "Congratulation <@" +
                            user.id +
                            ">, this is your " +
                            (interaction.options._subcommand == "card" ? "id card" : "banner") +
                            "! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else if (isAgent) {
                    // Check if Agent
                    await interaction.deferReply();
                    const attachment = interaction.options._subcommand == "card" ? await getIdCardAttachment(avatar, user, 4, imageName) : await getBannerAttachment(avatar, user, "Agent", imageName);

                    const embed = {
                        color: 0xe26d87,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(user.username + "#" + user.discriminator + " claimed the Agent promotion image!");
                    await interaction.editReply({
                        content:
                            "Congratulation <@" +
                            user.id +
                            ">, this is your " +
                            (interaction.options._subcommand == "card" ? "id card" : "banner") +
                            "! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else {
                    // If user isn't promotable
                    await interaction.reply({ content: "You can't generate a promotion image for yourself because you don't have a promotion role!", ephemeral: true });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (interaction.commandName === "promote") {
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id);
        const roles = member._roles;

        let battalionLeader = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "battalion leader");
        let surgenceListed = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "surgence listed");
        let specialist = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "specialist");
        let agent = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "agent");

        try {
            // Check if roles are defined
            if (battalionLeader == undefined || surgenceListed == undefined || specialist == undefined || agent == undefined) {
                await interaction.reply({ content: "Some promotion roles aren't defined!", ephemeral: true });
            } else {
                const avatar = "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".png?size=256";
                const isBattalionLeader = roles.find((role) => role === battalionLeader.id);
                const isSurgenceListed = roles.find((role) => role === surgenceListed.id);
                const isSpecialist = roles.find((role) => role === specialist.id);
                const isAgent = roles.find((role) => role === agent.id);
                const imageName = isBattalionLeader ? "battalion-leader.png" : isSurgenceListed ? "surgence-listed.png" : isSpecialist ? "specialist.png" : "agent.png";

                // Build the Tweet-Button
                const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Tweet").setStyle(ButtonStyle.Link).setURL("https://twitter.com/compose/tweet"));

                if (isBattalionLeader) {
                    // Check if Battalion Leader
                    await interaction.deferReply();
                    const attachment = await getIdCardAttachment(avatar, user, 1, imageName);

                    const embed = {
                        color: 0x3597c7,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(user.username + "#" + user.discriminator + " was promoted to Battalion Leader (executor: " + interaction.user.username + "#" + interaction.user.discriminator + ")!");
                    await interaction.editReply({
                        content: "Congratulation <@" + user.id + ">, you have been promoted! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else if (isSurgenceListed) {
                    // Check if Surgence Listed
                    await interaction.deferReply();
                    const attachment = await getIdCardAttachment(avatar, user, 2, imageName);

                    const embed = {
                        color: 0x4abbbb,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(user.username + "#" + user.discriminator + " was promoted to Surgence Listed (executor: " + interaction.user.username + "#" + interaction.user.discriminator + ")!");
                    await interaction.editReply({
                        content: "Congratulation <@" + user.id + ">, you have been promoted! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else if (isSpecialist) {
                    // Check if Specialist
                    await interaction.deferReply();
                    const attachment = await getIdCardAttachment(avatar, user, 3, imageName);

                    const embed = {
                        color: 0xfac088,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(user.username + "#" + user.discriminator + " was promoted to Specialist (executor: " + interaction.user.username + "#" + interaction.user.discriminator + ")!");
                    await interaction.editReply({
                        content: "Congratulation <@" + user.id + ">, you have been promoted! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else if (isAgent) {
                    // Check if Agent
                    await interaction.deferReply();
                    const attachment = await getIdCardAttachment(avatar, user, 4, imageName);

                    const embed = {
                        color: 0xe26d87,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(user.username + "#" + user.discriminator + " was promoted to Agent (executor: " + interaction.user.username + "#" + interaction.user.discriminator + ")!");
                    await interaction.editReply({
                        content: "Congratulation <@" + user.id + ">, you have been promoted! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else {
                    // If user isn't promotable
                    await interaction.reply({
                        content: "You can't generate a promotion image for " + user.username + "#" + user.discriminator + " because he hasn't a promotion role!",
                        ephemeral: true,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN);

// Generates the attachement
async function getIdCardAttachment(avatar: string, user: any, imageId: number, imageName: string) {
    const _htmlTemplate = getIdCardTemplate(avatar, user.username + "#" + user.discriminator, imageId);

    const images = await nodeHtmlToImage({
        html: _htmlTemplate,
        quality: 100,
        type: "png",
        puppeteerArgs: {
            args: ["--no-sandbox"],
        },
        encoding: "binary",
    });

    return new AttachmentBuilder(images, { name: imageName });
}

// Generates the attachement
async function getBannerAttachment(avatar: string, user: any, role: string, imageName: string) {
    const _htmlTemplate = getBannerTemplate(avatar, user.username + "#" + user.discriminator, role);

    const images = await nodeHtmlToImage({
        html: _htmlTemplate,
        quality: 100,
        type: "png",
        puppeteerArgs: {
            args: ["--no-sandbox"],
        },
        encoding: "binary",
    });

    return new AttachmentBuilder(images, { name: imageName });
}
