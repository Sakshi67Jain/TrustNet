import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  User,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

let confirmationResult: ConfirmationResult | null = null;

// Initialize invisible reCAPTCHA
export const initializeRecaptcha = (containerId: string) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: () => {
      console.log("reCAPTCHA verified");
    },
  });
};

// Send OTP
export const sendOTP = async (
  phoneNumber: string,
  appVerifier: RecaptchaVerifier
) => {
  try {
    confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );

    return {
      success: true,
      message: "OTP sent successfully",
    };
  } catch (error: any) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }
};

// Verify OTP
export const verifyOTP = async (otp: string) => {
  try {
    if (!confirmationResult) {
      throw new Error("OTP has not been sent.");
    }

    const result = await confirmationResult.confirm(otp);

    return {
      success: true,
      user: result.user,
    };
  } catch (error: any) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }
};

// Get currently logged-in user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
