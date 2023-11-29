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

document.getElementById('customForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Add your form submission logic here, for example, using AJAX
    // You can access form data using document.getElementById('name').value, etc.

    // After successful submission, close the form and reset it
    closePopupForm();
    resetForm();
});

// Cart functionality
// Cart array initialization
var cart = [];

// Function to add a cake to the cart
function addToCart(cakeName, clickedElement) {
    if (!cart) {
        // If 'cart' is not properly initialized, initialize it
        cart = [];
    }

    // Get the price from the price tag inside the clicked element
    const priceTag = clickedElement.parentElement.parentElement.querySelector('.price-tag');
    const price = parseFloat(priceTag.textContent.replace('$', ''));

    cart.push({ name: cakeName, price: price });
    updateCartCount();
    updateCartPopupContent();

    // You can add other actions if needed
    console.log('Cake added to cart:', cakeName, 'Price:', price);
}


function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}


function updateCartPopupContent() {
    const cartPopupContent = document.querySelector('.cart-popup-content');
    const emptyCartMessage = document.querySelector('.empty-cart-title');
    let totalPrice = 0;

    // Clear existing content
    cartPopupContent.innerHTML = '';

    if (cart.length === 0) {
        // If cart is empty, show the empty cart message
        emptyCartMessage.style.display = 'block';
    } else {
        // If cart has items, hide the empty cart message
        emptyCartMessage.style.display = 'none';

        cart.forEach((cake, index) => {
            // Create a cart item container
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.style.display = 'flex'; // Set display to flex
            cartItem.style.alignItems = 'center'; // Center items vertically
            cartItem.style.marginBottom = '15px'; // You can adjust the spacing as needed
            cartItem.style.paddingBlockEnd = '30px';

            // Create a delete icon
            const deleteIcon = document.createElement('span');
            deleteIcon.innerHTML = '&minus;'; // This is the "x" symbol
            deleteIcon.className = 'delete-icon';
            deleteIcon.setAttribute('data-index', index); // Save the index for deletion
            deleteIcon.addEventListener('click', deleteCakeFromCart);

            // Create an image element for the cake
            const cakeImage = document.createElement('img');
            cakeImage.src = `photos/${cake.name}.jpg`; // Use cake.name instead of cakeName
            cakeImage.className = 'cart-cake-image';

            // Create a div to hold cake name and price
            const infoContainer = document.createElement('div');
            infoContainer.style.marginLeft = '13px'; // Adjust margin as needed

            // Create a span for the cake name
            const cakeNameSpan = document.createElement('span');
            cakeNameSpan.textContent = cake.name;

            // Create a span for the price
            const priceSpan = document.createElement('span');
            priceSpan.textContent = `$${cake.price.toFixed(2)}`; // Display the price with 2 decimal places

            // Calculate total price
            totalPrice += cake.price;

            // Append the delete icon, cake image, and info container to the cart item
            cartItem.appendChild(deleteIcon);
            cartItem.appendChild(cakeImage);
            cartItem.appendChild(infoContainer);

            // Append the cake name span to the info container
            infoContainer.appendChild(cakeNameSpan);

            // Append the price span to the info container on a new line
            infoContainer.appendChild(document.createElement('br')); // Add line break
            infoContainer.appendChild(priceSpan);

            // Append the cart item to the cart popup content
            cartPopupContent.appendChild(cartItem);
        });

        // Create and append the total price element after the loop
        const totalPriceElement = document.createElement('div');
        totalPriceElement.className = 'total-price';
        totalPriceElement.innerHTML = `<strong>Total Price: </strong> $${totalPrice.toFixed(2)}`;
        totalPriceElement.style.paddingBlockEnd = '70px';
        cartPopupContent.appendChild(totalPriceElement);
    }
}



function deleteCakeFromCart(event) {
    const index = event.target.getAttribute('data-index');
    
    // Remove the cake from the cart based on the index
    cart.splice(index, 1);

    // Update the cart count and cart popup content
    updateCartCount();
    updateCartPopupContent();
}

document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with class 'plus-icon'
    const plusIcons = document.querySelectorAll('.plus-icon');

    // Add click event listener to each plus icon
    plusIcons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            // Get the cake name associated with the clicked plus icon
            const cakeName = this.getAttribute('data-cake-name');
            // Get the price from the data-price attribute
            const price = parseFloat(this.getAttribute('data-price')); // Parse the price as a float

            // Add the cake to the cart
            addToCart(cakeName, price);
        });
    });
});



function toggleCart() {
    const cartPopup = document.querySelector('.cart-popup');
    cartPopup.style.right = cartPopup.style.right === '0px' ? '-500px' : '0px';
}