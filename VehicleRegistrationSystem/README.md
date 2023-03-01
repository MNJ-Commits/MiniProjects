# VehicleRegisterationSystem

## A simple react-native project for vechile registeration using following steps:

### Step #1:

Set up a project in React Native. You can use dummy JSON data to simulate data coming from APIs.


### Step #2:

On the front end, there should be a sign-in & sign-up page. Retain the AUTH data.


### Step #3:

On login, there should be a simple dashboard showing the number of registered cars in your system.


### Step #4:

Make a CRUD page for Cars where the user can select one of the categories from the dropdown & can have other fields like color, model, make, registration-no, etc.

Note: Each create & update module must have front-end validations.




## Tools Used for the task

### Framework
react
react-native @0.71.3

### State Mangement 
reduxjs/toolkit
react-redux

### Local Storage
react-native-async-storage/async-storage

### Screens Navigation
react-native-screens
react-native-safe-area-context
react-navigation/native
react-navigation/native-stack

### React Forms
react-hook-form
hookform/resolvers
react-native-dropdown-picker

#### Form Validations
Yup



# Commands to run project
1. How to run the node server:
 - cd VehicleRegistrationSystem/json-server
 - json-server --watch db.json -m ../node_modules/json-server-auth


2. Run the below command to access localhost or 127.0.0.1 or your computer's ip:

	adb -s <device_name> reverse tcp:backend_port tcp:backend_port
	
Example:

	adb -s emulator-5554 reverse tcp:3000 tcp:3000
