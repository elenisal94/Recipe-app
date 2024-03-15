function validatePreparationTime() {
    const prepHours = document.getElementById('prepHours').value;
    const prepMinutes = document.getElementById('prepMinutes').value;
    const prepTimeValidation = document.getElementById('prepTimeValidation');

    if (prepHours === '' && prepMinutes === '') {
        document.getElementById('prepHours').required = true;
        document.getElementById('prepMinutes').required = true;
        const invalidMessage = createMessage('invalidMessage', 'text-danger', 'Please provide a preparation time');
        prepTimeValidation.innerHTML = '';
        prepTimeValidation.appendChild(invalidMessage);
        return false;
    } else {
        document.getElementById('prepHours').required = false;
        document.getElementById('prepMinutes').required = false;

        const validMessage = createMessage('validMessage', 'text-success', 'Looks good!');
        prepTimeValidation.innerHTML = '';
        prepTimeValidation.appendChild(validMessage);
        return true;
    }
}

function isEmptyIngredients() {
    const ingredientsContainer = document.getElementById('ingredientsContainer');
    const emptyIngredientsMessage = document.getElementById('emptyIngredientsMessage');
    if (ingredientsContainer.childElementCount === 0) {
        const invalidMessage = createMessage('invalidMessage', 'text-danger', 'Please add at least one ingredient to your recipe');
        emptyIngredientsMessage.innerHTML = '';
        emptyIngredientsMessage.appendChild(invalidMessage);
        return false;
    } else {
        emptyIngredientsMessage.innerHTML = '';
        return true;
    }
}

function validateUnitsWithoutAmount() {
    const ingredients = document.querySelectorAll('.ingredient');

    let invalidIngredientFound = false;
    ingredients.forEach(function (ingredient) {
        const unit = ingredient.querySelector('.form-select').value;
        const amount = ingredient.querySelector('.form-control[type="number"]')

        if (unit !== 'null' && !amount.value) {
            invalidIngredientFound = true;
            amount.required = true;
        }
    });
    if (invalidIngredientFound) {
        return false;
    } else {
        const allAmountFields = document.querySelectorAll('.form-control[type="number"]');
        allAmountFields.forEach(function (amountField) {
            amountField.required = false;
        });
        return true;
    }
}

function isEmptyMethod() {
    const stepsContainer = document.getElementById('stepsContainer')
    const missingMethodContainer = document.getElementById('missingMethodMessage');
    if (stepsContainer.childElementCount === 0) {
        const invalidMessage = createMessage('invalidMessage', 'text-danger', 'Please add at least one step to your recipe method');
        missingMethodContainer.innerHTML = '';
        missingMethodContainer.appendChild(invalidMessage);
        return false;
    } else {
        missingMethodContainer.innerHTML = '';
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

function checkRequiredFields(form) {
    const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    for (const input of requiredInputs) {
        if (!input.value.trim()) {
            return false;
        }
    }
    return true;
}


document.addEventListener('DOMContentLoaded', function () {
    const ingredients = document.querySelectorAll('.ingredient')
    const prepHours = document.getElementById('prepHours');
    const prepMinutes = document.getElementById('prepMinutes');
    const ingredientsContainer = document.getElementById('ingredientsContainer')
    const stepsContainer = document.getElementById('stepsContainer')
    const recipeForm = document.getElementById('recipeForm');
    let formSubmitted = false;
    recipeForm.addEventListener('submit', function () { formSubmitted = true });
    let isErrorMessageDisplayed = false;

    function validateAndPreventSubmission(event) {
        validatePreparationTime();
        isEmptyIngredients();
        validateUnitsWithoutAmount();
        isEmptyMethod();
        checkRequiredFields(recipeForm);
        if ((!validatePreparationTime()) || (!isEmptyIngredients()) || (!isEmptyMethod()) || (!checkRequiredFields(recipeForm)) || (!validateUnitsWithoutAmount())) {
            event.preventDefault();
            if (!isErrorMessageDisplayed) {
                isErrorMessageDisplayed = true;
                const formMessageContainer = document.getElementById('formMessage');
                const errorMessage = createMessage('invalidMessage', 'text-danger', 'Oops! Looks like something is missing, please have a look above ❤️‍🩹');
                errorMessage.className = 'fade-out-message text-center';
                formMessageContainer.appendChild(errorMessage);
                void errorMessage.offsetWidth;
                setTimeout(() => {
                    errorMessage.classList.add('fade-out');
                    setTimeout(() => {
                        errorMessage.remove();
                        isErrorMessageDisplayed = false;
                    }, 1000);
                }, 6000);
            }
        }
    }

    prepHours.addEventListener('change', function () {
        if (formSubmitted) {
            validatePreparationTime();
        }
    });

    prepMinutes.addEventListener('change', function () {
        if (formSubmitted) {
            validatePreparationTime();
        }
    });

    // Empty list mutation observer

    const emptyListsObserver = new MutationObserver(function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && formSubmitted) {
                isEmptyIngredients();
                isEmptyMethod();
            }
        }
    });

    const observerConfig = { childList: true };

    emptyListsObserver.observe(ingredientsContainer, observerConfig);
    emptyListsObserver.observe(stepsContainer, observerConfig);

    // Unit amount mutation observer

    function handleMutation(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    node.addEventListener('change', function () {
                        if (formSubmitted) {
                            validateUnitsWithoutAmount();
                        }
                    });
                });
            }
        }
    }


    const config = {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ['value'],
        subtree: true,
    };

    const observer = new MutationObserver(handleMutation);
    observer.observe(ingredientsContainer, config);

    recipeForm.addEventListener('submit', function (event) {
        validateAndPreventSubmission(event);
    });
});
