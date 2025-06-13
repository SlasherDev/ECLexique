import { useRef } from 'react';
import genres from '../assets/json/genres.json';
import categories from '../assets/json/categories.json';
import SoundPlayIcon from '../components/SoundPlay';
import { Button, } from '@mui/material';
import { IoIosHome} from "react-icons/io";

export default function FicheOutil({ tool, goHome}) {
    const genreTrouve = genres.find((g) => g.letter === tool.genre);
    const soundRef = useRef(null);

    const prononce = [{ decoupe: tool.decoupe, audio: tool.audio }];



    const styles = {
        goHomeButton: {
            minWidth: 0,
            width: '1em',
            height: '1em',
            alignItems: 'center',
            fontSize: '5em',
            backgroundColor: "#004A48",
            borderRadius: "50%",
            margin: '0 10px',
        },
    };
    function stopAudio() {
        if (soundRef.current) {
            soundRef.current.stopAudio();
        }
    }

    const handlegoHome = () => {
        stopAudio();
        goHome();
    };

    return (
        <div className="ficheOutil">
            <div className="navButtons">
                <Button variant="contained" style={styles.goHomeButton} onClick={handlegoHome}>
                    <IoIosHome />
                </Button>
                <h3>{tool.name}</h3>

            </div>
            <div className='outilDetails'>
                <div className='sides'>
                    <div className='imgOutil'>
                        <img loading="lazy" src={`./src/assets/images/outils/${tool.img}`} alt={tool.name} />
                    </div>
                    {
                        tool.decoupe.length === tool.audio.length ? (
                            prononce.map((p, i) => (
                                p.decoupe.map((prononceElement, j) => {
                                    return (
                                        <div className='prononce' key={`${i}-${j}`}>
                                            <div className='audioButton'>
                                                <SoundPlayIcon key={j} ref={soundRef} src={`./src/assets/audios/${p.audio[j]}`} />
                                            </div>
                                            <div className='decoupeList'>
                                                <div className='decoupeElement' key={`${i}-${j}`}>
                                                    {prononceElement}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ))
                        ) : (
                            <div className='prononce'>
                                <div className='audioButton'>
                                    {tool.audio.map((audio, index) => (
                                        <SoundPlayIcon key={index} ref={soundRef} src={`./src/assets/audios/${audio}`} />
                                    ))}
                                </div>
                                <div className='decoupeList'>
                                    {tool.prononce.map((p, index) => (
                                        <div className='decoupeElement' key={index}>{p}</div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='sides'>
                    <div className='genres'>
                        <div className='imgDescription' data-description={genreTrouve.name}>
                            <img loading="lazy" src={`./src/assets/images/icons/genres/${genreTrouve.img}`} alt={genreTrouve.name} />
                        </div>
                    </div>
                    <div className='categories'>
                        {tool.categorie.map((cat, index) => (
                            <div key={index} >
                                {categories.find(c => c.name === cat) && (
                                    <div className='imgDescription' data-description={cat}>
                                        <img loading="lazy" src={`./src/assets/images/icons/categories/${categories.find(c => c.name === cat).img}`} alt={cat} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
