import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const analytics = getAnalytics(app)
const db = getFirestore(app)

// Function to handle Google login and check/set user plan
const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user

        // Reference to the user's Firestore document
        const userDocRef = doc(db, 'users', user.uid)

        // Check if the user already exists in Firestore
        const userDoc = await getDoc(userDocRef)
        if (!userDoc.exists()) {
            // If the user doesn't exist, create a new document with a default plan
            await setDoc(userDocRef, {
                email: user.email,
                plan: 'basic', // Default plan
            })
            console.log('New user created with default plan: basic')
        } else {
            // If the user exists, log their current plan
            const userData = userDoc.data()
            console.log(`User logged in with plan: ${userData.plan}`)
        }
    } catch (error) {
        console.error('Error during Google login:', error)
    }
}

export { 
    auth, 
    googleProvider, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    db, 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc 
}