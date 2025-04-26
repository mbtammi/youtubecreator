const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.branding}>
                <h2 style={styles.brandName}>Creator Engine</h2>
                <p style={styles.tagline}>Empowering creators with data-driven insights.</p>
            </div>
            <div style={styles.links}>
                <h3 style={styles.sectionTitle}>Links</h3>
                <ul style={styles.linkList}>
                    <li>
                        <a href='mailto:mirotammi44@gmail.com' style={styles.link}>
                            Support
                        </a>
                    </li>
                    <li>
                        <a href='/pricing' style={styles.link}>
                            Pricing
                        </a>
                    </li>
                    <li>
                        <a href='/home' style={styles.link}>
                            Homepage
                        </a>
                    </li>
                </ul>
            </div>
            <div style={styles.about}>
                <h3 style={styles.sectionTitle}>About Me</h3>
                <p style={styles.aboutText}>
                    Made with <span style={styles.emoji}>☕️</span> and <span style={styles.emoji}>🥐</span> by Miro.
                </p>
                <a href='https://www.mteif.com' target='_blank' rel='noopener noreferrer' style={styles.link}>
                    My portfolio
                </a>
            </div>
            <div style={styles.legal}>
                <h3 style={styles.sectionTitle}>Legal</h3>
                <ul style={styles.linkList}>
                    <li>
                        <a href='/terms' style={styles.link}>
                            Terms of Service
                        </a>
                    </li>
                    <li>
                        <a href='/privacy' style={styles.link}>
                            Privacy Policy
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

const styles = {
    footer: {
        backgroundColor: '#f9f9f9',
        color: '#1e293b',
        padding: '40px 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
    },
    branding: {
        gridColumn: 'span 2',
    },
    brandName: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#1e293b',
    },
    tagline: {
        fontSize: '1rem',
        color: '#475569',
    },
    links: {
        textAlign: 'left',
    },
    about: {
        textAlign: 'left',
    },
    legal: {
        textAlign: 'left',
    },
    sectionTitle: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#1e293b',
    },
    linkList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    link: {
        color: '#475569',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'color 0.3s ease',
    },
    linkHover: {
        color: '#1e293b',
    },
    aboutText: {
        fontSize: '0.9rem',
        color: '#475569',
        lineHeight: '1.6',
    },
    emoji: {
        fontSize: '1rem',
    },
}

export default Footer