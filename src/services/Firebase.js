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
    apiKey: 'AIzaSyDSLCBFh7R3wKAHqmaLzBS15PdIvOZCJfQ',
    authDomain: 'engine-f5597.firebaseapp.com',
    projectId: 'engine-f5597',
    storageBucket: 'engine-f5597.firebasestorage.app',
    messagingSenderId: '522209936502',
    appId: '1:522209936502:web:9700de79c9f7dc726c8b57',
    measurementId: 'G-BHQYWXSH4Q',
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