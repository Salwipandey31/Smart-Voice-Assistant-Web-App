document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.talk');
    const content = document.querySelector('.content');
    const responses = {
        'hello': 'Hello Miss Salwi Pandey, I am your virtual assistant.',
        'i want help': 'How can I assist you?',
    };

    // Check if Speech Recognition API is available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        content.textContent = 'Speech recognition not supported in this browser.';
        return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false; 
    recognition.interimResults = false; 
    recognition.lang = 'en-US'; 

    // Handle the result from speech recognition
    recognition.onresult = function(event) {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.toLowerCase();
        content.textContent = transcript;
        handleVoiceCommand(transcript);
    };

    // Process recognized command
    function handleVoiceCommand(command) {
        if (command.includes('open youtube')) {
            content.textContent = 'Opening YouTube...';
            speak('Opening YouTube...');
            window.open('https://www.youtube.com', '_blank');
        } else if (command.includes('hello')) {
            content.textContent = responses['hello'];
            speak('Hello Miss Salwi Pandey');
        } else if (command.includes('what is your name')) {
            content.textContent = 'I am your voice assistant.';
            speak('I am your voice assistant');
        } else if (command.includes('open instagram')) {
            content.textContent = 'Opening Instagram...';
            speak('Opening Instagram');
            window.open('https://www.instagram.com', '_blank'); 
         } else if (command.includes('open chatgpt')) {
                content.textContent = 'Opening chatgpt...';
                speak('Opening chatgpt');
                window.open('https://chatgpt.com/', '_blank'); 
        } else if (command.includes('open spotify')) {
            content.textContent = 'Opening Spotify...';
            window.open('https://open.spotify.com/', '_blank');
        } else if (command.includes('open calculator')) {
            content.textContent = 'Opening Calculator...';
            speak('Opening Calculator...');
            window.open('D:\\VSCodeUserSetup-x64-1.74.0.exe', '_blank');
        } else {
            content.textContent = 'Sorry, I did not understand that. Try saying "open YouTube" or "hello".';
        }
    }

    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    }

    // Start recognition on button click
    btn.addEventListener('click', () => {
        recognition.start();
    });

    // Handle errors during recognition
    recognition.onerror = function(event) {
        content.textContent = 'Error occurred in recognition: ' + event.error;
    };
});
