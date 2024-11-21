import { create } from "zustand";

interface ContentCredentials {
  contentTitle: string;
  contentText: string;
  courseTitle: string;
}

interface ContentState {
  loading: boolean;
  content: ContentCredentials[]; // Ensure this is always an array
  error: string | null;
  addContent: (
    credentials: ContentCredentials,
    title: string
  ) => Promise<ContentCredentials | null>;
  getContent: (title: string) => Promise<void>;
}

export const useContentStore = create<ContentState>((set) => ({
  content: [], // Initialize as empty array
  loading: false,
  error: null,

  addContent: async (credentials, title) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/course/${title}/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Failed to create content: ${response.statusText}`);
      }

      const newContent = await response.json();
      set((state) => ({
        content: [...state.content, newContent],
        loading: false,
      }));
      return newContent;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      set({ error: errorMessage, loading: false });
      console.error("Content creation failed:", errorMessage);
      return null;
    }
  },

  getContent: async (title) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/course/${title}/content`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`);
      }

      const data = await response.json();
      // Ensure we're setting an array
      set({
        content: Array.isArray(data.data) ? data.data : [],
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      set({ error: errorMessage, loading: false });
      console.error("Content fetch failed:", errorMessage);
      // Set empty array on error
      set({ content: [] });
    }
  },

}));
