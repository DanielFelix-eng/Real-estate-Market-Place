import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Property() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/properties/get/${id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to load property");
        }
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const nextSlide = () => {
    if (!property?.imageUrls?.length) return;
    setCurrentIndex((i) => (i + 1) % property.imageUrls.length);
  };

  const prevSlide = () => {
    if (!property?.imageUrls?.length) return;
    setCurrentIndex(
      (i) => (i - 1 + property.imageUrls.length) % property.imageUrls.length
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 text-neutral-600 dark:bg-neutral-950 dark:text-neutral-300">
        Loading property...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 text-rose-500 dark:bg-neutral-950">
        {error}
      </div>
    );
  }

  if (!property) return null;

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-8 dark:bg-neutral-950 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-4 inline-block text-sm text-[#FF385C] hover:underline"
        >
          &larr; Back
        </Link>

        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          {property.name}
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {property.address}
        </p>

        {/* Image slider */}
        <div className="relative mt-6 overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800">
          {property.imageUrls?.length ? (
            <img
              src={property.imageUrls[currentIndex]}
              alt={`slide-${currentIndex}`}
              className="h-[420px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center text-neutral-500">
              No images available
            </div>
          )}

          {property.imageUrls?.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white hover:bg-black/80"
                aria-label="Previous image"
              >
                &#10094;
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white hover:bg-black/80"
                aria-label="Next image"
              >
                &#10095;
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                {currentIndex + 1} / {property.imageUrls.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {property.imageUrls?.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {property.imageUrls.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  idx === currentIndex
                    ? "border-[#FF385C]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={url}
                  alt={`thumb-${idx}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Property details */}
        <section className="mt-8 grid gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              About this property
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {property.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <Info label="Type" value={property.type === "rent" ? "For Rent" : "For Sale"} />
            <Info
              label="Price"
              value={`$${property.regularPrice?.toLocaleString()}${
                property.type === "rent" ? " " : ""
              }`}
            />
            {property.offer && property.discountPrice > 0 && (
              <Info
                label="Discount"
                value={`$${property.discountPrice.toLocaleString()}`}
              />
            )}
            <Info label="Bedrooms" value={property.bedrooms} />
            <Info label="Bathrooms" value={property.bathrooms} />
            <Info label="Parking" value={property.parking ? "Yes" : "No"} />
            <Info label="Furnished" value={property.furnished ? "Yes" : "No"} />
            <Info label="Offer" value={property.offer ? "Yes" : "No"} />
          </div>
        </section>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      <p className="mt-1 font-medium text-neutral-900 dark:text-neutral-100">
        {value}
      </p>
    </div>
  );
}
