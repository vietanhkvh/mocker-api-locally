import React, { useState, useEffect } from 'react';
import { endPointPost } from './constants';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);


  const fetchPosts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/${endPointPost}`)
      .then(response => response.json())
      .then(data => setPosts(data));
  };

  useEffect(() => {
    fetchPosts()
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const post = { title, content };

    if (editId) {
      fetch(`http://localhost:5000/posts/${editId}`, {
        method: 'PUT', // or 'PATCH'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })
        .then(response => response.json())
        .then(data => {
          setPosts(posts.map(p => (p.id === editId ? data : p)));
          setTitle('');
          setContent('');
          setEditId(null);
        });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/${endPointPost}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })
        .then(response => response.json())
        .then(data => {
          setPosts([...posts, data]);
          setTitle('');
          setContent('');
        });
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditId(post.id);
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/${endPointPost}/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      });
  };
  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">{editId ? 'Update Post' : 'Add Post'}</button>
      </form>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
