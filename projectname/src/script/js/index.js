;
(function() {
    class nav_hover {
        constructor() {
            this.nav_li_list = $('#nav ul li').not('#nav ul li:first');
            // console.log(this.nav_li_list.length)
        }
        init() {
            let _this = this;
            // this.nav_li_list.each(function(index, element) {
            //     _this.nav_li_list.eq(index).find('a').css({ 'color': '#f10180' })
            // })
            this.nav_li_list.hover(function() {
                var index = $(this).index() - 1;
                _this.nav_li_list.eq(index).children('a').addClass("h")
            }, function() {
                var index = $(this).index() - 1;
                _this.nav_li_list.eq(index).children('a').removeClass("h")
            })
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
                var $top = $(window).scrollTop();
                if ($top > 150) {
                    _this.nav.css({ 'position': 'fixed' })
                    _this.nav.css({
                        'top': 0
                    })
                    _this.nav.css({
                        'box-shadow': '0 1px 3px 0 #a7a7a7'
                    })
                } else {
                    _this.nav.css({ 'position': 'relative' })
                    _this.nav.css({
                        'box-shadow': 'none'
                    })
                }
            })
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
                _this.banner_left.css({
                    'left': 0
                })
                _this.banner_right.css({
                    'right': 0
                })

            }, function() {
                _this.banner_left.css({
                    'left': -66
                })
                _this.banner_right.css({
                    'right': -66
                })
            })
            this.banner_title.on('mouseover', function() {
                let index = $(this).index();
                // console.log(index)
                _this.banner_title.eq(index).addClass("color").siblings().removeClass("color");
                for (let i = 0; i < _this.banner_pic_img.length; i++) {
                    _this.banner_pic_img.eq(i).stop(true).animate({ 'opacity': 0 })
                }
                _this.banner_pic_img.eq(index).stop(true).animate({ 'opacity': 1 })
                if (index == 0) {
                    _this.banner_bottom.stop(true).animate({
                        left: 290
                    })
                } else {
                    _this.banner_bottom.stop(true).animate({
                        left: 490
                    })
                }
            })
            this.banner_right.on('click', function() {
                _this.num++;
                _this.banner_title.eq(_this.num).addClass("color").siblings().removeClass("color");
                for (let i = 0; i < _this.banner_pic_img.length; i++) {
                    _this.banner_pic_img.eq(i).stop(true).animate({ 'opacity': 0 })
                }
                _this.banner_pic_img.eq(_this.num).stop(true).animate({ 'opacity': 1 })
                if (_this.num == 0) {
                    _this.banner_bottom.stop(true).animate({
                        left: 290
                    })
                } else {
                    _this.banner_bottom.stop(true).animate({
                        left: 490
                    })
                }

                if (_this.num >= 1) {
                    _this.num = -1;
                }
            })
            this.banner_left.on('click', function() {
                // console.log(_this.num)
                _this.num--;
                _this.banner_title.eq(_this.num).addClass("color").siblings().removeClass("color");
                for (let i = 0; i < _this.banner_pic_img.length; i++) {
                    _this.banner_pic_img.eq(i).stop(true).animate({ 'opacity': 0 })
                }
                _this.banner_pic_img.eq(_this.num).stop(true).animate({ 'opacity': 1 })
                if (_this.num == 0) {
                    _this.banner_bottom.stop(true).animate({
                        left: 290
                    })
                } else {
                    _this.banner_bottom.stop(true).animate({
                        left: 490
                    })
                }

                if (_this.num < 0) {
                    _this.num = 1;
                }
            })
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
                var $top = $(window).scrollTop(); //获取当前window下滚动条的Top值
                if ($top >= 1400) {
                    _this.main_stairs_nav.css({
                            'position': 'fixed',
                            top: 112
                        }) //当滚动条Top值大于等于800时，左侧导航栏显示
                } else {
                    _this.main_stairs_nav.css({
                        'position': 'absolute',
                        top: 100
                    })
                }


                //拖动滚动条，根据滚动条的距离，给对应的楼梯添加类名；
                //楼层的top值和滚动条距离进行比较

                _this.main_stairs_floor.each(function(index, element) { //each遍历当前元素，获取每个匹配的元素
                    let $loucengTop = $(element).offset().top; //获取到每个楼层的top值
                    // console.log($loucengTop + 1400);
                    // console.log($top)
                    if ($loucengTop + 1400 > $top) {
                        _this.main_stairs_li.find('a').removeClass('active-click'); //每次触发事件时，移除所有active类名
                        _this.main_stairs_li.eq(index).find('a').addClass('active-click'); //当满足条件时，给当前li元素添加类名
                        return false; //满足条件，终止循环
                    }
                })



            })
            this.main_stairs_li.on('click', function() { //点击左侧导航栏
                //$(this).index（） 当前点击楼梯的索引
                $(this).addClass('active-click').siblings().removeClass('active-click'); //当前的元素添加类，除当前元素外的其他的元素移除类；
                var $top = _this.main_stairs_floor.eq($(this).index()).offset().top - 40; //获取当前主题内容元素的Top值
                $('html,body').animate({ //赋值要注意内部的属性
                    scrollTop: $top //将当前主题内容元素的Top值赋给滚动条
                }, 0.1)
            })


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
                    _this.nav_more.show();
                    // _this.nav_more_group.each(function(index, element) {
                    //     _this.nav_more_group.eq(index).children('a').addClass("h").siblings().removeClass('h')
                    // })
                    // console.log(_this.nav_more_group.length)


                }, function() {
                    _this.nav_more.hide();
                })
                // this.nav_more_group.each(function(index, element) {
                // _this.nav_more_group.hover(function() {
                //     _this.nav_more_group.find('a').addClass('h');
                //     _this.nav_more_group.index().siblings().find('a').removeClass('h');
                // }, function() {})

            // })
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
                // var $html = '<ul>';
                console.log(data);
                let $html = "";

                $.each(data, function(index, value) {

                    $html +=
                        `
                    <section class="floor-info-details">
                        <a href="http://localhost/projectname/src/details.html?sid=${value.sid}">
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

                // $.each(data, function(index, value) {
                //     $html += `
                //         <li>
                //             <a href="details.html?sid=${value.sid}" target="_blank">
                //                 <img src="${value.url}" />
                //                 <h4>${value.titile}</h4>
                //                 <p>¥${value.price}</p>
                //             </a>
                //         </li>
                //     `;
                // });
                // $html += '</ul>';
                // $('.goodslist').html($html);
            });
        }
    }
    new main_info().init();
})();