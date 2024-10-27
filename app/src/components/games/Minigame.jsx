import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://api.api-ninjas.com/v1/rhyme'; // Base URL for the rhyme API
const API_KEY = "pGavgU+grqY9XuskoSDVwQ==TG66GkgHapxDTZn5"; // Your API key

const wordList = ['cat', 'dog', 'tree', 'car', 'ball', 'fish', 'hat', 'star', 'moon', 'book']; // Predefined list of words

const RhymeGame = () => {
    const [word, setWord] = useState('');
    const [rhymes, setRhymes] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRandomWord();
    }, []);

    const getRandomWord = () => {
        const randomWord = wordList[Math.floor(Math.random() * wordList.length)]; // Randomly select a word
        setWord(randomWord);
        loadRhymes(randomWord);
    };

    const loadRhymes = async (word) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}?word=${word}`, {
                headers: {
                    'X-Api-Key': API_KEY, // Set the API key in the headers
                },
            });
            // Limit rhymes to a maximum of 5
            setRhymes(response.data.slice(0, 5)); // Adjust based on the actual API response structure
            setFeedback('');
        } catch (error) {
            console.error('Error fetching rhymes:', error);
            setFeedback('Failed to load rhymes, please try again later.');
            setRhymes([]);
        } finally {
            setLoading(false);
        }
    };

    const checkAnswer = (selectedWord) => {
        if (rhymes.includes(selectedWord)) {
            setFeedback('Correct!');
            setScore(score + 1);
        } else {
            setFeedback('Try again!');
        }
        // Load new word after feedback
        setTimeout(() => {
            getRandomWord(); // Get a new random word
        }, 1000);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Rhyme Game</h1>
            <p style={styles.question}>
                Find a rhyme for: <strong>{word}</strong>
            </p>
            {loading ? (
                <p>Loading rhymes...</p>
            ) : (
                <div style={styles.buttonContainer}>
                    {rhymes.length > 0 ? (
                        rhymes.map((rhyme, index) => (
                            <button key={index} onClick={() => checkAnswer(rhyme)} style={styles.button}>
                                {rhyme}
                            </button>
                        ))
                    ) : (
                        <p>No rhymes found!</p>
                    )}
                </div>
            )}
            <h3 style={styles.score}>Score: {score}</h3>
            <p style={styles.feedback}>{feedback}</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#e9ecef',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
    },
    title: {
        color: '#343a40',
        fontSize: '2.5rem',
        marginBottom: '20px',
    },
    question: {
        fontSize: '1.5rem',
        marginBottom: '20px',
        color: '#495057',
        textAlign: 'center',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%', // Ensure buttons take the full width
        maxWidth: '400px', // Limit the width for better appearance
    },
    button: {
        padding: '15px 20px',
        fontSize: '1.2rem',
        color: '#ffffff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    },
    score: {
        marginTop: '20px',
        fontSize: '1.5rem',
        color: '#28a745',
    },
    feedback: {
        fontSize: '1.2rem',
        color: '#dc3545',
        marginTop: '10px',
        textAlign: 'center',
    },
};

export default RhymeGame;
