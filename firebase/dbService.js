import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

const getQuestions = async () => {
  const resData = [];
  const querySnapshot = await getDocs(collection(db, "questions"));
  querySnapshot.forEach((doc) => {
    resData.push(doc.data());
  });
  return resData;
};
const getAdmin = async (uid) => {
  const userRef = doc(db, "admin", uid);
  const userDoc = await getDoc(userRef);
  return userDoc.data();
};

const addUserData = async (uid, password, email) => {
  await setDoc(doc(db, "users", uid), {
    password,
    email,
  });
};

const updateUserData = async ({ uid, email, password }) => {
  const userRef = doc(db, "users", uid);
  const updateObj = {};

  email ? (updateObj.email = email) : null;
  password ? (updateObj.password = password) : null;

  console.log("🚀 ~ file: dbService.js:23 ~ updateObj", updateObj);

  await updateDoc(userRef, updateObj);
};

const updateTokens = async ({ accessToken, refreshToken }) => {
  const docRef = doc(db, "staticData", "iyzicoTokens");

  await setDoc(docRef, {
    accessToken,
    refreshToken,
  });
};

const updatePaymentData = async (data) => {
  const docRef = doc(collection(db, "paymentData"));
  await setDoc(docRef, data);
};

const getBlogIdsFromDatabase = async () => {
  const collectionRef = collection(db, "blogs");
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map((doc) => doc.id);
};

const getUserIdsFromDatabase = async () => {
  const collectionRef = collection(db, "users");
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map((doc) => doc.id);
};

const FirebaseDBService = {
  addUserData,
  updateUserData,
  getQuestions,
  updateTokens,
  updatePaymentData,
  getAdmin,
  getBlogIdsFromDatabase,
  getUserIdsFromDatabase,
};

export default FirebaseDBService;
