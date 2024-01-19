<!DOCTYPE html>
<html class="is-scrolling">
<head>
	<title>Dliebe</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
	<link rel="shortcut icon" href="assets/images/slogo.png">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="{{ asset("customer_2/assets/css/style.css") }}" /> 
  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>  
    <meta name="csrf-token" content="{{ csrf_token() }}" />
</head>
<body>
	<header>
		<div class="top-header">
			<div class="wrapper">
				<div class="top-head-wrapper">
					<div class="header-nav-control">
						<i class="fas fa-bars"></i>
					</div>
					<div class="header-logo-wrapper">
						<a href=""><img src="assets/images/logo.png" alt=""></a>
					</div>
					<div class="header-search-wrapper">
						<div class="header-input">
							<input type="text" placeholder="Tìm kiếm sản phẩm bạn muốn mua">
							<div class="search-action">
								<i class="fas fa-search"></i>
							</div>
						</div>
					</div>
					<div class="header-hotline-wrapper">
						<a class="call-icon" href="">
							<i class="fas fa-phone-alt"></i>
						</a>
						<span>Hotline: </span>
						<p>0123 456 789</p>
					</div>
					<div class="header-action-wrapper">
						<a href="register" class="action-item">Đăng nhập</a>
						<a href="login" class="action-item">Đăng kí</a>
						<a href="cart" class="shopping-cart">
							<div class="cart-wrapper">
								<i class="fas fa-shopping-cart"></i>
								<div class="cart-number">
									6
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="nav-header">
			<div class="wrapper">
				<div class="nav-header-wrapper">
					<a href="" class="nav-header-item">trang chủ</a>
					<a href="" class="nav-header-item">Tất cả sản phẩm</a>
					<div class="nav-sub-list">
						<a href="" class="nav-header-item"> Danh mục </a>
						<div class="sub-list-wrapper">
							<a href="" class="sub-item">abc</a>
							<a href="" class="sub-item">abc</a>
							<a href="" class="sub-item">abc</a>
							<a href="" class="sub-item">abc</a>
						</div>
						<div class="nav-dropdown">
							<i class="fas fa-sort-down"></i>
						</div>
					</div> 
					<a href="" class="nav-header-item">Tin tức</a>
					<a href="" class="nav-header-item">Đang giảm giá</a> 
				</div>
			</div>
		</div>
		<div class="search-header">
			<input type="text" placeholder="Tìm kiếm sản phẩm bạn muốn mua">
		</div>
	</header>
	<main>
		@yield('body')
	</main> 
	<footer>

		<div class="I-footer">
			<div class="footer_contact">
				<div class="wrapper">
					<div class="row">
						<div class="col-xs-12 col-xm-12 col-md-6 col-lg-3 col-xl-3">
							<a href="#" class="full_logo">
								<img src="assets/images/logo.png">
							</a>
							<div class="full_logo">
								<img src="assets/images/logosalenoti.png"> 
							</div>
						</div>
						<div class="col-xs-12 col-xm-12 col-md-6 col-lg-3 col-xl-3">
							<div class="contact_wrapper">
								<div class="contact_title">
									<h5>D.Liebe Store</h5>
								</div>
								<div class="contact_content">
									<span>Ha noi</span> 
									<span><i class="fas fa-phone"></i>0123456789</span>
									<span><i class="fas fa-envelope"></i>0123456789</span>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-xm-12 col-md-6 col-lg-3 col-xl-3">
							<div class="contact_wrapper">
								<div class="contact_title">
									<h5>Danh mục</h5>
								</div>
								<div class="contact_content">
									<span><a href="">Mobile Application Development</a></span>
									<span><a href="">Web Application Development</a></span>
									<span><a href="">Blockchain Development</a></span>
									<span><a href="">Artificial Intelligence</a></span>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-xm-12 col-md-6 col-lg-3 col-xl-3">
							<div class="contact_wrapper">
								<div class="contact_title">
									<h5>Theo dõi chúng tôi</h5>
								</div>
								<div class="contact_content">
									<div class="social_wrapper">
										<a href="" class="social-item"><i class="fab fa-facebook-f"></i></a>
										<a href="" class="social-item"><i class="fab fa-linkedin-in"></i></a>
										<a href="" class="social-item"><i class="fab fa-twitter"></i></a>
										<a href="" class="social-item"><i class="fab fa-telegram-plane"></i></a>
										<a href="" class="social-item"><i class="fab fa-instagram"></i></a>
										<a href="" class="social-item"><i class="fab fa-youtube"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="copyright">
				<div class="wrapper">
					<div class="pull-left">
						Copyright © D.Liebe Store 2022. All rights reserved. 
					</div>
				</div>
			</div>
		</div>
	</footer>
</body>
<script src="https://kit.fontawesome.com/d8162761f2.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>  
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.2/js/swiper.min.js"></script> 
<script type="text/javascript" src="{{ asset("customer_2/assets/js/owl.carousel.js") }}"></script>  
<script type="text/javascript" src="{{ asset("customer_2/assets/js/window.js") }}"></script>  
@yield('js')

</html>			