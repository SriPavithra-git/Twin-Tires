// src/lib/api.js
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

/** Fetch wrapper that throws with status text on non-2xx */
async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const msg = text || res.statusText || "Request failed";
    throw new Error(`${res.status} ${msg}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : null;
}
export const ReviewApi = {
  async getByBike(bikeId) {
    const res = await fetch(`http://localhost:8080/api/reviews/bike/${bikeId}`);
    if (!res.ok) throw new Error("Failed to load reviews");
    return await res.json();
  },

  async add(review) {
    const res = await fetch("http://localhost:8080/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    if (!res.ok) throw new Error("Failed to post review");
    return await res.json();
  },

  async uploadImages(files) {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const res = await fetch("http://localhost:8080/api/reviews/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Image upload failed");
    return await res.json(); // array of URLs
  },
};


/** Build absolute URL.
 *  - If url starts with "/" or "http", use as-is.
 *  - Else, treat it as relative to API_BASE.
 */
function toUrl(url) {
  if (!url) return API_BASE;
  if (url.startsWith("http")) return url;
  return `${API_BASE.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}

/* ------------------------------------------------------------------ */
/* 🌐 Generic API (used by other modules)                             */
/* ------------------------------------------------------------------ */
const api = {
  get: (url, options) => fetchJson(toUrl(url), { method: "GET", ...(options || {}) }),

  post: (url, body, options) =>
    fetchJson(toUrl(url), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
      body: body != null ? JSON.stringify(body) : undefined,
      ...options,
    }),

  put: (url, body, options) =>
    fetchJson(toUrl(url), {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
      body: body != null ? JSON.stringify(body) : undefined,
      ...options,
    }),

  delete: (url, options) => fetchJson(toUrl(url), { method: "DELETE", ...(options || {}) }),
};

/* ------------------------------------------------------------------ */
/* 🚲 USED BIKE API                                                   */
/* ------------------------------------------------------------------ */
export const UsedBikeApi = {
  add: (bike) => api.post("used-bikes", bike),
  getAll: () => api.get("used-bikes"),
  getBySeller: (id) => api.get(`used-bikes/seller/${id}`),
};

/* ------------------------------------------------------------------ */
/* 💬 BARGAIN API                                                     */
/* ------------------------------------------------------------------ */
export const BargainApi = {
  create: (data) => api.post("bargains", data),
  getByBuyer: (id) => api.get(`bargains/buyer/${id}`),
  getBySeller: (id) => api.get(`bargains/seller/${id}`), // ✅ fixed sellerid issue
  getByBike: (bikeId) => api.get(`bargains/bike/${bikeId}`),
  update: (id, data) => api.put(`bargains/${id}`, data),
  delete: (id) => api.delete(`bargains/${id}`),
  updateStatus: (id, status) => api.put(`bargains/${id}?status=${status}`),
};

/* ------------------------------------------------------------------ */
/* 🏍️ NEW BIKE API (if still used)                                   */
/* ------------------------------------------------------------------ */
export const NewBikeApi = {
  getAll: () => fetchJson(`${API_BASE}/bikes`),
  getById: (id) => fetchJson(`${API_BASE}/bikes/${id}`),
  add: (data) =>
    fetchJson(`${API_BASE}/bikes`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    fetchJson(`${API_BASE}/bikes/${id}`, {
      method: "DELETE",
    }),
};

/* ------------------------------------------------------------------ */
/* 🏠 ADDRESS API                                                     */
/* ------------------------------------------------------------------ */
export const AddressApi = {
  add: (data) =>
    fetch("http://localhost:8080/addresses/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }
      return res.json();
    }),

  getByUser: (userId) =>
    fetch(`http://localhost:8080/addresses/user/${userId}`).then((r) => r.json()),

  delete: (id) =>
    fetch(`http://localhost:8080/addresses/delete/${id}`, { method: "DELETE" }), // ✅ fixed addressid bug
};

/* ------------------------------------------------------------------ */
/* 📦 ORDER API                                                       */
/* ------------------------------------------------------------------ */
export const OrderApi = {
  create: (order) => api.post("orders", order),
  getAll: () => api.get("orders"),
  getByUser: (userId) => api.get(`orders/user/${userId}`),
  getById: (id) => api.get(`orders/${id}`),
  updateStatus: (id, status) => api.put(`orders/${id}?status=${status}`),
  delete: (id) => api.delete(`orders/${id}`),
};

/* ------------------------------------------------------------------ */
/* 🛒 CART API                                                        */
/* ------------------------------------------------------------------ */
export const CartApi = {
  add: (userId, newBikeId, quantity = 1) =>
    fetchJson(`${API_BASE}/cart/add?userId=${userId}&newBikeId=${newBikeId}&quantity=${quantity}`, { method: "POST" }),

  addUsed: (userId, usedBikeId, quantity = 1) =>
    fetchJson(`${API_BASE}/cart/add?userId=${userId}&usedBikeId=${usedBikeId}&quantity=${quantity}`, { method: "POST" }),

  addOfferPrice: (userId, usedBikeId, offerPrice, quantity = 1) =>
    fetchJson(`${API_BASE}/cart/add-offer?userId=${userId}&usedBikeId=${usedBikeId}&customPrice=${offerPrice}&quantity=${quantity}`, { method: "POST" }),

  get: (userId) => fetchJson(`${API_BASE}/cart/items?userId=${userId}`),

  remove: (userId, newBikeId) =>
    fetchJson(`${API_BASE}/cart/remove?userId=${userId}&newBikeId=${newBikeId}`, { method: "DELETE" }),

  removeUsed: (userId, usedBikeId) =>
    fetchJson(`${API_BASE}/cart/remove?userId=${userId}&usedBikeId=${usedBikeId}`, { method: "DELETE" }),

  clear: (userId) =>
    fetchJson(`${API_BASE}/cart/clear?userId=${userId}`, { method: "DELETE" }),
};



/* ------------------------------------------------------------------ */
/* 💖 WISHLIST API                                                   */
/* ------------------------------------------------------------------ */
export const WishlistApi = {
  add(userId, newBikeId) {
    const url = `${API_BASE}/wishlist/add?userId=${userId}&newBikeId=${newBikeId}`;
    return fetchJson(url, { method: "POST" });
  },
  get(userId) {
    const url = `${API_BASE}/wishlist/items?userId=${userId}`;
    return fetchJson(url, { method: "GET" });
  },
  remove(userId, newBikeId) {
    const url = `${API_BASE}/wishlist/remove?userId=${userId}&newBikeId=${newBikeId}`;
    return fetchJson(url, { method: "DELETE" });
  },
  clear(userId) {
    const url = `${API_BASE}/wishlist/clear?userId=${userId}`;
    return fetchJson(url, { method: "DELETE" });
  },
};

export default api;
