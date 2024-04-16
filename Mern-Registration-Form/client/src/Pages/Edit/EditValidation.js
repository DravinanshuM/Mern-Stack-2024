// HandleValidation function
const handleValidation = (inputRef, errorMessage, condition) => {
    if (!inputRef || !inputRef.current) {
        console.error("Input ref is not properly set.");
        return errorMessage; // Return error message if inputRef is not properly set
    }

    const { current } = inputRef;
    if (!current) {
        console.error("Input ref current is not properly set.");
        return errorMessage; // Return error message if inputRef.current is not properly set
    }

    if (condition) {
        current.focus();
        if (current.style) {
            current.style.border = "1px solid red";
        }
        return errorMessage;
    } else {
        current.blur();
        if (current.style) {
            current.style.border = "1px solid green";
        }
        return false;
    }
};


// EditValidation function
const EditValidation = (inputValue, status, profile, getReferences) => {
    const { firstName, lastName, email, mobile, gender, address } = inputValue;
    const { firstNameRef, lastNameRef, emailRef, mobileRef, genderRef, addressRef, statusRef } = getReferences;

    // Validate first name
    if (firstName.trim() === "") {
        return handleValidation(firstNameRef, "Please enter First name!", true);
    } else if (firstName.length < 2 || firstName.length > 20) {
        return handleValidation(firstNameRef, "Please enter First name between 2 and 20 characters!", true);
    } else if (!/^[a-zA-Z\s'-]+$/.test(firstName)) {
        return handleValidation(firstNameRef, "First name contains invalid characters!", true);
    } else if (firstName.trim() !== firstName) {
        return handleValidation(firstNameRef, "Username should not contain leading or trailing spaces", true);
    } else {
        handleValidation(firstNameRef, "", false);
    }

    // Validate last name
    if (lastName.trim() === "") {
        return handleValidation(lastNameRef, "Please enter Last name!", true);
    } else if (lastName.length < 2 || lastName.length > 20) {
        return handleValidation(lastNameRef, "Please enter Last name between 2 and 20 characters!", true);
    } else if (!/^[a-zA-Z\s'-]+$/.test(lastName)) {
        return handleValidation(lastNameRef, "Last name contains invalid characters!", true);
    } else if (lastName.trim() !== lastName) {
        return handleValidation(lastNameRef, "Username should not contain leading or trailing spaces", true);
    } else {
        handleValidation(lastNameRef, "", false);
    }

    // Validate email
    if (email.trim() === "") {
        return handleValidation(emailRef, "Please enter email!", true);
    } else if (!/^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(email)) {
        return handleValidation(emailRef, "Email is not valid!", true);
    } else {
        handleValidation(emailRef, "", false);
    }

    // Validate mobile
    if (mobile.trim() === "") {
        return handleValidation(mobileRef, "Please enter mobile number!", true);
    } else if (!/^\d{10}$/.test(mobile)) {
        return handleValidation(mobileRef, "Please enter a valid 10-digit mobile number!", true);
    } else {
        handleValidation(mobileRef, "", false);
    }

    // Validate Gender
    if (!gender) {
        return handleValidation(genderRef, "Please select a gender!", true);
    } else {
        handleValidation(genderRef, "", false);
    }

    // Validate Status
    if (!status) {
        return handleValidation(statusRef, "Please select a status!", true);
    } else {
        handleValidation(statusRef, "", false);
    }

    // // Validate Profile
    // if (!profile) {
    //     return handleValidation(profileRef, "Please select a profile!", true);
    // } else {
    //     handleValidation(profileRef, "", false);
    // }

    // Validate Address
    if (address.trim() === "") {
        return handleValidation(addressRef, "Please enter address!", true);
    } else if (address.length < 20 || address.length >= 150) {
        return handleValidation(addressRef, "Please enter at least 20 to 150 characters ", true);
    } else {
        handleValidation(addressRef, "", false); // Apply green border
    }

    // No errors, return false
    return false;
};

export default EditValidation;
