import { Button } from "@mui/material";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const styles = {
    soundButton: {
        height: '4em',
        fontSize: '1em',
        backgroundColor: "#004A48",
        borderRadius: "50%",
    },
};

const SoundPlayIcon = forwardRef(({ src }, ref) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudio = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(src);
            audioRef.current.addEventListener("ended", () => setIsPlaying(false));
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    useImperativeHandle(ref, () => ({
        stopAudio: () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
            }
        }
    }));

    return (
        <Button
            style={styles.soundButton}
            variant="contained"
            onClick={toggleAudio}
            aria-label={isPlaying ? "Pause le son" : "Lire le son"}
        >
            {isPlaying ? <FaPause /> : <FaPlay />}
        </Button>
    );
});

export default SoundPlayIcon;
