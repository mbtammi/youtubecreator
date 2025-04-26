const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function fetchChannelIdByName(channelName) {
    try {
      const response = await fetch(
        `${BASE_URL}/search?key=${API_KEY}&q=${encodeURIComponent(
          channelName
        )}&type=channel&part=snippet&maxResults=1`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        return data.items[0].id.channelId; // Return the channel ID
      }
      return null; // No channel found
    } catch (error) {
      console.error('Error fetching channel ID:', error);
      return null;
    }
  }
  
  export async function fetchChannelVideos(channelId, excludeShorts = false) {
    try {
      const response = await fetch(
        `${BASE_URL}/search?key=${API_KEY}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=10`
      );
      const data = await response.json();
  
      const videoIds = data.items.map((item) => item.id.videoId).join(',');
      const videoDetailsResponse = await fetch(
        `${BASE_URL}/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails,snippet,statistics`
      );
      const videoDetailsData = await videoDetailsResponse.json();
  
      return videoDetailsData.items
        .filter((video) => {
          if (excludeShorts) {
            const duration = video.contentDetails.duration;
            const match = duration.match(/PT(\d+)M(\d+)?S?/); // Parse ISO 8601 duration
            const minutes = match ? parseInt(match[1] || 0, 10) : 0;
            const seconds = match ? parseInt(match[2] || 0, 10) : 0;
            return minutes > 0 || seconds >= 60; // Exclude videos under 60 seconds
          }
          return true;
        })
        .map((video) => ({
          title: video.snippet.title,
          videoId: video.id,
          thumbnail: video.snippet.thumbnails.default.url,
          views: video.statistics.viewCount,
          likes: video.statistics.likeCount,
          comments: video.statistics.commentCount,
        }));
    } catch (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
  }

  export async function fetchYouTuberSuggestions(query) {
    try {
        const response = await fetch(
            `${BASE_URL}/search?key=${API_KEY}&q=${encodeURIComponent(
                query
            )}&type=channel&part=snippet&maxResults=5`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            // Return an array of channel titles as suggestions
            return data.items.map((item) => item.snippet.title);
        }
        return []; // No suggestions found
    } catch (error) {
        console.error('Error fetching YouTuber suggestions:', error);
        return [];
    }
}