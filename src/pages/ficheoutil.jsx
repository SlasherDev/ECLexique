import { useRef } from 'react';
import genres from '../assets/json/genres.json';
import categories from '../assets/json/categories.json';
import SoundPlayIcon from '../components/SoundPlay';
import { Button, } from '@mui/material';
import { IoIosHome, IoIosArrowBack, IoIosArrowForward, IoIosInformationCircle } from "react-icons/io";

export default function FicheOutil({ tool, goHome, filteredData, setSelectedTool }) {
    const genreTrouve = genres.find((g) => g.letter === tool.genre);
    const soundRef = useRef(null);

    const prononce = [{ prononce: tool.prononce, audio: tool.audio }];
    const currentIndex = filteredData.findIndex(t => t.id === tool.id)


    const styles = {
        goHomeButton: {
            zIndex: 1,
            minWidth: 0,
            width: '2em',
            height: '2em',
            alignItems: 'center',
            fontSize: '2em',
            backgroundColor: "#004A48",
            borderRadius: "50%",
            position: "sticky",
            bottom: 10,
            left: '100vw',
            margin: '0 10px',
        },
        navButton: {
            minWidth: 0,
            color: 'black',
            border: '1px solid #c0c0c0',
            width: '2em',
            height: '2em',
            alignItems: 'center',
            fontSize: '2em',
            backgroundColor: "white",
            borderRadius: "50%",
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

    const handlePrevTool = () => {
        stopAudio();
        setSelectedTool(filteredData[currentIndex - 1]);
    }

    const handleNextTool = () => {
        stopAudio();
        setSelectedTool(filteredData[currentIndex + 1]);
    }

    return (
        <div className="ficheOutil">
            <div className="navButtons">
                {currentIndex > 0 ? (
                    <Button
                        style={styles.navButton}
                        variant="contained"
                        onClick={handlePrevTool}
                    >
                        <IoIosArrowBack />
                    </Button>
                ) : (
                    <div />
                )}
                <h3>{tool.name}</h3>
                {currentIndex < filteredData.length - 1 ? (
                    <Button
                        style={styles.navButton}
                        variant="contained"
                        onClick={handleNextTool}
                    >
                        <IoIosArrowForward />
                    </Button>
                ) : (
                    <div />
                )}
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
                    <a href={`https://fr.wikipedia.org/wiki/${tool.name}`} target="_blank" rel="noopener noreferrer">
                        <Button variant='contained'>
                            <IoIosInformationCircle />
                        </Button>
                    </a>
                </div>
            </div>
            <Button variant="contained" style={styles.goHomeButton} onClick={handlegoHome}>
                <IoIosHome />
            </Button>
        </div>
    );
}
