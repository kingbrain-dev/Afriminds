const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
        navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open menu");
            navigation.classList.remove("is-open");
        });
    });
}

const year = document.querySelector("#current-year");
if (year) {
    year.textContent = new Date().getFullYear();
}

const contactForm = document.querySelector("#contact-form");
if (contactForm instanceof HTMLFormElement) {
    const subjectSelect = contactForm.querySelector("#contact-subject");
    const customSubjectField = contactForm.querySelector("#custom-subject-field");
    const customSubjectInput = contactForm.querySelector("#contact-custom-subject");

    if (
        subjectSelect instanceof HTMLSelectElement
        && customSubjectField instanceof HTMLElement
        && customSubjectInput instanceof HTMLInputElement
    ) {
        const updateCustomSubject = () => {
            const isOther = subjectSelect.value === "Other";
            customSubjectField.hidden = !isOther;
            customSubjectInput.required = isOther;

            if (!isOther) {
                customSubjectInput.value = "";
            }
        };

        subjectSelect.addEventListener("change", updateCustomSubject);
        updateCustomSubject();
    }

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const selectedSubject = formData.get("subject");
        const customSubject = formData.get("customSubject");
        const message = formData.get("message");

        if (
            typeof name !== "string"
            || typeof email !== "string"
            || typeof selectedSubject !== "string"
            || typeof customSubject !== "string"
            || typeof message !== "string"
        ) {
            throw new Error("The contact form is missing a required field.");
        }

        const subjectText = selectedSubject === "Other" ? customSubject.trim() : selectedSubject;
        if (!subjectText) {
            throw new Error("Please enter a subject for your message.");
        }

        const subject = encodeURIComponent(`AFRIMINDS inquiry: ${subjectText}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nSubject: ${subjectText}\n\nMessage:\n${message}`);
        window.location.href = `mailto:info@afriminds.org?subject=${subject}&body=${body}`;
    });
}
