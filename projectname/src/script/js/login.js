;
(function() {
    class registor_tab {
        constructor() {
            this.info_nav_content = $('.info-nav-content');
            this.info_content = $('.info-content');
            this.list_main_more = $('.list-main-more span');
            this.foot_list_more = $('.foot-list-more');
            this.check_info = $('.check-info label');
            console.log(this.info_content)
        }
        init() {
            let _this = this;
            let num = 1;
            let sum = 1;
            this.info_nav_content.each(function(index, element) {

                $(this).on('click', function() {
                    let index = $(this).index();
                    $(this).addClass('login-active').siblings().removeClass('login-active');
                    console.log(index);
                    _this.info_content.eq(index).removeClass('i-hide').siblings().not('.info-nav').addClass('i-hide');
                })
            })
            this.list_main_more.on('click', function() {
                $(this).addClass('i-hide').siblings().removeClass('i-hide');
                num++;
                if (num % 2 == 0) {
                    _this.foot_list_more.show();
                } else {
                    _this.foot_list_more.hide();
                }

            })
            this.check_info.on('click', function() {
                sum++;
                if (sum % 2 == 0) {
                    $(this).css({ 'background-position': '-24px 0' })
                } else {
                    $(this).css({ 'background-position': '-48px 0' })
                }

            })
        }
    }
    new registor_tab().init();
})();

function addCookie(key, value, day) {
    var date = new Date(); //创建日期对象
    date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
    document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
}


$('#btn').on('click', function() {
    var $phone = $('#phone').val();
    var $password = $('#password').val();
    $.ajax({
        type: 'post',
        url: '../php/login.php',
        data: { //将用户名和密码传输给后端
            phone: $phone,
            pass: $password
        },
        success: function(data) { //请求成功，接收后端返回的值
            if (!data) { //用户名或者密码错误
                $('.input-tips').html('用户名或者密码错误').css({ 'text-align': 'left', 'color': 'red' });
                $('#password').val('');
            } else { //成功,存cookie,跳转到首页
                addCookie('UserName', $phone, 7);
                location.href = 'index123.html';
            }
        }
    })
});