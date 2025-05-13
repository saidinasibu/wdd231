// import { courses } from "../data/courses.js";


//hambruger
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');

hamburgerElement.addEventListener('click',()=>{
    navElement.classList.toggle('open');
});





//filter
const filterButtons = document.querySelectorAll('.filter-buttons button');

filterButtons.forEach( button => {
    
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterCourses(filter);
        
    });
});

const courseSection = document.querySelector(".courses");

function filterCourses(filter) {
    courseSection.innerHTML = ''; // Clear previous buttons
    if (filter !== "ALL") {
        // Use a new variable to store the filtered result
        const filteredCourses = courses.filter(course => course.subject === filter);
        console.log(filteredCourses);
        displayButtons(filteredCourses);
        
        // Remove unnecessary elements if needed
    } else {
        displayButtons(courses);  // Show all courses when "ALL" is selected
    }
}
 //generate the buttons
function displayButtons(b){
    
    //let buttonsHTML = ''; temporary variable to store the buttons
    b.forEach(courseInfo =>{
        // buttonsHTML+=`<button id="openModal">${courseInfo.subject + courseInfo.number}</button>`;
        let buttonHTML = document.createElement("button");
        buttonHTML.setAttribute('id','openModal');
        buttonHTML.textContent=`${courseInfo.subject + courseInfo.number}`;

        courseSection.appendChild(buttonHTML); 
        buttonHTML.addEventListener("click",()=> showStuff(courseInfo));

    });    
}

// display modal

const mydialog = document.querySelector("#mydialog");
const mytitle = document.querySelector("#mydialog h2");
const myinfo = document.querySelector("#mydialog p");
const myclose = document.querySelector("#mydialog button");
myclose.addEventListener("click",()=> mydialog.close());

function showStuff(x){
    mytitle.innerHTML = x.title;
    myinfo.innerHTML = `dedicated on ${x.description}`;
    mydialog.showModal();

}


// footer

const year = document.querySelector('#year');
const today = new Date();

year.innerHTML = `<span class='highlight'>🔥${today.getFullYear()}</span>&copy; Samuel Mercado Perez 🔥`;




const courses = [
    {
       "subject": 'CSE',
        "number": 110,
        "title": 'Introduction to Programming',
        "credits": 2,
        "certificate": 'Web and Computer Programming',
        "description": 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        "technology": [
            'Python'
        ],
        "completed": true
    },
    {
        "subject": 'WDD',
        "number": 130,
        "title": 'Web Fundamentals',
        "credits": 2,
        "certificate": 'Web and Computer Programming',
        "description": 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        "technology": [
            'HTML',
            'CSS'
        ],
        "completed": true
    },
    {
        "subject": 'CSE',
        "number": 111,
        "title": 'Programming with Functions',
        "credits": 2,
        "certificate": 'Web and Computer Programming',
        "description": 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        "technology": [
            'Python'
        ],
        "completed": true
    },
    {
        "subject": 'CSE',
        "number": 210,
        "title": 'Programming with Classes',
        "credits": 2,
        "certificate": 'Web and Computer Programming',
        "description": 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        "technology": [
            'C#'
        ],
        "completed": true
    },
    {
        "subject": 'WDD',
        "number": 131,
        "title": 'Dynamic Web Fundamentals',
        "credits": 2,
        "certificate": 'Web and Computer Programming',
        "description": 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        "technology": [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        "completed": true
    },
    {
        "subject": 'WDD',
        "number": 231,
        "title": 'Frontend Web Development I',
        "credits": 2,
        "certificate": 'Web and Computer Programming',
        "description": 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        "technology": [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        "completed": false
    }
]
