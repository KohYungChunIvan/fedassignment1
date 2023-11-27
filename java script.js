let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("active");
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 5000); // Change image every 5 seconds (5000 milliseconds)
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("active");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}
document.getElementById('home-link').addEventListener('click', function() {
// Redirect to the homepage (index.html)
window.location.href = 'index.html';
});

const videoContainer = document.getElementById('video-container');
const localVideo = document.getElementById('local-video');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
};

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Video is in the viewport, start playing
            localVideo.play();
            localVideo.removeAttribute('controls', 'true'); // remove controls
        } else {
            // Video is out of the viewport, pause
            localVideo.pause();
        }
    });
}, options);

videoObserver.observe(videoContainer);

// JavaScript for Pop-up Form
function openPopupForm() {
    // Clear the form fields
    resetForm();
    document.querySelector('.popup-content').style.display = 'block';
}

function closePopupForm() {
    document.querySelector('.popup-content').style.display = 'none';
}

// Function to reset the form fields
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('email').value = '';
    document.getElementById('description').value = '';
    document.getElementById('file').value = '';
}

// Optional: You can handle form submission using AJAX or any other method you prefer
document.getElementById('customForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Add your form submission logic here, for example, using AJAX
    // You can access form data using document.getElementById('name').value, etc.

    // After successful submission, close the form and reset it
    closePopupForm();
    resetForm();
});


