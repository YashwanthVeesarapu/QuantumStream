import { useEffect, useState } from "react";
import Card from "../Card";
import { apiInstance } from "../../lib/config";

import "./styles.scss";
import { useAuth } from "../../AuthProvider";
import { Video } from "../../models/video.model";
import { SeriesModel } from "../../models/series.model";

type Auth = {
  user: string;
  logout: () => void;
};

const Home = () => {
  const [moviesData, setMoviesData] = useState<Video[]>([]);
  const [seriesData, setSeriesData] = useState<SeriesModel[]>([]);
  const [loading, setLoading] = useState(true);

  const auth = useAuth() as Auth;

  const [page] = useState(1);

  useEffect(() => {
    apiInstance
      .get(`/movies/${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("site")}`,
        },
      })
      .then((res) => {
        setMoviesData(res.data);
        setLoading(false);
        return;
      })
      .catch(() => {
        alert("Session Expired, Please login again.");
        auth.logout();
      });
    apiInstance
      .get(`/series/${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("site")}`,
        },
      })
      .then((res) => {
        setSeriesData(res.data);
        setLoading(false);
        return;
      })
      .catch(() => {
        alert("Session Expired, Please login again.");
        auth.logout();
      });
  }, []);

  return (
    <div className="outer-container">
      {loading && <div className="loading">Loading...</div>}
      {!loading && moviesData.length === 0 && <>No videos found</>}
      {!loading && moviesData.length > 0 && (
        <>
          <h2>Movies</h2>
          <div className="video-container">
            {moviesData.map((movie) => (
              <Card key={movie._id} movieData={movie} />
            ))}
          </div>
        </>
      )}
      {!loading && seriesData.length > 0 && (
        <>
          <h2>Series</h2>

          <div className="video-container">
            {seriesData.map((serie) => (
              <Card key={serie._id} seriesData={serie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
