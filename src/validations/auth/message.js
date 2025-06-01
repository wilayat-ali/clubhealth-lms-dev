export const login = {
    email: {
        required: 'Email field is required.',
        invalid: 'You have entered an invalid email.',
    },
    password: {
        required: 'Password field is required.',
        invalid:
            'You have entered an invalid email or password! Please try again',
    },
    serverError: 'Something went wrong. Please try again.',
}

export const otp = {
    length: 'OTP must be exactly 6 characters.',
    required: 'OTP must contain only letters and numbers.',
}

export const forgotPassword = {
    email: {
        required: 'Email field is required.',
        invalid: 'You have entered an invalid email.',
    },
}

export const signup = {
    firstName: {
        required: 'First name is required.',
        invalid: 'First name can only contain letters.',
    },
    lastName: {
        required: 'Last name is required.',
        invalid: 'Last name can only contain letters.',
    },
    email: {
        required: 'Email address is required.',
        invalid: 'Please enter a valid email address (e.g., name@example.com).',
    },
    image: {
        imageSize: 'File size should not exceed 5MB.',
        invalidType: 'Please upload a valid image file (JPG, PNG).',
    },
    password: {
        required: 'Password is required.',
        length: 'Password must be at least 12 characters.',
        invalid:
            'Password must include uppercase, lowercase, numbers, and special characters.',
        confirmPasswordRequired: 'Confirm password is required.',
        confirmPasswordMatch: 'Passwords do not match.',
    },
}
