let currentClusterArray = [];
let currentImageIndex = 0;
let currentArtId = '';

function share() {
    if (navigator.share) {
        navigator.share({
            url: 'https://paavopaavopaavo.github.io/portfolio',
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing: ', error));
    }
}
window.share = share;

// Close modal on 'Escape' key press
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

// Open the Lightbox
function openLightbox(imgElement) {
    document.body.classList.add('modal-open');
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-image');
    const modalTitle = document.getElementById('lightbox-title');
    const modalMedium = document.getElementById('lightbox-medium');
    const captionText = document.getElementById('lightbox-caption');

    const artDiv = imgElement.closest('.art');
    const title = artDiv.querySelector('.art-title').textContent.trim() || '';
    modalTitle.textContent = title;
    currentArtId = artDiv.id;
    
    const artDesc = artDiv.querySelector('.art-desc').innerHTML;
    captionText.innerHTML = artDesc;

    const artMedium = artDiv.querySelector('.art-medium').innerHTML;
    modalMedium.innerHTML = artMedium;

    // Check if the image has a data-gallery attribute
    const galleryName = imgElement.getAttribute('data-gallery');

    if (galleryName) {
        // Collect all images with the same data-gallery attribute
        currentClusterArray = Array.from(artDiv.querySelectorAll('img[data-gallery="' + galleryName + '"]'));
        // Find the index of the clicked image
        currentImageIndex = currentClusterArray.indexOf(imgElement);
    } else {
        // Single image without a cluster
        currentClusterArray = [imgElement];
        currentImageIndex = 0;
    }

    displayCurrentImage();

    modal.style.display = 'flex';

    // Show/hide navigation buttons based on the number of images
    const prevButton = document.getElementById('lightbox-prev');
    const nextButton = document.getElementById('lightbox-next');

    if (currentClusterArray.length > 1) {
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
    } else {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    }
}

// Function to display the current image in the lightbox
function displayCurrentImage() {
    const modalImg = document.getElementById('lightbox-image');
    const imgElement = currentClusterArray[currentImageIndex];
    modalImg.src = imgElement.src;
    modalImg.style.transform = '';
    modalImg.style.transformOrigin = 'center center';
    modalImg.classList.remove('zoomed');
}

// Close the Lightbox
function closeLightbox() {
    document.body.classList.remove('modal-open');
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-image');
    const modalTitle = document.getElementById('lightbox-title');

    modal.style.display = 'none';
    modalImg.classList.remove('zoomed');
    modalImg.style.transform = '';
    modalImg.style.transformOrigin = 'center center';
    modalTitle.textContent = '';
    currentClusterArray = [];
    currentImageIndex = 0;
}

// Event listener for the close button
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

// Close the modal when clicking outside the image
document.getElementById('lightbox-modal').addEventListener('click', function(event) {
    if (event.target === this || event.target.id === 'lightbox-image') {
        closeLightbox();
    }
});

// Toggle zoom on image click
document.getElementById('lightbox-image').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent event from bubbling up to modal
    this.classList.toggle('zoomed');
});

// Next Button
document.getElementById('lightbox-next').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent event from bubbling up
    if (currentClusterArray && currentClusterArray.length > 1) {
        currentImageIndex = (currentImageIndex + 1) % currentClusterArray.length;
        displayCurrentImage();
    }
});

// Previous Button
document.getElementById('lightbox-prev').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent event from bubbling up
    if (currentClusterArray && currentClusterArray.length > 1) {
        currentImageIndex = (currentImageIndex - 1 + currentClusterArray.length) % currentClusterArray.length;
        displayCurrentImage();
    }
});

// share currently opened image when pressing share button, id 'lightbox-share'
document.getElementById('lightbox-share').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent event from bubbling up
    const modalImg = document.getElementById('lightbox-image');
    if (navigator.share) {
        navigator.share({
            // Website url + html id of the clicked image
            url: 'https://paavopaavopaavo.github.io/portfolio#' + currentArtId
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing: ', error));
    }
});

window.openLightbox = openLightbox;