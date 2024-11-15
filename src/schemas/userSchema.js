/*
const userService = require('../services/userService');


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

module.exports = resolvers;
*/
// src/schemas/userSchema.js

/*const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    fullname: String!
    email: String!
    password: String!
    address: Address!
    tel: String!
    registerDate: Date!
    userType: Roles!
    paymentMethod: [String!]
  }

  type Address {
    zip: String!
    street: String
    exterior: String
    interior: String
    neighborhood: String
    city: String
    municipality: String
    state: String
    country: String
  }

  type Query {
    users: [User]!
  }

  input AddressInput {
    zip: String!
    street: String
    exterior: String
    interior: String
    neighborhood: String
    city: String
    municipality: String
    state: String
    country: String
  }

  type Mutation {
    createUser(
      fullname: String!
      email: String!
      password: String!
      address: AddressInput
      tel: String
      userType: Roles
      paymentMethod: [String!]
    ): User
  }
`;

module.exports = typeDefs;


*/const { gql } = require('apollo-server');

const typeDefs = gql`

    scalar Date

    enum Roles {
        CLIENT
        ADMIN
    }

    type Address {
        zip: String!        # Código postal
        street: String      # Nombre de la calle
        exterior: String    # Número exterior
        interior: String    # Número interior
        neighborhood: String    # Colonia
        city: String        # Ciudad
        municipality: String    # Municipio o delegación
        state: String       # Nombre del estado o código ISO 3166-2
        country: String     # Código de país ISO 3166-1 alpha-3
    }

    type User {
        _id: ID!
        fullname: String!
        email: String!
        password: String!
        address: Address!
        tel: String!
        registerDate: Date!
        userType: Roles!
        paymentMethod: [String!]
    }

    type Query {
        users: [User]!
    }

    input AddressInput {
        zip: String!        # Código postal
        street: String      # Nombre de la calle
        exterior: String    # Número exterior
        interior: String    # Número interior
        neighborhood: String    # Colonia
        city: String        # Ciudad
        municipality: String    # Municipio o delegación
        state: String       # Nombre del estado o código ISO 3166-2
        country: String     # Código de país ISO 3166-1 alpha-3
    }

    type Mutation {
        createUser(
            fullname: String!,
            email: String!,
            password: String!,
            address: AddressInput,
            tel: String,
            userType: Roles,
            paymentMethod: [String!]
        ): User

        updateUser(
            _id: ID!,
            fullname: String,
            email: String,
            password: String,
            address: AddressInput,
            tel: String,
            userType: Roles,
            paymentMethod: [String!]
        ): User

        deleteUser(_id: ID!): User
    }
`;


module.exports = typeDefs;