"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import './page.css';
import { getJoke } from './JokeAI';
import { getImage } from './ImageAI';

export default function Valid() {
    const searchParams = useSearchParams();
    //need "0" as fall back value
    const day = parseInt(searchParams.get("day") || "0", 10);
    const month = parseInt(searchParams.get("month") || "0", 10);
    const year = searchParams.get("year"); 
    const router = useRouter();
  
    let zodiac = "";

    //Decided to manually check zodiac signs as I found GPT to be inaccurate at times
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
    zodiac = "Aquarius"; //January 20–February 18
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    zodiac = "Pisces"; //February 19–March 20
    } else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
    zodiac = "Aries"; //March 21–April 19
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
    zodiac = "Taurus"; //April 20–May 20
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
    zodiac = "Gemini"; //May 21–June 21
    } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    zodiac = "Cancer"; //June 22–July 22
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
    zodiac = "Leo"; //July 23–August 22
    } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
    zodiac = "Virgo"; //August 23–September 22
    } else if ((month == 9 && day >= 23) || (month == 10 && day <= 23)) {
    zodiac = "Libra"; //September 23–October 23
    } else if ((month == 10 && day >= 24) || (month == 11 && day <= 21)) {
    zodiac = "Scorpio"; //October 24–November 21
    } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
    zodiac = "Sagittarius"; //November 22–December 21
    } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
    zodiac = "Capricorn"; //December 22–January 19
    }

    const [joke, setJoke] = useState<string>('');
    const [image, setImage] = useState<string>('');

    useEffect(() => {
      getJoke(zodiac).then(setJoke);
      getImage(zodiac).then(setImage);
    }, [zodiac]);

  const Return = () => {
    router.push('/');
  };


  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundImage: "url('/background.jpg')", backgroundSize: 'cover' }}
      >
      <div className="bg-slate-300 p-6 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Your Birthday: {month}/{day}/{year} <br /> Makes your Zodaic sign:</h1>
        <p className="flashing-rainbow"> {zodiac} </p>
        <p className="text-2xl font-bold mb-4"> Here is a funny joke about {zodiac}: </p>
        <p className="text-2xl font-bold mb-4">{joke}</p>
        <p className="text-2xl font-bold mb-4"> Here is a visual representation of {zodiac}: </p>
        <div className="flex flex-col items-center">
          <img src={image} className="text-2xl font-bold mb-4" alt= "(This may take a few seconds)"  />
          <p className="text-2xl font-bold mb-4"><br /></p>
        </div>
        <button
          onClick={Return}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Enter a new Birthdate
        </button>
      </div>
    </div>
  );
}
