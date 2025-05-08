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
        background: ' #0f172a',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'fadeIn 1.5s ease-in-out', // Fade-in animation for the entire page
    },
    header: {
        textAlign: 'center',
        marginBottom: '60px',
    },
    graphSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
        marginBottom: '8%',
    },
    screenshots: {
        position: 'relative',
        width: '18em', // Set the width to 18em
        aspectRatio: '16 / 9',
    },
    screenshot: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        // animation: 'scaleUpDown 3s infinite ease-in-out',
    },
    leftTilt: {
        transform: 'rotate(-15deg)',
        top: '15%',
        left: '0',
        zIndex: 1,
        opacity: 0.8,
    },
    centerScreenshot: {
        transform: 'rotate(0deg)',
        bottom: '20%',
        left: '20%',
        zIndex: 2,
        opacity: 0.8,
    },
    rightTilt: {
        transform: 'rotate(5deg)',
        top: '40%',
        left: '50%',
        zIndex: 0,
        opacity: 0.8,
    },
    arrowContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20%',
        gap: '5%',
    },
    arrow: {
        width: '150px',
        height: 'auto',
        transform: 'rotate(30deg)',
    },
    arrowText: {
        fontSize: '2.4rem',
        color: '#FFD60A',
        // fontWeight: 'bold',
        fontStyle: 'italic',
        padding: '10px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Added shadow for better readability
        animation: 'fadeIn 2s ease-in-out', // Fade-in animation for the text
    },
    heroSection: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    bigTitle: {
        fontSize: '3.5rem',
        color: '#FFD60A',
        marginBottom: '30px',
        fontWeight: 'bold',
        textShadow: '3px 3px 6px rgba(0, 0, 0, 0.6)', // Added shadow for the title
        animation: 'zoomIn 1s ease-in-out', // Zoom-in animation for the title
    },
    provenHighlight: {
        position: 'relative', // Required for the pseudo-element
        display: 'inline-block', // Ensures the pseudo-element wraps the text
        fontWeight: 'bold',
        color: '#FFFFFF', // White text for better contrast
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Subtle shadow for emphasis
    },
    provenHighlightBefore: {
        content: "''", // Empty content for the pseudo-element
        position: 'absolute',
        bottom: '-5px', // Position the underline slightly below the text
        left: 0,
        right: 0,
        height: '10px', // Height of the underline
        background: 'linear-gradient(to right, #0f172a, rgba(0, 191, 255, 0.5))', // Gradient underline
        borderRadius: '4px', // Optional: Adds rounded corners to the underline
    },
    subtitle: {
        fontSize: '1.3rem',
        color: '#fff',
        marginBottom: '40px',
        lineHeight: '1.8',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)', // Subtle shadow for the subtitle
    },
    ctaContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    ctaButton: {
        backgroundColor: '#FFD60A',
        color: '#1c1c1c',
        textDecoration: 'none',
        minWidth: '20%',
        padding: '20px 50px',
        borderRadius: '50px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        animation: 'bounce 2s infinite', // Bounce animation for the button
    },
    ctaButtonHover: {
        backgroundColor: '#FFC107', // Change color on hover
    },
    featuresSection: {
        textAlign: 'center',
        padding: '40px 20px', // Add padding for breathing room
        backgroundColor: '#0f172a', // Retain the original background color for contrast
        borderRadius: '10px', // Rounded corners for a modern look
    },
    sectionTitle: {
        fontSize: '2.5rem',
        color: '#fff',
        marginBottom: '30px',
        fontWeight: 'bold',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
    },
    howItWorksTitle: {
        color: 'black',
        marginBottom: '30px',
        fontWeight: 'bold',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
        fontSize: '2.5rem',
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Responsive grid layout
        gap: '20px', // Space between feature cards
    },
    featureCard: {
        backgroundColor: '#0f172a', // Dark background for the cards
        padding: '20px',
        borderRadius: '10px', // Rounded corners for a modern look
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effect
    },
    featureCardHover: {
        transform: 'scale(1.05)', // Slightly enlarge on hover
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)', // More prominent shadow on hover
    },
    featureTitle: {
        fontSize: '1.5rem',
        color: '#FFFFFF', // White text for contrast
        marginBottom: '10px',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)', // Subtle shadow for feature titles
    },
    featureDescription: {
        fontSize: '1rem',
        color: '#cbd5e1', // Light gray text for readability
        lineHeight: '1.6',
    },
    featureIcon: {
        marginLeft: '8px', // Space between the title and the emoji
        fontSize: '1.2rem', // Slightly smaller than the title
    },
    howItWorksSection: {
    textAlign: 'center',
    padding: '40px 20px',
    background: 'linear-gradient(to bottom,rgb(220, 234, 255), #e5e5e5)', // Subtle gradient
    borderRadius: '10px',
    marginTop: '40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a soft shadow for depth
    position: 'relative', // Required for the optional pattern overlay
    overflow: 'hidden', // Ensures the pattern doesn't overflow the section
    },
    howItWorksText: {
        fontSize: '1.2rem',
        color: 'black',
        lineHeight: '1.8',
        marginBottom: '20px',
    },
    howItWorksList: {
        listStyleType: 'decimal',
        paddingLeft: '20px',
        textAlign: 'left',
        color: 'black',
    },
    howItWorksItem: {
        fontSize: '1.1rem',
        marginBottom: '15px',
        lineHeight: '1.6',
    },
    joinText: {
        marginTop: '20px',
        fontSize: '1.2rem',
        color: '#cbd5e1', // Light gray for readability
        textAlign: 'center',
        lineHeight: '1.6',
    },
    videoLink: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20px', // Space between the button and the link
        color: '#FFD60A', // Match the button color
        textDecoration: 'none',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
        cursor: 'pointer',
    },
    videoIcon: {
        marginRight: '8px', // Space between the icon and the text
        fontSize: '1.5rem',
    },
    videoLinkHover: {
        color: '#FFC107', // Slightly lighter color on hover
    },
    videoFrame: {
        marginLeft: '2em',
        width: '19em', // Match the width of the screenshots
        aspectRatio: '16 / 9',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensure content stays within the frame
        position: 'relative',
        border: '1px solid #FFD60A', 
    },
};


export default LandingPage;