export function getHtmlTemplate(avatar : string, discordId : string, isSurgenceListed : boolean) {
    return `
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
                    background-image: url(${isSurgenceListed ? "https://raw.githubusercontent.com/animot6792/promotion-bot/main/images/surgence-listed.png" : "https://raw.githubusercontent.com/animot6792/promotion-bot/main/images/battalion-leader.png"});
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
                    <img src="` + avatar + `" />
                </div>
                <div class="message">
                    <h2>` + discordId + `</h2>
                </div>
            </div>
        </body>
    </html>
    `;
}