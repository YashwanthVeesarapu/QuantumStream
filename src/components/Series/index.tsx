import { useRef } from "react";
// import { apiInstance } from "../../lib/config";
import "./styles.scss";
import { SeriesModel } from "../../models/series.model";

const Series = ({ data }: { data: SeriesModel }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function closeVideo() {
    if (ref.current) {
      ref.current.className = "video-player";
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }

  const showVideo = (episode: {
    title: string;
    video: string;
    description: string;
    duration: string;
  }) => {
    if (ref.current) {
      ref.current.className = "video-player-full";
    }
    if (videoRef.current) {
      videoRef.current.src = episode.video;

      if (window.innerWidth < 768) {
        videoRef.current.play();
      } else {
        videoRef.current
          .requestFullscreen()
          .then(() => {
            videoRef.current?.play();
          })
          .catch(() => videoRef.current?.play());
      }
    }
  };
  return (
    <>
      <div className="video-series-details">
        <div className="video-img">
          <img src={data.thumbnail} alt={data.name} />
        </div>
        <div className="details">
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <p>{data.language}</p>
        </div>
        <div className="seasons-container">
          {data.seasons.map((season) => {
            return (
              <div className="episodes" key={season.seasonNumber}>
                <h2>Season {season.seasonNumber}</h2>
                {season.episodes.map((episode) => {
                  return (
                    <div className="episode" key={episode.episodeNumber}>
                      <button onClick={() => showVideo(episode)}>
                        Episode {episode.episodeNumber}
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div ref={ref} id="video" className="video-player">
        <button id="close-btn" onClick={closeVideo}>
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
        <video
          ref={videoRef}
          controls
          preload="metadata"
          poster={data.thumbnail}
          controlsList="nodownload"
          playsInline
        >
          <source />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default Series;
