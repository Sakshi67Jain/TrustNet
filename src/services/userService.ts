import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

const usersRef = collection(db, "users");

// Create user profile after successful OTP login
export const createUserProfile = async (
  uid: string,
  name: string,
  phone: string,
  email: string = "",
  profilePhoto: string = ""
) => {
  try {
    const userDoc = doc(db, "users", uid);

    const snapshot = await getDoc(userDoc);

    // If user already exists, don't recreate
    if (snapshot.exists()) {
      return;
    }

    await setDoc(userDoc, {
      displayName: name,
      phone_no: phone,
      email_id: email,
      profile_photo: profilePhoto,
      verification_status: true,
      online: true,
      createdAt: serverTimestamp(),
    });

    console.log("User profile created.");
  } catch (error) {
    console.error(error);
  }
};

// Get profile of logged in user
export const getUserProfile = async (uid: string) => {
  try {
    const userDoc = doc(db, "users", uid);

    const snapshot = await getDoc(userDoc);

    if (snapshot.exists()) {
      return snapshot.data();
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Update profile
export const updateUserProfile = async (
  uid: string,
  data: any
) => {
  try {
    const userDoc = doc(db, "users", uid);

    await updateDoc(userDoc, data);

    console.log("Profile updated");
  } catch (error) {
    console.error(error);
  }
};

// Search user by phone number
export const searchUserByPhone = async (
  phone: string
) => {
  try {
    const q = query(
      usersRef,
      where("phone_no", "==", phone)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    return querySnapshot.docs[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};
