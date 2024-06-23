import speech_recognition as sr
import pyttsx3

recognizer = sr.Recognizer()
engine = pyttsx3.init()

while True:
    try:
        with sr.Microphone() as mic:
            recognizer.adjust_for_ambient_noise(mic, duration=0.2)
            print("Listening...")
            audio = recognizer.listen(mic)
            text = recognizer.recognize_google(audio)
            text = text.lower()
            print(f"Recognized: {text}")
            engine.say(text)
            engine.runAndWait()
            
    except sr.UnknownValueError:
        recognizer = sr.Recognizer()
        print("Could not understand the audio. Please speak again.")

    except sr.RequestError as e:
        print(f"Could not request results from Google Speech Recognition service; {e}")
        
    except KeyboardInterrupt:
        print("Program stopped by user.")
        break
