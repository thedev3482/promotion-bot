import "dotenv/config";
import { getBannerTemplate } from "./template-banner-generation";
import { getIdCardTemplate } from "./template-id-card-generation";
import nodeHtmlToImage = require("node-html-to-image");

const {
    AttachmentBuilder,
    Client,
    EmbedBuilder,
    GatewayIntentBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    InteractionType,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require("discord.js");

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// When the client is ready, run this code (only once)
client.once("ready", async () => {
    console.log("Promotion Bot is ready!");
});

client.on("interactionCreate", async (interaction) => {
    const username = interaction.user.discriminator == 0 ? interaction.user.username : interaction.user.username + "#" + interaction.user.discriminator;
    const displayName = interaction.member.displayName;

    if (interaction.commandName === "claim") {
        let embed = new EmbedBuilder()
            .setTitle("CLAIM YOUR ID CARD / BANNER")
            .setDescription("Claim your id card and your banner. Just click on the buttons below.")
            .setFooter({ text: "Developed by TheDev" });

        const idCardButton = new ButtonBuilder().setCustomId("claim-id-card").setLabel("Claim your ID card").setStyle(ButtonStyle.Primary);
        const bannerButton = new ButtonBuilder().setCustomId("claim-banner").setLabel("Claim your banner").setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(idCardButton, bannerButton);

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }

    if (interaction.commandName === "promote") {
        const user = interaction.options.getUser("user");
        const twitter = interaction.options.getString("twitter");
        const description = interaction.options.getString("description");
        const member = interaction.guild.members.cache.get(user.id);
        const roles = member._roles;

        let allies = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "allies");
        let battalionLeader = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "battalion leader");
        let surgenceListed = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "surgence listed");
        let specialist = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "specialist");
        let agent = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "agent");

        try {
            // Check if roles are defined
            if (allies == undefined || battalionLeader == undefined || surgenceListed == undefined || specialist == undefined || agent == undefined) {
                await interaction.reply({ content: "Some promotion roles aren't defined!", ephemeral: true });
            } else {
                const avatar = "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".png?size=256";
                const isAllies = roles.find((role) => role === allies.id);
                const isBattalionLeader = roles.find((role) => role === battalionLeader.id);
                const isSurgenceListed = roles.find((role) => role === surgenceListed.id);
                const isSpecialist = roles.find((role) => role === specialist.id);
                const isAgent = roles.find((role) => role === agent.id);
                const imageName = isAllies ? "allies.png" : isBattalionLeader ? "battalion-leader.png" : isSurgenceListed ? "surgence-listed.png" : isSpecialist ? "specialist.png" : "agent.png";

                // Build the Tweet-Button
                const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Tweet").setStyle(ButtonStyle.Link).setURL("https://twitter.com/compose/tweet"));

                if (isAllies) {
                    // Check if Battalion Leader
                    await interaction.deferReply();
                    const attachment = await getIdCardAttachment(avatar, member.displayName, user, twitter, description, 0, imageName);

                    const embed = {
                        color: 0xbf4bce,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(username + " was promoted to Allies (executor: " + interaction.user.username + "#" + interaction.user.discriminator + ")!");
                    await interaction.editReply({
                        content: "Congratulation <@" + user.id + ">, you have been promoted! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else if (isBattalionLeader) {
                    // Check if Battalion Leader
                    await interaction.deferReply();
                    const attachment = await getIdCardAttachment(avatar, member.displayName, user, twitter, description, 1, imageName);

                    const embed = {
                        color: 0x3597c7,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(username + " was promoted to Battalion Leader (executor: " + interaction.user.username + "#" + interaction.user.discriminator + ")!");
                    await interaction.editReply({
                        content: "Congratulation <@" + user.id + ">, you have been promoted! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else if (isSurgenceListed) {
                    // Check if Surgence Listed
                    await interaction.deferReply();
                    const attachment = await getIdCardAttachment(avatar, member.displayName, user, twitter, description, 2, imageName);

                    const embed = {
                        color: 0x4abbbb,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(username + " was promoted to Surgence Listed (executor: " + interaction.user.username + "#" + interaction.user.discriminator + ")!");
                    await interaction.editReply({
                        content: "Congratulation <@" + user.id + ">, you have been promoted! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else if (isSpecialist) {
                    // Check if Specialist
                    await interaction.deferReply();
                    const attachment = await getIdCardAttachment(avatar, member.displayName, user, twitter, description, 3, imageName);

                    const embed = {
                        color: 0xfac088,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(username + " was promoted to Specialist (executor: " + interaction.user.username + "#" + interaction.user.discriminator + ")!");
                    await interaction.editReply({
                        content: "Congratulation <@" + user.id + ">, you have been promoted! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else if (isAgent) {
                    // Check if Agent
                    await interaction.deferReply();
                    const attachment = await getIdCardAttachment(avatar, member.displayName, user, twitter, description, 4, imageName);

                    const embed = {
                        color: 0xe26d87,
                        image: {
                            url: "attachment://" + imageName,
                        },
                    };

                    console.log(username + " was promoted to Agent (executor: " + interaction.user.username + "#" + interaction.user.discriminator + ")!");
                    await interaction.editReply({
                        content: "Congratulation <@" + user.id + ">, you have been promoted! \n\nLet your network know about your journey here in Surgence.",
                        embeds: [embed],
                        files: [attachment],
                        components: [row],
                    });
                } else {
                    // If user isn't promotable
                    await interaction.reply({
                        content: "You can't generate a promotion image for " + username + " because he hasn't a promotion role!",
                        ephemeral: true,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (interaction.type === InteractionType.ModalSubmit) {
        if (interaction.customId === "id-card-modal") {
            const twitter = interaction.fields.getTextInputValue("twitter");
            const description = interaction.fields.getTextInputValue("description").replace("\n", "<br>");
            const user = interaction.user;
            const member = interaction.guild.members.cache.get(user.id);
            const roles = member._roles;

            if (description.length > 260) {
                console.log(username + " entered a description that is too long.");
                await interaction.reply({ content: "Your description is too long. It may contain a maximum of 260 characters!", ephemeral: true });
            } else {
                let team = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "key operatives");
                let allies = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "allies");
                let battalionLeader = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "battalion leader");
                let surgenceListed = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "surgence listed");
                let specialist = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "specialist");
                let agent = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "agent");

                try {
                    // Check if roles are defined
                    if (team == undefined || allies == undefined || battalionLeader == undefined || surgenceListed == undefined || specialist == undefined || agent == undefined) {
                        console.log("Some promotion roles aren't defined!");
                        await interaction.reply({ content: "Some promotion roles aren't defined!", ephemeral: true });
                    } else {
                        const avatar = "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".png?size=256";
                        const isTeam = roles.find((role) => role === team.id);
                        const isAllies = roles.find((role) => role === allies.id);
                        const isBattalionLeader = roles.find((role) => role === battalionLeader.id);
                        const isSurgenceListed = roles.find((role) => role === surgenceListed.id);
                        const isSpecialist = roles.find((role) => role === specialist.id);
                        const isAgent = roles.find((role) => role === agent.id);
                        const imageName = isTeam
                            ? "team.png"
                            : isAllies
                            ? "allies.png"
                            : isBattalionLeader
                            ? "battalion-leader.png"
                            : isSurgenceListed
                            ? "surgence-listed.png"
                            : isSpecialist
                            ? "specialist.png"
                            : "agent.png";

                        // Build the Tweet-Button
                        const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Tweet").setStyle(ButtonStyle.Link).setURL("https://twitter.com/compose/tweet"));

                        if (isTeam) {
                            // Check if Team
                            await interaction.deferReply();
                            const attachment = await getIdCardAttachment(avatar, displayName, user, twitter, description, 5, imageName);

                            const embed = {
                                color: 0xdfcc21,
                                image: {
                                    url: "attachment://" + imageName,
                                },
                            };

                            console.log(username + " claimed the Team promotion image!");
                            await interaction.editReply({
                                content: "Congratulation <@" + user.id + ">, this is your id card! \n\nLet your network know about your journey here in Surgence.",
                                embeds: [embed],
                                files: [attachment],
                                components: [row],
                            });
                        } else if (isAllies) {
                            // Check if Battalion Leader
                            await interaction.deferReply();
                            const attachment = await getIdCardAttachment(avatar, displayName, user, twitter, description, 0, imageName);

                            const embed = {
                                color: 0xbf4bce,
                                image: {
                                    url: "attachment://" + imageName,
                                },
                            };

                            console.log(username + " claimed the Allies promotion image!");
                            await interaction.editReply({
                                content: "Congratulation <@" + user.id + ">, this is your id card! \n\nLet your network know about your journey here in Surgence.",
                                embeds: [embed],
                                files: [attachment],
                                components: [row],
                            });
                        } else if (isBattalionLeader) {
                            // Check if Battalion Leader
                            await interaction.deferReply();
                            const attachment = await getIdCardAttachment(avatar, displayName, user, twitter, description, 1, imageName);

                            const embed = {
                                color: 0x3597c7,
                                image: {
                                    url: "attachment://" + imageName,
                                },
                            };

                            console.log(username + " claimed the Battalion Leader promotion image!");
                            await interaction.editReply({
                                content: "Congratulation <@" + user.id + ">, this is your id card! \n\nLet your network know about your journey here in Surgence.",
                                embeds: [embed],
                                files: [attachment],
                                components: [row],
                            });
                        } else if (isSurgenceListed) {
                            // Check if Surgence Listed
                            await interaction.deferReply();
                            const attachment = await getIdCardAttachment(avatar, displayName, user, twitter, description, 2, imageName);

                            const embed = {
                                color: 0x4abbbb,
                                image: {
                                    url: "attachment://" + imageName,
                                },
                            };

                            console.log(username + " claimed the Surgence Listed promotion image!");
                            await interaction.editReply({
                                content: "Congratulation <@" + user.id + ">, this is your id card! \n\nLet your network know about your journey here in Surgence.",
                                embeds: [embed],
                                files: [attachment],
                                components: [row],
                            });
                        } else if (isSpecialist) {
                            // Check if Specialist
                            await interaction.deferReply();
                            const attachment = await getIdCardAttachment(avatar, displayName, user, twitter, description, 3, imageName);

                            const embed = {
                                color: 0xfac088,
                                image: {
                                    url: "attachment://" + imageName,
                                },
                            };

                            console.log(username + " claimed the Specialist promotion image!");
                            await interaction.editReply({
                                content: "Congratulation <@" + user.id + ">, this is your id card! \n\nLet your network know about your journey here in Surgence.",
                                embeds: [embed],
                                files: [attachment],
                                components: [row],
                            });
                        } else if (isAgent) {
                            // Check if Agent
                            await interaction.deferReply();
                            const attachment = await getIdCardAttachment(avatar, displayName, user, twitter, description, 4, imageName);

                            const embed = {
                                color: 0xe26d87,
                                image: {
                                    url: "attachment://" + imageName,
                                },
                            };

                            console.log(username + " claimed the Agent promotion image!");
                            await interaction.editReply({
                                content: "Congratulation <@" + user.id + ">, this is your id card! \n\nLet your network know about your journey here in Surgence.",
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
        }
    }

    if (interaction.isButton()) {
        if (interaction.customId == "claim-id-card") {
            const modal = new ModalBuilder()
                .setCustomId("id-card-modal")
                .setTitle("SURGENCE ⍟ ID Card")
                .addComponents([
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder().setCustomId("twitter").setLabel("What is your Twitter handle?").setMaxLength(20).setStyle(TextInputStyle.Short).setRequired(true)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder().setCustomId("description").setLabel("Enter a description about yourself.").setMaxLength(260).setStyle(TextInputStyle.Paragraph).setRequired(true)
                    ),
                ]);

            await interaction.showModal(modal);
        }

        if (interaction.customId == "claim-banner") {
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
                    console.log("Some promotion roles aren't defined!");
                    await interaction.reply({ content: "Some promotion roles aren't defined!", ephemeral: true });
                } else {
                    const avatar = "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".png?size=256";
                    const isTeam = roles.find((role) => role === team.id);
                    const isAllies = roles.find((role) => role === allies.id);
                    const isBattalionLeader = roles.find((role) => role === battalionLeader.id);
                    const isSurgenceListed = roles.find((role) => role === surgenceListed.id);
                    const isSpecialist = roles.find((role) => role === specialist.id);
                    const isAgent = roles.find((role) => role === agent.id);
                    const imageName = isTeam
                        ? "team.png"
                        : isAllies
                        ? "allies.png"
                        : isBattalionLeader
                        ? "battalion-leader.png"
                        : isSurgenceListed
                        ? "surgence-listed.png"
                        : isSpecialist
                        ? "specialist.png"
                        : "agent.png";

                    // Build the Tweet-Button
                    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Tweet").setStyle(ButtonStyle.Link).setURL("https://twitter.com/compose/tweet"));

                    if (isTeam) {
                        // Check if Battalion Leader
                        await interaction.deferReply();
                        const attachment = await getBannerAttachment(avatar, user, "Team", imageName);

                        const embed = {
                            color: 0xdfcc21,
                            image: {
                                url: "attachment://" + imageName,
                            },
                        };

                        console.log(username + " claimed the Team banner image!");
                        await interaction.editReply({
                            content: "Congratulation <@" + user.id + ">, this is your banner" + "! \n\nLet your network know about your journey here in Surgence.",
                            embeds: [embed],
                            files: [attachment],
                            components: [row],
                        });
                    } else if (isAllies) {
                        // Check if Battalion Leader
                        await interaction.deferReply();
                        const attachment = await getBannerAttachment(avatar, user, "Allies", imageName);

                        const embed = {
                            color: 0xbf4bce,
                            image: {
                                url: "attachment://" + imageName,
                            },
                        };

                        console.log(username + " claimed the Allies banner image!");
                        await interaction.editReply({
                            content: "Congratulation <@" + user.id + ">, this is your banner! \n\nLet your network know about your journey here in Surgence.",
                            embeds: [embed],
                            files: [attachment],
                            components: [row],
                        });
                    } else if (isBattalionLeader) {
                        // Check if Battalion Leader
                        await interaction.deferReply();
                        const attachment = await getBannerAttachment(avatar, user, "Battalion Leader", imageName);

                        const embed = {
                            color: 0x3597c7,
                            image: {
                                url: "attachment://" + imageName,
                            },
                        };

                        console.log(username + " claimed the Battalion Leader banner image!");
                        await interaction.editReply({
                            content: "Congratulation <@" + user.id + ">, this is your banner! \n\nLet your network know about your journey here in Surgence.",
                            embeds: [embed],
                            files: [attachment],
                            components: [row],
                        });
                    } else if (isSurgenceListed) {
                        // Check if Surgence Listed
                        await interaction.deferReply();
                        const attachment = await getBannerAttachment(avatar, user, "Surgence Listed", imageName);

                        const embed = {
                            color: 0x4abbbb,
                            image: {
                                url: "attachment://" + imageName,
                            },
                        };

                        console.log(username + " claimed the Surgence Listed banner image!");
                        await interaction.editReply({
                            content: "Congratulation <@" + user.id + ">, this is your banner! \n\nLet your network know about your journey here in Surgence.",
                            embeds: [embed],
                            files: [attachment],
                            components: [row],
                        });
                    } else if (isSpecialist) {
                        // Check if Specialist
                        await interaction.deferReply();
                        const attachment = await getBannerAttachment(avatar, user, "Specialist", imageName);

                        const embed = {
                            color: 0xfac088,
                            image: {
                                url: "attachment://" + imageName,
                            },
                        };

                        console.log(username + " claimed the Specialist banner image!");
                        await interaction.editReply({
                            content: "Congratulation <@" + user.id + ">, this is your banner! \n\nLet your network know about your journey here in Surgence.",
                            embeds: [embed],
                            files: [attachment],
                            components: [row],
                        });
                    } else if (isAgent) {
                        // Check if Agent
                        await interaction.deferReply();
                        const attachment = await getBannerAttachment(avatar, user, "Agent", imageName);

                        const embed = {
                            color: 0xe26d87,
                            image: {
                                url: "attachment://" + imageName,
                            },
                        };

                        console.log(username + " claimed the Agent banner image!");
                        await interaction.editReply({
                            content: "Congratulation <@" + user.id + ">, this is your banner! \n\nLet your network know about your journey here in Surgence.",
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
    }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN);

// Generates the attachement
async function getIdCardAttachment(avatar: string, displayName: string, user: any, twitterId: string, description: string, imageId: number, imageName: string) {
    const username = user.discriminator == 0 ? user.username : user.username + "#" + user.discriminator;

    const _htmlTemplate = getIdCardTemplate(avatar, displayName, username, twitterId, description, imageId);

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
    const username = user.discriminator == 0 ? user.username : user.username + "#" + user.discriminator;
    const _htmlTemplate = getBannerTemplate(avatar, username, role);

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
