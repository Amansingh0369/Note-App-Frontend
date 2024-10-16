import React, { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, []);

    return (
        <audio ref={audioRef} loop autoPlay>
            <source src="/audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default BackgroundMusic;
