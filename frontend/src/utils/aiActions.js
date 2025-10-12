// src/utils/aiActions.js
// 💡 Central command executor for TwinTires AI Assistant

export async function executeAIAction(action) {
  if (!action?.action) return;

  console.log("🚀 Executing AI action:", action);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  try {
    switch (action.action) {
      // 🔍 Navigate to a specific page
      case "navigate":
        if (action.target) {
          window.location.href = action.target;
        }
        break;

      // 🗑 Delete item from cart
      case "deleteItem":
        if (action.target === "cart" && action.id) {
          const res = await fetch(`${API_BASE}/api/cart/${action.id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            console.log("✅ Deleted item from cart:", action.id);
          } else {
            console.warn("⚠️ Delete failed:", res.status);
          }
        }
        break;

      // 🛒 Add an item to cart
      case "addToCart":
  if (action.item) {
    toast.success(`🛒 Added ${action.item.name || "bike"} to cart`);
  }
  break;


      // 🧾 Fill form fields
      case "fillForm":
        if (action.fields) {
          Object.entries(action.fields).forEach(([id, val]) => {
            const el = document.querySelector(`[name='${id}'],#${id}`);
            if (el) {
              el.value = val;
              el.dispatchEvent(new Event("input", { bubbles: true }));
            }
          });
          console.log("✅ Form fields filled:", action.fields);
        }
        break;

      // 🎯 Filter bikes
      case "filter":
        if (action.criteria) {
          sessionStorage.setItem("bikeFilter", JSON.stringify(action.criteria));
          window.location.href = "/buy";
        }
        break;

      default:
        console.warn("⚠️ Unknown AI action:", action);
    }
  } catch (err) {
    console.error("❌ Error executing AI action:", err);
  }
}
