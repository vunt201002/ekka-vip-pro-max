// View
const IndexView = {  
    init(){ 
    }
};
// Controller
(() => {
    IndexView.init(); 
    const slider = document.getElementById('ec-sliderPrice');
    if(slider){
        const rangeMin = parseInt(slider.dataset.min);
        const rangeMax = parseInt(slider.dataset.max);
        const step = parseInt(slider.dataset.step);
        const filterInputs = document.querySelectorAll('input.filter__input');

        noUiSlider.create(slider, {
            start: [rangeMin, rangeMax],
            connect: true,
            step: step,
            range: {
                'min': rangeMin,
                'max': rangeMax
            },

            // make numbers whole
            format: {
                to: value => value,
                from: value => value
            }
        });

        // bind inputs with noUiSlider 
        slider.noUiSlider.on('update', (values, handle) => {
            filterInputs[handle].value = values[handle];
        });

        filterInputs.forEach((input, indexInput) => {
            input.addEventListener('change', () => {
                slider.noUiSlider.setHandle(indexInput, input.value);
            })
        });
    } 
    $('#lightSlider').lightSlider({
        gallery: true,
        item: 1,
        loop:true,
        slideMargin: 0,
        thumbItem: 4
    });



    $(".filter-control-wrapper").on("click", function(){
        $(".category-nav").toggleClass("is-open")
    })

    $(document).mouseup(function(e) {
        var container = $(".category-nav");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.category-nav').removeClass('is-open'); 
        }
    });
})();