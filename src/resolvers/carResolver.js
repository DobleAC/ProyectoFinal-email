const carService = require('../services/carService');
const Product = require('../models/productModel'); // Si necesitas detalles adicionales de los productos
const User = require('../models/userModel'); // Para obtener los detalles del usuario si es necesario

const carResolvers = {
  Query: {
    // Obtener un carrito por su ID
    getCarrito: async (_, { _id }) => {
      try {
        const carrito = await carService.getCarById(_id);
        if (!carrito) throw new Error('Carrito no encontrado');
        return carrito;
      } catch (error) {
        console.error('Error al obtener carrito:', error);
        throw new Error('No se pudo obtener el carrito');
      }
    },
  },

  Mutation: {
    // Crear un carrito nuevo
    createCarrito: async (_, { usuario, productos, subtotal, iva, total, estatus }) => {
      try {
        // Obtener detalles de los productos (si necesitas obtener detalles adicionales)
        const productosDetails = await Promise.all(
          productos.map(async (productoId) => {
            const producto = await Product.findById(productoId);
            return producto;
          })
        );

        // Crear un nuevo carrito usando el servicio
        const carritoCreado = await carService.createCar({
          usuario,
          productos: productosDetails,
          subtotal,
          iva,
          total,
          estatus,
          fecha_creacion: new Date().toISOString(),
        });

        return carritoCreado;
      } catch (error) {
        console.error('Error al crear carrito:', error);
        throw new Error('No se pudo crear el carrito');
      }
    },

    // Actualizar un carrito existente
    updateCarrito: async (_, { _id, productos, subtotal, iva, total, estatus }) => {
      try {
        // Obtener detalles de los productos
        const productosDetails = await Promise.all(
          productos.map(async (productoId) => {
            const producto = await Product.findById(productoId);
            return producto;
          })
        );

        // Actualizar el carrito
        const carritoActualizado = await carService.updateCar({
          _id,
          productos: productosDetails,
          subtotal,
          iva,
          total,
          estatus,
        });

        if (!carritoActualizado) throw new Error('Carrito no encontrado para actualizar');
        return carritoActualizado;
      } catch (error) {
        console.error('Error al actualizar carrito:', error);
        throw new Error('No se pudo actualizar el carrito');
      }
    },

    // Eliminar un carrito
    deleteCarrito: async (_, { _id }) => {
      try {
        const carritoEliminado = await carService.deleteCar(_id);
        if (!carritoEliminado) throw new Error('Carrito no encontrado para eliminar');
        return carritoEliminado;
      } catch (error) {
        console.error('Error al eliminar carrito:', error);
        throw new Error('No se pudo eliminar el carrito');
      }
    },
  },

  // Resolver para los campos de tipo Car
  Car: {
    usuario: async (carrito) => {
      // Resolver para obtener los detalles del usuario
      const usuario = await User.findById(carrito.usuario);
      return usuario;
    },
    productos: async (carrito) => {
      // Resolver para obtener los productos en el carrito
      const productos = await Product.find({ '_id': { $in: carrito.productos } });
      return productos;
    },
  },
};

module.exports = carResolvers;