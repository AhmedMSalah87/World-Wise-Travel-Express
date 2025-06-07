import {
  addCity,
  getCities,
  getCity,
  deleteCity,
} from "../controller/city.controller.js";
import { Router } from "express";

const router = Router();

router.post("/cities", addCity);
router.get("/cities", getCities);
router.get("/city/:id", getCity);
router.delete("/city/:id", deleteCity);

export default router;
