;
(function() {
    class nav_hover {
        constructor() {
            this.nav_li_list = $('#nav .nav-fir-group li').not('#nav ul li:first');
            // console.log(this.nav_li_list.length)
        }
        init() {
            let _this = this;
            // this.nav_li_list.each(function(index, element) {
            //     _this.nav_li_list.eq(index).find('a').css({ 'color': '#f10180' })
            // })
            this.nav_li_list.hover(function() {
                let index = $(this).index() - 1;
                _this.over(index);
            }, function() {
                let index = $(this).index() - 1;
                _this.out(index);
            })
        }
        over(index) {
            this.nav_li_list.eq(index).children('a').addClass("h")
        }
        out(index) {
            this.nav_li_list.eq(index).children('a').removeClass("h")
        }
    }
    new nav_hover().init();
})();

(function() {
    class nav_position {
        constructor() {
            this.nav = $('nav');
            // console.log(this.nav.offset().top);
        }
        init() {
            let _this = this;
            $(window).on('scroll', function() {
                _this.scroll();
            })
        }
        scroll() {
            let $top = $(window).scrollTop();
            if ($top > 150) {
                this.nav.css({ 'position': 'fixed' })
                this.nav.css({
                    'top': 0
                })
                this.nav.css({
                    'box-shadow': '0 1px 3px 0 #a7a7a7'
                })
            } else {
                this.nav.css({ 'position': 'relative' })
                this.nav.css({
                    'box-shadow': 'none'
                })
            }
        }
    }
    new nav_position().init();
})();

(function() {
    class banner {
        constructor() {
            this.banner_right = $('.banner-right');
            this.banner_left = $('.banner-left');
            this.banner_pic = $('.banner-pic-align');
            this.banner_pic_img = $('.banner-pic-align ul li img');
            this.banner_title = $('#banner-title span');
            this.banner_bottom = $('#banner-bottom');
            let _this = this;
            this.num = this.banner_title.index();
        }
        init() {
            let _this = this;
            this.banner_pic.hover(function() {
                _this.over();

            }, function() {
                _this.out();
            })
            this.banner_title.on('mouseover', function() {
                let index = $(this).index();
                _this.mouseover(index);
            })
            this.banner_right.on('click', function() {
                _this.rightclick();
            })
            this.banner_left.on('click', function() {
                _this.leftclick();
            })
        }
        over() {
            this.banner_left.css({
                'left': 0
            })
            this.banner_right.css({
                'right': 0
            })
        }
        out() {
            this.banner_left.css({
                'left': -66
            })
            this.banner_right.css({
                'right': -66
            })
        }
        mouseover(index) {
            // console.log(index)
            let _this = this;
            this.banner_title.eq(index).addClass("color").siblings().removeClass("color");
            this.banner_pic_img.eq(index).stop(true).animate({ 'opacity': 1 }).parent().parent().siblings().find("img").stop(true).animate({ 'opacity': 0 })
            if (index == 0) {
                this.banner_bottom.stop(true).animate({
                    left: 290
                })
            } else {
                this.banner_bottom.stop(true).animate({
                    left: 490
                })
            }
        }
        rightclick() {
            this.num++;
            this.banner_title.eq(this.num).addClass("color").siblings().removeClass("color");
            this.banner_pic_img.eq(this.num).stop(true).animate({ 'opacity': 1 }).parent().parent().siblings().find("img").stop(true).animate({ 'opacity': 0 })
            if (this.num == 0) {
                this.banner_bottom.stop(true).animate({
                    left: 290
                })
            } else {
                this.banner_bottom.stop(true).animate({
                    left: 490
                })
            }

            if (this.num >= 1) {
                this.num = -1;
            }
        }
        leftclick() {
            // console.log(_this.num)
            this.num--;
            this.banner_title.eq(this.num).addClass("color").siblings().removeClass("color");
            this.banner_pic_img.eq(this.num).stop(true).animate({ 'opacity': 1 }).parent().parent().siblings().find("img").stop(true).animate({ 'opacity': 0 })
            if (this.num == 0) {
                this.banner_bottom.stop(true).animate({
                    left: 290
                })
            } else {
                this.banner_bottom.stop(true).animate({
                    left: 490
                })
            }

            if (this.num < 0) {
                this.num = 1;
            }
        }
    }
    new banner().init();
})();

(function() {
    class left_stairs {
        constructor() {
            this.main_stairs_nav = $('#main-stairs-left');
            this.main_stairs_li = $('#main-stairs-left ul li');
            this.main_stairs_floor = $('.main-stairs-floor');
        }
        init() {
            let _this = this;
            // console.log(this.main_stairs_floor)
            $(window).on('scroll', function() {
                _this.scroll();
            })
            this.main_stairs_li.on('click', function() { //点击左侧导航栏
                let this_index = $(this)
                _this.click(this_index);
                // console.log($(this));
            })
        }
        scroll() {
            let _this = this;
            let $top = $(window).scrollTop(); //获取当前window下滚动条的Top值
            if ($top >= 1400) {
                this.main_stairs_nav.css({
                    position: 'fixed',
                    top: 112
                })
            } else {
                this.main_stairs_nav.css({
                    'position': 'absolute',
                    top: 100
                })
            }
            //拖动滚动条，根据滚动条的距离，给对应的楼梯添加类名；
            //楼层的top值和滚动条距离进行比较
            this.main_stairs_floor.each(function(index, element) { //each遍历当前元素，获取每个匹配的元素
                let $loucengTop = $(element).offset().top; //获取到每个楼层的top值
                // console.log($loucengTop + 1400);
                // console.log($top)
                if ($loucengTop + 1400 > $top) {
                    _this.main_stairs_li.find('a').removeClass('active-click'); //每次触发事件时，移除所有active类名
                    _this.main_stairs_li.eq(index).find('a').addClass('active-click'); //当满足条件时，给当前li元素添加类名
                    return false; //满足条件，终止循环
                }
            })
        }
        click(this_index) {
            //$(this).index（） 当前点击楼梯的索引
            // console.log(index)
            this_index.addClass('active-click').siblings().removeClass('active-click'); //当前的元素添加类，除当前元素外的其他的元素移除类；
            let $top = this.main_stairs_floor.eq(this_index.index()).offset().top - 40; //获取当前主题内容元素的Top值
            $('html,body').animate({ //赋值要注意内部的属性
                scrollTop: $top //将当前主题内容元素的Top值赋给滚动条
            }, 0.1)
        }
    }
    new left_stairs().init();
})();

(function() {
    class hover_color {
        constructor() {
            this.nav_more_group = $('.nav-more-group');
            this.nav_lastli = $('.nav_lastli');
            this.nav_more = $('.nav-more')
                // console.log(this.nav_more)
        }
        init() {
            let _this = this;
            this.nav_lastli.hover(function() {
                    _this.over();
                    // _this.nav_more_group.each(function(index, element) {
                    //     _this.nav_more_group.eq(index).children('a').addClass("h").siblings().removeClass('h')
                    // })
                    // console.log(_this.nav_more_group.length)


                }, function() {
                    _this.out();
                })
                // this.nav_more_group.each(function(index, element) {
                // _this.nav_more_group.hover(function() {
                //     _this.nav_more_group.find('a').addClass('h');
                //     _this.nav_more_group.index().siblings().find('a').removeClass('h');
                // }, function() {})

            // })
        }
        over() {
            this.nav_more.show();
        }
        out() {
            this.nav_more.hide();
        }
    }
    new hover_color().init();
})();

(function() {
    class floor_screen {
        constructor() {
            this.floor_img = $('.main-floor-info');
            console.log(this.floor_img.find('img'))
        }
        init() {
            let _this = this;
            this.floor_img.find('img').hover(function() {
                $(this).animate({ 'opacity': '0.6' })
            }, function() {
                $(this).animate({ 'opacity': '1' })
            })
        }
    }
    new floor_screen().init();
})();
(function() {
    class main_info {
        constructor() {
            this.main_floor_info = $('.main-floor-info');
            console.log(this.main_floor_info.length)
        }
        init() {
            let _this = this;
            $.ajax({
                url: '../php/vipdata.php',
                dataType: 'json'
            }).done(function(data) {
                // let $html = '<ul>';
                console.log(data);
                let $html = "";

                $.each(data, function(index, value) {

                    $html +=
                        `
                    <section class="floor-info-details">
                        <a href="http://10.31.163.68/projectname/src/details.html?sid=${value.sid}">
                            <img class="lazy" data-original="${value.url}" width="490" height="235" alt="${value.title}">
                            <section class="floor-details-title">
                                <span class="discount"><span>${value.count}</span>折起</span>
                                <span class="title">${value.title}</span>
                                <section class="count-down">
                                    <i></i>
                                    <span>剩${value.time}天</span>
                                </section>
                            </section>
                        </a>
                    </section>
                    `


                    // value[index].html($html);
                    // console.log(value)

                });
                _this.main_floor_info.html($html);

                $(function() {
                    $("img.lazy").lazyload({
                        effect: "fadeIn"
                    });
                });


            });
        }
    }
    new main_info().init();
})();
(function() {
    if (getcookie('UserName')) {
        $('.nav-login').hide();
        $('.nav-registor').hide();
        $('.nav-exit').show()
        $('.nav-username').show().find('span').html('你好,' + getcookie('UserName'));
    }
    $('.admin a').on('click', function() {
        delcookie('UserName', '', -1);
        $('.admin').hide();
        $('.login').show();
    });
})();
(function() {
    class click_close {
        constructor() {
            this.nav_exit = $('.nav-exit');
            this.nav_username = $('.nav-username');
            this.nav_registor = $('.nav-registor');
            this.nav_login = $('.nav-login');
        }
        init() {
            let _this = this;
            this.nav_exit.on('click', function() {
                _this.click();
            })
        }
        click() {
            this.nav_exit.css({ display: 'none' });
            console.log($(this))
            this.nav_username.css({ display: 'none' });
            this.nav_registor.css({ display: 'block' });
            this.nav_login.css({ display: 'block' });
        }
    }
    new click_close().init();
})();
(function() {
    class sec_nav {
        constructor() {
            this.fir_group_first = $('.fir-group-first');
            this.nav_sec_group = $('.nav-sec-group');
            this.sec_group_more = $('.sec-group-more');
        }
        init() {
            let _this = this;
            this.fir_group_first.hover(function() {
                _this.secover();
            })
            this.nav_sec_group.find('li').hover(function() {
                _this.tirover();
            })
            this.nav_sec_group.on('mouseleave', function() {
                _this.secout();
            })
            this.sec_group_more.on('mouseleave', function() {
                _this.tirout();
            })
        }
        secover() {
            this.nav_sec_group.css({ display: 'block' })
        }
        secout() {
            this.nav_sec_group.css({ display: 'none' })
        }
        tirover() {
            this.sec_group_more.css({ display: 'block' })
        }
        tirout() {
            this.sec_group_more.css({ display: 'none' })
        }
    }
    new sec_nav().init();
})();

(function() {
    class right_nav {
        constructor() {
            this.right_nav_li = $('.right-nav-cont li').not('.my-cart');
            this.right_nav_foot = $('.right-nav-foot section');
            this.my_cart = $('.my-cart');
            this.my_cart_info = $('.my-cart-info');
            this.back_top = $('.back-top');
        }
        init() {
            let _this = this;
            this.right_nav_li.hover(function() {
                _this.conover(this);
            }, function() {
                _this.conout(this)
            })
            this.right_nav_foot.hover(function() {
                _this.conover(this);
            }, function() {
                _this.conout(this)
            })
            this.my_cart.on('click', function() {
                _this.click();
            })
            this.my_cart_info.on('mouseleave', function() {
                _this.iclick();
            })
            this.my_cart_info.find('i').on('click', function() {
                _this.iclick();
            })
            this.back_top.on('click', function() {
                _this.topclick();
            })
        }
        conover(m) {
            $(m).find('i').css({ 'background-color': '#df147f' })
            $(m).find('a').css({ 'background-color': '#df147f' })
            $(m).find('p').css({ 'right': '37px' })
        }
        conout(m) {
            $(m).find('i').css({ 'background-color': '#262626' })
            $(m).find('a').css({ 'background-color': '#262626' })
            $(m).find('p').css({ 'right': '-120px' })
        }
        click() {
            this.my_cart_info.css({ 'right': '37px' })
        }
        iclick() {
            this.my_cart_info.css({ 'right': '-300px' })
        }
        topclick() {
            window.scrollX = 0;
        }
    }
    new right_nav().init();
})();