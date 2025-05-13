
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function () {
            menu.classList.toggle('active');
        });
    }

  
    const container = document.getElementById('course-list');
    const courses = ['CSE 110', 'WDD 130', 'CSE 111', 'CSE 210', 'WDD 131', 'WDD 231'];

    function createCourseLink(course) {
        const courseName = document.createElement('a');
        courseName.textContent = course;
        courseName.href = '#'; 
        return courseName;
    }

    function displayCourses(filteredCourses) {
        if (!container) return;
        container.innerHTML = '';

        filteredCourses.forEach(course => {
            const courseLink = createCourseLink(course);
            container.appendChild(courseLink);
        });
    }

    function showAllCourses() {
        displayCourses(courses);
    }

    function filterCourses(filter) {
        if (filter === 'All') {
            showAllCourses();
        } else {
            const filtered = courses.filter(course => course.startsWith(filter));
            displayCourses(filtered);
        }
    }


    showAllCourses();


    const buttonAll = document.getElementById('buttonAll');
    const buttonCSE = document.getElementById('buttonCSE');
    const buttonWDD = document.getElementById('buttonWDD');

    if (buttonAll) buttonAll.addEventListener('click', () => filterCourses('All'));
    if (buttonCSE) buttonCSE.addEventListener('click', () => filterCourses('CSE'));
    if (buttonWDD) buttonWDD.addEventListener('click', () => filterCourses('WDD'));


    const currentYearSpan = document.getElementById('currentyear');
    const lastModifiedSpan = document.getElementById('lastModified');

    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
    if (lastModifiedSpan) lastModifiedSpan.textContent = 'Last modification: ' + document.lastModified;
});
