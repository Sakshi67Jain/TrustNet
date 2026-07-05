import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

const trustRef = collection(db, "trust_relationships");

/* =====================================
   Send Trust Request
===================================== */

export const sendTrustRequest = async (
  fromUID: string,
  toUID: string
) => {
  try {
    await addDoc(trustRef, {
      userA: fromUID,
      userB: toUID,
      status: "Pending",
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Trust request sent",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

/* =====================================
   Accept Trust Request
===================================== */

export const acceptRequest = async (
  requestID: string
) => {
  try {
    await updateDoc(doc(db, "trust_relationships", requestID), {
      status: "Accepted",
    });

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

/* =====================================
   Reject Trust Request
===================================== */

export const rejectRequest = async (
  requestID: string
) => {
  try {
    await updateDoc(doc(db, "trust_relationships", requestID), {
      status: "Rejected",
    });

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

/* =====================================
   Get Layer 1 Contacts
===================================== */

export const getLayer1Contacts = async (
  uid: string
) => {
  try {
    const q = query(
      trustRef,
      where("status", "==", "Accepted")
    );

    const snapshot = await getDocs(q);

    const contacts = snapshot.docs.filter((doc) => {
      const data = doc.data();

      return (
        data.userA === uid ||
        data.userB === uid
      );
    });

    return contacts;
  } catch (error) {
    console.error(error);
    return [];
  }
};
