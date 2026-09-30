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

    //     /*
    //  * Smart sticky header
    //  *
    //  * Scroll down = hide
    //  * Scroll up = show
    //  */
    // let lastScrollY = window.scrollY;
    // let ticking = false;

    // function updateHeader() {

    //     const currentScrollY = window.scrollY;

    //     // Always show header near the top
    //     if (currentScrollY <= 80) {
    //         header.classList.remove("header-hidden");
    //         lastScrollY = currentScrollY;
    //         ticking = false;
    //         return;
    //     }

    //     // Scrolling down
    //     if (currentScrollY > lastScrollY) {
    //         header.classList.add("header-hidden");
    //     }

    //     // Scrolling up
    //     else if (currentScrollY < lastScrollY) {
    //         header.classList.remove("header-hidden");
    //     }

    //     lastScrollY = currentScrollY;
    //     ticking = false;
    // }

    // window.addEventListener("scroll", () => {

    //     if (!ticking) {
    //         window.requestAnimationFrame(updateHeader);
    //         ticking = true;
    //     }

    // }, { passive: true });


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
 * Back to top button
 */
const backToTop = document.querySelector("#backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }, { passive: true });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


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