import express from "express";
import { createListing, getAllListings  } from "../controllers/listingController";
import authenticateToken from "../middleware/authMiddleware";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

const router = express.Router();

// Adapter to match Express RequestHandler
router.post("/", authenticateToken, (req, res): void => {
    void createListing(req as AuthenticatedRequest, res);
  });
  
router.get("/", getAllListings);

export default router;
