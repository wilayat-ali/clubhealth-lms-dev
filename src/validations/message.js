export const updateProfile = {
    firstName: {
        required: 'First name is required.',
        format: 'First name cannot contain numbers or special characters.',
    },
    lastName: {
        required: 'Last name is required.',
        format: 'Last name cannot contain numbers or special characters.',
    },
    email: {
        required: 'Email address is required.',
        format: 'Please enter a valid email address (e.g., name@example.com).',
    },
    password: {
        oldPassword: {
            required: 'Old password is required to set a new password.',
        },
        newPassword: {
            required: 'Please enter a new password.',
            format: 'Include a mix of letters, numbers, and symbols.',
            length: 'Password must be at least 8 characters and',
        },
        confirmPassword: {
            required: 'Please confirm your new password.',
            invalid: 'New password and confirm password do not match.',
        },
    },
}

export const message = {
    messageType: {
        required: 'Please select a message type.',
    },

    subject: {
        required: 'Subject is required.',
        minLength: 'Subject must be at least 3 characters long.',
        maxLength: 'Subject cannot exceed 100 characters.',
    },
    message: {
        required: 'Message cannot be empty.',
        minLength: 'Insufficient message length — try adding more information.',
        maxLength: 'Message cannot exceed 1000 characters.',
    },
}

export const configrations = {
    authorisedBy: {
        required: 'Authorised by is required.',
    },

    designation: {
        required: 'Designation is required.',
    },
    signature: {
        required: 'signature is required.',
    },
    contactEmail: {
        required: 'Email is required.',
        format: 'Please enter a valid email.',
    },
    contactPhone: {
        required: 'Contact Phone is required.',
    },
}

export const adminTutorMessages = {
    firstNameRequired: 'Please enter the first name.',
    firstNameFormat: 'First name must contain only letters.',
    lastNameRequired: 'Please enter the last name.',
    lastNameFormat: 'Last name must contain only letters.',
    emailRequired: 'Please enter an email address.',
    emailFormat: 'Please enter a valid email address.',
    roleRequired: 'Please select a role.',
    profilePictureFormat: 'Only JPG and PNG images under 2MB are allowed.',
    designationLength: 'Designation must be less than 100 characters.',
    shortBioLength: 'Short bio must not exceed 300 characters.',
}

export const learnerProfileMessages = {
    statusRequired: 'Status is required.',
    groupRequired: 'Learner group is required.',
}

export const question = {
    question: 'Question is required.',
    answer: 'Answer is required.',
}

export const addAssessmentMessages = {
    title: 'Title is required.',
    subtitle: 'Subtitle is required.',
    shortDescription: 'Short description is required.',
    passingScore: {
        required: 'Passing score is required.',
        invalid: 'Passing score must be a number between 0 and 100.',
    },
    questionLimit: {
        required: 'Question limit is required.',
        invalid: 'Question limit must be a positive number.',
    },
}

export const addQuestionMessages = {
    questionTypeRequired: 'Please select a question type.',
    questionRequired: 'Question is required.',
    optionTextRequired: 'Option text is required.',
    minOptions: 'At least two options are required.',
}

export const moduleMessages = {
    title: {
        required: 'Title is required.',
    },
    estimatedTime: {
        required: 'Estimated time is required.',
    },
}

export const assessmentMessages = {
    type: {
        required: 'Assessment type is required.',
    },
}

export const contentMessages = {
    details: {
        required: 'Details are required.',
    },
}

export const videoMessages = {
    file: {
        required: 'File is required.',
    },
}

export const documentMessages = {
    file: {
        required: 'File is required.',
    },
}

export const addCourseMessages = {
    title: 'Please enter a course title.',
    status: 'Please select a course status.',
    prerequisite: 'Prerequisite is required.',
    shortDescription: {
        required: 'Please enter a short course description.',
        min: 'Please enter a short course description.',
        max: 'Description should be between 20 and 300 characters.',
    },
    instructor: 'Instructor is required.',
    learnerGroups: 'Learner groups is required.',
    timeToComplete: 'Time to complete is required.',
    certificateUponCompletion:
        'Please specify whether a certificate is awarded.',
    file: 'File is required.',
}
