import { useRef } from "react";
import "./styles.scss";
import { Video } from "../../models/video.model";
import { apiInstance } from "../../lib/config";

const Movies = ({ data, close }: { data: Video; close: () => void }) => {
  console.log(data);
  const ref = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function closeVideo() {
    if (ref.current) {
      ref.current.className = "video-player";
    }
    if (videoRef.current) {
      videoRef.current.pause();
      localStorage.setItem(data._id, videoRef.current.currentTime.toString());
    }
    close();
  }

  const showVideo = async () => {
    const response = await apiInstance.get(`/video?path=${data.video}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("site")}`,
      },
    });
    console.log(response);
    if (ref.current) {
      ref.current.className = "video-player-full";
    }

    if (videoRef.current) {
      videoRef.current.src = response.data.url;
      videoRef.current.currentTime = parseFloat(
        localStorage.getItem(data._id) || "0"
      );

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
      <div className="video-details">
        <div className="video-img">
          <img src={data.thumbnail} alt={data.name} />
        </div>
        <div id="play-btn" className="play-button" onClick={() => showVideo()}>
          <svg
            className="svg-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M852.727563 392.447107C956.997809 458.473635 956.941389 565.559517 852.727563 631.55032L281.888889 993.019655C177.618644 1059.046186 93.090909 1016.054114 93.090909 897.137364L93.090909 126.860063C93.090909 7.879206 177.675064-35.013033 281.888889 30.977769L852.727563 392.447107 852.727563 392.447107Z" />
          </svg>
        </div>
        <div className="details">
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <p>{data.language}</p>
          <p>IMDb Rating: {data.rating}</p>
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

export default Movies;
