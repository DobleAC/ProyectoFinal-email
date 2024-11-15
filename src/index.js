require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

// Importar esquemas y resolvers existentes
const productTypeDefs = require('./schemas/productSchema');
const productResolvers = require('./resolvers/productResolver');
const carTypeDefs = require('./schemas/carSchema');
const carResolvers = require('./resolvers/carResolver');
const userTypeDefs = require('./schemas/userSchema');
const userResolvers = require('./resolvers/userResolver');

// Importar esquemas y resolvers de correo
const emailTypeDefs = require('./schemas/emailSchema');
const emailResolvers = require('./resolvers/emailResolver');

const startConnection = async () => {
  try {
    // Conexión a MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Combina todos los typeDefs y resolvers
    const typeDefs = mergeTypeDefs([
      productTypeDefs,
      userTypeDefs,
      carTypeDefs,
      emailTypeDefs, 
    ]);
    const resolvers = mergeResolvers([
      productResolvers,
      userResolvers,
      carResolvers,
      emailResolvers, 
    ]);

    // Crear una nueva instancia de ApolloServer
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // Inicia el servidor Apollo
    server.listen().then(({ url }) => {
      console.log(`Servidor corriendo en ${url}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

startConnection();

