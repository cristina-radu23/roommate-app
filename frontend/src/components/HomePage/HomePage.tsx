import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "./SearchBar";
import ListingsGrid from "./ListingsGrid";
import { PostListingFormData } from "../PostListing/types";

export interface FilterCriteria {
  city?: string;
  minRent?: number;
  maxRent?: number;
  rules?: string[];
  amenities?: string[];
}

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<FilterCriteria>({});
  const [listings, setListings] = useState<PostListingFormData[]>([]);
  const [filteredListings, setFilteredListings] = useState<PostListingFormData[]>([]);

  const applyFilterLogic = useCallback(
    (data: PostListingFormData[], criteria: FilterCriteria) => {console.log("Applying filters:", criteria);
      console.log("Listing city IDs:", data.map((l) => l.cityId));
      return data.filter((listing) => {
        if (criteria.city && listing.cityId?.toString() !== criteria.city) return false;
        if (criteria.minRent !== undefined && listing.rent! < criteria.minRent) return false;
        if (criteria.maxRent !== undefined && listing.rent! > criteria.maxRent) return false;
        if (criteria.rules?.length && listing.rules) {
          if (!criteria.rules.every(rule => listing.rules!.includes(rule))) return false;
        }
        if (criteria.amenities?.length && listing.amenities) {
          if (!criteria.amenities.every(amenity => listing.amenities!.includes(amenity))) return false;
        }
        return true;
      });
    },
    []
  );

  const fetchListings = useCallback(async () => {
    try {
      const url = filters.city
      ? `http://localhost:5000/api/listings?cityId=${filters.city}`
      : `http://localhost:5000/api/listings`;

      const res = await fetch(url);
      const data: PostListingFormData[] = await res.json();
      setListings(data);
      setFilteredListings(applyFilterLogic(data, filters));
    } catch (err) {
      console.error("Error fetching listings:", err);
    }
  }, [applyFilterLogic, filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const applyFilters = (criteria: FilterCriteria) => {
    setFilters(criteria);
    setFilteredListings(applyFilterLogic(listings, criteria));
  };

  return (
    <div className="container-fluid mt-2" style={{marginBottom:"40px",marginTop:"0px",marginLeft:"0px",marginRight:"0px", border:"0px", padding:"0px", width:"100%"}}>
      <SearchBar onSearch={applyFilters} />
      <ListingsGrid listings={filteredListings} />
    </div>
  );
};

export default HomePage;
