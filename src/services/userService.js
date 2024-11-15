const User = require('../models/userModel');
const facturapi = require('../api/facturapi');

module.exports = {

    getAllUsers: async () => await User.find(),

    createUser: async (user) => {
        try {
            // Validar si el usuario ya existe por correo
            const existingUser = await User.findOne({
                $or: [
                    { email: user.email },
                    { fullname: user.fullname }
                  ]
                });
            if (existingUser) throw new Error("El usuario ya existe");

            const facturapiUser = await facturapi.createCustomer(user);
            console.log(facturapiUser);

            const newUser = {
                _id: facturapiUser.id,
                ...user,
                address: facturapiUser.address,
                tax_id: facturapiUser.tax_id
            }
            return await User.create(newUser);
        } catch (error) {
            console.error(error);
            throw new Error( error + "Error al crear el usuario");
        }
    },

    updateUser: async ({_id, ...args}) => {
        await facturapi.updateCustomer(_id, args);
        return await User.findByIdAndUpdate(_id, args);
    },

    deleteUser: async (_id) => { 
        await facturapi.deleteCustomer(_id);
        return await User.findByIdAndDelete(_id);
    },
    
}