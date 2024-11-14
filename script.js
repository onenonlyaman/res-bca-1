
const icon = document.querySelector('.dark-mode-button');
let homeworkData = []; // Store the homework data globally
let isSorted = false;   // Flag to track sorting state

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        icon.src = "resources/lm.svg";
    } else {
        localStorage.removeItem("darkMode");
        icon.src = "resources/dm.svg";
    }
}

window.onload = () => {
    "enabled" === localStorage.getItem("darkMode") && document.body.classList.add("dark-mode");
};


fetch('homework/homework.json')
    .then(response => response.json())
    .then(data => {
        homeworkData = data; // Store fetched data
        displayHomework(homeworkData); // Initial display
    });


function displayHomework(data) {
    const container = document.getElementById('homework-container');
    container.innerHTML = ''; // Clear existing content


    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'homework-item';
        div.innerHTML = `<h2>${item.title}</h2><p>${item.description}</p><p>${item.date}</p><a href="homework/${item.pdf_link}"><img src="resources/download.svg"></a>`;
        container.appendChild(div);
    });
}

const sortBtn = document.querySelector('.sortBtn');
sortBtn.addEventListener('click', () => {
    isSorted = !isSorted; // Toggle sort state
    const sortedData = [...homeworkData]; // Create a copy for sorting
    sortedData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return isSorted ? dateA - dateB : dateB - dateA; // Sort based on state
    });

    displayHomework(sortedData);

});

// hide button code

let buttonsHidden = false;
let hideAnimationInterval;

function toggleButtons() {
    buttonsHidden = !buttonsHidden;
    const buttons = document.querySelectorAll('.dark-mode-button, .sortBtn, .daSvgWithId');
    const hideBtn = document.querySelector('.hideBtn');

    if (buttonsHidden) {
        hideBtn.src = 'resources/show.svg';
        hideAnimationInterval = setInterval(() => {
            buttons.forEach((button, index) => {
                const delay = index * 100;
                setTimeout(() => {
                    button.style.transition = 'transform 0.3s ease';
                    button.style.transform = `translateX(100px)`;
                }, delay);
            });

            // Clear the interval after all buttons are hidden
            clearInterval(hideAnimationInterval);
        }, 300);

    } else { // Show buttons
        hideBtn.src = 'resources/hide.svg';

        // Immediately show all buttons before animation
        buttons.forEach(button => {
            button.style.display = 'block'; // Ensure buttons are visible before animation
            button.style.transform = 'translateX(0)'; // Reset initial position
        });

        // Animate buttons from right to left
        buttons.forEach((button, index) => {
            const delay = (buttons.length - index - 1) * 100;
            setTimeout(() => {
                button.style.transition = 'transform 0.3s ease';
                button.style.transform = 'translateX(0)'; // Move back to original position
            }, delay);
        });
    }
}
