import { create } from "zustand";

interface ContentCredentials {
  _id?: string;
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
  deleteContent: (
    title: string,
    contentId: string
  ) => Promise<ContentCredentials | void>;
  editContent: (
    credentials: ContentCredentials,
    title: string,
    contentId: string
  ) => Promise<ContentCredentials | null>;
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

      const data = await response.json();
      const newContent = data.content;
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

  deleteContent: async (title, contentId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `/api/course/${title}/content?contentId=${contentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete content: ${response.statusText}`);
      }

      const data = await response.json();
      set((state) => ({
        content: state.content.filter((item) => item._id !== contentId),
        loading: false,
      }));
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      set({ error: errorMessage, loading: false });
    }
  },

  editContent: async (credentials, title, contentId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `/api/course/${title}/content?contentId=${contentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contentTitle: credentials.contentTitle,
            contentText: credentials.contentText,
          }),
        }
      );

      // Parse the response
      const data = await response.json();

      // Check if the response was successful
      if (!response.ok) {
        // If not successful, throw an error with the server's error message
        throw new Error(data.message || "Failed to update content");
      }
      set((state) => ({
        content: state.content.map((item) =>
          item._id === contentId ? { ...item, ...data.content } : item
        ),
        loading: false,
      }));
      // If successful, you might want to do something with the response
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      set({
        loading: false,
        error: errorMessage || "An unexpected error occurred",
      });
      throw error;
    }
  },
}));
