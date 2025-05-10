import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/Firebase';
import { FaUserCircle } from 'react-icons/fa';
import { MdOpacity } from 'react-icons/md';

const Header = () => {
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
    const navigate = useNavigate(); // For programmatic navigation

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            setUser(null); // Clear user state after signing out
            setDropdownVisible(false); // Close dropdown
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
    };

    const handleAccountNavigation = () => {
        setDropdownVisible(false); // Close dropdown
        navigate('/account'); // Navigate to the account page
    };

    return (
        <header style={styles.header}>
            <h1 style={styles.logo}>
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                    Trying to Create
                </Link>
            </h1>
            <nav style={styles.nav}>
                <Link to='/home' style={styles.navLink}>
                    Home
                </Link>
                {user ? (
                    <div style={styles.userContainer}>
                        <FaUserCircle style={styles.userIcon} />
                        <div style={styles.userDropdown}>
                            <span
                                style={styles.userName}
                                onClick={toggleDropdown} // Toggle dropdown on click
                            >
                                {user.displayName || user.email.split('@')[0] || 'User'}
                            </span>
                            {dropdownVisible && (
                                <div style={styles.dropdownMenu}>
                                    <button
                                        style={styles.dropdownItem}
                                        onClick={handleAccountNavigation}
                                    >
                                        Account
                                    </button>
                                    <button
                                        style={styles.dropdownItem}
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <Link to='/signin' style={styles.navLink}>
                        Sign In
                    </Link>
                )}
            </nav>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#0f172a',
        padding: '10px 80px', // Added padding to the left and right
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky', // Makes the header sticky
        top: 0, // Sticks the header to the top of the viewport
        zIndex: 1000, // Ensures the header stays above other elements
        boxShadow: '0 1px 3px #FFD60A', // Subtle shadow for depth
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#FFD60A', // Ensures the logo text is still visible
        textDecoration: 'none',
    },
    nav: {
        display: 'flex',
        gap: '20px', // Increased gap for better spacing
    },
    navLink: {
        color: '#FFD60A',
        textDecoration: 'none',
        fontSize: '1.4rem',
        transition: 'color 0.3s ease', // Smooth hover effect
    },
    userContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        position: 'relative', // Needed for dropdown positioning
    },
    userIcon: {
        fontSize: '1.5rem',
        color: '#FFD60A', // Matches the theme
    },
    userDropdown: {
        position: 'relative',
    },
    userName: {
        fontSize: '1.4rem',
        color: '#f5f5f5',
        cursor: 'pointer',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        right: '0',
        backgroundColor: '#1c1c1c',
        border: '1px solid #FFD60A',
        borderRadius: '5px',
        padding: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
        width: '200px',
    },
    dropdownItem: {
        backgroundColor: '#0f172a',
        color: '#FFD60A',
        border: 'none',
        padding: '7px 15px',
        cursor: 'pointer',
        fontSize: '1rem',
        textAlign: 'left',
        width: '100%',
        transition: 'background-color 0.3s ease, color 0.3s ease', // Smooth hover effect
    },
    dropdownItemHover: {
        backgroundColor: '#FFD60A',
        color: '#1c1c1c',
    },
}

export default Header;