// src/controllers/listingController.ts

import { Request, Response } from "express";
import Listing from "../models/Listing";
import Address from "../models/Address";
import RoomAmenity from "../models/RoomAmenity";
import PropertyAmenity from "../models/PropertyAmenity";
import HouseRule from "../models/HouseRule";
import { AuthenticatedRequest } from "../middleware/authMiddleware"; // ✅
import City from "../models/City";

export const createListing = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const {
      cityId, streetName, streetNo,
      listingType, propertyType, userRole,
      sizeM2, bedroomsSingle, bedroomsDouble,
      flatmatesFemale, flatmatesMale,
      availableFrom, availableTo, openEnded,
      rent, deposit, noDeposit,
      roomSizeM2, hasBed, bedType,
      title, description,
      roomAmenities, propertyAmenities, houseRules
    } = req.body;

    // 1. Create Address
    const address = await Address.create({ streetName, streetNo, cityId });

    // 2. Create Listing
    const listing = await Listing.create({
      userId,
      addressId: address.addressId,
      listingType,
      propertyType,
      userRole,
      sizeM2,
      bedroomsSingle,
      bedroomsDouble,
      flatmatesFemale,
      flatmatesMale,
      availableFrom,
      availableTo,
      openEnded,
      rent,
      deposit,
      noDeposit,
      roomSizeM2,
      hasBed,
      bedType,
      title,
      description
    });

    // 3. Set M:N associations
    if (roomAmenities?.length) {
      const amenities = await RoomAmenity.findAll({ where: { name: roomAmenities } });
      await listing.setRoomAmenities(amenities);
    }

    if (propertyAmenities?.length) {
      const amenities = await PropertyAmenity.findAll({ where: { name: propertyAmenities } });
      await listing.setPropertyAmenities(amenities);
    }

    if (houseRules?.length) {
      const rules = await HouseRule.findAll({ where: { name: houseRules } });
      await listing.setHouseRules(rules);
    }

    return res.status(201).json({ message: "Listing created", listingId: listing.listingId });

  } catch (error) {
    console.error("Error creating listing:", error);
    return res.status(500).json({ error: "Failed to create listing" });
  }
};

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const listings = await Listing.findAll({
      include: [
        {
          model: Address,
          include: [City], // include city info
        },
        RoomAmenity,
        PropertyAmenity,
        HouseRule,
      ],
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};