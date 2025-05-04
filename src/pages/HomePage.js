import { useState, useEffect } from 'react';
import { fetchChannelIdByName, fetchChannelVideos, fetchYouTuberSuggestions } from '../services/youtubeAPI';
import { generateVideoIdeas } from '../services/openaiAPI';
import { auth } from '../services/Firebase';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [channelNames, setChannelNames] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [generatedThumbnail, setGeneratedThumbnail] = useState(null);
    const [excludeShorts, setExcludeShorts] = useState(false);
    const [videoIdeas, setVideoIdeas] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [activeInputIndex, setActiveInputIndex] = useState(null);
    const [loadingIdeaIndex, setLoadingIdeaIndex] = useState(null);
    const [user, setUser] = useState(null)
    const [userPlan, setUserPlan] = useState('none');
    const navigate = useNavigate(); // For programmatic navigation

    // Debounce function to delay API calls
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    useEffect(() => {
        const fetchUserPlan = async () => {
            try {
                const response = await fetch('http://localhost:5002/check-customer-plan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: auth.currentUser.email }),
                });

                const data = await response.json();
                if (data.plan) {
                    console.log('User plan:', data.plan);
                    setUserPlan(data.plan);
                    setChannelNames(Array(data.plan === 'basic' ? 3 : 5).fill(''));
                } else {
                    setUserPlan('none'); // Default to 'none' if no plan is found
                }
            } catch (error) {
                console.error('Error fetching user plan:', error);
                setUserPlan('none'); // Default to 'none' on error
            }
        };

        if (auth.currentUser) {
            fetchUserPlan();
        } else {
            navigate('/signin'); // Redirect to sign-in if the user is not authenticated
        }
    }, [navigate]);

    // Fetch suggestions when the user types
    const fetchSuggestions = debounce(async (query, index) => {
        if (query.length >= 3) {
            const results = await fetchYouTuberSuggestions(query);
            setSuggestions(results);
            setActiveInputIndex(index);
        } else {
            setSuggestions([]);
        }
    }, 300);

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleGenerateThumbnail = async (idea, index) => {
      // Prevent multiple clicks
      if (loadingIdeaIndex !== null) return;
  
      setLoadingIdeaIndex(index); // Show loading indicator for the specific idea
      setGeneratedThumbnail(null); // Clear any previous thumbnail
  
      try {
          // Call the backend to generate the thumbnail
          const response = await fetch('http://localhost:5002/generate-thumbnail', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ idea }),
          });
  
          if (!response.ok) {
              throw new Error('Failed to generate thumbnail');
          }
  
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
        //   const { imageUrl } = await response.json();
          console.log('Generated thumbnail URL:', imageUrl);
  
          if (imageUrl) {
              setGeneratedThumbnail(imageUrl); // Display the generated thumbnail
          } else {
              console.error('Thumbnail generation failed');
          }
      } catch (error) {
          console.error('Error generating thumbnail:', error);
      } finally {
          setLoadingIdeaIndex(null); // Reset loading state
      }
    };

    const handleInputChange = (index, value) => {
        const updatedChannelNames = [...channelNames];
        updatedChannelNames[index] = value;
        setChannelNames(updatedChannelNames);
    };

    const handleKeyPress = (event, index) => {
        if (event.key === 'Enter') {
            const query = channelNames[index];
            if (query.length >= 3) {
                fetchSuggestions(query, index);
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (activeInputIndex !== null) {
            const updatedChannelNames = [...channelNames];
            updatedChannelNames[activeInputIndex] = suggestion;
            setChannelNames(updatedChannelNames);
            setSuggestions([]);
        }
    };

    const handleFetchVideos = async () => {
        setLoading(true);
        const allVideos = [];

        for (const channelName of channelNames) {
            if (channelName.trim()) {
                const channelId = await fetchChannelIdByName(channelName);
                if (channelId) {
                    let channelVideos = await fetchChannelVideos(channelId);

                    // Filter out Shorts if the checkbox is checked
                    if (excludeShorts) {
                        channelVideos = channelVideos.filter(
                            (video) => !video.title.toLowerCase().includes('shorts')
                        );
                    }

                    // Take the last 10 videos
                    const last10Videos = channelVideos.slice(0, 10);

                    // Calculate the score for each video
                    const scoredVideos = last10Videos.map((video) => {
                        const commentsPerView = video.comments / video.views || 0;
                        const likesPerView = video.likes / video.views || 0;

                        // Weighted scoring: 50% views, 25% comments per view, 25% likes per view
                        const averageScore =
                            video.views * 0.5 + commentsPerView * 100 * 0.25 + likesPerView * 100 * 0.25;

                        return {
                            ...video,
                            averageScore,
                            commentsPerView,
                            likesPerView,
                        };
                    });

                    // Sort videos by average score and take the top 3
                    const top3Videos = scoredVideos
                        .sort((a, b) => b.averageScore - a.averageScore)
                        .slice(0, 3);

                    allVideos.push(...top3Videos);
                } else {
                    console.error(`Channel not found for name: ${channelName}`);
                }
            }
        }

        setVideos(allVideos);
        setLoading(false);
    };

    const handleGenerateIdeas = async () => {
        if (videos.length === 0) {
            console.error('No videos available to generate ideas.');
            return;
        }

        const popularTitles = videos.map((video) => video.title);

        if (popularTitles.length === 0) {
            console.error('No valid video titles found.');
            return;
        }

        const ideas = await generateVideoIdeas(popularTitles);
        setVideoIdeas(ideas);
    };

  return (
    <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Creator Inspiration Engine</h1>
                <p style={styles.subtitle}>
                    {userPlan === 'basic'
                        ? 'Enter up to 3 YouTuber names to fetch their latest videos:'
                        : 'Enter up to 5 YouTuber names to fetch their latest videos:'}
                </p>
                <div style={styles.inputContainer}>
                    {channelNames.slice(0, userPlan === 'sigma' ? 5 : 6).map((channelName, index) => (
                        <div key={index} style={styles.inputWrapper}>
                            <input
                                type='text'
                                placeholder={`YouTuber Name ${index + 1}`}
                                value={channelName}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                style={styles.input}
                            />
                            {/* Suggestions Dropdown */}
                            {activeInputIndex === index && suggestions.length > 0 && (
                                <ul style={styles.suggestionsList}>
                                    {suggestions.map((suggestion, i) => (
                                        <li
                                            key={i}
                                            style={styles.suggestionItem}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
                <div style={styles.checkboxContainer}>
                    <label style={styles.checkboxLabel}>
                        <input
                            type='checkbox'
                            checked={excludeShorts}
                            onChange={(e) => setExcludeShorts(e.target.checked)}
                            style={styles.checkbox}
                        />
                        Exclude Shorts (videos under 60 seconds)
                    </label>
                </div>
                <div style={styles.buttonContainer}>
                    {user ? (
                        <button onClick={handleFetchVideos} disabled={loading} style={styles.button}>
                            {loading ? 'Fetching...' : 'Fetch Videos'}
                        </button>
                    ) : (
                        <button onClick={() => navigate('/signin')} style={styles.button}>
                            Sign In to Fetch Videos
                        </button>
                    )}
                </div>
                {videos.length > 0 && (
                    <div style={styles.buttonContainer}>
                        <button onClick={handleGenerateIdeas} style={styles.button}>
                            Generate Video Ideas
                        </button>
                    </div>
                )}
                {videoIdeas.length > 0 && (
            <div style={styles.ideasContainer}>
                <h2 style={styles.sectionTitle}>Generated Video Ideas:</h2>
                <ul style={styles.ideasList}>
                    {videoIdeas.map((idea, index) => (
                        <li key={index} style={styles.ideaItem}>
                            <div style={styles.ideaRow}>
                                <p style={styles.ideaText}>Title: </p>
                                <p style={styles.ideaText}>{idea}</p>
                                <span
                                    style={{
                                        ...styles.thumbnailIcon,
                                        cursor: loadingIdeaIndex === index ? 'not-allowed' : 'pointer',
                                        opacity: loadingIdeaIndex === index ? 0.5 : 1,
                                    }}
                                    onClick={() => handleGenerateThumbnail(idea, index)}
                                >
                                    {loadingIdeaIndex === index ? '⏳' : '🖼️'}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
                {/* Reserved space for the thumbnail or placeholder */}
                <div style={styles.thumbnailContainer}>
                    {loadingIdeaIndex !== null && (
                        <div style={styles.thumbnailPlaceholder}>
                            <p style={styles.loadingText}>Generating thumbnail, please wait...</p>
                        </div>
                    )}
                    {generatedThumbnail && (
                        <img
                            src={generatedThumbnail}
                            alt='Generated Thumbnail'
                            style={styles.thumbnailImage}
                        />
                    )}
                </div>
            </div>
        )}
        <div style={styles.videoListContainer}>
          {videos.length > 0 && <h2 style={styles.sectionTitle}>Top Videos:</h2>}
          <div style={styles.videoGrid}>
              {videos.map((video, index) => (
                  <div key={index} style={styles.videoCard}>
                      <img src={video.thumbnail} alt={video.title} style={styles.thumbnail} />
                      <div>
                          <p style={styles.videoTitle}>{video.title}</p>
                          <div style={styles.videoStats}>
                              <span style={styles.statItem}>
                                  <span style={styles.icon}>👁️</span> {video.views}
                              </span>
                              <span style={styles.statItem}>
                                  <span style={styles.icon}>👍</span> {video.likes}
                              </span>
                              <span style={styles.statItem}>
                                  <span style={styles.icon}>💬</span> {video.comments}
                              </span>
                          </div>
                          <a
                              href={`https://www.youtube.com/watch?v=${video.videoId}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              style={styles.link}
                          >
                              Watch Video
                          </a>
                      </div>
                  </div>
              ))}
          </div>
      </div>
      </header>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0f172a',
    color: '#f5f5f5',
    minHeight: '100vh',
    padding: '20px',
    paddingBottom: '10%',
  },
  header: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    color: '#FFD60A',
    fontSize: '2.5rem',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Added shadow for better readability
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Added shadow for better readability
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '5%',
    marginBottom: '20px',
  },
  checkboxContainer: {
    marginBottom: '20px',
  },
  checkboxLabel: {
    fontSize: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Added shadow for better readability
  },
  checkbox: {
    marginRight: '10px',
  },
  buttonContainer: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFD60A',
    color: '#1c1c1c',
    border: 'none',
    padding: '15px 30px', // Increased padding for a larger button
    fontSize: '1.2rem', // Increased font size for better readability
    borderRadius: '8px', // Slightly more rounded corners
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease', // Smooth hover effect
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  },
  videoListContainer: {
    marginTop: '30px',
  },
  sectionTitle: {
    color: '#FFD60A',
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  videoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  videoCard: {
    backgroundColor: '#1e252b',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    opacity: 0.9,
  },
    thumbnail: {
        width: '100%',
        aspectRatio: '16 / 9',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '10px',
    },
  videoTitle: {
    fontSize: '1.2rem',
    marginBottom: '5px',
  },
  videoDetails: {
    fontSize: '0.9rem',
    marginBottom: '5px',
  },
  link: {
    color: '#FFD60A',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  ideasContainer: {
    marginTop: '30px',
  },
  ideasList: {
    listStyleType: 'none',
    padding: '0',
  },
  ideaItem: {
    backgroundColor: '#2c2c2c',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  inputWrapper: {
        position: 'relative',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
    },
    suggestionsList: {
        position: 'absolute',
        top: '100%',
        left: '0',
        right: '0',
        backgroundColor: '#fff',
        color: '#000',
        listStyle: 'none',
        padding: '5px',
        margin: '0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        zIndex: 10,
    },
    suggestionItem: {
        padding: '5px',
        cursor: 'pointer',
    },
    generateThumbnailButton: {
        backgroundColor: '#FFD60A',
        color: '#1c1c1c',
        border: 'none',
        padding: '10px 15px',
        fontSize: '0.9rem',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
    },
    thumbnailContainer: {
      marginTop: '20px',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    thumbnailImage: {
      width: '640px', // Scaled down width
      height: '360px', // Scaled down height (16:9 aspect ratio)
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
      objectFit: 'cover',
  },
    ideaRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Space between the title and the icon
    },
    ideaText: {
        margin: 0, // Remove default margin for better alignment
        fontSize: '1rem',
        color: '#f5f5f5',
    },
    thumbnailIcon: {
        cursor: 'pointer',
        fontSize: '1.5rem',
        marginLeft: '10px', // Add spacing between the title and the icon
        transition: 'transform 0.3s ease',
    },
    thumbnailIconHover: {
        transform: 'scale(1.2)', // Slight zoom effect on hover
    },
    thumbnailPlaceholder: {
        width: '640px', // Scaled down width
        height: '360px', // Scaled down height (16:9 aspect ratio)
        backgroundColor: '#2c2c2c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        marginTop: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
    loadingText: {
        color: '#FFD60A',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    videoStats: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      alignItems: 'center',
      marginTop: '10px',
      fontSize: '0.9rem',
      color: '#f5f5f5',
    },
    statItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px', // Space between the icon and the number
    },
    icon: {
        fontSize: '1rem',
    },
};

export default HomePage;