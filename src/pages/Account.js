import React, { useState, useEffect } from 'react';
import { auth, db, doc, getDoc } from '../services/Firebase';

const Account = () => {
    const [currentPlan, setCurrentPlan] = useState('none'); // Default to "none"
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('basic'); // Default to Basic plan

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
        const fetchPlan = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setCurrentPlan(userDoc.data().role || 'none');
                    }
                }
            } catch (error) {
                console.error('Error fetching user plan:', error);
            }
        };
        fetchPlan();
    }, []);

    const redirectToStripeCheckout = () => {
        window.location.href = 'https://buy.stripe.com/test_9AQ6q7csE7v9cco3cc';
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
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
            </div>
            <p style={styles.currentPlan}>
                Your current plan: <strong>{currentPlan}</strong>
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        minHeight: '70vh',
        borderRadius: '10px',
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
};

export default Account;