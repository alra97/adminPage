import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {  getFirestore, doc, setDoc, updateDoc, getDoc, deleteDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA7IcQ1mMgqf5HAp-1toFR_Tm9Rp5ix9yo",
    authDomain: "app24-595b3.firebaseapp.com",
    projectId: "app24-595b3",
    storageBucket: "app24-595b3.appspot.com",
    messagingSenderId: "248934203527",
    appId: "1:248934203527:web:a21a6d4ab40264c8a2f822"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('createButton').addEventListener('click', createEvent);

document.getElementById('findButton').addEventListener('click', () => {
    const eventId = document.getElementById('EventId').value;
    findEventById(eventId); // Pass event ID as argument
});

document.getElementById('updateButton').addEventListener('click', updateEvent);

    // Your event listener setup code here
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
});


// Function to create a new event
async function createEvent() {
    // Retrieve values from the form fields
    const eventName = document.getElementById('eventName').value;
    const eventDay = parseInt(document.getElementById('eventDay').value);
    const eventMonth = parseInt(document.getElementById('eventMonth').value);
    const venue = document.getElementById('venue').value;
    const startTimeHour = parseInt(document.getElementById('startTimeHour').value);
    const startTimeMinute = parseInt(document.getElementById('startTimeMinute').value);
    const endTimeHour = parseInt(document.getElementById('endTimeHour').value);
    const endTimeMinute = parseInt(document.getElementById('endTimeMinute').value);
    const numberOfParticipants = parseInt(document.getElementById('numberOfParticipants').value);
    const eventId = document.getElementById('EventId').value;
    const departmentName = document.getElementById('DepartmentName').value;
    const eventDescription = document.getElementById('eventDescription').value;

    // Validate month
    if (eventMonth < 1 || eventMonth > 12) {
        alert("Month must be between 1 and 12");
        document.getElementById('eventMonth').focus();
        return;
    }

    // Validate days based on month
    const daysInMonth = new Date(2024, eventMonth, 0).getDate();
    if (eventDay < 1 || eventDay > daysInMonth) {
        alert(`Invalid day for the selected month. ${eventMonth}/${eventDay}/2024 does not exist.`);
        document.getElementById('eventDay').focus();
        return;
    }

    // Validate hours and minutes
    if (startTimeHour < 0 || startTimeHour > 23 || startTimeMinute < 0 || startTimeMinute > 59 ||
        endTimeHour < 0 || endTimeHour > 23 || endTimeMinute < 0 || endTimeMinute > 59) {
        alert("Invalid time format. Hours must be between 0 and 23, and minutes between 0 and 59.");
        return;
    }

    // Create event date string
    const eventDate = `${eventDay}/${eventMonth}/2024`;

    // Create an object with the retrieved values
    const eventData = {
        eventName,
        eventDay,
        eventMonth,
        eventDate,
        venue,
        startTimeHour,
        startTimeMinute,
        endTimeHour,
        endTimeMinute,
        numberOfParticipants,
        eventId,
        departmentName,
        eventDescription
    };

    try {
        // Add the event data to Firestore
        await setDoc(doc(db, 'EventList', eventId), eventData);
        alert('Event created');
        document.getElementById('eventForm').reset();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Find event by ID
async function findEventById(eventId) {
    try {
        const eventRef = doc(db, 'EventList', eventId);
        const eventDoc = await getDoc(eventRef);

        if (eventDoc.exists()) {
            const eventData = eventDoc.data();
            populateFormFields(eventData);
        } else {
            alert("No such document!");
        }
    } catch (e) {
        console.error("Error getting document: ", e);
    }
}

// Populate form fields with event data
function populateFormFields(eventData) {
    for (const [key, value] of Object.entries(eventData)) {
        if (document.getElementById(key)) {
            document.getElementById(key).value = value;
        }
    }
}

// Update event
async function updateEvent() {
    const eventId = document.getElementById('EventId').value; // Corrected ID

    try {
        const eventRef = doc(db, 'EventList', eventId);
        const eventDoc = await getDoc(eventRef);

        if (eventDoc.exists()) {
            const eventData = {
                eventName: document.getElementById('eventName').value,
                departmentName: document.getElementById('DepartmentName').value,
                eventDay: parseInt(document.getElementById('eventDay').value, 10),
                eventMonth: parseInt(document.getElementById('eventMonth').value, 10),
                venue: document.getElementById('venue').value,
                startTimeHour: parseInt(document.getElementById('startTimeHour').value, 10),
                startTimeMinute: parseInt(document.getElementById('startTimeMinute').value, 10),
                endTimeHour: parseInt(document.getElementById('endTimeHour').value, 10),
                endTimeMinute: parseInt(document.getElementById('endTimeMinute').value, 10),
                numberOfParticipants: parseInt(document.getElementById('numberOfParticipants').value, 10),
                eventDescription: document.getElementById('eventDescription').value
            };

            // Validate month, days, hours, and minutes...

            await updateDoc(eventRef, eventData);
            alert('Event updated');
            document.getElementById('eventForm').reset();
        } else {
            alert("No such document!");
        }
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

// Event listeners

// document.getElementById('createButton').addEventListener('click', createEvent);

// document.getElementById('findButton').addEventListener('click', () => {
//     const eventId = document.getElementById('EventId').value;
//     findEventById(eventId); // Pass event ID as argument
// });

// document.getElementById('updateButton').addEventListener('click', updateEvent);

// Event handler for read.html
    if (document.getElementById('readButton')) {
        document.getElementById('readButton').addEventListener('click', async function() {
            const eventId = document.getElementById('EventId').value;

            try {
                const docSnap = await getDoc(doc(db, "EventList", eventId));
                if (docSnap.exists()) {
                    const eventData = docSnap.data();
                    const resultContainer = document.getElementById('resultContainer');
                    resultContainer.innerHTML = '';
                    for (const [key, value] of Object.entries(eventData)) {
                        const card = document.createElement('div');
                        card.className = 'card';
                        card.textContent = `${key}: ${value}`;
                        resultContainer.appendChild(card);
                    }
                } else {
                    alert("No such document!");
                }
            } catch (e) {
                console.error("Error getting document: ", e);
            }
        });
    }

    // Event handler for delete.html
    // document.getElementById('deleteButton').addEventListener('click', deleteEvent);

    async function deleteEvent() {
        const eventId = document.getElementById('EventId').value;
    
        try {
            await deleteDoc(doc(db, "EventList", eventId));
            alert('Event deleted');
            document.getElementById('eventForm').reset();
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    }
    




