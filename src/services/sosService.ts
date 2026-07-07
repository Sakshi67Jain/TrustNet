import {
  onSnapshot,
  GeoPoint,
} from "firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/*
Collection

sos_sessions

Fields

sessionId
triggeredBy
status
layerActive
startTime
endTime
layer1Alerted
layer1Acknowledged
*/

// ==============================
// Trigger SOS
// ==============================

export async function triggerSOS(
  uid: string,
  layer1Contacts: string[]
) {

  try {

    const docRef = await addDoc(
      collection(db, "sos_sessions"),
      {

        triggeredBy: uid,

        status: "active",

        layerActive: 1,

        startTime: serverTimestamp(),

        endTime: null,

        layer1Alerted: layer1Contacts,

        layer1Acknowledged: null,

      }
    );

    await updateDoc(
      doc(db, "sos_sessions", docRef.id),
      {
        sessionId: docRef.id,
      }
    );

    return docRef.id;

  } catch (err) {

    console.error(err);

    throw err;

  }

}

// ==============================
// Cancel SOS
// ==============================

export async function cancelSOS(
  sessionId: string
) {

  try {

    await updateDoc(
      doc(db, "sos_sessions", sessionId),
      {

        status: "cancelled",

        endTime: serverTimestamp(),

      }
    );

  } catch (err) {

    console.error(err);

    throw err;

  }

}

// ==============================
// Acknowledge SOS
// ==============================

export async function acknowledgeSOS(

  sessionId: string,

  responderUID: string

) {

  try {

    await updateDoc(

      doc(db, "sos_sessions", sessionId),

      {

        layer1Acknowledged: responderUID,

        status: "resolved",

      }

    );

  }

  catch(err){

    console.error(err);

    throw err;

  }

}

// ==============================
// End SOS
// ==============================

export async function endSOS(

  sessionId:string

){

  try{

    await updateDoc(

      doc(db,"sos_sessions",sessionId),

      {

        status:"resolved",

        endTime:serverTimestamp(),

      }

    );

  }

  catch(err){

    console.error(err);

    throw err;

  }

}

// ==============================
// Archive SOS
// ==============================

export async function archiveSOS(

  sessionId:string

){

  const source=doc(

    db,

    "sos_sessions",

    sessionId

  );

  const snap=await getDoc(source);

  if(!snap.exists()) return;

  await setDoc(

    doc(db,"sos_history",sessionId),

    snap.data()

  );

  await deleteDoc(source);

}