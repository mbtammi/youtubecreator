import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, doc, getDoc, setDoc } from '../services/Firebase'
import { useNavigate } from 'react-router-dom'
import { db } from '../services/Firebase'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            // Sign in user with email and password
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/account') 
        } catch (err) {
            setError(err.message)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user
    
            // Check if the user already exists in Firestore
            const userDocRef = doc(db, 'users', user.uid)
            const userDoc = await getDoc(userDocRef)
    
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
    
            console.log('Google Sign-In Successful:', user)
            navigate('/account')
        } catch (error) {
            console.error('Error during Google Sign-In:', error)
            setError('Failed to sign in with Google.')
        }
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Sign In</h2>
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
                <button type='submit' style={styles.button}>
                    Sign In
                </button>
            </form>
            {error && <p style={styles.error}>{error}</p>}
            <button onClick={handleGoogleSignIn} style={styles.googleButton}>
                <FaGoogle style={styles.googleIcon} />
                Sign In with Google
            </button>
            <p style={styles.registerText}>
                Don't have an account?{' '}
                <span
                    style={styles.registerLink}
                    onClick={() => navigate('/signup')} // Redirect to the Sign-Up page
                >
                    Register here
                </span>
            </p>
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: '#0f172a',
        color: '#1c1c1c',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    title: {
        color: '#FFD60A',
        fontSize: '2rem',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
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
    registerText: {
        marginTop: '20px',
        fontSize: '1rem',
        color: '#fff',
    },
    registerLink: {
        color: '#FFD60A',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
}

export default SignIn