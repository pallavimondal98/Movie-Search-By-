import React, { useEffect, useState } from 'react'
import {
    KeyboardArrowDown,
    FilterAltOutlined,
    KeyboardArrowUp

} from '@mui/icons-material';
import MovieCard from '../Components/MovieCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Data from '../Data.json'


const language = ["Hindi", "Malayalam", "Kannada", "Tamil", "English", "Japanese", "Chinese", "Spanish", "Korean", "Telugu", "Sinhala", "Bengali", "Oriya", "Assamese", "Kashmiri", "Urdu",
    "Punjabi", "Bhojpuri", "Gujarati", "Marathi", "Portuguese", "Korean", "Turkish", "Spanish", "Italian", "Russian", "Assamese", "Rajasthani", "Haryanvi", "Nepali", "Swahili"]

const country = ["Australia", "Canada", "Germany", "France", "United Kingdom", "Ireland", "India", "Norway", "United States", "United Arab Emirates", "Kuwait", "Singapore", "Finland", "Israel",
    "Mexico", "Egypt", "Indonesia", "Netherlands", "Sweden", "Thailand", "South Africa", "Portugal", "Japan", "Italy", "Argentina", "Azerbaijan", "Bolivia", "Belarus", "Chile",
    "Colombia", "Kazakhstan", "Malaysia", "Peru", "Philippines", "Russia", "Ukraine", "Uruguay", "Venezuela", "Ecuador", "Indonesia", "Belgium", "Luxembourg",
    "Albania", "Brazil", "Denmark", "Croatia", "Lebanon", "North Macedonia", "Oman", "Serbia", "Slovakia", "Bulgaria", "China", "Estonia", "Spain", "Bahrain", "Qatar", "Saudi Arabia",
    "South Africa", "Bahrain", "Indonesia", "Iran", "South Korea", "Netherlands", "New Zealand", "Poland", "Kenya", "Sri Lanka", "Tanzania", "Uganda"]

const genres = ["Animation", "History", "Horror", "Mystery", "Thriller", "Comedy", "Crime", "Drama", "Biography", "Action", "Family", "Romance", "Adventure", "Sci-Fi", "Fantasy", "Sport",
    "Documentary"]

const MOVIES_PER_PAGE = 3; // Number of movies per page

const Home = () => {

    const [movies, setMovies] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State to hold the current page number.
    const [totalPages, setTotalPages] = useState(0); // State to hold the total number of pages.

    const filteredMovies = movies.filter(movie =>
        (selectedLanguages.length === 0 || selectedLanguages.some(lang => movie.movielanguages.includes(lang))) &&
        (selectedCountries.length === 0 || selectedCountries.some(country => movie.moviecountries.includes(country))) &&
        (selectedGenres.length === 0 || selectedGenres.some(genre => movie.moviegenres.includes(genre)))
    );

    useEffect(() => {
        setMovies(Data);
        setTotalPages(Math.ceil(filteredMovies.length / MOVIES_PER_PAGE)); // Calculate total pages
    }, [filteredMovies]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
        // Optionally, you can fetch new data based on the new page number here
    };

    const handleLanguageChange = (event) => {
        const { value, checked } = event.target;
        setSelectedLanguages(prev =>
            checked ? [...prev, value] : prev.filter(lang => lang !== value)
        );
    };

    const handleCountryChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCountries(prev =>
            checked ? [...prev, value] : prev.filter(country => country !== value)
        );
    };

    const handleGenreChange = (event) => {
        const { value, checked } = event.target;
        setSelectedGenres(prev =>
            checked ? [...prev, value] : prev.filter(genre => genre !== value)
        );
    };

    const toggleOpen = () => setIsOpen(!isOpen);

    // Calculate the slice of movies to display
    const indexOfLastMovie = currentPage * MOVIES_PER_PAGE;
    const indexOfFirstMovie = indexOfLastMovie - MOVIES_PER_PAGE;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    return (
        <div>
            <div className='flex flex-col sm:flex-row   mx-4 md:mx-32 p-3 cursor-pointer h-auto'>
                <div className=' mr-4'>
                    <div className=' bg-[#fcbc58] w-[21rem] p-2 rounded-xl flex justify-between' onClick={toggleOpen}>
                        <span><FilterAltOutlined />Filter</span>
                        {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </div>
                    {isOpen && (<div className='bg-[#353535] w-full md:w-[21rem] p-2 mt-6 rounded-xl h-auto'>
                        <div className=' mb-3'>
                            <div className='flex justify-between'>
                                <h1 className=' font-medium text-[#fcbc58]'>Language</h1>
                                <KeyboardArrowDown />
                            </div>
                            <div className='overflow-y-scroll h-48'>
                                {language.map((lang, index) => (
                                    <div key={index} className=' flex gap-3'>
                                        <input type='checkbox' className='accent-[#fcbc58]' id={`language${index}`} name={`language${index}`} value={lang} onChange={handleLanguageChange} checked={selectedLanguages.includes(lang)} />
                                        <label htmlFor={`language${index}`}>{lang}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className=' mb-3'>
                            <div className='flex justify-between'>
                                <h1 className=' font-medium text-[#fcbc58]'>Country</h1>
                                <KeyboardArrowDown />
                            </div>
                            <div className='overflow-y-scroll h-48'>
                                {country.map((coun, index) => (
                                    <div key={index} className=' flex gap-3'>
                                        <input type='checkbox' className='accent-[#fcbc58]' id={`language${index}`} name={`language${index}`} value={coun} onChange={handleCountryChange} checked={selectedCountries.includes(coun)} />
                                        <label htmlFor={`language${index}`}>{coun}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className=' mb-3'>
                            <div className='flex justify-between'>
                                <h1 className=' font-medium text-[#fcbc58]'>Genres</h1>
                                <KeyboardArrowDown />
                            </div>
                            <div className='overflow-y-scroll h-48 scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-100'>
                                {genres.map((gen, index) => (
                                    <div key={index} className=' flex gap-3'>
                                        <input type='checkbox' className='accent-[#fcbc58]' id={`language${index}`} name={`language${index}`} value={gen} onChange={handleGenreChange} checked={selectedGenres.includes(gen)} />
                                        <label htmlFor={`language${index}`}>{gen}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>)} 
                </div>

                <div className=' mt-8 sm:mt-0 gap-4'>
                    <div className='w-full flex flex-col sm:flex-row gap-4'>
                        <input placeholder='Type here...' className=' bg-[#353535] w-full  p-2 rounded-xl' />
                        <button className=' bg-[#353535] w-full sm:w-44  p-2 rounded-xl'>Search</button>
                    </div>
                    <div className='grid w-full'>
                        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4'>
                            {filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie).map((movie, index) => (
                                <MovieCard key={index} movie={movie} />
                            ))}
                        </div>
                        <Stack spacing={2} className=' w-[22rem] lg:w-full flex justify-center mt-4'>
                            <Pagination
                                className='bg-transparent'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                                onChange={handleChange}
                                count={totalPages}
                                page={currentPage}
                                color="secondary"
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        color: 'white', // Changes the text color to white
                                    },
                                    '& .MuiPaginationItem-icon': {
                                        color: 'white', // Ensures icons (like arrows) are also white
                                    }
                                }}
                            />
                        </Stack>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Home