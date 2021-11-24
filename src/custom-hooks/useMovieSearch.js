import { useEffect, useState } from "react";
import axios from "axios";

const useMovieSearch = (query, page) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://www.omdbapi.com/?apikey=faf7e5bb",
      params: {
        s: query,
        page: page,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setMovies((prevMovies) => {
          if (res.data.Search === undefined) {
            return [...prevMovies];
          } else {
            return [...prevMovies, res.data.Search.map((data) => data)];
          }
        });
        setHasMore(res.data.Search.length > 0);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, page]);

  return { loading, error, movies, hasMore };
};

export default useMovieSearch;
