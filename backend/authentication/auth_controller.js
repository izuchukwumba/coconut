const { auth, db } = require("../firebaseConfig");
const { doc, setDoc } = require("firebase/firestore");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");

exports.InitialSignUp = async (req, res) => {
  const { email, confirmPassword, firstName, lastName, school } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      confirmPassword
    );
    const user = userCredential.user;

    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      school: school,
      createdAt: new Date(),
    };

    await setDoc(doc(db, "user", user.uid), userData);
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Error signing up:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error logging in", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    await signOut(auth);
    res.status(200).json({ success: true, message: "Successfully logged out" });
  } catch (error) {
    console.error("Error logging out:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
