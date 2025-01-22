document.getElementById('generate-btn').addEventListener('click', () => {
    const genre = document.getElementById('genre').value;
    const key = document.getElementById('key').value;

    console.log(`Generating music for genre: ${genre}, key: ${key}`);

    // Generate chord progression and random melody
    const { progression, melody } = generateMusic(genre, key);

    // Log the chord progression and melody for debugging
    console.log(`Chord Progression: ${progression}`);
    console.log(`Melody: ${melody}`);

    // Create a text file with the generated data
    createTextFile(progression, melody, genre, key);

    // Show modal with the progression and melody
    document.getElementById('chords-display').textContent = `Chord Progression: ${progression}`;
    document.getElementById('melody-display').textContent = `Melody Notes: ${melody.join(', ')}`;

    // Display the modal
    document.getElementById('popup-modal').style.display = 'block';
});

// Close modal when close button is clicked
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('popup-modal').style.display = 'none';
});

// Generates a random melody from predefined note lists
function generateMusic(genre, key) {
    // Example chord progressions
    const chordProgressions = {
        pop: ['I - V - vi - IV', 'vi - IV - I - V'],
        jazz: ['ii7 - V7 - Imaj7', 'Imaj7 - vi7 - ii7 - V7'],
        blues: ['I7 - IV7 - V7', 'I7 - IV7 - I7'],
        rock: ['I - IV - V', 'I - V - vi - IV'],
        house: ['I - V - IV - V', 'ii - V - I'],
        edm: ['I - vi - IV - V', 'I - V - vi - IV'],
        ambient: ['Cmaj7 - Fmaj7 - Gmaj7', 'Amaj7 - Cmaj7 - Fmaj7']
    };

    // Random melody note generation
    const availableNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];

    // Randomly choose melody notes (for example, choose 6 notes)
    const melody = [];
    for (let i = 0; i < 6; i++) {
        const randomNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];
        melody.push(randomNote);
    }

    // Get chord progression for the selected genre
    const progression = chordProgressions[genre]?.[0] || 'I - IV - V';

    return { progression, melody };
}

function createTextFile(progression, melody, genre, key) {
    console.log('Creating text file...');

    // Content of the text file
    const content = `
        Genre: ${genre}
        Key: ${key}
        
        Chord Progression: ${progression}
        Melody Notes: ${melody.join(', ')}
    `;

    // Create a Blob for the text content
    const textBlob = new Blob([content], { type: 'text/plain' });
    const textDataUrl = URL.createObjectURL(textBlob);

    // Set the download link and display it
    const downloadLink = document.getElementById('download-midi'); // Reuse the same button
    downloadLink.href = textDataUrl;
    downloadLink.download = `generated-music_${genre}_${key}.txt`; // Set the filename
    downloadLink.style.display = 'block'; // Show the download button
}
