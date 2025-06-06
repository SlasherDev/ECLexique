import { useRef } from 'react';
import genres from '../assets/json/genres.json';
import categories from '../assets/json/categories.json';
import SoundPlayIcon from '../components/SoundPlay';
import { Button } from '@mui/material';
import { IoIosArrowBack } from "react-icons/io";

export default function FicheOutil({ tool, goBack }) {
    const genreTrouve = genres.find((g) => g.letter === tool.genre);
    const soundRef = useRef(null);

    const prononce = [{ "prononce": tool.prononce, "audio": tool.audio }].map((arr) => {
        return arr
    });

    const styles = {
        backButton: {
            width: '1em',
            height: '1em',
            alignItems: 'center',
            fontSize: '5em',
            backgroundColor: "#004A48",
            borderRadius: "50%"
        },
    };

    const handleGoBack = () => {
        if (soundRef.current) {
            soundRef.current.stopAudio();
        }
        goBack();
    };

    return (
        <div className="ficheOutil">
            <div className="ficheOutilHeader">
                <Button variant="contained" style={styles.backButton} onClick={handleGoBack}>
                    <IoIosArrowBack />
                </Button>
                <h3>{tool.name}</h3>
            </div>

            <div className='outilDetails'>
                <div className='sides'>
                    <div className='imgOutil'>
                        <img loading="lazy" src={`./src/assets/images/outils/${tool.img}`} alt={tool.name} />
                    </div>
                    {
                        tool.prononce.length === tool.audio.length ? (
                            prononce.map((p, i) => (
                                p.prononce.map((prononceElement, j) => {
                                    return (
                                        <div className='prononce' key={`${i}-${j}`}>
                                                <div className='audioButton'>
                                                    <SoundPlayIcon key={j} ref={soundRef} src={`./src/assets/audios/${p.audio[j]}`} />
                                                </div>
                                                <div className='prononceList'>
                                                    <div className='prononceElement' key={`${i}-${j}`}>
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
                                <div className='prononceList'>
                                    {tool.prononce.map((p, index) => (
                                        <div className='prononceElement' key={index}>{p}</div>
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
