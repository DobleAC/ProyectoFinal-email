/*const userService = require('../services/userService');
const mailjet = require('node-mailjet');

const mailjetClient = mailjet.apiConnect(
    '045566e8be21ccf873f2c285436d29c6',
    '19670f7d4633767f4f1602c2e23d162f'
);

const resolvers = {
    Query: {
        users: () => userService.getAllUsers(),
    },

    Mutation: {
        createUser: async (_, usuario) => {
            try {
                // Crear usuario en la base de datos
                const newUser = await userService.createUser(usuario);

                // Enviar correo de bienvenida con Mailjet
                await mailjetClient
                    .post('send', { version: 'v3.1' })
                    .request({
                        Messages: [
                            {
                                From: {
                                    Email: 'alaacabralma@ittepic.edu.mx',
                                    Name: 'Mailjet Pilot',
                                },
                                To: [
                                    {
                                        Email: newUser.email, // Correo del usuario creado
                                        Name: newUser.name,   // Nombre del usuario creado
                                    },
                                ],
                                Subject: '¡Bienvenido a nuestra plataforma!',
                                TextPart: `Hola ${newUser.name}, bienvenido a nuestra plataforma.`,
                                HTMLPart: `<h3>Hola ${newUser.name},</h3><p>¡Gracias por unirte a nosotros!</p>`,
                            },
                        ],
                    });

                return newUser; // Retorna el usuario creado
            } catch (error) {
                console.error('Error al crear usuario o enviar correo:', error);
                throw new Error('No se pudo crear el usuario.');
            }
        },

        updateUser: async (_, args) => await userService.updateUser(args),

        deleteUser: async (_, { _id }) => {
            return userService.deleteUser(_id);
        },
    },
};

module.exports = resolvers;*/



const userService = require('../services/userService');
const mailjet = require('node-mailjet');

const mailjetClient = mailjet.apiConnect(
    '045566e8be21ccf873f2c285436d29c6',
    '19670f7d4633767f4f1602c2e23d162f'
);
const resolvers = {
    Query: {
        users: () => userService.getAllUsers(),
    },

    Mutation: {
        createUser: async (_, usuario) => await userService.createUser(usuario),

        updateUser: async (_, args) => await userService.updateUser(args),

        deleteUser: async (_, { _id }) => {
            return userService.deleteUser(_id);
        },
    },
};

module.exports = resolvers;