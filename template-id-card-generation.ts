export function getIdCardTemplate(avatar: string, discordId: string, imageId: number) {
    return (
        `
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather">
            <style>
                body {
                    font-family: "Merriweather", sans-serif;
                    color: #fff;
                    width: 960px;
                    height: 540px;
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
                            : ""
                    });
                    background-size: cover;
                }
                .profile {
                    position: absolute;
                    top: 79px;
                    left: 34px;
                }
                img {
                    width: 300px;
                    height: 300px;
                }
                .message {
                    position: absolute;
                    top: 252px;
                    left: 625px;
                    width: 325px;
                    overflow-wrap: break-word;
                }
            </style>
        </head>
        <body>
            <div class="banner">
                <div class="profile">
                    <img src="` +
        avatar +
        `" />
                </div>
                <div class="message">
                    <h2>` +
        discordId +
        `</h2>
                </div>
            </div>
        </body>
    </html>
    `
    );
}
