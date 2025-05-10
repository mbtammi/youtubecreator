import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { FaYoutube } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.graphSection}>
                    <div style={styles.screenshots}>
                        <img
                            src={require('../images/video1.webp')}
                            alt='Video Screenshot 1'
                            style={{ ...styles.screenshot, ...styles.leftTilt }}
                        />
                        <img
                            src={require('../images/video2.webp')}
                            alt='Video Screenshot 2'
                            style={{ ...styles.screenshot, ...styles.centerScreenshot }}
                        />
                        <img
                            src={require('../images/video3.webp')}
                            alt='Video Screenshot 3'
                            style={{ ...styles.screenshot, ...styles.rightTilt }}
                        />
                    </div>
                    <div style={styles.arrowContainer}>
                        <img
                            src={require('../images/arrow1nobg.png')}
                            alt='Arrow'
                            style={styles.arrow}
                        />
                        <div style={styles.videoFrame}>
                            <p style={styles.arrowText}>Perfect Video</p>
                        </div>
                    </div>
                </div>
                <div style={styles.heroSection}>
                <h1 style={styles.bigTitle}>
                    Transform{' '}
                    <span style={styles.provenHighlight}>
                        <span style={styles.provenHighlightBefore}></span>
                        Proven Success
                    </span>{' '}
                    Into Your Next Viral Video
                </h1>
                    <p style={styles.subtitle}>
                        Leverage the power of <span style={styles.highlight}>AI</span> to analyze what works. Use real data from top-performing videos to craft content that captivates, engages, and drives results.
                    </p>
                    <div style={styles.ctaContainer}>
                        <Link to='/account' style={styles.ctaButton}>
                            Join Now
                        </Link>
                        <a href='#' style={styles.videoLink}>
                        <FaYoutube style={styles.videoIcon} /> See how it works
                        </a>
                    </div>
                    <p style={styles.joinText}>
                        Join other successful creators who are transforming their content with data-driven insights and AI-powered tools.
                    </p>
                </div>
            </header>
            <section style={styles.howItWorksSection}>
                <h2 style={styles.howItWorksTitle}>How This Works</h2>
                <p style={styles.howItWorksText}>
                    Our platform is designed to help you take your YouTube channel to the next level. Here's how it works:
                </p>
                <ol style={styles.howItWorksList}>
                    <li style={styles.howItWorksItem}>
                        <strong>Choose Relevant YouTubers:</strong> Enter the names of YouTubers whose content aligns with your niche. We'll fetch their latest 10 most popular videos so you know the ideas work!.
                    </li>
                    <li style={styles.howItWorksItem}>
                        <strong>Generate Video Ideas:</strong> With the help of AI, we analyze the fetched videos and generate unique, data-driven video ideas tailored to your channel.
                    </li>
                    <li style={styles.howItWorksItem}>
                        <strong>Create Stunning Thumbnails:</strong> Use our AI-powered thumbnail generator to create eye-catching mockups that make your videos stand out.
                    </li>
                </ol>
                <p style={styles.howItWorksText}>
                    Whether you're just starting out or looking to grow your channel, our tools are here to help you create content that captivates and engages your audience.
                </p>
            </section>
            <section style={styles.featuresSection}>
                <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
                <div style={styles.featuresGrid}>
                    <div style={styles.featureCard}>
                        <h3 style={styles.featureTitle}>
                            AI-Powered Insights <span style={styles.featureIcon}>🤖</span>
                        </h3>
                        <p style={styles.featureDescription}>
                            Leverage cutting-edge AI to analyze YouTube trends and generate unique ideas tailored to your niche.
                        </p>
                    </div>
                    <div style={styles.featureCard}>
                        <h3 style={styles.featureTitle}>
                            Creator Analysis <span style={styles.featureIcon}>📊</span>
                        </h3>
                        <p style={styles.featureDescription}>
                            Explore top-performing YouTube channels and videos to understand what works and why.
                        </p>
                    </div>
                    <div style={styles.featureCard}>
                        <h3 style={styles.featureTitle}>
                            Stay Ahead of Trends <span style={styles.featureIcon}>📈</span>
                        </h3>
                        <p style={styles.featureDescription}>
                            Keep up with the latest trends and insights to stay ahead in the competitive YouTube space.
                        </p>
                    </div>
                    <div style={styles.featureCard}>
                        <h3 style={styles.featureTitle}>
                            Generate Thumbnails <span style={styles.featureIcon}>🖼️</span>
                        </h3>
                        <p style={styles.featureDescription}>
                            Create eye-catching thumbnails for your video ideas with our AI-powered thumbnail generator.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

const styles = {
    container: {
        color: '#1e293b',
        background: '#0f172a',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        animation: 'fadeIn 1.5s ease-in-out',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    graphSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        marginBottom: '8%',
        flexWrap: 'wrap', // Ensures proper wrapping on smaller screens
        gap: '20px', // Adds spacing between elements
    },
    screenshots: {
        position: 'relative',
        right: '5%', 
        width: '16em', // Adjusted for better scaling on mobile
        aspectRatio: '16 / 9',
    },
    screenshot: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
    leftTilt: {
        transform: 'rotate(-10deg)',
        top: '10%',
        left: '0',
        zIndex: 1,
        opacity: 0.8,
    },
    centerScreenshot: {
        transform: 'rotate(0deg)',
        bottom: '10%',
        left: '15%',
        zIndex: 2,
        opacity: 0.9,
    },
    rightTilt: {
        transform: 'rotate(5deg)',
        top: '40%',
        left: '20%',
        zIndex: 0,
        opacity: 0.8,
    },
    arrowContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        paddingLeft: '3em',
    },
    arrow: {
        width: '100px',
        height: 'auto',
        transform: 'rotate(30deg)',
    },
    arrowText: {
        fontSize: '1.8rem',
        color: '#FFD60A',
        fontStyle: 'italic',
        padding: '10px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
    },
    heroSection: {
        textAlign: 'center',
        marginBottom: '40px',
        padding: '0 20px', // Adds padding for better spacing on mobile
    },
    bigTitle: {
        fontSize: '2.5rem',
        color: '#FFD60A',
        marginBottom: '20px',
        fontWeight: 'bold',
        textShadow: '3px 3px 6px rgba(0, 0, 0, 0.6)',
    },
    provenHighlight: {
        position: 'relative',
        display: 'inline-block',
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    provenHighlightBefore: {
        content: "''",
        position: 'absolute',
        bottom: '-5px',
        left: 0,
        right: 0,
        height: '10px',
        background: 'linear-gradient(to right, #0f172a, rgba(0, 191, 255, 0.5))',
        borderRadius: '4px',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#fff',
        marginBottom: '30px',
        lineHeight: '1.6',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
    },
    ctaContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap', // Ensures buttons stack on smaller screens
        gap: '15px',
        marginTop: '20px',
    },
    ctaButton: {
        backgroundColor: '#FFD60A',
        color: '#1c1c1c',
        textDecoration: 'none',
        padding: '15px 30px',
        borderRadius: '50px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
    },
    videoLink: {
        display: 'flex',
        alignItems: 'center',
        color: '#FFD60A',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
    },
    videoIcon: {
        marginRight: '8px',
        fontSize: '1.5rem',
    },
    featuresSection: {
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#0f172a',
        borderRadius: '10px',
    },
    sectionTitle: {
        fontSize: '2rem',
        color: '#fff',
        marginBottom: '20px',
        fontWeight: 'bold',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
    },
    featureCard: {
        backgroundColor: '#1e293b',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    featureTitle: {
        fontSize: '1.2rem',
        color: '#FFFFFF',
        marginBottom: '10px',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    },
    featureDescription: {
        fontSize: '0.9rem',
        color: '#cbd5e1',
        lineHeight: '1.6',
    },
    howItWorksSection: {
        textAlign: 'center',
        padding: '40px 20px',
        background: 'linear-gradient(to bottom, rgb(220, 234, 255), #e5e5e5)',
        borderRadius: '10px',
        marginTop: '40px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    howItWorksText: {
        fontSize: '1rem',
        color: 'black',
        lineHeight: '1.6',
        marginBottom: '20px',
    },
    howItWorksList: {
        listStyleType: 'decimal',
        paddingLeft: '20px',
        textAlign: 'left',
        color: 'black',
    },
    howItWorksItem: {
        fontSize: '1rem',
        marginBottom: '15px',
        lineHeight: '1.6',
    },
    joinText: {
        marginTop: '20px',
        fontSize: '1rem',
        color: '#cbd5e1',
        textAlign: 'center',
        lineHeight: '1.6',
    },
    // Media queries for mobile optimization
    '@media (max-width: 768px)': {
        graphSection: {
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '40px',
        },
        screenshots: {
            width: '14em',
        },
        arrowContainer: {
            flexDirection: 'column',
            gap: '10px',
            marginTop: '30px !important',
        },
        arrowText: {
            fontSize: '1.5rem',
        },
        arrow: {
            transform: 'rotate(-130deg)',
        },
        bigTitle: {
            fontSize: '2rem',
        },
        subtitle: {
            fontSize: '0.9rem',
        },
        ctaButton: {
            padding: '10px 20px',
            fontSize: '1rem',
        },
        featuresGrid: {
            gridTemplateColumns: '1fr',
        },
        howItWorksText: {
            fontSize: '0.9rem',
        },
        howItWorksItem: {
            fontSize: '0.9rem',
        },
        rightTilt: {
            transform: 'rotate(0deg)',
            position: 'sticky',
            top: '0%',
            left: '10%',
            zIndex: 0,
            opacity: 1,
        },
        screenshot: {
            position: 'sticky',
            left: '0',
        }
    },
}


export default LandingPage;