import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./config";

const registerUser = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response;
  } catch (error) {
    return error.message;
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log("response", response);
    return response;
  } catch (error) {
    toast.error(
      "Kullanıcı hesabınıza erişim sağlanamadı. Lütfen e-mail ve şifrenizin doğru olduğuna emin olunuz."
    );
    return error.message;
  }
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  try {
    await axios.get(
      `https://us-central1-teamsfam-backend.cloudfunctions.net/app/user/users/${result.user.uid}`
    );
  } catch (error) {
    //add user to db
    try {
      // db create step
      const postRes = await axios
        .post(
          "https://us-central1-teamsfam-backend.cloudfunctions.net/app/user/create",
          {
            id: result.user.uid,
            email: result.user.email,
            username: result.user.email.split("@")[0] + "_" + Date.now(),
          }
        )
        .then((res) => {
          console.log("🚀 ~ file: authService.js:53 ~ .then ~ res", res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(
        "🚀 ~ file: authService.js:81 ~ handleRegister ~ postRes",
        postRes
      );
      // createUser(values);

      // add user details step
      const putRes = await axios
        .put(
          `https://us-central1-teamsfam-backend.cloudfunctions.net/app/user/update/${result.user.uid}`,
          {
            user: {
              fullName: result.user.fullname,
              emailVerified: true,
            },
          }
        )
        .then((res) => {
          console.log("🚀 ~ file: authService.js:63 ~ ).then ~ res", res);
        })
        .catch((err) => {
          console.log("🚀 ~ file: authService.js:66 ~ ).then ~ err", err);
        });
      console.log(
        "🚀 ~ file: authService.js:97 ~ handleRegister ~ putRes",
        putRes
      );
    } catch (error) {
      console.log(error);
    }
  }
};

const signOutUser = async () => {
  await signOut(auth);
};

const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("resetPassword sent");
      toast.success(
        "Şifre sıfırlama e-postası gönderildi. Lütfen e-postanızı kontrol ediniz."
      );
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(
        "Şifre sıfırlama e-postası gönderilemedi. Lütfen daha sonra tekrar deneyiniz."
      );
      console.log(
        // "🚀 ~ file: authService.js:41 ~ resetPassword ~ errorMessage",
        errorMessage
      );
      console.log(
        // "🚀 ~ file: authService.js:39 ~ resetPassword ~ errorCode",
        errorCode
      );
    });
};

const emailVerification = async (user) => {
  return await sendEmailVerification(user)
    .then(() => {
      console.log("email verification sent");
    })
    .catch((err) => {
      console.log("err", err);
    });
};

const subscribeToAuthChanges = (handleAuthChange) => {
  onAuthStateChanged(auth, (user) => {
    console.log(
      // "🚀 ~ file: authService.js ~ line 38 ~ onAuthStateChanged ~ user",
      user
    );

    handleAuthChange(user);
    console.log(
      // "🚀 ~ file: authService.js ~ line 41 ~ onAuthStateChanged ~ user",
      user
    );
  });
};

const FirebaseAuthService = {
  registerUser,
  loginUser,
  signInWithGoogle,
  signOutUser,
  resetPassword,
  subscribeToAuthChanges,
  emailVerification,
};

export default FirebaseAuthService;
