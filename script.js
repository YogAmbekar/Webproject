
const toggleBtn = document.getElementById("toggle-btn");
const formTitle = document.getElementById("form-title");
const nameField = document.getElementById("name-field");
const toggleText = document.getElementById("toggle-text");

toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (formTitle.textContent === "Sign In") {
        formTitle.textContent = "Sign Up";
        nameField.style.display = "block";
        toggleText.innerHTML = 'Already have an account? <a href="#" id="toggle-btn">Sign In</a>';
    } else {
        formTitle.textContent = "Sign In";
        nameField.style.display = "none";
        toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-btn">Sign Up</a>';
    }
    
    document.getElementById("toggle-btn").addEventListener("click", arguments.callee);
});