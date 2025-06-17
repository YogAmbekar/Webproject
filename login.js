// login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
        apiKey: "AIzaSyA5gcABX0UM3spEn8qO46qTIKpAc6ig4x8",
        authDomain: "adaptive-learning-e1b1e.firebaseapp.com",
        projectId: "adaptive-learning-e1b1e",
        storageBucket: "adaptive-learning-e1b1e.firebasestorage.app",
        messagingSenderId: "967863889000",
        appId: "1:967863889000:web:254822b13cd88fcd2e1fdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to show messages
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// SIGN UP
const signUpButton = document.getElementById('submitSignUp');
signUpButton.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    if (!email || !password || !firstName || !lastName) {
        showMessage('Please fill all fields!', 'signUpMessage');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };

            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    showMessage('Account Created Successfully!', 'signUpMessage');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    showMessage('Failed to save user data.', 'signUpMessage');
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists!', 'signUpMessage');
            } else {
                showMessage('Unable to create User.', 'signUpMessage');
            }
        });
});

// SIGN IN
const signInButton = document.getElementById('submitSignIn');
signInButton.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;

    if (!email || !password) {
        showMessage('Please enter Email and Password.', 'signInMessage');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);

            showMessage('Login Successful!', 'signInMessage');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password') {
                showMessage('Incorrect Email or Password!', 'signInMessage');
            } else if (errorCode === 'auth/user-not-found') {
                showMessage('Account does not Exist.', 'signInMessage');
            } else {
                showMessage('Failed to login.', 'signInMessage');
            }
        });
});
