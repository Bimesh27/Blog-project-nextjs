"use server";
import { cookies } from "next/headers";

export async function loginAdmin(passcode: string) {
  const adminPasscode = process.env.ADMIN_PASSCODE;

  if (!passcode || !adminPasscode) {
    return {
      success: false,
      message: "Missing credentials",
    };
  }

  if (passcode !== adminPasscode) {
    return {
      success: false,
      message: "Invalid passcode",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin-session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  return {
    success: true,
    message: "Logged in successfully",
  };
}

export async function checkLogin() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin-session");

  if (adminSession && adminSession.value === "true") {
    return true;
  } else {
    return false;
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  try {
    cookieStore.set("admin-session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    });
    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to logout",
    };
  }
}
