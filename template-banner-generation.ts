export function getBannerTemplate(avatar: string, discordId: string, role: string) {
    return (
        `
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: "Russo One", sans-serif;
                    color: #fff;
                    width: 1500px;
                    height: 500px;
                }
                .banner {
                    width: 100%;
                    height: 100%;
                    background-image: url("https://raw.githubusercontent.com/animot6792/promotion-bot/main/images/banner.png");
                    background-size: cover;
                }
                .hex {
                    display: block;
                    margin: 0 auto;
                    position: relative;
                    width: 263px;
                    height: 229px;
                    background: white;
                    box-sizing: border-box;
                    -webkit-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
                    -moz-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
                }
                .profile {
                    position: absolute;
                    top: 126px;
                    left: 1166px;
                }
                img {
                    position: absolute;
                    top: -30px;
                    width: 270px;
                    height: 270px;
                }
                .discordId {
                    font-size: 30px;
                    position: absolute;
                    top: 380px;
                    left: 1119px;
                    width: 355px;
                    text-transform: uppercase;
                    text-align: center;
                    overflow-wrap: break-word;
                }
                .text-background {
                    background-color: black;
                    padding-left: 10px;
                    padding-right: 10px;
                }
                .discordRoleImage {
                    font-size: 24px;
                    margin-top: 5px;
                    left: 1119px;
                    width: 355px;
                    color: ${
                        role == "Team"
                            ? "#DFCC21"
                            : role == "Allies"
                            ? "#BF4BCE"
                            : role == "Battalion Leader"
                            ? "#3597c7"
                            : role == "Surgence Listed"
                            ? "#4abbbb"
                            : role == "Specialist"
                            ? "#fac088"
                            : "#e26d87"
                    };
                    text-transform: uppercase;
                    text-align: center;
                    overflow-wrap: break-word;
                }
                .discordRole {
                    font-size: 54px;
                    position: absolute;
                    top: 130px;
                    left: 541px;
                    width: 550px;
                    text-transform: uppercase;
                    overflow-wrap: break-word;
                }
            </style>
        </head>
        <body>
            <div class="banner">
                <div class="discordRole">
                    <span>` +
        role +
        `</span>
                </div>
                <div class="profile">
                    <div class="hex">
                        <img src="` +
        avatar +
        `" />
                    </div>
                </div>

                <div class="discordId">
                    <span class="text-background">` +
        discordId +
        `</span>
        <div class="discordRoleImage">
                    <span class="text-background">` +
        role +
        `</span>
                </div>
                </div>
            </div>
        </body>
    </html>
    `
    );
}
