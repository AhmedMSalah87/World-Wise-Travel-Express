import {
  addCity,
  getCities,
  getCity,
  deleteCity,
} from "../controller/city.controller.js";
import { Router } from "express";

const router = Router();

router.post("/city", addCity);
router.get("/cities", getCities);
router.get("/city/:id", getCity);
router.delete("/:id", deleteCity);

export default router;
