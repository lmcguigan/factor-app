# factor.it
**factor.it** is a web application that allows students to practice factoring quadratic trinomials with the "x-box" method. The process of factoring is broken into seven discrete steps. 

## Logging In
- Users must first create an account to use the application. Accounts allow for tracking user data, such as the problems that they have solved completely and those that remain to be solved, as well as their accumulated points.
- When users log in or register for an account, they are redirected to the factoring interface. The conditional rendering of the React application ensures that users only view the steps that they have completed or requested an answer to, so that they are not overwhelmed by the full number of steps and cannot cut corners in the process. 

## Instructions

### For all problems:

#### Inputs
Each step has inputs for the user to provide their answers. Once the user has either provided the correct responses or has requested the answer, the inputs cannot be further updated. 

#### Buttons
Each task is labeled with a circle bearing the step number. Underneath these labels are a series of buttons:
- **Instructions** — On click, this button will display the instructions for this step in a Popover. 
![Instructions](./readmeImages/instructions.png?raw=true "Instructions Button")
- **Check** — On click, this button will check what the user has entered into each of the inputs for that specific task, and provide feedback about whether the responses are correct in a Popover.
![Check](./readmeImages/checkfeedback.png?raw=true "Check Button")
- **Get Answer** — On click, this button will retreive the correct response for the task, and then close this task from further responses. 

#### Moving on from a step
There are two ways to move on from a step:
1. Provide the correct responses and click the **Check** button to validate the responses.
2. Click the **Get Answer** button, which shows the correct response and automatically proceeds to the next step.

After the user has moved on from a step, the **Check** and **Get Answer** buttons are no longer visible. 

#### Moving on from a Problem
There are two ways to move on from a problem:
1. Proceed through the steps until Step 7, enter the correct answer, and click the Next Problem button in the modal.
2. Click the yellow Next Problem button in the navigation bar. 

#### Points
Users earn points for each task that they complete. The user's cumulative points are stored in the Mongo database and displayed in the navigation bar, along with the points accumulated in that round.

### Step-by-Step Guide


1. Identify the **A** (coefficient of the quadratic term), **B** (coefficient of the linear term), and **C** (the constant). 
![Step 1](./readmeImages/step1.png?raw=true "Step 1")


2. Fill in the top of the diamond (navy) with the **product of A and C** by multiplying those numbers together. Fill in th bottom of the diamond (darkest blue-green) with the **value of B** (coefficient of the linear term).
![Step 2](./readmeImages/step2.png?raw=true "Step 2")


3. Fill in the two sides of the diamond (lighter blue-green) by determining the two numbers that will multiply together to make the number in the top diamond and add together to make the number in the bottom diamond.
![Step 3](./readmeImages/step3.png?raw=true "Step 3")


4. Break the linear term into **two linear terms** by using the coefficients found in Step 3.
![Step 4](./readmeImages/step4.png?raw=true "Step 4")


5. Fill in the yellow box with the **quadratic term** (use ^2 for the exponent), the two lighter blue-green boxes with the **linear terms** (order does not matter, the program is designed to account for this), and the orange box with the **constant**.
![Step 5](./readmeImages/step5.png?raw=true "Step 5")


6. Extract the **common factors** from each row and each column of the box.
![Step 6](./readmeImages/step6.png?raw=true "Step 6")


7. Write out the two **linear binomial factors**. 
![Step 7](./readmeImages/step7.png?raw=true "Step 7")


### Built With
- MongoDB
- Mongoose
- mLab
- Express.js
- React.js
- Reactstrap
- Node.js

### Authors
- **Lucy McGuigan** - Visit [my personal site](http://www.lucymcguigan.com) to learn more about me. 

### Inspiration
I was inspired to create this application upon a reflection on my experiences as a Algebra II teacher while serving as a Teach for America Corps Member in the Greater New Orleans Region. I was introduced to the "x-box" method of factoring through my TFA Planning Group and was overjoyed to learn of a method that effectively utilized visual organizing tools and provided a failsafe process beyond the "guess and check" strategy that I had learned as a student. I elaborated upon this process to augment the iconography with colors and shapes in my instructional PowerPoints. While this method had great success, its series of sequential steps meant that it created a hindrance for students who got stuck on any one of them, and the regimented process could also preclude a deeper conceptual understanding of the purpose of the diamond (to break the linear term into two) and the box (to extract common factors of the terms and produce two linear binomial factors). Tasked with devising an idea for a full-stack web application to serve as a final project for my Full-Stack Web Development program at the Southern Methodist University Coding Bootcamp. 

### Links
- [Live application](https://aqueous-ocean-61869.herokuapp.com/)