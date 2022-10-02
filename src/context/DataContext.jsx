import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLocaleLowerCase()) || ((post.title).toLowerCase()).includes(search.toLocaleLowerCase()))

      setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  /* useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.get('/posts');
        setPosts(response.data)
      } catch (error) {
        if(error.response) {
          // NOT IN THE 200 RESPONSE RANGE…
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.error(`Error: ${error.message}`);
        }
      }
    }

    fetchPosts()
  }, []) */

  return (
    <DataContext.Provider value={{
      search, setSearch,
      searchResults, fetchError, isLoading,
      posts, setPosts
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext;
