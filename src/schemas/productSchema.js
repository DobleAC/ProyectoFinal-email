const { gql } = require('apollo-server');

const categories = require('../models/enums/categories');

const typeDefs = gql`
    
    enum Category {
        ${Object.values(categories).join('\n')}
    }

    type Product {
        _id: ID!
        name: String!
        description: String
        price: Float!
        category: Category!
        brand: String
        stock: Int!
        createdAt: String!
        imgs: [String!]
        # facturapi_id: String!
        product_key: String!
    }

    type Query {
        products: [Product]
    }

    type Mutation {
        createProduct(
            name: String!,
            description: String,
            price: Float!,
            category: Category,
            brand: String,
            stock: Int,
            imgs: [String],
            product_key: String!
        ): Product

        updateProduct(
            _id: ID!,
            name: String,
            description: String,
            price: Float,
            category: Category,
            brand: String,
            stock: Int,
            imgs: [String]
        ): Product

        deleteProduct(_id: ID!): Product
    }
`

module.exports = typeDefs;