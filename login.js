// Initialize Firebase (replace with your actual Firebase configuration in your HTML)
// const firebaseConfig = { ... };
// try { ... } catch (error) { ... }

function showSignup() {
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.signup-form').style.display = 'block';
}

function showLogin() {
    document.querySelector('.signup-form').style.display = 'none';
    document.querySelector('.login-form').style.display = 'block';
}

async function loginWithFirebase() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');

    errorDiv.textContent = ''; // Clear any previous errors

    if (!email || !password) {
        errorDiv.textContent = 'Please enter your email and password.';
        return;
    }

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('Logged in user:', user);
        // Redirect to the donation page upon successful login
        window.location.href = 'donate.html';
    } catch (error) {
        console.error('Login error:', error);
        switch (error.code) {
            case 'auth/invalid-email':
                errorDiv.textContent = 'Invalid email address.';
                break;
            case 'auth/user-not-found':
                errorDiv.textContent = 'No user found with this email.';
                break;
            case 'auth/wrong-password':
                errorDiv.textContent = 'Incorrect password.';
                break;
            case 'auth/user-disabled':
                errorDiv.textContent = 'This user account has been disabled.';
                break;
            default:
                errorDiv.textContent = 'An error occurred during login. Please try again.';
        }
    }
}

async function signupWithFirebase() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const errorDiv = document.getElementById('signupError');

    errorDiv.textContent = ''; // Clear any previous errors

    if (!username || !email || !password) {
        errorDiv.textContent = 'Please fill in all the fields.';
        return;
    }

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('Signed up user:', user);

        // Optionally, you can update the user's profile with the username
        await user.updateProfile({
            displayName: username
        });

        alert('Account created successfully! You are now logged in.');
        // Redirect to the donation page upon successful signup
        window.location.href = 'donate.html';

    } catch (error) {
        console.error('Signup error:', error);
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorDiv.textContent = 'This email address is already in use.';
                break;
            case 'auth/invalid-email':
                errorDiv.textContent = 'Invalid email address.';
                break;
            case 'auth/weak-password':
                errorDiv.textContent = 'Password should be at least 6 characters.';
                break;
            default:
                errorDiv.textContent = 'An error occurred during sign up. Please try again.';
        }
    }
}