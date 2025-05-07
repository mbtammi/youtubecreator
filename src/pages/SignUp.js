import React, { useState } from 'react'
import { auth, db, createUserWithEmailAndPassword, doc, setDoc, signInWithPopup, googleProvider } from '../services/Firebase'
import { FaGoogle } from 'react-icons/fa' // Import the Google icon

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (password !== confirmPassword) {
            setError('Passwords do not match!')
            return
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // Save user data to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: 'basic', // Default role
                displayName: user.email.split('@')[0],
                paymentStartDate: null,
                paymentEndDate: null,
                tokensUsed: 0,
                tokensLimit: 100,
                thumbnailsUsed: 0,
                thumbnailsLimit: 40
            })

            setSuccess('Account created successfully!')
        } catch (err) {
            setError(err.message)
        }
    }

    const handleGoogleSignUp = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user
    
            // Check if the user already exists in Firestore
            const userDocRef = doc(db, 'users', user.uid)
            const userDoc = await userDocRef.get()
    
            if (!userDoc.exists()) {
                // If the user doesn't exist, create a new document with default values
                await setDoc(userDocRef, {
                    email: user.email,
                    role: 'none', // Default role
                    displayName: user.displayName || user.email.split('@')[0],
                    paymentStartDate: null,
                    paymentEndDate: null,
                    tokensUsed: 0,
                    tokensLimit: 100,
                    thumbnailsUsed: 0,
                    thumbnailsLimit: 40,
                })
            }
    
            console.log('Google Sign-Up Successful:', user)
            setSuccess('Google Sign-Up Successful!')
        } catch (error) {
            console.error('Google Sign-Up Error:', error)
            setError('Failed to sign up with Google. Please try again.')
        }
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Sign Up</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type='submit' style={styles.button}>
                    Sign Up
                </button>
            </form>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}
            <button onClick={handleGoogleSignUp} style={styles.googleButton}>
                <FaGoogle style={styles.googleIcon} /> Sign Up with Google
            </button>
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: '#0f172a',
        color: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#FFD60A',
        fontSize: '2rem',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '300px',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        backgroundColor: '#FFD60A',
        color: '#1c1c1c',
        border: 'none',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    googleButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        color: '#1c1c1c',
        border: '1px solid #ccc',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '15px',
        gap: '10px',
    },
    googleIcon: {
        fontSize: '20px',
    },
    error: {
        color: '#fa755a',
        marginTop: '10px',
    },
    success: {
        color: '#10b981',
        marginTop: '10px',
    },
}

export default SignUp