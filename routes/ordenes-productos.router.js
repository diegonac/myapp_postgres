import express from "express";
import ordenesProductosService from "../services/ordenes-productos.service.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { buscarOrdenProductoSchema, crearOrdenProductoSchema, modificarOrdenProductoSchema } from "../schemas/ordenes-productos.schema.js";

const router = express.Router();
const service = new ordenesProductosService();

router.get("/", async (req, res) => {
	res.json(await service.buscar());
});

router.get("/:id",
  validatorHandler(buscarOrdenProductoSchema, "params"),
  async (req, res, next) => {
	  try {
		  const { id } = req.params;
		  const ordenProducto = await service.buscarId(id);
	  	res.json(ordenProducto);
	  } catch (error) {
	  	  next(error);
	  };
  }
);

	router.post("/crear",
    validatorHandler(crearOrdenProductoSchema, "body"),
    async (req, res, next) => {
      try {
        const body = req.body;
        const ordenProducto = await service.crear(body);
        res.status(201).json({
          message: "Creado",
          ordenProducto,
        });
      } catch (error) {
          next(error);
      };
    }
);

	router.put("/:id",
    validatorHandler(buscarOrdenProductoSchema, "params"),
    validatorHandler(modificarOrdenProductoSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const ordenProducto = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          ordenProducto,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.patch("/:id/",
    validatorHandler(buscarOrdenProductoSchema, "params"),
    validatorHandler(modificarOrdenProductoSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body =  req.body;
        const ordenProducto = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          ordenProducto,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.delete("/:id",
    validatorHandler(buscarOrdenProductoSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const ordenProducto = await service.eliminar(id);
        res.json({
          message: "Eliminado",
          ordenProducto,
        });
      } catch (error) {
          next(error);
      };
    }
  );

export default router;
