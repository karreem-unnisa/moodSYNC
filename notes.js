// Function to save a note
function saveNote() {
    const noteInput = document.getElementById('noteInput');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const noteContent = noteInput.value.trim();

    // Only save if there's text
    if (noteContent) {
        const note = {
            content: noteContent,
            date: new Date().toLocaleString(),
        };
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));

        noteInput.value = ''; // Clear input
        displayNotes(); // Refresh displayed notes
    } else {
        alert("Please enter a note."); // Alert if input is empty
    }
}

// Function to display saved notes
function displayNotes() {
    const savedNotes = document.getElementById('savedNotes');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // If there are no notes, show a message
    if (notes.length === 0) {
        savedNotes.innerHTML = "<p>No saved notes.</p>";
    } else {
        savedNotes.innerHTML = notes.map((note, index) => `
            <div class="note-item">
                <span>${note.content} (${note.date})</span>
                <button onclick="deleteNote(${index})">Delete</button>
            </div>
        `).join('');
    }
}

// Function to delete a note
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1); // Remove the note at the specified index
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes(); // Refresh displayed notes
}

// Call displayNotes on page load
document.addEventListener('DOMContentLoaded', function () {
    displayNotes(); // Display notes when the page loads
});

function saveNote() {
    const noteInput = document.getElementById('noteInput');
    const savedNotesDiv = document.getElementById('savedNotes');

    if (noteInput.value.trim() === "") {
        alert("Please enter a note.");
        return;
    }

    const noteItem = document.createElement('div');
    noteItem.classList.add('note-item');
    noteItem.textContent = noteInput.value;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        savedNotesDiv.removeChild(noteItem);
    };

    noteItem.appendChild(deleteButton);
    savedNotesDiv.appendChild(noteItem);
    noteInput.value = ''; // Clear input field
}