import { User, UserSchema } from "./usuarios.model.js";
import { Product, ProductSchema } from "./productos.model.js";
import { Client, ClientSchema } from "./clientes.model.js";
import { Category, CategorySchema } from "./categorias.model.js";

function setupModels (sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Client.init(ClientSchema, Client.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));

  User.associate(sequelize.models);
  Client.associate(sequelize.models);

  // Agregamos la asociaciones:
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
};

export default setupModels;
