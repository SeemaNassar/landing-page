/**
 * define global variables
 * 
*/
// Select the navigation list element
const navList = document.getElementById("navbar__list");
// Select all section elements
const allSections = document.querySelectorAll("section");
// variables for Toggle mobile menu visibility 
const navToggle = document.querySelector(".navbar__toggle");
const navbar = document.querySelector(".navbar__menu");
/**
 * end global var
 * start helper functions
*/

/**
 * Helper function to create a navigation item for each section
 * @param {string} id - The id of the section
 * @param {string} navText - The text for the navigation link(fron data-nav => custom data attribute)
 * @returns {Element} - The created list item with anchor
 */
const createNavItem = (id, navText) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${id}`;
    a.textContent = navText;
    a.classList.add("menu__link");
    li.appendChild(a);
    return li;
};

/**
 * Helper function to debounce events (used for improving setActive performance).
 * Limits the frequency of function calls to enhance performance.
 * @param {Function} fn - The function to be debounced.
 * @param {number} delay - Delay time in milliseconds (default: 100).
 * @returns {Function} - The debounced version of the function.
 */
const debounce = (fn, delay = 100) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};

/**
 * end helper fun
 * start main functions
 * 
*/

/**
 * build the navigation menu dynamically based on sections
 */
const buildNav = () => {
    allSections.forEach(sec =>{
        navList.appendChild(createNavItem(sec.id, sec.dataset.nav))
    });
};

/**
 * add 'active-section' and 'active-link'to class list on section and navLink when near top of viewport and remove it otherwise.
 */
const setActive = () => {
    let activeFound = false;

    allSections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
        const link = document.querySelector(`a[href="#${sec.id}"]`);
        // Ensure only one section gets the active class
        if (isInViewport && !activeFound) {
            sec.classList.add("active-section");
            if (link) {
                link.classList.add("active-link");
                //close navBar menu on small screen
                navbar.classList.remove("open");
            }

            activeFound = true;
        } else {
            sec.classList.remove("active-section");
            if (link) link.classList.remove("active-link");

        }
    });
};

// scroll to anchor id using scrollBy event
const scrollToSec = (e) => {
    if (e.target.tagName === "A") {
        e.preventDefault();
        const targetSec = document.querySelector(e.target.getAttribute("href"));

        // Get the bounding rectangle of the target section
        const BCRect = targetSec.getBoundingClientRect();

        // Calculate the offset needed (to prevent header overlap)
        const offset = 50;  

        // Scroll the page smoothly by the distance of the section, adjusted by the offset.
        window.scrollBy({
            top: BCRect.top - offset,
            behavior: "smooth"     
        });
    }
};

/**
 * end main fun
 * start events
 * 
*/

// build navigation menu 
document.addEventListener("DOMContentLoaded", () => {
    buildNav();
});

// scroll to section when click the link
navList.addEventListener('click', scrollToSec);

// set section as active
window.addEventListener("scroll", debounce(setActive));

// Toggle mobile menu visibility 
navToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
});