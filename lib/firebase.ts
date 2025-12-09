import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// [중요] 방금 새로 만든 프로젝트의 키 값으로 교체하세요!
const firebaseConfig 
= {
  apiKey: "AIzaSyAhdghF158vazeJIuM-O5p71eUYFDT28pA",
  authDomain: "scale-king-dev.firebaseapp.com",
  projectId: "scale-king-dev",
  storageBucket: "scale-king-dev.firebasestorage.app",
  messagingSenderId: "18011413722",
  appId: "1:18011413722:web:94adf81649e309c54759e3",
  measurementId: "G-RYJZDPPYMX"};// Initialize Firebaseconst app = initializeApp(firebaseConfig);const analytics = getAnalytics(app);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);