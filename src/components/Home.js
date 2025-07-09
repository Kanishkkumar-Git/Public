import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/videos/')
      .then(res => setVideos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px', marginLeft: '200px' }}>
      <h2>Welcome to Videos 📺</h2>
      <p>Explore the uploaded videos below:</p>
      
      {videos.length === 0 ? (
        <p>No videos found. </p>
      ) : (
        videos.map(video => (
          <div key={video.id} style={{ marginBottom: '20px' }}>
            <h4>{video.title}</h4>
            <video width="320" height="180" controls>
             <source src={`http://127.0.0.1:8000${video.video}`} type="video/mp4" />

              Your browser does not support the video tag.
            </video>
            <p>{video.description}</p>
           <Link to={`/videos/${video.id}`}>
  <button style={{ background: "blue", color: "white" }}>Watch</button>
</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;

