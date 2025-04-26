import React from 'react'

const Terms = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Terms & Conditions</h1>
            <p style={styles.description}>
                By using our platform, you agree to the following terms and conditions. Please read them carefully to understand your rights and responsibilities.
            </p>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Use of the Platform</h2>
                <p style={styles.text}>
                    Our platform is designed to provide you with the best experience. By using it, you agree to:
                </p>
                <ul style={styles.list}>
                    <li>Use the platform only for lawful purposes.</li>
                    <li>Not engage in any activity that could harm the platform or its users.</li>
                    <li>Provide accurate and up-to-date information when creating an account.</li>
                </ul>
            </div>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Account Responsibilities</h2>
                <p style={styles.text}>
                    As a user, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                <ul style={styles.list}>
                    <li>Do not share your password with others.</li>
                    <li>Notify us immediately if you suspect unauthorized access to your account.</li>
                </ul>
            </div>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Limitation of Liability</h2>
                <p style={styles.text}>
                    We are not liable for any damages resulting from your use of the platform, including but not limited to:
                </p>
                <ul style={styles.list}>
                    <li>Loss of data or unauthorized access to your account.</li>
                    <li>Service interruptions or technical issues.</li>
                </ul>
            </div>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Changes to Terms</h2>
                <p style={styles.text}>
                    We reserve the right to update these terms at any time. Continued use of the platform after changes are made constitutes your acceptance of the new terms.
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

export default Terms