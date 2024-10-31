const categories = {
    all: 'https://cataas.com/cat',
    grayscale: 'https://cataas.com/cat?filter=grayscale',
    text: 'https://cataas.com/cat/says/'
};

// fetching images from Cataas API based on filter and search query
function fetchImages(filter = 'all', text = '') {
    $('#gallery').empty();
    for (let i = 0; i < 12; i++) {  // Display 12 cat images
        let imgUrl = categories[filter];
        imgUrl += filter === 'text' ? `${text}?${Math.random()}` : `?${Math.random()}`;

        const imgElement = `<div class="gallery-item">
                                <img src="${imgUrl}" alt="Cat Picture">
                            </div>`;
        $('#gallery').append(imgElement);
    }
}

// Handle search button click
$('#search-button').click(function() {
    const searchQuery = $('#search-input').val().trim();
    const filter = $('#filter-select').val();
    fetchImages(filter, searchQuery);
});

// Lightbox functionality
$(document).on('click', '.gallery-item img', function() {
    const imgSrc = $(this).attr('src');
    $('#lightbox-img').attr('src', imgSrc);
    $('#lightbox').fadeIn();
});

// Close lightbox
$('#close-lightbox').click(function() {
    $('#lightbox').fadeOut();
});

// Mood Board functionality
$(document).on('click', '.gallery-item img', function() {
    const imgSrc = $(this).attr('src');
    const alreadyInBoard = $(`#mood-board-items img[src="${imgSrc}"]`).length > 0;

    if (alreadyInBoard) {
        $(`#mood-board-items img[src="${imgSrc}"]`).parent().remove();
    } else {
        const moodBoardItem = `<div class="mood-board-item">
                                   <img src="${imgSrc}" alt="Mood Board Image">
                               </div>`;
        $('#mood-board-items').append(moodBoardItem);
        $('#mood-board').fadeIn();
    }
});

// Initial load with default cat images
fetchImages();
