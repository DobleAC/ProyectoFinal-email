const mailjet = require('node-mailjet');

// Configuración de Mailjet
const mailjetClient = mailjet.apiConnect(
  process.env.MJ_API_KEY, // Llave pública
  process.env.MJ_API_SECRET // Llave secreta
);

const emailResolvers = {
  Query: {
    healthCheck: () => "El servidor está funcionando correctamente.",
  },
  Mutation: {
    sendEmail: async (_, args) => {
      const {
        fromEmail,
        fromName,
        toEmail,
        toName,
        subject,
        textPart,
        htmlPart,
      } = args;

      try {
        const result = await mailjetClient
          .post("send", { version: "v3.1" })
          .request({
            Messages: [
              {
                From: {
                  Email: fromEmail,
                  Name: fromName,
                },
                To: [
                  {
                    Email: toEmail,
                    Name: toName,
                  },
                ],
                Subject: subject,
                TextPart: textPart || "",
                HTMLPart: htmlPart || "",
              },
            ],
          });

        return `Correo enviado exitosamente: ${result.body.Messages[0].Status}`;
      } catch (error) {
        console.error(error);
        throw new Error("Error al enviar el correo.");
      }
    },
  },
};

module.exports = emailResolvers;
