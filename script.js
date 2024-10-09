// Function to handle changes in the mood selection dropdown
function handleMoodChange() {
    const moodSelect = document.getElementById('moodSelect');
    const customMood = document.getElementById('customMood');
    const thoughtInput = document.getElementById('thoughtInput');

    // Show or hide the custom mood input based on the selected option
    if (moodSelect.value === "Custom") {
        customMood.style.display = 'block';
        customMood.value = ''; // Clear any previous input
    } else {
        customMood.style.display = 'none';
    }

    // Show thoughts input when mood is selected
    thoughtInput.style.display = moodSelect.value ? 'block' : 'none';
}

// Function to log the mood
function logMood() {
    const moodSelect = document.getElementById('moodSelect');
    const customMood = document.getElementById('customMood');
    const thoughtInput = document.getElementById('thoughtInput');
    const result = document.getElementById('result');

    // Determine the mood to log
    let mood = moodSelect.value === "Custom" ? customMood.value : moodSelect.value;
    let thoughts = thoughtInput.value;

    // Quotes and suggestions for different moods
    const moodQuotes = {
        Happy: "Happiness is not something ready made. It comes from your own actions.",
        Sad: "Tears are words the heart can't express.",
        Anxious: "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.",
        Angry: "For every minute you are angry you lose sixty seconds of happiness.",
        Custom: "You are in charge of your own happiness."
    };

    const moodSuggestions = {
        Happy: "Share your happiness with someone, or treat yourself to something nice.",
        Sad: "Take time to reflect, or talk to a friend about how you feel.",
        Anxious: "Try deep breathing exercises, or take a break to clear your mind.",
        Angry: "Go for a run, or find a healthy way to express your frustration.",
        Custom: "Think of something that makes you smile."
    };

    let quote = moodQuotes[mood] || "Stay positive!";
    let suggestions = moodSuggestions[mood] || "Take a walk, listen to music, or talk to a friend.";

    if (mood) {
        result.innerHTML = `
            <h2>Your Mood: ${mood}</h2>
            <p>Quote: ${quote}</p>
            <p>Thoughts: ${thoughts || "No thoughts shared."}</p>
            <p>Suggestions: ${suggestions}</p>
        `;
        saveMoodHistory(mood, thoughts);
    } else {
        result.innerHTML = '<p>Please select or describe your mood.</p>'; // Handle empty mood submission
    }
}

// Function to save the mood history to localStorage
function saveMoodHistory(mood, thoughts) {
    const historyEntries = JSON.parse(localStorage.getItem('moodHistory')) || [];
    const date = new Date().toLocaleString(); // Change to locale string for better display
    historyEntries.push({ date, mood, thoughts });
    localStorage.setItem('moodHistory', JSON.stringify(historyEntries));
}

// Function to display mood history
// Function to display mood history
function displayMoodHistory() {
    const historyEntries = JSON.parse(localStorage.getItem('moodHistory')) || [];
    const historyDiv = document.getElementById('historyEntries');

    if (historyEntries.length === 0) {
        historyDiv.innerHTML = '<p>No mood history available.</p>'; // Message when no history exists
    } else {
        historyDiv.innerHTML = historyEntries.map(entry => `
            <div>
                <span>${entry.date} - Mood: ${entry.mood} ${entry.thoughts ? `| Thoughts: ${entry.thoughts}` : ''}</span>
                <button onclick="deleteMoodEntry('${entry.date}')">❌</button>
            </div>
        `).join('');
    }
}

// Function to delete a mood entry
function deleteMoodEntry(date) {
    let historyEntries = JSON.parse(localStorage.getItem('moodHistory')) || [];
    historyEntries = historyEntries.filter(entry => entry.date !== date);
    localStorage.setItem('moodHistory', JSON.stringify(historyEntries));
    displayMoodHistory(); // Refresh the displayed list
}

// Call displayMoodHistory on page load for the history page
document.addEventListener('DOMContentLoaded', function () {
    displayMoodHistory(); // Show history when the page loads

    const main = document.querySelector('main');
    main.classList.add('visible'); // Make the main section visible
});


// Intersection Observer for animations
document.addEventListener("DOMContentLoaded", function() {
    const hero = document.querySelector('.hero');
    const main = document.querySelector('main');

    // Create an observer to observe the hero and main sections
    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === hero) {
                    hero.classList.add('visible'); // Add visible class to hero
                } else if (entry.target === main) {
                    main.classList.add('visible'); // Add visible class to main
                }
                observer.unobserve(entry.target); // Stop observing after adding class
            }
        });
    }, observerOptions);

    // Observe both sections
    observer.observe(hero);
    observer.observe(main);
});
