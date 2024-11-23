import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the Hub interface
interface Hub {
  _id: string;
  name: string;
  images: { secure_url: string }[];
  state: string;
  dist: { calculated: number };
}

// Extend the Zustand store's state and actions
interface HubsState {
  hubs: Hub[] | null; // State: list of hubs or null
  setHubs: (newHubs: Hub[]) => void; // Action: set the hubs
  removeHub: (hubId: string) => void; // Action: remove a hub by ID

  // Slider state
  currentSlide: number; // State: track the current slide index
  setCurrentSlide: (index: number | ((prev: number) => number)) => void; // Action: set the current slide
}

// Create the Zustand store with persistence
export const useHubsStore = create<HubsState>()(
  persist(
    (set) => ({
      hubs: null, // Initial state for hubs
      setHubs: (newHubs) => set({ hubs: newHubs }), // Update the hubs state
      removeHub: (hubId) =>
        set((state) => ({
          hubs: state.hubs
            ? state.hubs.filter((hub) => hub._id !== hubId)
            : null,
        })), // Remove hub by ID

      // Slider state management
      currentSlide: 0, // Initial state for the slider
      setCurrentSlide: (index) =>
        set((state) => ({
          currentSlide:
            typeof index === 'function' ? index(state.currentSlide) : index,
        })),
    }),
    {
      name: 'hubs-session-storage', // Key for session storage
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null; // Deserialize from JSON
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value)); // Serialize to JSON
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
