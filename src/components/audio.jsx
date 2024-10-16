import React, { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(error => {
                    console.log("Autoplay prevented:", error);
                });
            }
        };

        // Add an event listener for user interaction
        window.addEventListener('click', playAudio);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('click', playAudio);
        };
    }, []);

    return (
        <audio ref={audioRef} loop>
            <source src="/audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default BackgroundMusic;
