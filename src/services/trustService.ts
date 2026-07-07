import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/**
 * Firestore Collection
 *
 * trust_relationships
 *
 * Fields
 * userA
 * userB
 * status
 * createdAt
 */

// =========================
// Send Trust Request
// =========================
export async function sendTrustRequest(
  fromUID: string,
  toUID: string
) {
  try {
    if (fromUID === toUID) {
      throw new Error("Cannot send request to yourself.");
    }

    // Check if request already exists
    const q = query(
      collection(db, "trust_relationships"),
      where("userA", "==", fromUID),
      where("userB", "==", toUID)
    );

    const existing = await getDocs(q);

    if (!existing.empty) {
      throw new Error("Trust request already exists.");
    }

    const docRef = await addDoc(
      collection(db, "trust_relationships"),
      {
        userA: fromUID,
        userB: toUID,
        status: "pending",
        createdAt: serverTimestamp(),
      }
    );

    return docRef.id;
  } catch (error) {
    console.error("sendTrustRequest:", error);
    throw error;
  }
}

// =========================
// Accept Request
// =========================
export async function acceptRequest(
  requestID: string
) {
  try {
    await updateDoc(
      doc(db, "trust_relationships", requestID),
      {
        status: "accepted",
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// =========================
// Reject Request
// =========================
export async function rejectRequest(
  requestID: string
) {
  try {
    await updateDoc(
      doc(db, "trust_relationships", requestID),
      {
        status: "rejected",
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// =========================
// Layer 1 Contacts
// =========================
export async function getLayer1Contacts(
  userUID: string
) {
  try {
    const q = query(
      collection(db, "trust_relationships"),
      where("status", "==", "accepted")
    );

    const snapshot = await getDocs(q);

    const contacts = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }))
      .filter(
        (item: any) =>
          item.userA === userUID ||
          item.userB === userUID
      );

    return contacts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// =========================
// Search User By Phone
// =========================
export async function searchUserByPhone(
  phone: string
) {
  try {
    const q = query(
      collection(db, "users"),
      where("phone_no", "==", phone)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    return {
      id: snapshot.docs[0].id,
      ...(snapshot.docs[0].data() as any),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// =========================
// Optional Helper
// =========================
export async function getUser(
  uid: string
) {
  try {
    const ref = doc(db, "users", uid);

    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return null;
    }

    return {
      id: snap.id,
      ...(snap.data() as any),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}