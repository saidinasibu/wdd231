//Toggle Menu
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('menu').classList.toggle('active');
});


//Course list
const container = document.getElementById('course-list');
const courses = ['CSE 110', 'WDD 130', 'CSE 111', 'CSE 210', 'WDD 131', 'WDD 231'];

courses.forEach(course => { 
    const courseName = document.createElement('a')
    courseName.textContent = course

    container.appendChild(courseName)
});

//Course filters buttons
function displayCourses(filteredCourses) {
    container.innerHTML = '';
    
    filteredCourses.forEach(course => { 
        const courseName = document.createElement('a');
        courseName.textContent = course;
        container.appendChild(courseName);
    });
}

//Show all courses
function showAllCourses() {
    displayCourses(courses);
}

// Filter all courses
function filterCourses(filter) {
    if (filter === 'All') {
        showAllCourses();
    } else {
        const filtered = courses.filter(course => course.startsWith(filter));
        displayCourses(filtered);
    }
}


document.getElementById('buttonAll').addEventListener('click', () => filterCourses('All'));
document.getElementById('buttonCSE').addEventListener('click', () => filterCourses('CSE'));
document.getElementById('buttonWDD').addEventListener('click', () => filterCourses('WDD'));

// Footer current year and moddification
document.addEventListener('DOMContentLoaded', function() {
    let currentYear = new Date().getFullYear();
    let lastModification = document.lastModified;
    
    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = 'Last modification: ' + lastModification;
});
