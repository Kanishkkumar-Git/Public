import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    axios.get('http://127.0.0.1:8000/api/my-videos/', {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
    .then(res => setVideos(res.data))
    .catch(err => {
      console.error(err);
      setError('Could not load your videos.');
    });
  }, []);

  return (
    <div style={{ padding: '20px', marginLeft: '200px' }}>
      <h2>Your Uploaded Videos</h2>
      {error && <p>{error}</p>}
      {videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        videos.map(video => (
          <div key={video.id} style={{ marginBottom: '20px' }}>
            <h4>{video.title}</h4>
            <video width="320" height="180" controls>
              <source src={`http://127.0.0.1:8000${video.video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>{video.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;





