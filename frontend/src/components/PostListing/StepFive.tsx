import { useState } from "react";
import { StepProps } from "./types";
import { useCallback } from "react"

const StepFive = ({ formData, setFormData, onNext, onBack, displayedStep }: StepProps) => {
  const [error, setError] = useState("");

  // Handle photo upload and preview (temporary local preview)
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = useCallback(() => {
    if (!formData.photos || formData.photos.length === 0 || !formData.title || !formData.description) {
      setError("Please complete all required fields.");
      return;
    }
  
    setError("");
    onNext?.();
  }, [formData, onNext]);
  


  return (
    <div className="container mt-4" style={{ maxWidth: "800px", margin: "0 auto", minWidth:"800px" }}>

      <div className="row">
        <div className="col-12 col-md-12">
          <h3 className="mb-4 text-start">Step {displayedStep ?? 5}: Listing Details</h3>

          {/* Upload Photos */}
          {/* Upload Photos Section */}
<div className="mb-4 text-start">
  <label className="form-label fw-bold">Upload photos of the property *</label>

  <div className="d-flex flex-wrap gap-3 mt-2">
    {/* Preview thumbnails with remove buttons */}
    {formData.photos?.map((photo, idx) => (
      <div key={idx} style={{ position: "relative" }}>
        <img
          src={photo}
          alt={`upload-${idx}`}
          style={{
            width: "120px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="button"
          onClick={() => {
            const updated = formData.photos?.filter((_, i) => i !== idx) || [];
            setFormData({ ...formData, photos: updated });
          }}
          style={{position: "absolute",
            top: "-8px",
            right: "-8px",
            background: "#e3e3e3",
            border: "0",
            margin:"0",
            padding:"0",
            color: "#7a7a7a",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            fontSize: "14px",
            cursor: "pointer",
            lineHeight: "1",}
          }
        >
          ×
        </button>
      </div>
    ))}

    {/* Upload "Add Photo" button */}
    <label
      htmlFor="photoUpload"
      style={{
        width: "120px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed #ccc",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "28px",
        color: "#777",
      }}
    >
      +
      <input
        id="photoUpload"
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) => {
          const files = e.target.files;
          if (!files) return;

          const newFiles = Array.from(files);
const photoURLs = newFiles.map((file) => URL.createObjectURL(file));

// Only update state if there are new images
if (photoURLs.length > 0) {
  setFormData((prev) => ({
    ...prev,
    photos: [...(prev.photos || []), ...photoURLs],
  }));
}

        }}
      />
    </label>
  </div>
</div>


          {/* Title */}
          <div className="mb-4 text-start">
            <label className="form-label fw-bold">Title of the listing *</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="mb-4 text-start">
            <label className="form-label fw-bold">Description *</label>
            <textarea
              className="form-control"
              name="description"
              rows={5}
              value={formData.description || ""}
              onChange={handleChange}
            />
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={onBack}>Back</button>
            <button className="btn btn-primary" onClick={handleNext}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
