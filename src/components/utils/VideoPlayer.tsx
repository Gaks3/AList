'use client'

import YouTube from 'react-youtube'

const VideoPlayer = ({ youtube_id }: { youtube_id?: string }) => {
  const option = {
    width: 450,
    height: 300,
  }

  return (
    <YouTube
      videoId={youtube_id}
      onReady={(e) => e.target.pauseVideo()}
      opts={option}
    />
  )
}

export default VideoPlayer
