#0.4
sequenceDiagram
    participant browser
    participant server
    Note over browser: User writes a note and clicks the "Save" button
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note left of server: The server saves the new note to the database
    server-->>browser: HTTP status code 302 (URL redirect to /notes)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JS code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "New note", "date": "2024-..." }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
#0.5
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the SPA JavaScript code

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "SPA is fast", "date": "2024-..." }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes to the DOM

#0.6

sequenceDiagram
    participant browser
    participant server

    Note over browser: User writes a note and clicks "Save"
    Note right of browser: JS code adds the note to the local list and rerenders the note list (DOM)

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: Data is sent as JSON: { "content": "...", "date": "..." }
    server-->>browser: 201 Created (Success message)
    deactivate server

    Note right of browser: No redirect or reload occurs; the UI is already updated
