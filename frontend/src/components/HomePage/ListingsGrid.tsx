import React from "react";
import { PostListingFormData } from "../PostListing/types";

type ListingsGridProps = {
  listings: PostListingFormData[];
};

const ListingsGrid: React.FC<ListingsGridProps> = ({ listings }) => {
  if (listings.length === 0) {
    return <p className="text-muted text-center mt-5">No listings found.</p>;
  }

  return (
    <div className="container mt-5 container-fluid" style={{ width:"2000px"}}>
      <div className="row g-4">
        {listings.map((listing, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <img
                src={listing.photos?.[0] || "/default-image.jpg"}
                className="card-img-top"
                alt={listing.title || "Listing"}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{listing.title}</h5>
                  <p className="card-text text-muted">
                    {listing.cityName || "-"}, {listing.streetName || "-"} {listing.streetNo || ""}
                  </p>
                </div>
                <div>
                  <p className="fw-bold">
                    {listing.rent ? `${listing.rent} EUR/month` : "-"}
                  </p>
                  <div className="d-flex flex-wrap gap-1">
                    {listing.propertyType && (
                      <span className="badge bg-primary">{listing.propertyType}</span>
                    )}
                    {listing.listingType && (
                      <span className="badge bg-secondary">{listing.listingType}</span>
                    )}
                    {listing.roomAmenities?.slice(0, 2).map((a, idx) => (
                      <span key={idx} className="badge bg-light text-dark border">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingsGrid;
