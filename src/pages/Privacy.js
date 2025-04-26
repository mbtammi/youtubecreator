import React from 'react'

const Privacy = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Privacy & Security</h1>
            <p style={styles.description}>
                Your privacy and security are our top priorities. We are committed to protecting your personal data and ensuring that your information is handled responsibly.
            </p>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>What We Collect</h2>
                <p style={styles.text}>
                    When you use our platform, we collect only the necessary information to provide you with the best experience. This includes:
                </p>
                <ul style={styles.list}>
                    <li>Your email address for authentication and communication.</li>
                    <li>Basic profile information, such as your name (if provided).</li>
                    <li>Subscription details to manage your account and services.</li>
                </ul>
            </div>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>How We Protect Your Data</h2>
                <p style={styles.text}>
                    We use industry-standard security measures to protect your data, including:
                </p>
                <ul style={styles.list}>
                    <li>Secure authentication methods to prevent unauthorized access.</li>
                    <li>Encryption of sensitive data during transmission and storage.</li>
                    <li>Regular security audits and updates to ensure compliance with best practices.</li>
                </ul>
            </div>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Your Control</h2>
                <p style={styles.text}>
                    You have full control over your data. You can update or delete your account at any time. If you have any concerns about your privacy, feel free to contact us.
                </p>
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
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#10b981',
    },
    description: {
        fontSize: '1.2rem',
        color: '#475569',
        marginBottom: '40px',
    },
    section: {
        marginBottom: '30px',
        textAlign: 'left',
        maxWidth: '800px',
        margin: '0 auto',
    },
    sectionTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#1e293b',
    },
    text: {
        fontSize: '1rem',
        color: '#475569',
        marginBottom: '20px',
    },
    list: {
        listStyleType: 'disc',
        paddingLeft: '20px',
        color: '#475569',
    },
}

export default Privacy