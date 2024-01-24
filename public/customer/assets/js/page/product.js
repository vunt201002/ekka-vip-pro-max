const View = {
    Size: [],
    ItemSelect: null,
    Description: {
        render(data){
            var cards = localStorage.getItem("card") == null ? "" : localStorage.getItem("card").split("-");
            // var real_prices     = View.formatNumber(data.discount == 0 ? data.prices : data.prices - (data.prices*data.discount/100));
            var real_prices     = View.formatNumber(data.discount == 0 ? data.prices : (data.prices - (data.prices / 100 * data.discount)));
            var sell_prices     = View.formatNumber(data.prices*data.discount/100);
            var discount        = data.discount;
            prices = "";
                                                
            discount != 0 ? prices += `<del> <span class="new-price">${View.formatNumber(data.prices)}</span>  đ </del>` : "";
            prices += `<span class="new-price">${real_prices} đ</span> `;

            $(".action-add-to-card").attr("data-id", data.id)
            $(".action-add-to-card").html(cards.includes(data.id+"") ? "✔ đã thêm" : "+ Giỏ hàng")
            $(".product-name").text(data.name);
            $(".product-description").html(data.description);
            $(".product-detail").html(data.detail)
            $(".product-prices").append(prices)
            $(".countdown-time").attr("data-countime", data.discount_time) 

            // var size = JSON.parse(data.metadata).size.map(v => `<li><span>${v}</span></li>`).join("")
            // var color = JSON.parse(data.metadata).color.map(v => `<li><span style="background-color: ${v};"><p style="visibility: hidden">${v}</p></span></li>`).join("")
            // $(".product-size").append(size)
            // $(".product-color").append(color)
            View.countdown.render()
        }
    },
    Color: {
        render(data){
            let visible = []
            data.map(v => {
                if (visible.includes(v.size_name)) {

                }else{
                    visible.push(v.size_name)
                }
            })
            visible.map(v => {
                $(".product-size").append(`<li value="${v}"><span>${v}</span></li>`)
            })
        },
        renderColor(name){
            $(".product-color li").remove()
            View.Size.map(v => {
                if (v.size_name == name) $(".product-color").append(`<li value="${v.color_id}"><span style="background-color: ${v.color_hex};"><p style="visibility: hidden">${v.color_name}</p></span></li>`)
            })
        },
        isSelectSize(){
            $(document).on('click', `.product-size li`, function(event) { 
                View.Color.renderColor($(this).attr("value"))
            });
        },
        isSelectColor(){
            $(document).on('click', `.product-color li`, function(event) {
                let color_id = $(this).attr("value");
                let size_name = $('.product-size li.active').attr("value");
                View.Size.map(v => {
                    if (v.color_id == color_id && v.size_name == size_name){
                        View.ItemSelect = v.id
                    }
                })
                console.log(View.ItemSelect);
            });
        }
    },
    countdown: {
        render(){ 
            let timeCount = $(".countdown-time").attr('data-countime'); 
            let countDownDate = new Date(timeCount).getTime();
            let interval = setInterval(function() {
                let now = new Date().getTime();
                let distance = countDownDate - now;
                if (isNaN(distance) || distance < 0) {
                    clearInterval(interval);
                } else {
                    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    let hours = (days * 24) + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    let html = `
                        <div class="time-item">
                            <div class="time-number m-r-10">
                                ${hours < 10 ? `0${hours}` : hours}
                            </div>
                            <div class="time-detail">
                                Giờ 
                            </div>
                        </div>
                        <div class="time-item">
                            <div class="time-number m-r-10">
                                ${minutes < 10 ? `0${minutes}` : minutes}
                            </div>
                            <div class="time-detail">
                                Phút
                            </div>
                        </div>
                        <div class="time-item">
                            <div class="time-number m-r-10">
                                ${seconds < 10 ? `0${seconds}` : seconds}
                            </div>
                            <div class="time-detail">
                                Giây
                            </div>
                        </div> 
                    `;
                    $('.countdown-timer').html(html);
                }
            }, 1000); 
        }
    },
    Images: {
        render_list(data){
            data.split(",").map((value, key) => {
                $(".single-product-cover").append(`
                    <div class="single-slide zoom-image-hover">
                        <img class="img-responsive" src="/${value}" alt="">
                    </div>
                `)
                $(".single-nav-thumb").append(`
                    <div class="single-slide">
                        <img class="img-responsive" src="/${value}" alt="">
                    </div>
                `)
            })
            $('.single-product-cover').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: false,
                asNavFor: '.single-nav-thumb',
            });

            $('.single-nav-thumb').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: '.single-product-cover',
                dots: false,
                arrows: true,
                focusOnSelect: true
            });
        }
    }, 
    RelatedProduct: {
        render(data){
            var cards = localStorage.getItem("card") == null ? "" : localStorage.getItem("card").split("-");
            data.map(v => {
                var image           = v.images.split(",")[0];

                var discount = v.discount == 0 ? "" : `<span class="percentage">${v.discount}%</span><span class="flags"> <span class="sale">Sale</span> </span>`
                var real_prices     = View.formatNumber(v.discount == 0 ? v.prices : v.prices - (v.prices*v.discount/100));
                var discount_value = v.discount == 0 ? "" : `<span class="old-price">${View.formatNumber(v.prices)} đ</span>`
                $(".product-related").append(`
                    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6  ec-product-content" >
                        <div class="ec-product-inner">
                            <div class="ec-pro-image-outer">
                                <div class="ec-pro-image">
                                    <a href="/product?id=${v.id}" class="image">
                                        <img class="main-image" src="${image}" alt="Product" />
                                    </a>
                                    ${discount}
                                </div>
                            </div>
                            <div class="ec-pro-content">
                                <h5 class="ec-pro-title"><a href="/product?id=${v.id}">${v.name}</a></h5>
                                <span class="ec-price">
                                    ${discount_value}
                                    <span class="new-price">${real_prices} đ</span>
                                </span>

                            </div>
                        </div>
                    </div>
                `)
            })   
        }
    },
    isNumberKey(evt){
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    },
    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    URL: {
        get(id){
            var urlParam    = new URLSearchParams(window.location.search);
            return urlParam.get(id)
        }
    }, 
    init(){
        $(document).on('keypress', `.product-quantity`, function(event) {
            return View.isNumberKey(event);
        });
    }
};
(() => {
    View.init()
    function init(){
        getProduct(); 
        getRelatedProduct();
    }
    function debounce(f, timeout) {
        let isLock = false;
        let timeoutID = null;
        return function(item) {
            if(!isLock) {
                f(item);
                isLock = true;
            }
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() {
                isLock = false;
            }, timeout);
        }
    }

    View.Color.isSelectSize(() => {
        console.log(123);
    })
    View.Color.isSelectColor(() => {
        console.log(123);
    })

    $(document).on('click', '.product-size li', function() {
        $(".product-size li").removeClass("active")
        $(this).addClass("active")
        $(".action-add-to-card").text("+ Giỏ hàng")
    });
    $(document).on('click', '.product-color li', function() {
        $(".product-color li").removeClass("active")
        $(this).addClass("active")
        $(".action-add-to-card").text("+ Giỏ hàng")
    });

    function getProduct(){
        Api.Product.GetOne(View.URL.get("id"))
            .done(res => {
                View.Images.render_list(res.data.item[0].images);
                View.Description.render(res.data.item[0]);
                View.Size = res.data.size
                View.Color.render(res.data.size);
            })
            .fail(err => {  })
            .always(() => { });
    } 
    function getRelatedProduct(){
        Api.Product.GetRelated(View.URL.get("id"))
            .done(res => {
                View.RelatedProduct.render(res.data);
            })
            .fail(err => {  })
            .always(() => { });
    } 
    init()
})();
