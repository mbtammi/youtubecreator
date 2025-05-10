import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../services/Firebase'
import { FaUserCircle } from 'react-icons/fa'
import { HiMenu, HiX } from 'react-icons/hi'

const Header = () => {
    const [user, setUser] = useState(null)
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [])

    const handleSignOut = async () => {
        try {
            await auth.signOut()
            setUser(null)
            setDropdownVisible(false)
            setMenuOpen(false)
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev)
    }

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev)
    }

    const handleAccountNavigation = () => {
        setDropdownVisible(false)
        setMenuOpen(false)
        navigate('/account')
    }

    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <h1 style={styles.logo}>
                    <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                        Trying to Create
                    </Link>
                </h1>
                <button style={styles.menuButton} onClick={toggleMenu}>
                    {menuOpen ? <HiX style={styles.menuIcon} /> : <HiMenu style={styles.menuIcon} />}
                </button>
            </div>
            <nav style={{ ...styles.nav, ...(menuOpen ? styles.navOpen : {}) }}>
                <Link to='/home' style={styles.navLink} onClick={() => setMenuOpen(false)}>
                    Home
                </Link>
                {user ? (
                    <div style={styles.userContainer}>
                        <FaUserCircle style={styles.userIcon} />
                        <div style={styles.userDropdown}>
                            <span style={styles.userName} onClick={toggleDropdown}>
                                {user.displayName || user.email.split('@')[0] || 'User'}
                            </span>
                            {dropdownVisible && (
                                <div style={styles.dropdownMenu}>
                                    <button style={styles.dropdownItem} onClick={handleAccountNavigation}>
                                        Account
                                    </button>
                                    <button style={styles.dropdownItem} onClick={handleSignOut}>
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <Link to='/signin' style={styles.navLink} onClick={() => setMenuOpen(false)}>
                        Sign In
                    </Link>
                )}
            </nav>
        </header>
    )
}

const styles = {
    header: {
        backgroundColor: '#0f172a',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 3px #FFD60A',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#FFD60A',
        textDecoration: 'none',
    },
    menuButton: {
        display: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#FFD60A',
        fontSize: '1.8rem',
    },
    menuIcon: {
        fontSize: '1.8rem',
    },
    nav: {
        display: 'flex',
        gap: '20px',
    },
    navOpen: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        backgroundColor: '#0f172a',
        padding: '10px 0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    navLink: {
        color: '#FFD60A',
        textDecoration: 'none',
        fontSize: '1.4rem',
        transition: 'color 0.3s ease',
        whiteSpace: 'nowrap',
    },
    userContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        position: 'relative',
    },
    userIcon: {
        fontSize: '1.5rem',
        color: '#FFD60A',
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
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    dropdownItemHover: {
        backgroundColor: '#FFD60A',
        color: '#1c1c1c',
    },
    // Media query for mobile view
    '@media (max-width: 768px)': {
        menuButton: {
            display: 'block',
        },
        nav: {
            display: 'none',
            width: '50%',
        },
    },
}

export default Header