function updateIngredientIndexes() {
    const amountInputs = document.querySelectorAll('input[name^="recipe[ingredients]"][name$="[amount]"]');
    const unitSelects = document.querySelectorAll('select[name^="recipe[ingredients]"][name$="[measurementShorthand]"]');
    const nameInputs = document.querySelectorAll('input[name^="recipe[ingredients]"][name$="[ingredientName]"]');
    const labelForAmounts = document.querySelectorAll('label[for^="ingredientAmount"]');
    const labelForUnits = document.querySelectorAll('label[for^="ingredientUnit"]');
    const labelForNames = document.querySelectorAll('label[for^="ingredientName"]');

    amountInputs.forEach((amountInput, index) => {
        amountInput.id = `ingredientAmount${index}`;
        amountInput.name = `recipe[ingredients][${index}][amount]`;
    });

    unitSelects.forEach((unitSelect, index) => {
        unitSelect.id = `ingredientUnit${index}`;
        unitSelect.name = `recipe[ingredients][${index}][measurementShorthand]`;
    });

    nameInputs.forEach((nameInput, index) => {
        nameInput.id = `ingredientName${index}`;
        nameInput.name = `recipe[ingredients][${index}][ingredientName]`;
    });

    labelForAmounts.forEach((labelForAmount, index) => {
        labelForAmount.setAttribute('for', `ingredientAmount${index}`);
    });

    labelForUnits.forEach((labelForUnit, index) => {
        labelForUnit.setAttribute('for', `ingredientUnit${index}`);
    });

    labelForNames.forEach((labelForName, index) => {
        labelForName.setAttribute('for', `ingredientName${index}`);
    });
}

function deleteIngredient(button) {
    const ingredientToRemove = button.parentNode;
    const ingredients = Array.from(document.querySelectorAll('.ingredient'));

    const deletedIndex = ingredients.indexOf(ingredientToRemove);

    ingredients.splice(deletedIndex, 1);
    ingredientToRemove.remove();

    updateIngredientIndexes();
}

function disableMeasurementSystem() {
    const ingredientsContainer = document.getElementById('ingredientsContainer');
    const preferredSystem = document.getElementById('preferredSystem');
    if (ingredientsContainer.children.length > 0) {
        preferredSystem.disabled = true;
    }
}

function resetMeasurementSystem() {
    const ingredientsContainer = document.getElementById('ingredientsContainer');
    const measureSystemSelect = document.getElementById('preferredSystem');
    if (ingredientsContainer.children.length === 0) {
        measureSystemSelect.disabled = false;
    }
}

function deleteStep(button) {
    const stepsContainer = document.getElementById('stepsContainer');
    const steps = Array.from(stepsContainer.children);
    const deletedIndex = steps.indexOf(button.parentNode);
    button.parentNode.remove();
    updateStepNumbers(deletedIndex);
}

function updateStepNumbers(deletedIndex) {
    const stepsContainer = document.getElementById('stepsContainer');
    const steps = Array.from(stepsContainer.children);
    steps.forEach((step, index) => {
        const label = step.querySelector('label');
        const textarea = step.querySelector('textarea');

        label.textContent = `Step ${index + 1}:`;
        label.setAttribute('for', `recipeMethod${index}`);

        textarea.id = `recipeMethod${index}`;
        textarea.name = `recipe[method][${index}]`;
    });
    if (deletedIndex !== undefined) {
        stepIndex = steps.length;
    }
}


UpdateHiddenInput();

function UpdateHiddenInput() {
    const selectedSystem = document.getElementById('preferredSystem').value;
    document.getElementById('measurementSystemHidden').value = selectedSystem
}