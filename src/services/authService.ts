import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

// ======================================
// Sign Up
// ======================================

export const signup = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(credential.user, {
      displayName: name,
    });

    await saveUser(credential.user);

    return {
      success: true,
      user: credential.user,
    };
  } catch (error: any) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }
};

// ======================================
// Login
// ======================================

export const login = async (
  email: string,
  password: string
) => {
  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      success: true,
      user: credential.user,
    };
  } catch (error: any) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }
};

// ======================================
// Save User in Firestore
// ======================================

export const saveUser = async (user: User) => {
  const userRef = doc(db, "users", user.uid);

  const snap = await getDoc(userRef);

  if (snap.exists()) return;

  await setDoc(userRef, {
    uid: user.uid,
    displayName: user.displayName || "",
    email_id: user.email || "",
    phone_no: "",
    profile_photo: user.photoURL || "",
    verification_status: true,
    online: true,
    createdAt: serverTimestamp(),
  });
};

// ======================================
// Current User
// ======================================

export const getCurrentUser = () => auth.currentUser;

// ======================================
// Auth State Listener
// ======================================

export const authListener = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};

// ======================================
// Logout
// ======================================

export const logout = async () => {
  await signOut(auth);
};
