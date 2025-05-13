document.addEventListener('DOMContentLoaded', function () {
    // Set footer copyright year
    const currentYear = new Date().getFullYear();
    console.log(currentYear);
    document.getElementById('currentyear').innerText = currentYear;

    // Set footer last modified date
    document.getElementById('lastModified').innerText = document.lastModified;

    // Add event listener to the menu button
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation'); ``

    hamButton.addEventListener('click', function () {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
});

const aboutUs = [
    {
        contact: 'skillshare',
        link: 'skillshare.html'
    },
    {
        contact: 'findsuplies',
        link: 'findsupplies.html'
    },
    {
        contact: 'contactUs',
        link: 'contactus.html'
    }
]

aboutUs.forEach(contact => {
    myProfile.dropdownContent.push(contact);
});

aboutUs.dropdownContent.forEach(dropdownContent => {
    let dt = document.createElement('dt');
    let dd = document.createElement('dd')
    dt.textContent = dropdownContent.contact;
    dd.textContent = dropdownContent.Url;
    document.querySelector('.dropdownContent').appendChild(dt);
    document.querySelector('.dropdownContent').appendChild(dd);
}
);



console.log(myProfile.placesLived);
aboutUs.forEach()
// get the feedback div element so we can do something with it.
const feedbackElement = document.getElementById('feedback');
// get the form so we can read what was entered in it.
const formElement = document.forms[0];
// add a 'listener' to wait for a submission of our form. When that happens run the code below.
formElement.addEventListener('submit', function (e) {
    // stop the form from doing the default action.
    e.preventDefault();
    // set the contents of our feedback element to a message letting the user know the form was submitted successfully. Notice that we pull the name that was entered in the form to personalize the message!
    feedbackElement.innerHTML = 'Hello ' + formElement.user_name.value + '! Thank you for your message. We will get back with you as soon as possible!';
    // make the feedback element visible.
    feedbackElement.style.display = "block";
    // add a class to move everything down so our message doesn't cover it.
    document.body.classList.toggle('moveDown');
});