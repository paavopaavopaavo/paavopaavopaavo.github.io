var navbarLogo = document.getElementById("homepage-link");
let homepageLogo = document.getElementById("homepage-logo");

var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1; // January is 0

if (month === 10 && day >= 27) {
    // 
    navbarLogo.src = "/assets/timed/halloween.png";
    navbarLogo.onmouseover = function() {
        this.src = '/assets/timed/halloween_hover.png';
    }
    navbarLogo.onmouseout = function() {
        this.src = '/assets/timed/halloween.png';
    }
    createTooltip('This is for <i>Halloween!</i> Enjoy!');
    document.documentElement.style.setProperty('--website-theme-color', '#e24304');
    document.documentElement.style.setProperty('--website-theme-dark', '#9a2b00');
    document.documentElement.style.setProperty('--website-theme-light', '#ff9047');
    changeFooter('<p>© Paavo Sadeharju 2024. All rights reserved. <i class="fa-solid fa-crow fa-bounce halloween-raven" onclick="halloweenRavenSound()" style="cursor: pointer;"></i></p>');
} else if (month === 12) {

    navbarLogo.src = "/assets/timed/christmas.png";
    navbarLogo.onmouseover = function() {
        this.src = '/assets/timed/christmas_hover.png';
    }
    navbarLogo.onmouseout = function() {
        this.src = '/assets/timed/christmas.png';
    }
    createTooltip('This is for <i>Christmas!</i> Enjoy!');
    // The navbar element's background changes to a repeating image
    document.getElementsByClassName("navbar")[0].style.backgroundImage = "url('/assets/timed/christmasdecoration.png')";
    document.getElementsByClassName("navbar")[0].style.backgroundSize = "contain";
    document.documentElement.style.setProperty('--website-theme-color', 'green');
    document.documentElement.style.setProperty('--website-theme-dark', 'red');
    document.documentElement.style.setProperty('--website-theme-light', '#dbfffd');
    changeFooter('<p>© Paavo Sadeharju 2024. All rights reserved. <i class="fa-solid fa-gift fa-bounce christmas-gift" onclick="christmasGiftThing()" style="cursor: pointer;"></i></p>');
    function christmasGift() {
        const colors = ['red', 'purple', 'hotpink', 'orange', 'blue', 'green', 'teal'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        let gift = document.querySelector(".christmas-gift");
        gift.style.color = randomColor;
    }

    function christmasGiftThing() {
        window.location.href = "https://paavopaavopaavo.github.io/special/xmas";
    }
    christmasGift();
    // Call the christmasGift function after the footer has been updated
} else if (month === 2 && day === 14) {
    navbarLogo.src = "/assets/timed/valentines.png";
    navbarLogo.onmouseover = function() {
        this.src = '/assets/timed/valentines_hover.png';
    }
    navbarLogo.onmouseout = function() {
        this.src = '/assets/timed/valentines.png';
    }
    createTooltip("This is for <i>Valentine's Day!</i> Enjoy!");
    document.documentElement.style.setProperty('--website-theme-color', 'hotpink');
    document.documentElement.style.setProperty('--website-theme-dark', 'pink');
    document.documentElement.style.setProperty('--website-theme-light', 'pink' );
} else if (month === 4 && day === 1) {
    createTooltip("This is for <i>April Fool's!</i> Enjoy!");
    document.getElementById("homepage-link-container").href = "https://youtu.be/dQw4w9WgXcQ";
    logo.src = "/assets/timed/aprilfools.png";
} else if (month === 4 && day === 2) {
    navbarLogo.onmouseover = function() {
        this.src = '/assets/timed/birthday.png';
    }
    navbarLogo.onmouseout = function() {
        this.src = '/assets/timed/birthday.png';
    }
    navbarLogo.src = "/assets/timed/birthday.png";
    createTooltip("This is for <i>my birthday!</i> Enjoy!");
}

function halloweenRavenSound() {
    var audio = new Audio('/assets/timed/raven.mp3');
    audio.volume = 0.2;
    audio.play();
    document.querySelector(".halloween-raven").classList.toggle("fa-bounce");
}

function changeFooter(text) {
    document.querySelector("footer").innerHTML = text;
}

function createTooltip(tooltipText) {
    const aboutItem = document.createElement('li');

        // Create the link to the "About" page
        const aboutLink = document.createElement('a');
        aboutLink.href = '#';
        aboutLink.className = 'navbar-link';
        aboutLink.textContent = '';

        // Create the info icon
        const infoIcon = document.createElement('i');
        infoIcon.className = 'fa-solid fa-info event-info';

        // Append the info icon to the link
        aboutLink.appendChild(infoIcon);

        // Append the link to the navbar item
        aboutItem.appendChild(aboutLink);

        // Append the navbar item to the navbar list
        const navbar = document.querySelector('.navbar');
        navbar.appendChild(aboutItem);
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = tooltipText;

        // Add the tooltip element to the document body
        document.body.appendChild(tooltip);

        // Add event listeners to the info icon to show and hide the tooltip
        infoIcon.addEventListener('mouseenter', () => {
            // Show the tooltip
            tooltip.style.display = 'block';

            // Position the tooltip relative to the info icon
            const rect = infoIcon.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = rect.bottom + 'px';
        });
        infoIcon.addEventListener('mouseleave', () => {
            // Hide the tooltip
            tooltip.style.display = 'none';
        });
}

function footerClick() {
    const footerIcon = document.getElementById('footer-icon');
    if (footerIcon.classList.contains('fa-hand-peace')) {
        // Change the icon to a closed fist
        footerIcon.classList.remove('fa-hand-peace');
        footerIcon.classList.add('fa-hand-back-fist');
    } else if (footerIcon.classList.contains('fa-hand-back-fist')) {
        // Change the icon to a paper pose
        footerIcon.classList.remove('fa-hand-back-fist');
        footerIcon.classList.add('fa-hand');
    } else if (footerIcon.classList.contains('fa-hand')) {
        footerIcon.classList.remove('fa-hand');
        footerIcon.classList.add('fa-hand-peace');
    }
}