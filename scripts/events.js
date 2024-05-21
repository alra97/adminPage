import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const firebaseConfig = {
        apiKey: "AIzaSyA7IcQ1mMgqf5HAp-1toFR_Tm9Rp5ix9yo",
        authDomain: "app24-595b3.firebaseapp.com",
        projectId: "app24-595b3",
        storageBucket: "app24-595b3.appspot.com",
        messagingSenderId: "248934203527",
        appId: "1:248934203527:web:a21a6d4ab40264c8a2f822",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('createButton').addEventListener('click', createEvent);
document.getElementById('readButton').addEventListener('click', readEvent);
document.getElementById('updateButton').addEventListener('click', updateEvent);
document.getElementById('deleteButton').addEventListener('click', deleteEvent);
document.getElementById('mainButton').addEventListener('click', navigateToMainPage);

// Function to create a new event
function createEvent() {
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
    const EventId = document.getElementById('EventId').value;
    const DepartmentName = document.getElementById('DepartmentName').value;
    const eventDescription = document.getElementById('eventDescription').value;

    // Create an object with the retrieved values
    const eventData = {
        eventName: eventName,
        eventDay: eventDay,
        eventMonth: eventMonth,
        venue: venue,
        startTimeHour: startTimeHour,
        startTimeMinute: startTimeMinute,
        endTimeHour: endTimeHour,
        endTimeMinute: endTimeMinute,
        numberOfParticipants: numberOfParticipants,
        EventId: EventId,
        DepartmentName: DepartmentName,
        eventDescription: eventDescription
    };

    // Add the event data to Firestore
    setDoc(doc(db, 'EventList', eventName), eventData)
        .then(() => {
            console.log('Event Added');
        })
        .catch((error) => {
            console.error('Error adding event: ', error);
        });
}

// Function to read event data
function readEvent() {
    // Retrieve event name from the form field
    const eventName = document.getElementById('eventName').value;

    // Read the event data from Firestore
    getDoc(doc(db, 'EventList', eventName))
        .then((doc) => {
            if (doc.exists()) {
                console.log('Event data:', doc.data());
            } else {
                console.log('No such event!');
            }
        })
        .catch((error) => {
            console.error('Error getting event: ', error);
        });
}

// Function to update event data
function updateEvent() {
    // Retrieve event name from the form field
    const eventName = document.getElementById('eventName').value;

    // Update the event data in Firestore
    updateDoc(doc(db, 'EventList', eventName), {
        // Updated fields here...
    })
    .then(() => {
        console.log('Event Updated');
    })
    .catch((error) => {
        console.error('Error updating event: ', error);
    });
}

// Function to delete an event
function deleteEvent() {
    // Retrieve event name from the form field
    const eventName = document.getElementById('eventName').value;

    // Delete the event from Firestore
    deleteDoc(doc(db, 'EventList', eventName))
        .then(() => {
            console.log('Event Deleted');
        })
        .catch((error) => {
            console.error('Error deleting event: ', error);
        });
}

