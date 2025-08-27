import React, { createContext, useState } from 'react';
import run from '../Gemini';
export const Datacontext = createContext();




function UserContext({ children }) {
    let [speaking, setSpeaking] = useState(false);
    let [prompt, setPrompt] = useState('Listening...');
    let [response, setResponse] = useState(false)
    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "hi-IN"
        window.speechSynthesis.speak(text_speak)

    }
    async function aiResponse(prompt) {
        const userInput = prompt.toLowerCase().replace(/[^\w\s]/gi, '').trim();

        // Step 1: Define custom responses
        const defaultResponses = {
            "what is your name": "My name is Sifra 2.0, your virtual assistant.",
            "who created you": "I was created by Ali Murtaza Kayani.",
            "hello": "Hello! How can I assist you today?",
            "how are you": "I am always ready to assist you!",
            "who is pathan": "Pathan aek gandu insan hai",
            "who is ali murtaza kayani": "Ali Murtaza Kayani is a full stack developer and a student of master in automotive software Engineer in Technical univeristy of chemnitz."
        };

        let responseText;

        // Step 2: Check if user input matches a predefined question
        const matchedKey = Object.keys(defaultResponses).find(key =>
            userInput.includes(key)
        );

        if (matchedKey) {
            // Use custom response
            responseText = defaultResponses[matchedKey];
        } else {
            // Call Gemini API
            let text = await run(prompt);

            // Clean the Gemini output
            let newText = text
                .split('**').join('')   // remove markdown bold
                .split('*').join('')    // remove markdown italic
                .replace(/google/gi, 'Ali Murtaza Kayani'); // Replace Google with your name

            responseText = newText;
        }

        // Step 3: Set and speak the response
        setPrompt(responseText);
        speak(responseText);
        setResponse(true);

        // Step 4: Reset speaking state
        setTimeout(() => {
            setSpeaking(false);
        }, 5000);
    }

    function takeCommand(command) {
        if (command.includes("open") && command.includes("youtube")) {
          window.open('https://www.youtube.com/', '_blank');
            speak('opening youtube');
            setResponse(true)
            setPrompt('opening youtube...');
            setTimeout(() => {
                setSpeaking(false)
            }, 5000);
        }
         else if (command.includes("open") && command.includes("instagram")) {
          window.open('https://www.instagram.com/', '_blank');
            speak('opening instagram');
             setResponse(true)
            setPrompt('opening instagram...');
            setTimeout(() => {
                setSpeaking(false)
            }, 5000);
        }
        else if (command.includes("time")) {
         let time = new Date().toLocaleString(undefined,
            {hour:"numeric",minute :"numeric"})
            speak(time);
            setPrompt(time)
            setResponse(true)
            setTimeout(() => {
                setSpeaking(false)
            }, 3000);
            
            
            
        }
         else if (command.includes("date")) {
         let date = new Date().toLocaleString(undefined,
            {day:"numeric",month :"short"})
            speak(date);
            setPrompt(date)
            setResponse(true)
            setTimeout(() => {
                setSpeaking(false)
            }, 3000);
            
            
        }
        else {
            aiResponse(command)
        }
    }


    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition();
    recognition.onresult = (e) => {
        let currentIndex = e.resultIndex
        let transcript = e.results[currentIndex][0].transcript
        setPrompt(transcript)
        takeCommand(transcript.toLowerCase())
    }
    let value = {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
    }
    return (
        <div>
            <Datacontext.Provider value={value}>
                {children}
            </Datacontext.Provider>
        </div>
    );
}

export default UserContext
