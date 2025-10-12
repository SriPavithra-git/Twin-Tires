// src/pages/MyListings.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../components/auth";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function MyListings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null); // track which row is expanded

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        const res = await api.get(`/api/new-bikes/seller/${user.id}`);
        setBikes(res.data || []);
      } catch (e) {
        console.error(e);
        alert("Failed to load your listings.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bike?")) return;
    try {
      await api.delete(`/api/new-bikes/${id}`);
      setBikes((prev) => prev.filter((b) => b.id !== id));
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };
  const handleStatus = async (id, status) => {
  try {
    await BargainApi.updateStatus(id, status);
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  } catch (e) {
    console.error(e);
    alert("Failed to update offer status");
  }
};



  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
  
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#ff6600]">
            My Listings
          </h1>
          <button
            onClick={() => navigate("/add-bike")}
            className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold px-4 py-2 rounded-md"
          >
            Add New Bike
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : bikes.length === 0 ? (
          <p className="text-gray-400">
            You haven’t listed any bikes yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#ff6600]/10 bg-[#121212]/80 p-6">
            <table className="min-w-full text-sm text-gray-300 border-collapse">
              <thead>
                <tr className="bg-[#1a1a1a] text-[#ffb366]">
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Brand</th>
                  <th className="px-4 py-2 text-left">Model</th>
                  <th className="px-4 py-2 text-center">Price (₹)</th>
                  <th className="px-4 py-2 text-center">Fuel</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bikes.map((b) => (
                  <React.Fragment key={b.id}>
                    {/* Summary row */}
                    <tr
                      className="border-b border-white/10 hover:bg-[#1a1a1a]/50 cursor-pointer transition"
                      onClick={() => toggleExpand(b.id)}
                    >
                      <td className="px-4 py-3">
                        <img
                          src={b.imageUrls?.[0] || "/placeholder-bike.jpg"}
                          alt={b.brand}
                          className="w-16 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3 font-semibold text-white">{b.brand}</td>
                      <td className="px-4 py-3">{b.model}</td>
                      <td className="px-4 py-3 text-center text-[#ffb84d]">
                        ₹{(b.price ?? 0).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">{b.fuelType}</td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/edit-bike/${b.id}`);
                          }}
                          className="text-[#ffb366] hover:text-[#ff8533]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(b.id);
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    {expandedId === b.id && (
                      <tr className="bg-[#141414]/90 border-b border-[#ff6600]/10">
                        <td colSpan="6" className="px-6 py-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <Detail label="Brand" value={b.brand} />
                            <Detail label="Model" value={b.model} />
                            <Detail label="Price" value={`₹${b.price?.toLocaleString()}`} />
                            <Detail label="Year" value={b.year} />
                            <Detail label="Fuel Type" value={b.fuelType} />
                            <Detail label="Mileage" value={b.mileage} />
                            <Detail label="Displacement" value={b.displacement} />
                            <Detail label="Power" value={b.power} />
                            <Detail label="Torque" value={b.torque} />
                            <Detail label="City" value={b.city} />
                            <Detail
                              label="Colors"
                              value={Array.isArray(b.colors) ? b.colors.join(", ") : "—"}
                            />
                          </div>

                          {b.description && (
                            <div className="mt-4">
                              <p className="text-[#ffb84d] font-semibold mb-1">Description</p>
                              <p className="text-gray-300 text-sm whitespace-pre-wrap">
                                {b.description}
                              </p>
                            </div>
                          )}

                          {b.imageUrls?.length > 1 && (
                            <div className="mt-4">
                              <p className="text-[#ffb84d] font-semibold mb-1">Gallery</p>
                              <div className="flex flex-wrap gap-2">
                                {b.imageUrls.map((url, i) => (
                                  <img
                                    key={i}
                                    src={url}
                                    alt={`img-${i}`}
                                    className="w-24 h-24 object-cover rounded border border-[#ff6600]/20"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <p className="text-sm text-gray-300">
      <span className="text-[#ffb366] font-semibold">{label}:</span>{" "}
      {value || <span className="text-gray-500">—</span>}
    </p>
  );
}
