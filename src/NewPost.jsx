import {format} from 'date-fns';
import { useNavigate } from 'react-router-dom'
import API from './API/posts';
import { useState, useContext } from 'react';
import DataContext from './context/DataContext';

const NewPost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const {posts, setPosts } = useContext(DataContext);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody};
    try {
      const response = await API.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch(error) {
      console.log(`Error: ${error.message}`);
    }
  }
  
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input 
          id="postTitle"
          type="text" 
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />

        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          required
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost