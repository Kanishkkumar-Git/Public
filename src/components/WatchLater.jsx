import  { useEffect, useState } from 'react';
import axios from 'axios';

const WatchLater = () => {
  const [ setVideos] = useState([]);


  useEffect(() => {
    fetchWatchLater();
  }, []);

  const fetchWatchLater = async () => {
    try {
      const response = await axios.get('/api/watchlater/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching watch later videos:", error);
    }
  }
}
export default WatchLater;
