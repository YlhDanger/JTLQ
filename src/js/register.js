require(['require.config'],()=>{
    require(['url','footer'],(url)=>{
        class Register{
            constructor(){
                //找到所需要的元素
                this.usernameInput = $("#username");
                this.passwordInput = $("#password");
                this.repeatPasswordInput = $("#repeat-password");
                this.checkBox = $("#checkbox");
                this.btn = $("#submit");
                this.bindEvents();
            }

            bindEvents(){
                this.btn.on('click',()=>{
                    //点击时取到input里面的值
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val(),
                        repeatPassword = this.repeatPasswordInput.val();
                        //判断重复密码和密码一致，并且复选框选中  请求数据
                        if(password === repeatPassword){ 
                            //jquery转原生 判断状态
                            if(this.checkBox[0].checked){
                                //请求数据
                                $.ajax({
                                    url:url.phpBaseUrl + "user/register.php",
                                    type :"POST",
                                    //利用解构赋值 请求携带参数
                                    data :{username,password},
                                    success : data=>{
                                        let res = JSON.parse(data);
                                        if(res.res_code === 1){
                                            alert(res.res_message + ",即将跳转登录页");
                                            //跳转页面
                                            location.href = 'login.html';
                                            //window.open = login.html;
                                        }
                                    },
                                    datatype:"json"


                                })


                            }else{
                                alert("请阅读协议");
                            }
                             
                        }else{
                            alert("重复密码得和密码一致");
                            this.clearValue();
                        }  
                })
            }
            
            //清空方法
             clearValue() {
                this.usernameInput.val(''),
                this.passwordInput.val(''),
                this.repeatPasswordInput.val('');
           }

        }


    new Register();
    })

})