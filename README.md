# User Application Form

This simple User Application Form project provides an interactive form for users to fill in their personal details. It includes several components and features to enhance the user experience, such as toggle buttons, modals, and interactive feedback during the form-filling process.

## Features

- **Interactive Toggle Buttons**: The toggle buttons change color based on correctness—**green** for correct inputs and **red** for incorrect ones. They also toggle back and forth as the user fills out the form.
  
- **Modals for Selections**: A modal is used to select items from a list of options. This can be used in various parts of the form where multiple choices are provided.

- **TextInput for Personal Details**: Users input their details (like name, email, etc.) using TextInput fields. Each input field allows pressing `Enter` to move on to the next input.

- **Keyboard Icon for Re-entry**: A keyboard icon appears beside each input field, allowing users to click and re-enter their details if needed.

- **Confirmation Modal on Final Submission**: Once the user has completed the form, a confirmation modal pops up to finalize the submission. The user can review their inputs before confirming.

## Components

### 1. **Toggle Buttons**
   - Used to provide visual feedback on form validation.
   - **Green**: Correct input.
   - **Red**: Incorrect input.

### 2. **Modal**
   - A modal for users to select items from a list of predefined options.
   - Helps in making selections in an organized and user-friendly way.

### 3. **TextInput**
   - Standard text input fields for capturing personal details.
   - Supports pressing `Enter` to navigate to the next input field.
   - Displays a **keyboard icon** next to inputs to allow users to re-enter details.

### 4. **Confirmation Modal**
   - Triggered when the user finishes the form.
   - Allows users to review and confirm their details before final submission.

## How It Works

1. **Form Input**: Users begin by filling out the form's input fields. As they proceed, the toggle buttons give feedback on the correctness of the input.
2. **Selection Modal**: For inputs requiring a selection, a modal is triggered to display a list of items.
3. **Navigating Inputs**: After filling each input, the user presses `Enter` to jump to the next one. Alternatively, the keyboard icon can be used to re-focus on any input field to edit.
4. **Submission**: After completing the form, a confirmation modal appears. Users can confirm their details or go back to edit if necessary.

## Installation & Setup

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/application-form.git
   ```
2. Navigate to the project folder:
   ```bash
   cd your-repo-name
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
5. Start the application:
   ```bash
   npm start
   ```

## Technologies Used
- **React Native**: This is for building the form interface and components.
- **TypeScript**: Used for type safety across components and state management.
- **React Navigation**: To manage form navigation.
- **React Native Modal**: This is for the selection and confirmation of modals.
- **Styled Components**: For styling the interactive UI elements.

## Screenshots
#### Adding Soon ...

## License
This project is licensed under the MIT License - see the LICENSE file for details.
