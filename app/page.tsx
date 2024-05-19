"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const router = useRouter();

  const Submit = () => {
    const nummonth = parseInt(month, 10);
    const numday = parseInt(day, 10);
    const numyear = parseInt(year, 10);


    //Some error handling, probably a lot more cases, just did the most basic for now
    if (
      !Number.isInteger(nummonth) ||
      !Number.isInteger(numday) ||
      !Number.isInteger(numyear)
    ) {
      router.push("/invalid_input?message=Please enter valid numbers");
      return;
    }

    if (nummonth < 1 || nummonth > 12) {
      router.push(`/invalid_input?message=Please enter a month between 1 and 12!`);
      return;
    }

    if (numday < 1 || numday > 31) {
      router.push(`/invalid_input?message=Please enter a day between 1 and 31!`);
      return;
    }
    
    if (numyear < 0 || numyear > 2024) {
      router.push(`/invalid_input?message=Please enter a year between 0 and 2024!`);
      return;
    }
    
    //febuary edge case
    if (nummonth == 2 && numyear % 4 != 0 && numday > 28){
      router.push(`/invalid_input?message=Febuary has 28 days on non leap years, please try again`);
      return;
    }


    if (nummonth == 2 && numyear % 4 == 0 && numday > 29){
      router.push(`/invalid_input?message=Febuary has 29 days on leap years, please try again`);
      return;
    }

    //months with 30 days
    if (nummonth == 4 || nummonth == 6 || nummonth == 9 || nummonth == 8 || nummonth == 11){
      if (numday > 30){
        router.push(`/invalid_input?message=This month only has 30 days, please try again`);
        return;
      }

    }

    router.push(`/valid_input?day=${day}&month=${month}&year=${year}`);
    //console.log(`Your Birthday is: ${month}/${day}/${year}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundImage: "url('/background.jpg')", backgroundSize: 'cover' }}
    >
      <div className="bg-slate-300 p-6 rounded shadow-md text-center">
        <p className="text-2xl font-bold mb-4">
          Enter your birthdate for a hilarious joke about your Horoscope!
        </p>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Month"
            className="px-4 py-2 border rounded-md"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <input
            type="text"
            placeholder="Day"
            className="px-4 py-2 border rounded-md"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <input
            type="text"
            placeholder="Year"
            className="px-4 py-2 border rounded-md"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button
            onClick={Submit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
