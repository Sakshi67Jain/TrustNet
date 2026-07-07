import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/*
notifications

receiverUID
senderUID
title
message
type
createdAt
read
*/

// =======================================
// Send Notification
// =======================================

export async function sendNotification(
  receiverUID: string,
  senderUID: string,
  title: string,
  message: string,
  type: string
) {
  try {
    await addDoc(
      collection(db, "notifications"),
      {
        receiverUID,
        senderUID,
        title,
        message,
        type,
        createdAt: serverTimestamp(),
        read: false,
      }
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// =======================================
// Notify Layer 1 Contacts
// =======================================

export async function notifyLayer1(
  sessionId: string
) {
  try {
    const snap = await getDoc(
      doc(db, "sos_sessions", sessionId)
    );

    if (!snap.exists()) return;

    const data = snap.data();

    const contacts = data.layer1Alerted || [];

    for (const uid of contacts) {
      await sendNotification(
        uid,
        data.triggeredBy,
        "SOS Alert",
        "Emergency assistance required.",
        "SOS"
      );
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// =======================================
// Notify Responders
// =======================================

export async function notifyResponders(
  sessionId: string
) {
  try {
    const responders = await getDocs(
      collection(
        db,
        "sos_sessions",
        sessionId,
        "responders"
      )
    );

    const sos = await getDoc(
      doc(db, "sos_sessions", sessionId)
    );

    if (!sos.exists()) return;

    const owner = sos.data().triggeredBy;

    responders.forEach(async (r) => {
      await sendNotification(
        r.id,
        owner,
        "SOS Ended",
        "Emergency has ended.",
        "END_SOS"
      );
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// =======================================
// Get Notifications
// =======================================

export async function getNotifications(
  uid: string
) {
  const q = query(
    collection(db, "notifications"),
    where("receiverUID", "==", uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as any),
  }));
}