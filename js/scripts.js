$(document).ready(function () {
    $("#load").hide();
});

window.addEventListener('DOMContentLoaded', event => {
    AOS.init();

    //Get the button
    let mybutton = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
    scrollFunction();
    };

    function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
    }
    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", backToTop);

    function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    }

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (! navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    new SimpleLightbox({elements: '#portfolio a.portfolio-box'});

    let header = document.getElementById('header');

    document.addEventListener('scroll', function () { // Get scroll position
        let scrollPosition = window.pageYOffset;
        if (scrollPosition <= 550) {
            header.style.opacity = 1 - scrollPosition / 350;
        } else {
            header.style.opacity = 0;
        }

    });

    // Boton para volver arriba
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.myBtn').fadeIn('slow');
        } else {
            $('.myBtn').fadeOut('slow');
        }
    });


    // Clase para el cursor
    class CircleAndDot {
        constructor() {
            this.root = document.body
            this.cursor = document.querySelector(".curzr")

            this.position = {
                distanceX: 0,
                distanceY: 0,
                distance: 0,
                pointerX: 0,
                pointerY: 0
            },
            this.previousPointerX = 0
            this.previousPointerY = 0
            this.angle = 0
            this.previousAngle = 0
            this.angleDisplace = 0
            this.degrees = 57.296
            this.cursorSize = 20
            this.fading = false

            this.cursorStyle = {
                boxSizing: 'border-box',
                position: 'fixed',
                top: `${
                    this.cursorSize / -2
                }px`,
                left: `${
                    this.cursorSize / -2
                }px`,
                zIndex: '2147483647',
                width: `${
                    this.cursorSize + 15
                }px`,
                height: `${
                    this.cursorSize + 15
                }px`,
                backgroundColor: 'transparent',
                border: '2px solid #FDF5EC',
                borderRadius: '50%',
                boxShadow: '0 -15px 0 -8px #0000',
                transition: '250ms, transform 100ms',
                userSelect: 'none',
                pointerEvents: 'none'
            }

            this.init(this.cursor, this.cursorStyle)
        }

        init(el, style) {
            Object.assign(el.style, style)
            this.cursor.removeAttribute("hidden")

        }

        move(event) {
            this.previousPointerX = this.position.pointerX
            this.previousPointerY = this.position.pointerY
            this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x
            this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y
            this.position.distanceX = this.previousPointerX - this.position.pointerX
            this.position.distanceY = this.previousPointerY - this.position.pointerY
            this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)

            if (event.target.localName === 'button' || event.target.localName === 'a' || event.target.onclick !== null || event.target.className.includes('curzr-hover')) {
                this.hover()
            } else {
                this.hoverout()
            }

            this.cursor.style.transform = `translate3d(${
                this.position.pointerX
            }px, ${
                this.position.pointerY
            }px, 0)`
            this.rotate(this.position)
            this.fade(this.distance)
        }

        rotate(position) {
            let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
            this.previousAngle = this.angle

            if (position.distanceX <= 0 && position.distanceY >= 0) {
                this.angle = 90 - unsortedAngle + 0
            } else if (position.distanceX < 0 && position.distanceY < 0) {
                this.angle = unsortedAngle + 90
            } else if (position.distanceX >= 0 && position.distanceY <= 0) {
                this.angle = 90 - unsortedAngle + 180
            } else if (position.distanceX > 0 && position.distanceY > 0) {
                this.angle = unsortedAngle + 270
            }

            if (isNaN(this.angle)) {
                this.angle = this.previousAngle
            } else {
                if (this.angle - this.previousAngle <= -270) {
                    this.angleDisplace += 360 + this.angle - this.previousAngle
                } else if (this.angle - this.previousAngle >= 270) {
                    this.angleDisplace += this.angle - this.previousAngle - 360
                } else {
                    this.angleDisplace += this.angle - this.previousAngle
                }
            }
            this.cursor.style.transform += ` rotate(${
                this.angleDisplace
            }deg)`
        }

        hover() {
            this.cursor.style.border = '18px solid #3C5761'
        }

        hoverout() {
            this.cursor.style.border = '1px solid #3C5761'
        }

        // Bolita chiquitina
        fade(distance) {
            this.cursor.style.boxShadow = `0 ${
                -15 - distance
            }px 0 -8px #94AAB3, 0 0 0 1px white`
            if (!this.fading) {
                this.fading = true
                setTimeout(() => {
                    this.cursor.style.boxShadow = '0 -15px 0 -8px #94AAB3, 0 0 0 1px white'
                    this.fading = false
                }, 50)
            }
        }

        click() {
            this.cursor.style.transform += ` scale(0.65)`
            setTimeout(() => {
                this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.65)`, '')
            }, 35)
        }

        remove() {
            this.cursor.remove()
        }
    }(() => {
        const cursor = new CircleAndDot()
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.onmousemove = function (event) {
                cursor.move(event)
            }
            document.onclick = function () {
                cursor.click()
            }
        } else {
            cursor.remove()
        }
    })()
});


