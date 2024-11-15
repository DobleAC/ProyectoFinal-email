const { gql } = require('apollo-server');

// Si necesitas un tipo de dirección, deberías definirlo
const typeDefs = gql`

    type Producto {
        _id: ID!
        name: String!
        description: String
        price: Float!
        category: String!
        brand: String
        stock: Int!
        createdAt: String!
        imgs: [String!]
        product_key: String!
    }

    type Address {
        street: String!
        city: String!
        state: String!
        zip: String!
        country: String!
    }

    enum Roles {
        ADMIN
        USER
        GUEST
    }

    type User {
        _id: ID!
        fullname: String!
        email: String!
        password: String!
        address: Address!
        tel: String!
        registerDate: Date  # Cambié a String, puedes usar un formato de fecha
        userType: Roles!
        paymentMethod: [String!]
    }

    type Car {
        _id: ID!
        usuario: User!   # Relacionado con el tipo User completo
        productos: [Producto]!
        subtotal: Float!
        iva: Float!
        total: Float!
        estatus: String!
        fecha_creacion: String! # Puedes agregar la fecha de creación si es necesario
        fecha_cierre: String  # También puede ser una fecha si la usas
    }

    type Query {
        getCarrito(_id: ID!): Car!
    }

    type Mutation {
        createCarrito(
            usuario: ID!, 
            productos: [ID!]!, 
            subtotal: Float!, 
            iva: Float!, 
            total: Float!, 
            estatus: String!
        ): Car

        updateCarrito(
            _id: ID!, 
            productos: [ID!]!, 
            subtotal: Float!, 
            iva: Float!, 
            total: Float!, 
            estatus: String!
        ): Car

        deleteCarrito(_id: ID!): Car
    }
`;

module.exports = typeDefs;