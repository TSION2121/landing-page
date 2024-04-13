import React, { useState, useEffect } from 'react';
import YoutubeEmbed from './YoutubeEmbed';

const VideoSlider = ({ videos }) => {
    const [current, setCurrent] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [intervalId, setIntervalId] = useState(null);

    const nextVideo = () => {
        setCurrent((prevCurrent) => (prevCurrent + 1) % videos.length);
    };

    useEffect(() => {
        if (playing) {
            const id = setInterval(nextVideo, 3000); // Change video every 3 seconds
            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [playing, current]);

    const onVideoEnd = () => {
        setPlaying(true); // Resume slideshow when video ends
    };

    const videoClickHandler = () => {
        setPlaying(!playing); // Toggle playing state on video click
    };

    return (
        <div>
            <YoutubeEmbed
                embedId={videos[current]}
                onClick={videoClickHandler}
                onEnd={onVideoEnd} // Add an event handler for when the video ends
            />
            {playing ? (
                <button onClick={() => setPlaying(false)}>Pause Slideshow</button>
            ) : (
                <button onClick={() => setPlaying(true)}>Play Slideshow</button>
            )}
        </div>
    );
};

export default VideoSlider;
