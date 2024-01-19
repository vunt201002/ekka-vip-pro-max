// View
const View = {
    Carousel:{ 
        banner: {  
            init(){
                $("#banner-carousel")
                    .append(`
                        <div class="carousel-item-element"> 
                            <img src="assets/images/rsz_web.png" alt="">
                        </div>
                        <div class="carousel-item-element"> 
                            <img src="assets/images/rsz_web.png" alt="">
                        </div> `)
                $('#banner-carousel').owlCarousel({
                    loop: true,
                    nav: true,
                    // dots: true,
                    // autoplay: true,
                    // autoplayTimeout: 7000,
                    autoWidth: false, 
                    lazyLoad: false,
                    margin: 0,
                    responsive:{
                        0:{
                            items: 1, 
                        }, 
                        767:{
                            items: 1, 
                        },
                        1279:{
                            items: 1,
                        },
                        1280:{
                            items: 1
                        }
                    }
                })
            }
        },
    },
    init(){
        View.Carousel.banner.init();
    }
};
// Controller
(() => { 
    View.init();
    $(".I-carousel").css({"width": $(window).width()+"px"})
    var stickyNav = $('body').offset().top;
    window.onscroll = function() {
        window.pageYOffset > stickyNav ? $('header').addClass('is-scroll') : $('header').removeClass('is-scroll');
    }; 

    $(document).mouseup(function(e) {
        var container = $("header");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('header').removeClass('is-open'); 
        }
    });
    $(document).on('click', '.header-nav-control', function() { 
        $(`header`).toggleClass('is-open'); 
    });
     
    
    window.onload = function () {
        
    }; 
})();