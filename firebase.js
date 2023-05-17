import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBnUNKsFTC_9MdSuUP-4Ojse2WJwGrgWmk",
  authDomain: "trivio-b7aa8.firebaseapp.com",
  projectId: "trivio-b7aa8",
  storageBucket: "trivio-b7aa8.appspot.com",
  messagingSenderId: "1074149109483",
  appId: "1:1074149109483:web:2da1ce2dac8a17f5a718ae",
  measurementId: "G-NNSFRJ6H5B",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
