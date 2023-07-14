export function getIdCardTemplate(avatar: string, displayName: string, discordId: string, twitterId: string, description: string, imageId: number) {
    return (
        `
        <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost&display=swap" />
        <style>
            body {
                font-family: "Jost", sans-serif;
                color: #fff;
                width: 634px;
                height: 356px;
            }
            .banner {
                width: 100%;
                height: 100%;
                background-image: url(${
                    imageId == 0
                        ? "https://raw.githubusercontent.com/animot6792/promotion-bot/main/images/allies.png"
                        : imageId == 1
                        ? "https://raw.githubusercontent.com/animot6792/promotion-bot/main/images/battalion-leader.png"
                        : imageId == 2
                        ? "https://raw.githubusercontent.com/animot6792/promotion-bot/main/images/surgence-listed.png"
                        : imageId == 3
                        ? "https://raw.githubusercontent.com/animot6792/promotion-bot/master/images/specialist.png"
                        : imageId == 4
                        ? "https://raw.githubusercontent.com/animot6792/promotion-bot/master/images/agent.png"
                        : imageId == 5
                        ? "https://raw.githubusercontent.com/animot6792/promotion-bot/master/images/team.png"
                        : imageId == 6
                        ? "https://raw.githubusercontent.com/animot6792/promotion-bot/master/images/new-cohort.png"
                        : ""
                });
                background-size: cover;
            }
            .hex {
                display: block;
                margin: 0 auto;
                position: relative;
                width: 100px;
                height: 95px;
                background: white;
                box-sizing: border-box;
                -webkit-clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 20%);
                -moz-clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 20%);
            }
            .profile {
                position: absolute;
                top: 103px;
                left: 136px;
            }
            img {
                position: absolute;
                top: -15px;
                width: 110px;
                height: 110px;
            }
            .discordName {
                font-size: 12px;
                position: absolute;
                top: 95px;
                left: 295px;
                width: 300px;
                text-transform: uppercase;
                overflow-wrap: break-word;
            }
            .role {
                font-size: 12px;
                position: absolute;
                top: 114px;
                left: 295px;
                width: 300px;
                text-transform: uppercase;
                overflow-wrap: break-word;
            }
            .discordId {
                font-size: 12px;
                position: absolute;
                top: 145px;
                left: 285px;
                width: 300px;
                overflow-wrap: break-word;
            }
            .twitterId {
                font-size: 12px;
                position: absolute;
                top: 178px;
                left: 285px;
                width: 300px;
                overflow-wrap: break-word;
            }
            .description {
                font-size: 12px;
                position: absolute;
                top: 215px;
                left: 135px;
                width: 420px;
                overflow-wrap: break-word;
                line-height: 1.6;
            }
        </style>
    </head>
    <body>
        <div class="banner">
            <div class="profile">
                <div class="hex">
                    <img src="` +
        avatar +
        `" />
                </div>
            </div>
            <div class="discordName">
                <span>` +
        displayName +
        `</span>
            </div>
            <div class="role">
                <span>${
                    imageId == 0
                        ? "Allies"
                        : imageId == 1
                        ? "Battalion Leader"
                        : imageId == 2
                        ? "Surgence Listed"
                        : imageId == 3
                        ? "Specialist"
                        : imageId == 4
                        ? "Agent"
                        : imageId == 5
                        ? "Team"
                        : imageId == 6
                        ? "New Cohort"
                        : ""
                }</span>
            </div>
            <div class="discordId">
                <span>` +
        discordId +
        `</span>
            </div>
            <div class="twitterId">
                <span>` +
        twitterId +
        `</span>
            </div>
            <div class="description">
                <span
                    >` +
        description +
        `</span
                >
            </div>
        </div>
    </body>
</html>
    `
    );
}
