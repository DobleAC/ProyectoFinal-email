const Car = require('../models/carModel');      // Asegúrate de que este sea el modelo de Carrito
const facturapi = require('../api/facturapi');   // Cliente de Facturapi
const User = require('../models/userModel');    // Modelo de Usuario
const Product = require('../models/productModel'); // Modelo de Producto

module.exports = {    
    // Crear un carrito
    createCar: async ({ usuario, productos, subtotal, iva, total, estatus, fecha_creacion }) => {
        try {
            // Crear un nuevo carrito en la base de datos
            const newCar = new Car({
                usuario,
                productos,
                subtotal,
                iva,
                total,
                estatus,
                fecha_creacion,
            });

            // Guardar el carrito en la base de datos
            await newCar.save();

            return newCar;
        } catch (error) {
            console.error('Error al crear carrito:', error);
            throw new Error('No se pudo crear el carrito');
        }
    },  

    // Eliminar un carrito
    deleteCar: async (_id) => {
        try {
            // Eliminar el carrito de la base de datos
            const deletedCar = await Car.findByIdAndDelete(_id);
            if (!deletedCar) {
                throw new Error('Carrito no encontrado');
            }
            return deletedCar;
        } catch (error) {
            console.error('Error al eliminar carrito:', error);
            throw new Error('No se pudo eliminar el carrito');
        }
    },

    // Generar factura con Facturapi a partir del carrito
    generarFactura: async (carritoId) => {
        try {
            // Obtener el carrito de la base de datos
            const carrito = await Car.findById(carritoId).populate('usuario').populate('productos');
            if (!carrito) throw new Error('Carrito no encontrado');

            // Preparar los productos para la factura
            const productosFactura = await Promise.all(
                carrito.productos.map(async (producto) => {
                    const productoDetails = await Product.findById(producto);
                    return {
                        quantity: producto.cantidad,
                        unit_price: productoDetails.precio,
                        description: productoDetails.nombre,
                        unit_code: productoDetails.product_key || 'N/A',
                    };
                })
            );

            // Crear el cliente en Facturapi
            const cliente = await facturapi.createClient({
                name: carrito.usuario.nombre,
                email: carrito.usuario.email,
            });

            // Crear la factura en Facturapi
            const factura = await facturapi.createInvoice({
                client: cliente.id,
                items: productosFactura,
                subtotal: carrito.subtotal,
                taxes: [
                    {
                        type: 'IVA',
                        value: carrito.iva,
                    },
                ],
                total: carrito.total,
                currency: 'MXN', // Puedes cambiar la moneda si es necesario
                payment_form: '01', // Forma de pago
                payment_method: 'PUE', // Método de pago
            });

            // Guardar el ID de la factura en el carrito
            carrito.factura_id = factura.id;
            await carrito.save();

            return factura;
        } catch (error) {
            console.error('Error al generar factura:', error);
            throw new Error('No se pudo generar la factura');
        }
    },
};
