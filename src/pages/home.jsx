import { useEffect, useState } from 'react'
import data from '../assets/json/outils.json';
import { FaSearch } from "react-icons/fa";
import FicheOutil from './ficheoutil';
import { Button } from '@mui/material';
import { IoIosArrowUp } from 'react-icons/io';

function Home() {

    const [search, setSearch] = useState('')
    const [isMobile, setIsMobile] = useState(false);

    function handleChange(e) {
        setSearch(e.target.value);
    }

    const normalize = (str) =>
        str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const filteredData = data.filter(item =>
        normalize(item.name).includes(normalize(search))
    );

    const [selectedTool, setSelectedTool] = useState(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 670);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    const styles = {
        card: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#004A48',
            width: isMobile ? '100vw' : '300px',
            height: isMobile ? '100vw' : '300px',
            margin: '2%',
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            borderRadius: '10px',
        },
        upButton: {
            width: '1em',
            height: '1em',
            color: 'black',
            alignItems: 'center',
            fontSize: '5em',
            backgroundColor: "white",
            border: '1px solid #c0c0c0',
            borderRadius: "50%",
            position: "sticky",
            bottom: 10,
            left: '100vw',
            margin : '0 10px',

        }
    }

    return (
        <>
            <nav>
                <img loading="lazy" src='./src/assets/images/logo/logo_ec.jpg' alt="logo Études et Chantiers" width={200} />
                <h1>Etudes et Chantiers</h1>
                <h2>Lexique des outils techniques</h2>
            </nav>

            <main>
                {selectedTool ? (
                    <FicheOutil tool={selectedTool} goBack={() => setSelectedTool(null)} />
                ) : (
                    <>
                        <div className='search'>
                            <FaSearch style={{ fill: '#004A48' }} />
                            <input type="text" name="searchBar" id="searchBar" placeholder="Rechercher un outil" onChange={handleChange} value={search} />
                        </div>
                        <div className='cardList'>
                            {filteredData.sort((a, b) => a.name.localeCompare(b.name))
                                         .map((tool) => {
                                return (
                                    <Button style={styles.card} variant="contained" className='card' key={tool.id} onClick={() => setSelectedTool(tool)}>
                                        <p>{tool.name}</p>
                                        <img loading="lazy" src={`./src/assets/images/outils/${tool.img}`}
                                            alt={tool.name}
                                        />
                                    </Button>
                                );

                            })}
                        </div>
                    </>
                )}
            </main>
            <Button variant="contained" onClick={() => window.scrollTo(0, 0)} style={styles.upButton}>
                <IoIosArrowUp />
            </Button>
        </>
    )
}

export default Home
