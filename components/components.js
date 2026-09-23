document.addEventListener("DOMContentLoaded", async () => {
    const headerContainer = document.querySelector("#shared-header");
    const footerContainer = document.querySelector("#shared-footer");

    /*
     * Load shared header
     */
    if (headerContainer) {
        try {
            const response = await fetch("/components/header.html");

            if (!response.ok) {
                throw new Error(`Header request failed: ${response.status}`);
            }

            headerContainer.innerHTML = await response.text();
        } catch (error) {
            console.error("Failed to load header:", error);
        }
    }


    /*
     * Load shared footer
     */
    if (footerContainer) {
        try {
            const response = await fetch("/components/footer.html");

            if (!response.ok) {
                throw new Error(`Footer request failed: ${response.status}`);
            }

            footerContainer.innerHTML = await response.text();
        } catch (error) {
            console.error("Failed to load footer:", error);
        }
    }


    /*
     * Header interactions
     */
    initHeader();
});


function initHeader() {

    const header = document.querySelector(".site-header");

    if (!header) return;


    const menuToggle =
        header.querySelector(".mobile-menu-toggle");

    const navigation =
        header.querySelector(".main-navigation");

    const dropdown =
        header.querySelector(".nav-dropdown");

    const dropdownToggle =
        header.querySelector(".nav-dropdown-toggle");


    /*
     * Mobile menu
     */
    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                header.classList.toggle("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation"
                    : "Open navigation"
            );
        });
    }


    /*
     * Mobile Services dropdown
     *
     * Desktop:
     * CSS handles hover.
     *
     * Mobile:
     * JS handles click.
     */
    if (dropdown && dropdownToggle) {

        dropdownToggle.addEventListener("click", (event) => {

            if (window.innerWidth > 768) {
                return;
            }

            event.preventDefault();

            const isOpen =
                dropdown.classList.toggle("dropdown-open");

            dropdownToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });
    }


    /*
     * Close everything when clicking outside
     */
    document.addEventListener("click", (event) => {

        if (!header.contains(event.target)) {

            header.classList.remove("menu-open");

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );
            }

            if (dropdown) {
                dropdown.classList.remove("dropdown-open");
            }

            if (dropdownToggle) {
                dropdownToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        }
    });


    /*
     * Reset mobile state when returning to desktop
     */
    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            header.classList.remove("menu-open");

            dropdown?.classList.remove("dropdown-open");

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

            dropdownToggle?.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
}