(function() {
    class check_click {
        constructor() {
            this.check_info = $('.check-info label');

        }
        init() {
            let num = 1;
            this.check_info.on('click', function() {
                num++;
                if (num % 2 == 0) {
                    $(this).css({ 'background-position': '-24px 0' })
                } else {
                    $(this).css({ 'background-position': '-48px 0' })
                }

            })
        }
    }
    new check_click().init();
})();

$(function() {
    $('#form1').validate({
        rules: {
            phone: {
                required: true,
                minlength: 11,
                maxlength: 11,
                remote: { //将前端的name给后端
                    url: "../php/reg.php", //后台处理程序
                    type: "post" //数据发送方式
                }
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 18
            },
            repass: {
                required: true,
                equalTo: '#password'
            }
        },
        messages: {
            phone: {
                required: '手机号不能为空',
                minlength: '手机号不能小于11位',
                maxlength: '手机号不能大于11位',
                remote: '手机号已存在'
            },
            password: {
                minlength: '密码不能小于6位',
                maxlength: '密码不能大于18位',
                required: '密码不能为空'
            },
            repass: {
                equalTo: '密码重复不能为空',
                required: '密码不一致'
            }
        }

    });
});

$.validator.setDefaults({
    /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
    success: function(label) {
        label.text('√').css('color', 'green').addClass('valid');
    }
});