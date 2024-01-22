import { createContext, useContext, useMemo, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const videoContext = createContext();
export default function VideoContextProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const video = useRef({});

  async function getVideoListFromPlaylist(playlistId) {
    const { data } = await axios.get("http://localhost:3310/api/video", {
      params: { playlistId },
    });
    setVideos(data.rows);
  }

  async function runSearchVideo(ytId) {
    try {
      const { data } = await axios.get(
        `http://localhost:3310/api/video/${ytId}`
      );
      setVideos([...data.rows]);
    } catch (err) {
      setVideos([]);
    }
  }

  async function deleteVideoBId(ytId) {
    const { data } = await axios.delete(
      `http://localhost:3310/api/video/${ytId}`
    );
    if (data.success) {
      const result = videos.filter((ele) => ele.ytId !== ytId);
      setVideos([...result]);
    }
  }

  async function getAllPlaylists() {
    try {
      const { data } = await axios.get("http://localhost:3310/api/playlists");
      setPlaylists([...data.playlists]);
    } catch (err) {
      setPlaylists([]);
    }
  }

  async function updateVideoById(ytId, { isHidden, isPublic }) {
    const { data } = await axios.patch(
      `http://localhost:3310/api/video/${ytId}`,
      { isHidden, isPublic }
    );

    return data;
  }

  const adminData = useMemo(
    () => ({
      videos,
      setVideos,
      getVideoListFromPlaylist,
      deleteVideoBId,
      updateVideoById,
      video,
      runSearchVideo,
      playlists,
      setPlaylists,
      getAllPlaylists,
    }),
    [
      videos,
      setVideos,
      getVideoListFromPlaylist,
      deleteVideoBId,
      updateVideoById,
      video,
      runSearchVideo,
      playlists,
      setPlaylists,
      getAllPlaylists,
    ]
  );

  return (
    <videoContext.Provider value={adminData}>{children}</videoContext.Provider>
  );
}
VideoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useVideoContext = () => useContext(videoContext);
