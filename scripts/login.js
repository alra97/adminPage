document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const securityQuestions = document.getElementById('securityQuestions');
    const securityQuestionLabel = document.getElementById('securityQuestionLabel');
    const securityAnswer = document.getElementById('securityAnswer');
    const checkAnswerButton = document.getElementById('checkAnswerButton');

    // Hardcoded password
    const correctPassword = "pass20word24";
    // Hardcoded security questions and answers
    const securityQuestionsData = [
        { question: "What is the most popular snack in the canteen?", answer: "MALHARPAV" },
        { question: "What is the second letter in the word FOYER?", answer: "Y" }
    ];

    // Event listener for login button
    loginButton.addEventListener('click', function() {
        const enteredPassword = passwordInput.value;

        // Check if the entered password is correct
        if (enteredPassword === correctPassword) {
            // Redirect to main page if correct
            window.location.href = 'pages/main.html';
        } else {
            // Show an alert if the password is incorrect
            alert('Incorrect password. Please try again.');
        }
    });

    // Event listener for toggle password button
    togglePasswordButton.addEventListener('click', function() {
        // Toggle password visibility
        const passwordFieldType = passwordInput.getAttribute('type');
        if (passwordFieldType === 'password') {
            passwordInput.setAttribute('type', 'text');
        } else {
            passwordInput.setAttribute('type', 'password');
        }
    });

    // Event listener for forgot password link
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior

        // Hide password field and login button
        passwordInput.style.display = 'none';
        togglePasswordButton.style.display = 'none';
        loginButton.style.display = 'none';
        
        // Hide labels for password and forgot password
        document.querySelector('label[for="password"]').style.display = 'none';
        document.getElementById('forgotPasswordLink').style.display = 'none';

        // Show security questions
        const randomQuestion = securityQuestionsData[Math.floor(Math.random() * securityQuestionsData.length)];
        securityQuestionLabel.textContent = randomQuestion.question;
        securityQuestions.style.display = 'block';
    });

    // Event listener for check answer button
    checkAnswerButton.addEventListener('click', function() {
        const enteredAnswer = securityAnswer.value.toLowerCase();
        const currentQuestion = securityQuestionLabel.textContent;

        // Check if entered answer is correct for the current question
        const correctAnswer = securityQuestionsData.find(question => question.question === currentQuestion).answer.toLowerCase();
        if (enteredAnswer === correctAnswer) {
            // Redirect to main page
            window.location.href = 'pages/main.html';
        } else {
            // Show an alert if answer is incorrect
            alert('Incorrect answer. Please try again.');
        }

        // Clear input boxes
        securityAnswer.value = '';
    });
});
