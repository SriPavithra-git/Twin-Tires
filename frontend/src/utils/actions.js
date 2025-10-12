// utils/actions.js
import { toast } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const executeAction = async (actionObj, navigate) => {
  if (!actionObj || !actionObj.action) return;

  const action = actionObj.action.toLowerCase();

  try {
    switch (action) {
      case "navigate":
        if (actionObj.target) {
          toast.success(`Navigating to ${actionObj.target}...`);
          navigate(actionObj.target);
        }
        break;

      case "fillform":
        Object.entries(actionObj.fields || {}).forEach(([id, val]) => {
          const el = document.querySelector(`[name='${id}'],#${id}`);
          if (el) el.value = val;
        });
        toast.success("Form fields filled automatically!");
        break;

      case "placeorder":
        toast.loading("Placing your order...");
        await fetch(`${API_BASE}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: actionObj.orderId,
            item: actionObj.item,
            quantity: actionObj.quantity || 1,
          }),
        });
        toast.dismiss();
        toast.success("Order placed successfully!");
        break;

      case "cancelorder":
        toast.loading("Cancelling order...");
        await fetch(`${API_BASE}/api/orders/${actionObj.orderId}`, {
          method: "DELETE",
        });
        toast.dismiss();
        toast.success("Order cancelled!");
        break;

      default:
        toast("🤖 The AI tried an unknown action.");
    }
  } catch (err) {
    console.error("Action error:", err);
    toast.error("Something went wrong performing that action.");
  }
};