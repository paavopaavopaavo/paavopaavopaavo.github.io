var navbarLogo = document.getElementById("homepage-link");
let homepageLogo = document.getElementById("homepage-logo");

var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1; // January is 0

checkDate();

function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        }).then(() => {
            console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
        // Fallback for browsers that don't support the Web Share API
        alert('Web Share API is not supported in this browser.');
    }
}

function advancedShare(text, platform) {
    switch (platform) {
        case 'regular':
            if (navigator.share) {
                navigator.share({
                    text: text
                }).then(() => {
                    console.log('Thanks for sharing!');
                })
                .catch(console.error);
            } else {
                // Fallback for browsers that don't support the Web Share API
                alert('Web Share API is not supported in this browser.');
            }
            break;
        case 'whatsapp':
            window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
            break;
        case 'threads':
            window.open(`https://threads.net/intent/post?text=${encodeURIComponent(text)}`, '_blank');
            break;
    }
}

function checkDate() {
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
        changeFooter('<p>© Paavo Sadeharju 2024. <i class="fa-solid fa-crow fa-bounce halloween-raven" onclick="halloweenRavenSound()" style="cursor: pointer;"></i></p>');
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
        createTooltip("It's <i>April's Fools!!</i> Nothing suspicious.");
        logo.src = "/assets/timed/aprilfools.png";
        // When logo is clicked, redirect to ./special/aprilfools
        logo.parentElement.href = './special/aprilfools';
    } else if (month === 4 && day === 2) {
        navbarLogo.onmouseover = function() {
            this.src = '/assets/timed/birthday.png';
        }
        navbarLogo.onmouseout = function() {
            this.src = '/assets/timed/birthday.png';
        }
        navbarLogo.src = "/assets/timed/birthday.png";
        createTooltip("This is for <i>my birthday!</i> Enjoy!");
        document.getElementsByClassName("navbar")[0].style.backgroundImage = "url('/assets/timed/birthdaydecoration.png')";
        document.getElementsByClassName("navbar")[0].style.backgroundSize = "contain";
    }
}

function halloweenRavenSound() {
    var audio = new Audio('/assets/timed/raven.mp3');
    audio.volume = 0.2;
    audio.play();
    document.querySelector(".halloween-raven").classList.toggle("fa-bounce");
}

function changeFooter(text) {
    document.getElementById("footer-text").innerHTML = text;
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
    // Rotate 90 degrees clockwise
    footerIcon.style.transform = 'rotate(90deg)';
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