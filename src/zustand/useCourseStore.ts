import { create } from "zustand";

interface CourseCredentials {
  title: string;
  description: string;
  codeExample: string;
}

interface UpdateCourseCredentials {
  title?: string;
  description?: string;
  codeExample?: string;
}

interface CourseState {
  loading: boolean;
  courses: CourseCredentials[];
  addCourse: (crdentials: CourseCredentials) => Promise<CourseCredentials | null>;
  getCourse: () => void;
  updateCourse: (
    Credentials: UpdateCourseCredentials
  ) => Promise<CourseCredentials | null>;
  deleteCourse: (title: string) => void;
}

const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  loading: false,
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

      return newCourse;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      console.log("Course creation failed", errorMessage);
    }
  },

  getCourse: async () => {
    try {
      set(() => ({ loading: true }));
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
    } finally {
      set(() => ({ loading: false }));
    }
  },

  updateCourse: async (credentials) => {
    try {
      const response = await fetch(`/api/course/${credentials.title}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: credentials.title,
          description: credentials.description,
          codeExample: credentials.codeExample,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update course");
      }

      const data = await response.json();
      set((state) => ({
        courses: state.courses.map((course) =>
          course.title === credentials.title
            ? { ...course, ...data.course }
            : course
        ),
      }));
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      console.log("Course update failed", errorMessage);
    }
  },

  deleteCourse: async (title) => {
    try {
      const response = await fetch(`/api/course/${title}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      set((state) => ({
        courses: state.courses.filter((course) => course.title !== title),
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      console.log("Course delete failed", errorMessage);
    }
  },
}));

export default useCourseStore;
