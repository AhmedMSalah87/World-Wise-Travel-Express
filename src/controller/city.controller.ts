import { Request, Response } from "express";
import { connectDB } from "../config/db.js";
import { ObjectId } from "mongodb";

// add city to database
export const addCity = async (req: Request, res: Response): Promise<void> => {
  const db = await connectDB();
  // extract form data from request body

  const { cityName, date, notes, country, userId, lat, lng, countryFlag } =
    req.body as {
      cityName: string;
      date: Date;
      notes: string;
      country: string;
      userId: string;
      lat: string;
      lng: string;
      countryFlag: string;
    };
  // check for form data to be required
  if (!cityName || !date) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  // add new city to database
  try {
    const newCity = {
      userId,
      cityName,
      date,
      country,
      notes,
      lat,
      lng,
      countryFlag,
    };
    const addedCity = await db.collection("cities").insertOne(newCity);
    res.status(201).json({ message: "city added successfully", addCity });
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
};

// get all visited cities by the user
export const getCities = async (req: Request, res: Response): Promise<void> => {
  const db = await connectDB();
  const { userId } = req.query as { userId: string };
  if (!userId) {
    res.status(400).json({ message: "Missing userId" });
    return;
  }

  try {
    const result = await db.collection("cities").find({ userId }).toArray();
    if (result.length === 0) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Fetching cities failed" });
  }
};

// get one city by id
export const getCity = async (req: Request, res: Response): Promise<void> => {
  const db = await connectDB();
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Missing cityId" });
    return;
  }

  try {
    const result = await db
      .collection("cities")
      .findOne({ _id: new ObjectId(id) });
    if (!result) {
      res.status(404).json({ error: "City not found" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Fetching city failed" });
  }
};

// delete city by Id
export const deleteCity = async (req: Request, res: Response) => {
  const db = await connectDB();
  const { id } = req.params; // get id from server api url not from browser url
  if (!id) {
    res.status(400).json({ message: "Missing cityId" });
    return;
  }

  try {
    const result = await db
      .collection("cities")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "City not found" });
      return;
    }

    res.status(200).json({ message: "City deleted successfully", id }); // return city id to be used in front for ui update
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
