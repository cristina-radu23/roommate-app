import User from "./User";
import Listing from "./Listing";
import Address from "./Address";
import City from "./City";
import County from "./County";
import Photo from "./Photo";
import RoomAmenity from "./RoomAmenity";
import PropertyAmenity from "./PropertyAmenity";
import HouseRule from "./HouseRule";

// =======================
// One-to-Many Associations
// =======================

// User ↔ Listing
User.hasMany(Listing, { foreignKey: "userId" });
Listing.belongsTo(User, { foreignKey: "userId" });

// Address ↔ Listing
Address.hasMany(Listing, { foreignKey: "addressId" });
Listing.belongsTo(Address, { foreignKey: "addressId" });

// City ↔ Address
City.hasMany(Address, { foreignKey: "cityId" });
Address.belongsTo(City, { foreignKey: "cityId" });

// County ↔ City
County.hasMany(City, { foreignKey: "countyId" });
City.belongsTo(County, { foreignKey: "countyId" });

// Listing ↔ Photo
Listing.hasMany(Photo, { foreignKey: "listingId", onDelete: "CASCADE" });
Photo.belongsTo(Listing, { foreignKey: "listingId" });

// =======================
// Many-to-Many Associations
// =======================

// Listing ↔ RoomAmenity
Listing.belongsToMany(RoomAmenity, { through: "ListingRoomAmenities" });
RoomAmenity.belongsToMany(Listing, { through: "ListingRoomAmenities" });

// Listing ↔ PropertyAmenity
Listing.belongsToMany(PropertyAmenity, { through: "ListingPropertyAmenities" });
PropertyAmenity.belongsToMany(Listing, { through: "ListingPropertyAmenities" });

// Listing ↔ HouseRule
Listing.belongsToMany(HouseRule, { through: "ListingHouseRules" });
HouseRule.belongsToMany(Listing, { through: "ListingHouseRules" });


Listing.belongsTo(Address, { foreignKey: "addressId" });
Address.hasMany(Listing, { foreignKey: "addressId" });
Address.belongsTo(City, { foreignKey: "cityId" });
City.hasMany(Address, { foreignKey: "cityId" });
