document.addEventListener('DOMContentLoaded', function () {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        const starsValidation = document.getElementById('starsValidation');

        function validateStars() {
            const selectedRating = document.querySelector('input[name="review[rating]"]:checked');
            if (!selectedRating || selectedRating.value === "0") {
                const invalidMessage = createMessage('invalidMessage', 'text-danger', 'Please rate the recipe');
                starsValidation.innerHTML = '';
                starsValidation.appendChild(invalidMessage);
                return false;
            } else {
                starsValidation.innerHTML = '';
                return true;
            }
        }

        function createMessage(id, className, text) {
            const message = document.createElement('div');
            message.setAttribute('id', id);
            message.classList.add(className);
            message.innerHTML = `<small>${text}</small>`;
            return message;
        }

        function validateAndPreventSubmission(event) {
            const formSubmitted = true; // Set formSubmitted to true when the form is submitted
            if (!validateStars()) {
                event.preventDefault();
            }
        }

        reviewForm.addEventListener('submit', validateAndPreventSubmission);

        const ratingRadios = document.querySelectorAll('input[name="review[rating]"]');
        ratingRadios.forEach(radio => {
            radio.addEventListener('change', validateStars);
        });
    };
});

