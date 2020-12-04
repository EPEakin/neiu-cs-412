# neiu-cs-412
Fall 2020 NEIU CS 412 - Web Application Development projects

Libby Eakin

## Project Topic Proposal

### 1. Application Name: 
The STEM Opportunity Portal

### 2. Project Topic/Objective:
This web application is intended to be a resource for high school students who are looking for scholarships, summer programs, or other opportunities in STEAM (Science, Technology, Engineering, and Math). Educators have login access to this web application and are able to upload opportunities as they receive them. An educator who is submitting a new opportunity uses pre-made tags to categorize the opportunity (e.g.  the type of opportunity, its STEM subject, etc). The teacher can also enter the web address, any due dates, and whether the opporunity is virutal or in-person. Students are then able to search through the posted opportunities. Any teacher user can update or delete their previously posted opportunities as needed.  

### 3. Motivation:
As a teacher I receive tons of emails about STEM enrichment or scholarship opportunities for students. Without a doubt, many of these opportunities are excellent and I would like my students to take advantage of them. However, figuring out how to advertise these opportunities to students is often a problem. Posting them on the bulletin board in my classroom wastes time and paper. Blasting these opportunities via email overwhelms my students with too many emails and, over time, conditions them to ignore emails from me. There is also the question of how to reach students beyond the subset who are currently taking my class and who don’t ignore my bulletin board and/or my emails! Furthermore, as it is definitely the case that my colleagues and I get notices for different opportunities, having a portal where we can all post the opportunities we receive will give students access to the largest number of current opportunities available to them. While teachers have used spreadsheets in the past to pool together this information, these spreadsheets become unwieldy very quickly for both teachers and students alike. Having a website that allows students to search for opportunities that interest them and filters current opportunities from those that are out-of-date would be super helpful. 

### 4. User and Server-Side Components:
As a MEN stack web application, the STEM Opportunity Portal is comprised of three technologies: MongoDB, Express, and Node, all of which are coded in the JavaScript programming language. The website and other client-side functionalities were built using HTML, CSS, and Javascript, with additional formatting and responsiveness added using the Bootstrap toolkit and templating with Handlebars. The design for this web application follows the Model-View-Controller (MVC) framework. It currently has two controllers. One controller manages the functionalities related to creating, reading, updating, and deleting (CRUD) opportunities that are posted by educators. The other controller manages user functionalities, including creating user accounts, updating user information, logging in, and authenticating user login information. 

This web application also has two models. One model contains the schema definition for the STEM opportunities, and has keys for information like the title and description of the opportunity, as well as the name of the submitter, whether the opportunity is online or in-person, and what type of opportunity it is (e.g. internship, scholarship, volunteer opportunity, etc.) The second model contains the schema definition for the educators’ user accounts, including the username (email address), and password.    

The following data are stored within two collections on the website’s MongoDB database:

The User Collection:
* User login information, including email address
* User's school name and subject areas
* A record of the opportunities a user has previously posted 

The STEM Opportunities Collection:
* The name of the opportunity
* A brief description of the opportunity 
* The URL for the opportunity’s website
* The type of opportunity (internship, summer enrichment program, volunteer opportunity, etc)
* Whether this opportunity is online or in-person
* Application due dates
    
### 5. Future Work: 
The following is a list of future additions and improvements to the STEM Opportunity Portal: 
   * The opportunities will be arranged in a sortable data table for students and educators to better search through the opportunities. There are a few datatable packages for Bootstrap, including mdbootstrap. Unfortunately, the developer was unable to get any of these packages to play nicely with her existing code before the launch deadline of this application!
   * Opportunities will be color-coded by type (e.g. internship, summer enrichment opportunity, scholarships, events, etc) for easier viewing. This can easily be achieved using CSS and Bootstrap. 
   * A search field will be added to allow users to search content on the website by keywords. This will require the use of Bootstrap to create the form and button, and, on the server-side, will require access to the MongoDB database. 
   * In addition to educators, students will be able to create user accounts that will allow them to save opportunities of interest and remind them of deadlines that are approaching. This will require creating a heart button and linking it to a form that will effectively copy the contents from the ‘Opportunities’ collection in the MongoDB database into a ‘Favorites’ collection for a given user. 
   * A calendar view will be created which will allow students to view their saved opportunities on a calendar. Educators will be able to view the opportunities they posted on their calendar view. A direction for this task has not yet been determined, but will involve using Bootstrap, with Handlebars, and accessing the MongoDB database. 
     

