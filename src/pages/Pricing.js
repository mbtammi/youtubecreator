import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import './Pricing.css'

const Pricing = () => {
    const [activePlan, setActivePlan] = useState(1) // Default to Premium Plan (index 1)
    const navigate = useNavigate() // Initialize navigate hook

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
    ]

    const handleStartFreeTrial = () => {
        navigate('/account') // Navigate to the Account page
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Choose Your Plan</h1>
            <p style={styles.subtitle}>
                Start your 7-day free trial today! Cancel anytime.
            </p>
            <div style={styles.tabContainer}>
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.tab,
                            ...(activePlan === index ? styles.activeTab : {}),
                        }}
                        onClick={() => setActivePlan(index)}
                    >
                        {plan.title}
                    </div>
                ))}
            </div>
            <div
                style={{
                    ...styles.card,
                    animation: activePlan === 1 ? 'pulse 1.5s infinite' : 'none',
                }}
            >
                <h2 style={styles.planTitle}>{plans[activePlan].title}</h2>
                <p style={styles.price}>{plans[activePlan].price}</p>
                <ul style={styles.featuresList}>
                    {plans[activePlan].features.map((feature, index) => (
                        <li key={index} style={styles.feature}>
                            {feature}
                        </li>
                    ))}
                </ul>
                <button style={styles.button} onClick={handleStartFreeTrial}>
                    Start Free Trial
                </button>
            </div>
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: '#f9f9f9',
        color: '#1e293b',
        minHeight: '100vh',
        padding: '40px 20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#1e293b',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#475569',
        marginBottom: '40px',
    },
    tabContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
    },
    tab: {
        padding: '10px 20px',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#475569',
        backgroundColor: '#e2e8f0',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    activeTab: {
        backgroundColor: '#10b981',
        color: '#ffffff',
    },
    card: {
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '300px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    planTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#1e293b',
    },
    price: {
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
    button: {
        backgroundColor: '#10b981',
        color: '#ffffff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
}

export default Pricing