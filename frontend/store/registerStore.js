import { create } from "zustand";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const useRegistrationStore = create((set, get) => ({
  registrations: [],
  eventCounts: {},
  loading: false,
  error: null,

  // 🔹 Fetch all registrations (admin panel)
  fetchRegistrations: async (event = "ALL") => {
    set({ loading: true });

    const url =
      event === "ALL"
        ? "http://localhost:5000/api/registrations/admin"
        : `http://localhost:5000/api/registrations/admin?event=${encodeURIComponent(event)}`;

    const res = await fetch(url);
    const data = await res.json();

    set({ registrations: data, loading: false });
  },

  fetchEventCounts: async () => {
    const res = await fetch("http://localhost:5000/api/registrations/counts");
    const data = await res.json();

    const countsObj = {};
    data.forEach((item) => {
      countsObj[item._id] = item.count;
    });

    set({ eventCounts: countsObj });
  },

  // 🔹 Accept student
  acceptStudent: async (id) => {
    try {
      await fetch(`${API}/api/registrations/admin/accept/${id}`, {
        method: "PUT",
      });

      // update local state
      set((state) => ({
        registrations: state.registrations.map((r) =>
          r._id === id ? { ...r, status: "accepted" } : r
        ),
      }));
    } catch (err) {
      console.error("Accept failed", err);
    }
  },

  // 🔹 Reject student
  rejectStudent: async (id) => {
    try {
      await fetch(`${API}/api/registrations/admin/reject/${id}`, {
        method: "PUT",
      });

      set((state) => ({
        registrations: state.registrations.map((r) =>
          r._id === id ? { ...r, status: "rejected" } : r
        ),
      }));
    } catch (err) {
      console.error("Reject failed", err);
    }
  },
}));