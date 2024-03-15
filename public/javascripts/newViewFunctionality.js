function clearFileInput() {
    const container = document.getElementById('previewContainer');
    const fileInput = document.getElementById('fileInput');
    fileInput.value = '';
    container.innerHTML = '';
}

function previewImages(event) {
    const container = document.getElementById('previewContainer');
    const input = event.target;
    const formData = new FormData();

    container.innerHTML = '';

    if (input.files && input.files.length > 0) {
        for (let i = 0; i < input.files.length; i++) {
            const reader = new FileReader();
            const file = input.files[i];

            const miniContainer = document.createElement('div');
            miniContainer.classList.add('minicontainer');
            miniContainer.innerHTML = `
            <div class="card h-100">
                    <div class="card-body d-flex justify-content-center align-items-center h-75">
                        <img class="card-img img-thumbnail previewImage mx-auto">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-end align-items-center">
                        <label class="form-label" name="altTextLabel[]" for="altText${i}">Image ${i + 1} description:</label>
                        <input type="text" name="altText[${i}]" id="altText${i}" placeholder="Image description" maxlength="300" class="form-control" required>
                    </div>
            </div>`;
            container.appendChild(miniContainer);

            reader.onload = function (e) {
                const previewImage = miniContainer.querySelector('.previewImage');
                previewImage.src = e.target.result;
                formData.append(`image[${i}]`, file);
            };

            reader.readAsDataURL(file);
        }
    }
    updateClearButtonVisibility();
}

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', previewImages);

function clearFileInput() {
    const fileInput = document.getElementById('fileInput');
    fileInput.value = '';
    const container = document.getElementById('previewContainer');
    container.innerHTML = '';
    updateClearButtonVisibility();
}

function updateClearButtonVisibility() {
    const clearButton = document.getElementById('clearButton');
    const container = document.getElementById('previewContainer');
    clearButton.style.display = container.children.length ? 'flex' : 'none';
}

let ingredientIndex = 0;

async function addIngredient() {
    const ingredientsContainer = document.getElementById('ingredientsContainer');
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
                <input type="number" min="0" step="any" class="form-control" id="ingredientAmount${ingredientIndex}" name="recipe[ingredients][${ingredientIndex}][amount]" placeholder="-">
            </div>
            <div class="col-12 col-lg-3 col-xl-1 text-sm-start text-lg-end">
                <label class="form-label mt-2" for="ingredientUnit${ingredientIndex}">Unit:</label>
            </div>
            <div class="col-12 col-lg-4 col-xl-2">
                <select class="form-select" id="ingredientUnit${ingredientIndex}" name="recipe[ingredients][${ingredientIndex}][measurementShorthand]">
                    ${preferredSystem.value === 'metric' ? metricUnits.map(unit => `<option value="${unit.value}">${unit.text}</option>`) : imperialUnits.map(unit => `<option value="${unit.value}" data-system="${unit.system}">${unit.text}</option>`)}
                </select>
            </div>
            <div class="col-12 col-lg-3 col-xl-2 text-sm-start text-lg-end">
                <label class="form-label mt-2" for="ingredientName${ingredientIndex}">Ingredient name:</label>
            </div>
            <div class="col-12 col-lg-5 col-xl-3">
                <input class="form-control text-lowercase" id="ingredientName${ingredientIndex}" type="text" name="recipe[ingredients][${ingredientIndex}][ingredientName]" placeholder="-" required>
            </div>
            <div class= "col-12 col-lg-2 col-xl-1 mt-3 mt-md-1 ms-lg-auto">   
                <button type="button" class="btn btn-danger" style="width: 100%;" onclick="deleteIngredient(this.parentNode.parentNode.parentNode); resetMeasurementSystem()">Delete</button>
            </div>
        </div>
    </div>
        `;
    ingredientsContainer.appendChild(ingredientInputs);
    disableMeasurementSystem();
    ingredientIndex++;
    updateIngredientIndexes()
}

let stepIndex = 0;

function addStep() {
    const stepsContainer = document.getElementById('stepsContainer');
    const stepInput = document.createElement('div');
    stepInput.innerHTML = `
        <div class="row mb-2">
            <div class="col-12 col-xl-1">
                <label for="recipeMethod${stepIndex}" class="form-label mt-2">Step ${stepIndex + 1}:</label>
            </div>
            <div class="col-12 col-xl-10">
                <textarea class="form-control" id="recipeMethod${stepIndex}" name="recipe[method][${stepIndex}]" rows="1" cols="50" required></textarea>
            </div>
            <div class="col-xl-1">
                <button type="button" class="btn btn-danger float-end mt-2 mt-xl-0" onclick="deleteStep(this.parentNode.parentNode)">Delete</button>
            </div>
        </div>
    `;
    stepsContainer.appendChild(stepInput);
    stepIndex++;
}

function clearImagesValidation(event) {
    imagesValidation = document.getElementById('imagesValidation');
    imagesValidation.innerHTML = ''
}

const recipeForm = document.getElementById('recipeForm');
recipeForm.addEventListener('submit', function (event) {
    clearImagesValidation(event);
});

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const maxImages = 10;
    const maxImageSizeBytes = 1000000; // Maximum image size in bytes (1 MB)
    const allowedExtensions = ['jpeg', 'jpg', 'png']; // Allowed file extensions

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        let totalSize = 0;
        let valid = true;
        imagesValidation.innerHTML = '';

        // Check the number of files
        if (files.length > maxImages) {
            const invalidMessage = createMessage('invalidMessage', 'text-danger', `You can upload a maximum of ${maxImages} images.`);
            imagesValidation.innerHTML = '';
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