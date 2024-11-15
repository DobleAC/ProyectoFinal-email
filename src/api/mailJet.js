/**
 *
 * This call sends a message to one recipient.
 *
 */

require('dotenv').config();

const mailjet = require('node-mailjet');

const mailjetClient = mailjet.apiConnect(
    '045566e8be21ccf873f2c285436d29c6',
    '19670f7d4633767f4f1602c2e23d162f'
);

mailjetClient
    .post("send", { version: "v3.1" })
    .request({
        Messages: [
            {
                From: {
                    Email: "alaacabralma@ittepic.edu.mx",
                    Name: "Mailjet Pilot",
                },
                To: [
                    {
                        Email: "votaredes@gmail.com",
                        Name: "Alejandro Aarón",
                    },
                ],
                Subject: "Your email flight plan!",
                TextPart: "Dear Alejandro Aarón, welcome to Mailjet!",
                HTMLPart: "<h3>Dear Alejandro Aarón, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3>",
            },
        ],
    })
    .then((result) => {
        console.log(result.body);
    })
    .catch((err) => {
        console.error(err);
    });
