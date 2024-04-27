import React from 'react'

const MovieCard = ({movie}) => {
    return (
        <div className="max-w-sm w-full lg:max-w-[91%] lg:flex p-3 bg-[#353535] rounded-xl mt-2">
            <div className="h-48 lg:h-auto lg:w-32 flex-none bg-cover text-center overflow-hidden rounded-lg" >
                <img src={movie.moviemainphotos} alt='' />
            </div>
            <div className=" p-4 flex flex-col justify-between leading-normal">
                <div className="mb-5">
                    <p className="text-[#f6f8e2] font-bold text-xl mb-2">{movie.movietitle}</p>
                    <p><span>2009</span> . <span>2<span className=' text-gray-400'>h</span> 42<span className=' text-gray-400'>min</span></span> . <span className=' text-gray-400'>{movie.moviegenres}</span></p>
                    <p className="text-[#f6f8e2] text-base mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard