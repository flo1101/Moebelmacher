const body = document.querySelector("body");
const contactOverlay = document.querySelector(".contact-overlay");
const contactOverlaySuccess = document.querySelector(".contact-overlay-success");
const galleryOverlay = document.querySelector(".gallery-overlay");
const galleryOverlayImg = document.querySelector("#gallery-overlay-img");
const serviceItems = document.querySelectorAll(".services-item");


window.addEventListener("load", () => {
    startSlider();
    loadGalleryImages();
    addGalleryPanelClickEvents();
    addGalleryFunctions();
    addServiceClickEvents();
    addBtns();
    addContactFormSubmit();
})


// Slider

function startSlider() {
    const swiper = new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        autoplay: {
            delay: 5000
        }
    });
    swiper.on("transitionStart", () => {
        let index = swiper.activeIndex;
        if (index > 4) {
            index = 1;
        } else if (index === 0) {
            index = 4;
        }
        document.querySelector("#slide-num").textContent = `0${index}`;
    })
}



// Gallery

const galleryPanels = document.querySelectorAll(".gallery-panel");
let displayedImg;
const galleryImages = []

function loadGalleryImages() {
    document.querySelectorAll(".gallery-img").forEach(img => {
        galleryImages.push(img.getAttribute("src"));
    })
}

function addGalleryPanelClickEvents() {
    for (const panel of galleryPanels) {
        panel.addEventListener("click", e => {
            body.style.overflowY = "hidden";
            const img = panel.children[1].getAttribute("src");
            displayedImg = img;
            galleryOverlayImg.setAttribute("src", img);
            galleryOverlay.style.display = "flex";
        })
    }
}

function addGalleryFunctions() {
    let preventClose = false;
    const btnPrev = document.querySelector("#gallery-btn-prev");
    const btnNext = document.querySelector("#gallery-btn-next");
    btnPrev.addEventListener("click", e => {
        preventClose = true;
        const currIndex = galleryImages.indexOf(displayedImg);
        const newIndex = currIndex !== 0 ? currIndex - 1 : galleryImages.length - 1;
        const newImg = galleryImages[newIndex];
        galleryOverlayImg.setAttribute("src", newImg);
        displayedImg = newImg;
        console.log(newImg)
    })
    btnNext.addEventListener("click", e => {
        preventClose = true;
        const currIndex = galleryImages.indexOf(displayedImg);
        const newIndex = currIndex === galleryImages.length - 1 ? 0 : currIndex + 1;
        const newImg = galleryImages[newIndex];
        galleryOverlayImg.setAttribute("src", newImg);
        displayedImg = newImg;
        console.log(newImg)
    })
    galleryOverlayImg.addEventListener("click", () => preventClose = true);
    galleryOverlay.addEventListener("click", () => {
        if (preventClose) {
            preventClose = false;
            return;
        }
        body.style.overflowY = "auto";
        galleryOverlay.style.display = "none"
        preventClose = false;
    });
}


// Service

function addServiceClickEvents() {
    serviceItems.forEach(item => item.addEventListener("click", e => {
        const item = e.currentTarget;
        const text = item.children[1];
        const arrow = item.children[0].children[1];
        const isOpen = text.style.display === "block";
        if (!isOpen) {
            arrow.style.transform = "rotate(180deg)";
            item.children[1].style.display = "block";
        } else {
            arrow.style.transform = "rotate(0deg)";
            item.children[1].style.display = "none";
        }
    }))
}

// Buttons

function addBtns() {
    addNavButton();
    addSliderBtns();
    addToTopBtn();
    addContactBtns();
}

function addNavButton() {
    const navBox = document.querySelector(".nav-box");
    document.querySelector(".burger-nav").addEventListener("click", () => {
        const isHidden = window.getComputedStyle(navBox).getPropertyValue("display") === "none";
        navBox.style.display = isHidden ? "flex" : "none";
    })
}

function addSliderBtns() {
    const btnSliderOne = document.querySelector("#btn-slider-one");
    const btnSliderTwo = document.querySelector("#btn-slider-two");
    btnSliderOne.addEventListener("click", () => {
        document.querySelector("#about").scrollIntoView();
    })
    btnSliderTwo.addEventListener("click", () => {
        document.querySelector("#gallery").scrollIntoView();
    })
}

function addToTopBtn() {
    const toTopBtn = document.querySelector(".btn-to-top");
    toTopBtn.addEventListener("click", () => {
        window.scrollTo(0, 0);
    })
}

function addContactBtns() {
    const contactOverlay = document.querySelector(".contact-overlay");
    const btns = document.querySelectorAll(".contact-button");
    btns.forEach(btn => btn.addEventListener("click", () => {
        contactOverlay.style.display = "flex";
    }))
    const contactOverlayClose = document.querySelector(".contact-overlay-close");
    contactOverlayClose.addEventListener("click", () => {
        contactOverlay.style.display = "none";
    })
    addContactFormSubmit();
}

function addContactFormSubmit() {
    const form = document.querySelector(".contact-form");
    form.addEventListener("submit", e => {
        e.preventDefault();
        if (validateContactForm()) {
            contactOverlay.style.display = "none";
            contactOverlaySuccess.style.display = "flex";
        } else {
            document.querySelector(".contact-form-error-msg").style.display = "block";
        }
    })
    const close = document.querySelector(".contact-overlay-success-close");
    close.addEventListener("click", () => {
        contactOverlaySuccess.style.display = "none";
    })
}

function validateContactForm() {
    const nameInput = document.querySelector("#name-input");
    const mailInput = document.querySelector("#mail-input");
    const msgInput = document.querySelector("#msg-input");
    let valid = false;
    if (nameInput.value !== "" && mailInput.value !== "" && msgInput !== "") valid = true;
    return valid;
}