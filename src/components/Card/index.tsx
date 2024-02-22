import "./styles.scss";
import { useEffect, useRef } from "react";
import { Video } from "../../models/video.model";
import Movies from "../Movies";
import { SeriesModel } from "../../models/series.model";
import Series from "../Series";

const Card = ({
  movieData,
  seriesData,
}: {
  movieData?: Video;
  seriesData?: SeriesModel;
}) => {
  const playAreaRef = useRef<HTMLDivElement | null>(null);

  const data = movieData || seriesData;
  const showPlayArea = () => {
    if (playAreaRef.current) {
      playAreaRef.current.className = "play-area-full";
    }
  };

  const closePlayArea = () => {
    if (playAreaRef.current) {
      playAreaRef.current.className = "play-area";
    }
  };

  useEffect(() => {
    if (playAreaRef.current) {
      playAreaRef.current.className = "play-area";
    }
  }, []);

  return (
    <>
      <div className="video-card" onClick={showPlayArea}>
        <div className="thumbnail">
          <img src={data?.thumbnail} alt={data?.name} />
        </div>
        <div className="details">
          <h2>{data?.name}</h2>
          <p>{data?.language}</p>
        </div>
      </div>
      <div ref={playAreaRef} className="play-area">
        {movieData && <Movies data={movieData} />}
        {seriesData && <Series data={seriesData} />}
        <button className="playarea-close" onClick={closePlayArea}>
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z"
              fill="#00C569"
            />
            <path
              d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z"
              fill="#fff"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Card;
