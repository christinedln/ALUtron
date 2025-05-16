# ALUtron

**ALUtron** is a web-based simulation tool designed and developed to provide an interactive digital platform that simulates the core functionalities of an Arithmetic Logic Unit (ALU). The system features an ALU model capable of performing fundamental arithmetic operations such as addition and subtraction, as well as logical operations including AND, OR, and NOT. Built with a React frontend and a Flask (Python) backend, ALUtron offers users an intuitive interface where binary values can be input through clickable buttons that toggle between 0 and 1. The tool dynamically processes these inputs and displays the results in real time, effectively demonstrating the behavior of an ALU at the binary level in an engaging and educational manner.

---

## Purpose

- Reinforce foundational concepts in digital logic and computation.
- Provide an accessible, web-based environment for learning and exploring ALU operations.
- Help users visualize how arithmetic and logical operations are executed in hardware.
- Serve as an educational tool to support digital electronics and computer architecture learning.

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, Tailwind, React
- **Backend/AI**: Python, Flask
- **Version Control**: GitHub

---

## Setup Instructions
 
 ### Backend Setup
 
 1. Create a virtual environment:
    ```
    python -m venv .venv
    ```
 
 2. Activate the virtual environment:
    - Windows: `.venv\Scripts\activate`
    - macOS/Linux: `source .venv/bin/activate`
 
 3. Install dependencies:
    ```
    pip install flask
    pip install flask-cors
    ```
 
 4. Run the Flask application:
    ```
    python app.py
    ```
 
 ### Frontend Setup
 1. Install dependencies
     ```
    npm install --save-dev vite
    ```  
 3. Run Frontend
     ```
    npm start
    ```  
 ---
