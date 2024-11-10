const { auth, db } = require("../firebaseConfig");
const { doc, setDoc, updateDoc } = require("firebase/firestore");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");

exports.initialSignup = async (req, res) => {
  const { email, password, firstName, lastName, school } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
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
exports.finalSignup = async (req, res) => {
  const {
    uid,
    dateOfBirth,
    gender,
    race,
    sexualIdentity,
    major,
    classification,
  } = req.body;

  try {
    if (!uid) {
      return res
        .status(400)
        .json({ success: false, message: "UID is required" });
    }

    const additionalUserData = {
      dateOfBirth,
      gender,
      race,
      sexualIdentity,
      major,
      classification,
    };
    const userRef = doc(db, "user", uid);
    await updateDoc(userRef, additionalUserData);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during final signup.",
    });
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
