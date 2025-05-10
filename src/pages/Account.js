import React, { useState, useEffect } from 'react';
import { auth, db, doc, getDoc, updateDoc } from '../services/Firebase';

const Account = () => {
    const [currentPlan, setCurrentPlan] = useState('none'); // Default to "none"
    const [loading, setLoading] = useState(false);
    const [tokensRemaining, setTokensRemaining] = useState(0) // Tokens left for the month
    const [thumbnailsRemaining, setThumbnailsRemaining] = useState(0) // Thumbnails left for the month
    const [selectedPlan, setSelectedPlan] = useState('premium'); // Default to Basic plan

    const plans = [
        {
            title: 'Basic Plan',
            price: '$9/month',
            features: [
                '100 requests per month',
                'Feed up to 3 creators',
            ],
        },
        {
            title: 'Premium Plan',
            price: '$25/month',
            features: [
                '300 requests per month',
                'Feed up to 5 creators',
                'Thumbnail creation',
            ],
        },
    ];

    useEffect(() => {
        const fetchUserPlan = async () => {
            try {
                const response = await fetch('https://youtubecreator.onrender.com/check-customer-plan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: auth.currentUser.email }),
                });

                const data = await response.json();
                console.log('Response from server:', data);
                if (data.plan) {
                    console.log('User plan:', data.plan);
                    setCurrentPlan(data.plan);
                } else {
                    setCurrentPlan('none'); // Default to 'none' if no plan is found
                }
            } catch (error) {
                console.error('Error fetching user plan:', error);
                setCurrentPlan('none'); // Default to 'none' on error
            }
        };

        if (auth.currentUser) {
            fetchUserPlan();
        } else {
            console.error('User is not authenticated.');
        }
    }, []);

    const cancelSubscription = async () => {
        // Ask the user for confirmation
        const isSure = window.confirm('Are you sure you want to cancel your subscription?');
        if (!isSure) return;
    
        // Ask the user why they are canceling
        const reason = prompt('Please let us know why you are canceling your subscription (optional):');
    
        try {
            setLoading(true);
    
            // Replace with the actual subscription ID from your database or Stripe
            const subscriptionId = 'sub_1234567890'; // Example subscription ID
    
            const response = await fetch('https://youtubecreator.onrender.com/cancel-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subscriptionId, reason }), // Include the reason in the request
            });
    
            const data = await response.json();
    
            if (data.success) {
                alert('Subscription canceled successfully.');
                setCurrentPlan('none'); // Update the UI to reflect the cancellation
            } else {
                alert('Failed to cancel subscription: ' + data.error);
            }
        } catch (error) {
            console.error('Error canceling subscription:', error);
            alert('An error occurred while canceling the subscription.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                // Fetch user data from Firestore
                const userDocRef = doc(db, 'users', auth.currentUser.uid)
                const userDoc = await getDoc(userDocRef)
                console.log('User document:', userDoc)

                if (userDoc.exists()) {
                    const userData = userDoc.data()
                    // setCurrentPlan(userData.role || 'none') 
                    const tokensLeft = userData.tokensLimit - userData.tokensUsed
                    setTokensRemaining(tokensLeft > 0 ? tokensLeft : 0) // Ensure no negative values

                    // Calculate remaining thumbnails if the user has a premium or sigma plan
                    if (userData.plan === 'premium' || userData.plan === 'sigma') {
                        const thumbnailsLeft = userData.thumbnailsLimit - userData.thumbnailsUsed
                        await updateDoc(userDocRef, {
                            tokensLimit: 300, // Increment tokens used by 1
                        });
                        setThumbnailsRemaining(thumbnailsLeft > 0 ? thumbnailsLeft : 0) // Ensure no negative values
                    } else {
                        setThumbnailsRemaining(0) // No thumbnails for basic users
                    }
                } else {
                    console.error('User document does not exist in Firestore.')
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }

        if (auth.currentUser) {
            fetchCustomerData()
        }
    }, [auth.currentUser])

    const redirectToStripeCheckout = () => {
        if (selectedPlan === 'basic') {
            window.location.href = 'https://buy.stripe.com/3csaICflFebk1CU4gh';
        } else {
            window.location.href = 'https://buy.stripe.com/00g03Y7Td4AK2GY7ss';
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Account Settings</h1>
            <p style={styles.subtitle}>
                Choose the plan that works best for you and unlock premium features!
            </p>
            <div style={styles.planContainer}>
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.planCard,
                            ...(selectedPlan === plan.title.toLowerCase().split(' ')[0]
                                ? styles.activePlanCard
                                : {}),
                        }}
                        onClick={() => setSelectedPlan(plan.title.toLowerCase().split(' ')[0])}
                    >
                        <h2 style={styles.planTitle}>{plan.title}</h2>
                        <p style={styles.planPrice}>{plan.price}</p>
                        <ul style={styles.featuresList}>
                            {plan.features.map((feature, i) => (
                                <li key={i} style={styles.feature}>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div style={styles.buttonContainer}>
                <button
                    style={styles.button}
                    onClick={redirectToStripeCheckout}
                >
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
            </div>
            <p style={styles.currentPlan}>
                Your current plan: <strong>{currentPlan}</strong>
            </p>
            <p style={styles.tokenInfo}>
                Tokens remaining this month: <strong>{tokensRemaining}</strong>
            </p>
            {(currentPlan === 'premium' || currentPlan === 'sigma') && (
                <p style={styles.thumbnailInfo}>
                    Thumbnails remaining this month: <strong>{thumbnailsRemaining}</strong>
                </p>
            )}
            <button
                style={styles.button}
                onClick={cancelSubscription}
                disabled={loading}
            >
                {loading ? 'Canceling...' : 'Cancel Subscription'}
            </button>
        </div>
    );
};

const styles = {
    container: {
        //maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        minHeight: '70vh',
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: '2.5rem',
        color: '#1e293b',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#475569',
        marginBottom: '30px',
    },
    planContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '30px',
        flexWrap: 'wrap',
    },
    planCard: {
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '300px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    activePlanCard: {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
        borderColor: '#10b981',
    },
    planTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '10px',
    },
    planPrice: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#10b981',
        marginBottom: '20px',
    },
    featuresList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        marginBottom: '20px',
    },
    feature: {
        fontSize: '1rem',
        color: '#475569',
        marginBottom: '10px',
    },
    buttonContainer: {
        paddingBottom: '15px',
        paddingTop: '20px',
    },
    button: {
        backgroundColor: '#10b981',
        color: '#ffffff',
        border: 'none',
        padding: '15px 30px',
        fontSize: '1.6rem',
        fontWeight: 'bold',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    currentPlan: {
        fontSize: '1rem',
        color: '#475569',
        marginTop: '20px',
    },
    tokenInfo: {
        fontSize: '1rem',
        color: '#475569',
        marginTop: '10px',
    },
    thumbnailInfo: {
        fontSize: '1rem',
        color: '#475569',
        marginTop: '10px',
    },
};

export default Account;