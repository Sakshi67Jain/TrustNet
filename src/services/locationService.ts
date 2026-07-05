import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

/* =====================================
   Update My Location
===================================== */

export const updateMyLocation = async (
  uid: string,
  latitude: number,
  longitude: number,
  sharingEnabled: boolean
) => {
  try {
    await setDoc(doc(db, "user_locations", uid), {
      uid,
      geopoint: {
        latitude,
        longitude,
      },
      sharingEnabled,
      timestamp: serverTimestamp(),
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
   Get Contact Locations
===================================== */

export const getContactLocations = async (
  uidList: string[]
) => {
  try {
    const locationRef = collection(db, "user_locations");

    const q = query(
      locationRef,
      where("uid", "in", uidList)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
    return [];
  }
};
