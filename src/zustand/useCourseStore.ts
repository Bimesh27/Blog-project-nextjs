import { create } from "zustand";

interface CourseCredentials {
  title: string;
  description: string;
  codeExample: string;
}

interface CourseState {
  courses: string[];
  addCourse: (crdentials: CourseCredentials) => void;
  getCourse: () => void;
}

const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  addCourse: async (crdentials) => {
    try {
      const response = await fetch("/api/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(crdentials),
      });
      if (!response.ok) {
        throw new Error("Failed to create course");
      }
      const newCourse = await response.json();

      set((state) => ({ courses: [...state.courses, newCourse.course] }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      console.log("Course creation failed", errorMessage);
    }
  },

  getCourse: async () => {
    try {
      const response = await fetch("/api/course");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      set(() => ({ courses: data.courses }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      console.log("Course fetch failed", errorMessage);
    }
  },
}));

export default useCourseStore;
