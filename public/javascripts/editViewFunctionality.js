document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', (event) => {
        const existingImagesElement = document.getElementById('existingImages');
        const existingImagesString = existingImagesElement.getAttribute('data-recipe-images');
        const existingImages = JSON.parse(existingImagesString);
        previewImages(event, existingImages);
    });
});

function previewImages(event, existingImages) {
    const imageInput = event.target;
    const container = document.getElementById('newImagesContainer');
    const imageLength = existingImages.length;
    const formData = new FormData();

    container.innerHTML = '';

    if (imageInput.files && imageInput.files.length > 0) {
        for (let i = 0; i < imageInput.files.length; i++) {
            const reader = new FileReader();
            const file = imageInput.files[i];
            const miniContainer = document.createElement('div');
            miniContainer.classList.add('miniContainer');
            miniContainer.innerHTML = `
            <div class="card h-100">
                    <div class="card-body d-flex justify-content-center align-items-center h-75">
                        <img class="card-img img-thumbnail previewImage mx-auto">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-end align-items-center">
                        <label class="form-label" name="altTextLabel[]" for="altText${imageLength + i}">Image ${imageLength + 1 + i} description:</label>
                        <input type="text" name="newAltText[${imageLength + i}]" id="altText${imageLength + i}" placeholder="Image description" maxlength="300" class="form-control" required>
                    </div>
            </div>`;
            container.appendChild(miniContainer);

            reader.onload = function (e) {
                const previewImage = miniContainer.querySelector('.previewImage');
                previewImage.src = e.target.result;
                formData.append(`image[${imageLength + i}]`, file);
            };

            reader.readAsDataURL(file);
        }
    }
    updateClearButtonVisibility();
    updateImageIndexes();
}

function clearFileInput() {
    const fileInput = document.getElementById('fileInput');
    fileInput.value = '';
    const newImagesContainer = document.getElementById('newImagesContainer');
    newImagesContainer.innerHTML = '';
    updateClearButtonVisibility();
    noImagesValidation();
}

function updateClearButtonVisibility() {
    const clearButton = document.getElementById('clearButton');
    const newImagesContainer = document.getElementById('newImagesContainer');
    clearButton.style.display = newImagesContainer.children.length ? 'flex' : 'none';
}

document.getElementById('newImagesContainer').addEventListener('change', updateClearButtonVisibility);
const checkboxes = document.querySelectorAll('.btn-check');
const deleteImages = [];

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const filename = this.value;
        const miniContainer = this.closest('.miniContainer');
        if (this.checked) {
            deleteImages.push(filename);
            miniContainer.remove();
            updateImageIndexes();
        } else {
            const index = deleteImages.indexOf(filename);
            if (index !== -1) {
                deleteImages.splice(index, 1);
            }
        }
    });
});


function createDeletedImageHiddenInputs() {
    const form = document.querySelector('#recipeForm');
    deleteImages.forEach(filename => {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'deleteImages[]';
        hiddenInput.value = filename;
        form.appendChild(hiddenInput);
        console.log(hiddenInput)
    });
}

const recipeForm = document.getElementById('recipeForm');
recipeForm.addEventListener('submit', function (event) {
    createDeletedImageHiddenInputs();
});

function updateImageIndexes() {
    const labels = document.querySelectorAll('[name^="altTextLabel["]');
    const inputs = document.querySelectorAll('[name^="altText["]');
    const newInputs = document.querySelectorAll('[name^="newAltText["]');
    const checkboxes = document.querySelectorAll('.card .card-body input[type="checkbox"]');
    const deleteImageButtons = document.querySelectorAll('label[name="deleteImageButton"]');
    const cardHolder = document.querySelector('#cardHolder');

    labels.forEach((label, index) => {
        label.textContent = `Image ${index + 1} description:`;
        label.setAttribute('for', `altText${index}`);
    });

    inputs.forEach((input, index) => {
        input.name = `altText[${index}]`;
        input.id = `altText${index}`
    })

    newInputs.forEach((input, index) => {
        input.name = `newAltText[${index}]`;
        input.id = `altText${cardHolder.children.length + index}`
    })

    checkboxes.forEach((checkbox, index) => {
        checkbox.id = `image-${index}`;
    });

    deleteImageButtons.forEach((button, index) => {
        button.setAttribute('for', `image-${index}`);
    });


}

document.addEventListener('DOMContentLoaded', () => {
    const preferredSystem = document.getElementById('preferredSystem').value;

    if (preferredSystem === 'metric') {
        const metricIngredientsData = document.getElementById('metricIngredients').dataset.metricRecipeIngredients;
        const metricIngredients = JSON.parse(metricIngredientsData);
        metricIngredients.forEach(ingredientData => {
            addIngredient(ingredientData);
        });
    } else {
        const imperialIngredientsData = document.getElementById('imperialIngredients').dataset.imperialRecipeIngredients;
        const imperialIngredients = JSON.parse(imperialIngredientsData);
        imperialIngredients.forEach(ingredientData => {
            addIngredient(ingredientData);
        });
    }
});

let ingredientIndex = 0;
function addIngredient(ingredientData = {}) {
    const container = document.getElementById('ingredientsContainer');
    const ingredientInputs = document.createElement('div');
    const preferredSystem = document.getElementById('preferredSystem');
    const metricUnits = [{ value: null, text: '-' },
    { value: "tsp", text: "teaspoons" },
    { value: "Tbs", text: "tablespoons" },
    { value: "cup", text: "cups" },
    { value: "mg", text: "milligrams" },
    { value: "ml", text: "milliliters" },
    { value: "l", text: "liters" },
    { value: "g", text: "grams" },
    { value: "kg", text: "kilograms" },
    ];
    const imperialUnits = [{ value: null, text: '-' },
    { value: "tsp", text: "teaspoons" },
    { value: "Tbs", text: "tablespoons" },
    { value: "cup", text: "cups" },
    { value: "fl-oz", text: "fluid ounces" },
    { value: "oz", text: "ounces" },
    { value: "lb", text: "pounds" },
    { value: "qt", text: "quarts" },
    ];

    ingredientInputs.innerHTML = `
    <div class="list-group-item">
        <div class="row g-1 ingredient">
            <div class="col-12 col-lg-2 col-xl-1 text-sm-start text-lg-end">
                <label class="form-label mt-2" for="ingredientAmount${ingredientIndex}">Amount:</label>
            </div>
            <div class="col-12 col-lg-3 col-xl-2">
                <input class="form-control" type="number" step="any" min="0" placeholder="-" id="ingredientAmount${ingredientIndex}" name="recipe[ingredients][${ingredientIndex}][amount]" value="${ingredientData.amount || ''}">
            </div>
            <div class="col-12 col-lg-3 col-xl-1 text-sm-start text-lg-end">
                <label class="form-label mt-2" for="ingredientUnit${ingredientIndex}">Unit:</label>
            </div>
            <div class="col-12 col-lg-4 col-xl-2">
                <select class="form-select" id="ingredientUnit${ingredientIndex}" name="recipe[ingredients][${ingredientIndex}][measurementShorthand]">
                ${preferredSystem.value === 'metric' ? metricUnits.map(unit => `<option value="${unit.value}" ${unit.value === ingredientData.measurementShorthand ? 'selected' : ''}>${unit.text}</option>`) :
            imperialUnits.map(unit => `<option value="${unit.value}" ${unit.value === ingredientData.measurementShorthand ? 'selected' : ''}>${unit.text}</option>`)}
                </select>
            </div>
            <div class="col-12 col-lg-3 col-xl-2 text-sm-start text-lg-end">
                <label class="form-label mt-2" for="ingredientName${ingredientIndex}">Ingredient name:</label>
            </div>
            <div class="col-12 col-lg-5 col-xl-3">
                <input class="form-control text-lowercase" type="text" id="ingredientName${ingredientIndex}" name="recipe[ingredients][${ingredientIndex}][ingredientName]" value="${ingredientData.ingredientName || ''}" required>
            </div>
            <div class= "col-12 col-lg-2 col-xl-1 mt-3 mt-md-1">
                <button type="button" class="btn btn-danger" style="width: 100%;" onclick="deleteIngredient(this.parentNode.parentNode.parentNode); resetMeasurementSystem()">Delete</button>
            </div>
        </div>
    </div>
    `;
    container.appendChild(ingredientInputs);
    disableMeasurementSystem();
    ingredientIndex++;
    updateIngredientIndexes()
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('stepsContainer');
    if (container) {
        const recipeMethodElement = document.getElementById('recipeMethod');
        if (recipeMethodElement) {
            const recipeMethodString = recipeMethodElement.getAttribute('data-recipe-method');
            const recipeMethod = JSON.parse(recipeMethodString);

            recipeMethod.forEach(step => {
                addStep(step);
            });
        }
    }
});

let stepIndex = 0;
function addStep(stepText = '') {
    const stepsContainer = document.getElementById('stepsContainer');
    const stepInput = document.createElement('div');
    stepInput.innerHTML = `
        <div class="row mb-2">
            <div class="col-12 col-xl-1">
                <label class="form-label mt-2" for="recipeMethod${stepIndex}">Step ${stepIndex + 1}:</label>
            </div>
            <div class="col-12 col-xl-10">
                <textarea class="form-control" id="recipeMethod${stepIndex}" name="recipe[method][${stepIndex}]" rows="1" cols="50" required>${stepText}</textarea>
            </div>
            <div class="col-xl-1">
                <button type="button" class="btn btn-danger float-end mt-2 mt-xl-0" onclick="deleteStep(this.parentNode.parentNode)">Delete</button>
            </div>
        </div>
    `;
    stepsContainer.appendChild(stepInput);
    stepIndex++;
}

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const imagesValidation = document.getElementById('imagesValidation');
    const maxImages = 10;
    const maxImageSizeBytes = 1000000; // Maximum image size in bytes (1 MB)
    const allowedExtensions = ['jpeg', 'jpg', 'png']; // Allowed file extensions

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        const totalImages = files.length + Array.from(document.querySelectorAll('#existingImagesContainer input[type="checkbox"]'))
            .filter(checkbox => !checkbox.checked)
            .length;
        let totalSize = 0;
        let valid = true;
        imagesValidation.innerHTML = '';

        // Check the number of files
        if (totalImages > maxImages) {
            const invalidMessage = createMessage('invalidMessage', 'text-danger', `You can upload a maximum of ${maxImages} images.`);
            imagesValidation.appendChild(invalidMessage);
            valid = false;
        }

        // Check the size and type of each file
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            totalSize += file.size;

            // Check file size
            if (file.size > maxImageSizeBytes) {
                const invalidMessage = createMessage('invalidMessage', 'text-danger', `File "${file.name}" exceeds the maximum size of 1MB. Please choose another image or try compress your image at https://compressjpeg.com/ `);
                imagesValidation.innerHTML = '';
                imagesValidation.appendChild(invalidMessage);
                valid = false;
            }

            // Check file type (extension)
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                const invalidMessage = createMessage('invalidMessage', 'text-danger', `"${file.name}" is an invalid file type. Please make sure your images are one of the following: jpeg, jpg, png`);
                imagesValidation.innerHTML = '';
                imagesValidation.appendChild(invalidMessage);
                valid = false;
            }
        }

        // If any validation failed, clear the file input
        if (!valid) {
            clearFileInput()
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('#existingImagesContainer input[type="checkbox"]');
    const fileInput = document.getElementById('fileInput');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', noImagesValidation);
    });

    fileInput.addEventListener('change', noImagesValidation);
});


function noImagesValidation() {
    const existingImagesContainer = document.getElementById('existingImagesContainer');
    const checkboxes = existingImagesContainer.querySelectorAll('input[type="checkbox"]');
    const files = document.getElementById('fileInput').files;

    let allChecked = true;

    checkboxes.forEach(function (checkbox) {
        if (!checkbox.checked) {
            allChecked = false;
            return;
        }
    });

    const imagesValidation = document.getElementById('imagesValidation');
    if (allChecked && files.length === 0) {
        const invalidMessage = createMessage('invalidMessage', 'text-danger', 'There must be at least one image for this recipe (maximum size: 1MB, file type: jpeg, jpg, png)');
        imagesValidation.innerHTML = '';
        imagesValidation.appendChild(invalidMessage);
        fileInput.required = true;
    } else if (imagesValidation.innerHTML.trim() === '') {
        imagesValidation.innerHTML = '';
        fileInput.required = false;
    }
}