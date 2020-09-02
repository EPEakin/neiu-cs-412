# neiu-cs-412
Fall 2020 NEIU CS 412 - Web Application Development projects

Libby Eakin

## Project Topic Proposal

### 1. Application Name: 
The STEAM Opportunity Portal

### 2. Project Topic/Objective:
This web application is intended to be a resource for high school students who are looking for scholarships, summer programs, or other opportunities in STEAM (Science, Technology, Engineering, Art, and Math). Teachers will have login access to this web application and will be able to upload opportunities as they receive them. A teacher who is submitting a new opportunity will use pre-made tags to categorize the opportunity (e.g.  the type of opportunity, its STEAM discipline, what students can apply, etc). The teacher will also enter the web address, any due dates, location, and contact people. Students will then be able to search for opportunities based on the search tags and provided information. After the due date of an opportunity has passed, the opportunity will be flagged as expired with a note for interested students to check with the opportunity’s website to see if the opportunity is still available. Any teacher user can update an existing opportunity as needed.  

### 3. Motivation:
As a teacher I receive tons of emails about STEAM enrichment or scholarship opportunities for students. Without a doubt, many of these opportunities are excellent and I would like my students to take advantage of them. However, figuring out how to advertise these opportunities to students is often a problem. Posting them on the bulletin board in my classroom wastes time and paper. Blasting these opportunities via email overwhelms my students with too many emails and, over time, conditions them to ignore emails from me. There is also the question of how to reach students beyond the subset who are currently taking my class and who don’t ignore my bulletin board and/or my emails! Furthermore, as it is definitely the case that my colleagues and I get notices for different opportunities, having a portal where we can all post the opportunities we receive will give students access to the largest number of current opportunities available to them. While teachers have used spreadsheets in the past to pool together this information, these spreadsheets become unwieldy very quickly for both teachers and students alike. Having a website that allows students to search for opportunities that interest them and filters current opportunities from those that are out-of-date would be super helpful. 

### 4. Server-Side Components:
Teacher users will have usernames and passwords. They will be able to upload information about an opportunity into the website. The login information for the teachers and information about the opportunities, as well as a record of which opportunities each user has either posted or marked as a favorite, will be stored in a database. 

The following data will be stored within the website’s database:
* Teacher login information
* A record of a teacher’s favorite opportunities, which includes opportunities the teacher has previously posted or selected as a favorite
* Information regarding each STEAM opportunity, including:
    * The name of the opportunity
    * A brief description of the opportunity 
    * An image from the opportunity’s post or a default image if no image has been uploaded
    * The URL for the opportunity’s website
    * Whether this is an opportunity exclusively for people identifying as female, people of color, or other groups underrepresented in STEAM. 
    * The STEAM discipline that best describes this opportunity
    * Whether this is an internship, paid position, or volunteer opportunity
    * Whether this opportunity has a residential component (e.g. living in a dorm for a week)
    * Whether this opportunity is online or in-person
    * Whether students will have to travel outside of Chicago to participate in this opportunity
    * Application due dates
    * The email addresses of people to contact


