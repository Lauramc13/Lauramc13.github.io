window.addEventListener('DOMContentLoaded', event => {
  AOS.init();

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
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
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

    let header = document.getElementById('header');

    document.addEventListener('scroll', function() {
        // Get scroll position
        let scrollPosition = window.pageYOffset;
            if (scrollPosition <= 550) {
            header.style.opacity = 1 - scrollPosition / 350;
        } else {
            header.style.opacity = 0;
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
          pointerY: 0,
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
          top: `${ this.cursorSize / -2 }px`,
          left: `${ this.cursorSize / -2 }px`,
          zIndex: '2147483647',
          width: `${ this.cursorSize +15 }px`,
          height: `${ this.cursorSize +15 }px`,
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
    
        if (event.target.localName === 'button' || 
            event.target.localName === 'a' || 
            event.target.onclick !== null ||
            event.target.className.includes('curzr-hover')) {
          this.hover()
        } else {
          this.hoverout()
        }
    
        this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`
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
        this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`
      }
    
      hover() {
        this.cursor.style.border = '18px solid #414C50ff'
      }
    
      hoverout() {
        this.cursor.style.border = '1px solid #FDF5EC'
      }
    
      // Bolita chiquitina
      fade(distance) {
        this.cursor.style.boxShadow = `0 ${-15 - distance}px 0 -8px #6B7A73ff, 0 0 0 1px #F2F5F8`
        if (!this.fading) {
          this.fading = true
          setTimeout(() => {
            this.cursor.style.boxShadow = '0 -15px 0 -8px #6B7A7300, 0 0 0 1px #F2F5F8'
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
      }
      
      (() => {
          const cursor = new CircleAndDot()
          if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
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

      $(function () {
        var platform = navigator.platform.toLowerCase();
        if (platform.indexOf('win') == 0 || platform.indexOf('linux') == 0) {
          if ($.browser.webkit) {
            $.srSmoothscroll();
          }
        }
      });

      //Animacion para los hr
      $(window).scroll(function(){
        var wh = $(window).height()-50;
          if($(window).scrollTop() > $('.trans--grow').offset().top-wh){
            setTimeout(function(){
              $('.trans--grow').addClass('grow');
            }, 275);
        }
      });

      var text = document.getElementById('text');
      var newDom = '';
      var animationDelay = 6;

      for(let i = 0; i < text.innerText.length; i++)
      {
          newDom += '<span class="char">' + (text.innerText[i] == ' ' ? '&nbsp;' : text.innerText[i])+ '</span>';
      }

      text.innerHTML = newDom;
      var length = text.children.length;

      for(let i = 0; i < length; i++)
      {
          text.children[i].style['animation-delay'] = animationDelay * i + 'ms';
      }
});


//Animacion portfolio

function animacionProtectora() {
  document.getElementById('PortfolioProtec').style.display='block';
  document.getElementById('PortfolioKodi').style.display='none';
  document.getElementById('PortfolioPoke').style.display='none';
  document.getElementById('PortfolioBici').style.display='none';
}

function animacionBici() {
  document.getElementById('PortfolioBici').style.display='block';
  document.getElementById('PortfolioKodi').style.display='none';
  document.getElementById('PortfolioPoke').style.display='none';
  document.getElementById('PortfolioProtec').style.display='none';
}

function animacionKoice() {
  document.getElementById('PortfolioKodi').style.display='block';
  document.getElementById('PortfolioPoke').style.display='none';
  document.getElementById('PortfolioProtec').style.display='none';
  document.getElementById('PortfolioBici').style.display='none';
}

function animacionPoke() {
  document.getElementById('PortfolioPoke').style.display='block';
  document.getElementById('PortfolioKodi').style.display='none';
  document.getElementById('PortfolioProtec').style.display='none';
  document.getElementById('PortfolioBici').style.display='none';
}


// // Animacion del portfolio
// function animacionProtectora(){
//   let foto = document.getElementById("picProtect");
//   let content = document.getElementById("PortfolioProtec");
//   if (content.style.display === "block") {
//     $('.content').animate({'height': '0px'}, 1000);
//     foto.style.display = "none";
//     content.style.display = "none";
//   } else {
//     $('.content').animate({'height': '100px'}, 1000);
//       content.style.display = "block";  
//       foto.style.display = "block";      
//   }
// }

// function animacionBici(){
//   let foto = document.getElementById("picBici");
//   let content = document.getElementById("PortfolioBici");
//   if (content.style.display === "block") {
//     $('.content').animate({'height': '0px'}, 1000);
//     foto.style.display = "none";
//     animationsTest(function () {
//       content.style.display = "none";
//     });
//   } else {
//     $('.content').animate({'height': '100px'}, 1000);
//       content.style.display = "block";  
//       foto.style.display = "block";      
//   }
// }

// function animacionKoice(){
//   let foto = document.getElementById("picKoice");
//   let content = document.getElementById("PortfolioKodi");
//   animationees(foto, content);
// }

// function animacionPoke(){
//   let foto = document.getElementById("picPoke");
//   let content = document.getElementById("PortfolioPoke");
//   animationees(foto, content);
// }

// function animationees(foto, content){
//   if (content.style.display === "block") {
//     $('.content').animate({'height': '0px'}, 1000);
//     foto.style.display = "none";
//     content.style.display = "none";
//   } else {
//     $('.content').animate({'height': '100px'}, 1000);
//       content.style.display = "block";  
//       foto.style.display = "block";      
//   }
// }

function animationsTest (callback) {
  var testAnimationInterval = setInterval(function () {
    if (! $.timers.length) {
        clearInterval(testAnimationInterval);
        callback();
    }
  }, 25);
};

// Cuando el usuario pulsa el boton, scroll al inicio de la pagina
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
