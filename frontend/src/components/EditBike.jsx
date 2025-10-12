// src/pages/EditBike.jsx
import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function EditBike() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    brand: "",
    model: "",
    price: "",
    fuelType: "PETROL", // must match enum
    mileage: "",
    displacement: "",
    power: "",
    torque: "",
    colors: "", // comma-separated in UI
    description: "",
    year: "",
    city: "",
  });

  const [existingImages, setExistingImages] = useState([]); // URLs from backend
  const [newImages, setNewImages] = useState([]); // File objects + preview

  /** Load bike */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/api/new-bikes/${id}`);
        setForm({
          brand: data.brand ?? "",
          model: data.model ?? "",
          price: data.price ?? "",
          fuelType: (data.fuelType || "PETROL").toUpperCase(),
          mileage: data.mileage ?? "",
          displacement: data.displacement ?? "",
          power: data.power ?? "",
          torque: data.torque ?? "",
          colors: Array.isArray(data.colors) ? data.colors.join(", ") : "",
          description: data.description ?? "",
          year: data.year ?? "",
          city: data.city ?? "",
        });
        setExistingImages(Array.isArray(data.imageUrls) ? data.imageUrls : []);
      } catch (e) {
        console.error(e);
        alert("Failed to load bike.");
        navigate("/my-listings");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onNewImages = (e) => {
    const files = Array.from(e.target.files || []);
    setNewImages(files.map((file) => ({ file, preview: URL.createObjectURL(file) })));
  };

  const colorArray = useMemo(
    () =>
      form.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    [form.colors]
  );

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      // NewBikeRequestDTO fields (sellerId is NOT required on update)
      fd.append("brand", form.brand);
      fd.append("model", form.model);
      fd.append("price", String(form.price || ""));
      fd.append("fuelType", form.fuelType.toUpperCase()); // PETROL|ELECTRIC
      fd.append("mileage", form.mileage);
      fd.append("displacement", form.displacement);
      fd.append("power", form.power);
      fd.append("torque", form.torque);
      colorArray.forEach((c) => fd.append("colors", c)); // multi-valued
      fd.append("description", form.description);
      fd.append("year", String(form.year || ""));
      fd.append("city", form.city);

      // optional new images
      newImages.forEach(({ file }) => fd.append("images", file));

      await api.put(`/api/new-bikes/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Bike updated successfully.");
      navigate("/my-listings");
    } catch (e) {
      console.error(e);
      alert("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#ff6600] mb-6">
          Edit Bike
        </h1>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <form onSubmit={submit} className="space-y-6 rounded-2xl border border-[#ff6600]/10 bg-[#121212]/80 p-6">
            {/* Brand & Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Brand" name="brand" value={form.brand} onChange={handleChange} required />
              <Input label="Model" name="model" value={form.model} onChange={handleChange} required />
            </div>

            {/* Price, Year & Fuel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input label="Price (₹)" name="price" type="number" value={form.price} onChange={handleChange} required />
              <Input label="Year" name="year" type="number" value={form.year} onChange={handleChange} />
              <Select
                label="Fuel Type"
                name="fuelType"
                value={form.fuelType}
                onChange={handleChange}
                options={["PETROL", "ELECTRIC"]}
              />
            </div>

            {/* Specs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input label="Mileage (km/l)" name="mileage" value={form.mileage} onChange={handleChange} />
              <Input label="Displacement (cc)" name="displacement" value={form.displacement} onChange={handleChange} />
              <Input label="Power (bhp/PS)" name="power" value={form.power} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Torque (Nm)" name="torque" value={form.torque} onChange={handleChange} />
              <Input label="Colors (comma separated)" name="colors" value={form.colors} onChange={handleChange} />
            </div>

            <Input label="City" name="city" value={form.city} onChange={handleChange} />
            <TextArea label="Description" name="description" value={form.description} onChange={handleChange} rows={4} />

            {/* Existing images */}
            <div>
              <p className="text-sm text-gray-300 mb-2">Existing Images</p>
              {existingImages?.length ? (
                <div className="flex flex-wrap gap-3">
                  {existingImages.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`img-${i}`}
                      className="w-24 h-24 object-cover rounded border border-[#ff6600]/20"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">No images yet.</p>
              )}
            </div>

            {/* Upload new images (optional) */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Add New Images (optional)</label>
              <input type="file" multiple accept="image/*" onChange={onNewImages} />
              {!!newImages.length && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {newImages.map((n, i) => (
                    <img key={i} src={n.preview} alt={`new-${i}`} className="w-24 h-24 object-cover rounded border border-[#ff6600]/20" />
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold px-6 py-2 rounded-md disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="ml-3 border border-[#ff6600]/60 text-[#ffcc80] px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* --- small UI helpers --- */
function Input({ label, ...rest }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-gray-300">{label}</span>
      <input
        {...rest}
        className="w-full rounded-md bg-[#111] border border-[#ff6600]/30 px-3 py-2 outline-none focus:border-[#ff8533]"
      />
    </label>
  );
}
function TextArea({ label, rows = 3, ...rest }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-gray-300">{label}</span>
      <textarea
        rows={rows}
        {...rest}
        className="w-full rounded-md bg-[#111] border border-[#ff6600]/30 px-3 py-2 outline-none focus:border-[#ff8533]"
      />
    </label>
  );
}
function Select({ label, options = [], ...rest }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-gray-300">{label}</span>
      <select
        {...rest}
        className="w-full rounded-md bg-[#111] border border-[#ff6600]/30 px-3 py-2 text-gray-200 outline-none focus:border-[#ff8533]"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
