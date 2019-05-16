require(['require.config'],()=>{
    require(['url','cookie','footer'],(url)=>{
        class Login{
            constructor(){
                //找到所需要的元素
                this.usernameInput = $("#username");
                this.passwordInput = $("#password");
                this.checkBox = $("#checkbox");
                this.btn = $("#submit");
                this.bindEvents();
            }

            bindEvents(){
                this.btn.on('click',()=>{
                    //点击时取到input里面的值
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val();
                            //jquery转原生 判断状态
                            if(this.checkBox[0].checked){
                                //请求数据
                                $.ajax({
                                    url:url.phpBaseUrl + "user/login.php",
                                    type :"POST",
                                    //利用解构赋值 请求携带参数
                                    data :{username,password},
                                    success : data=>{
                                       let res = JSON.parse(data);
                                       if(res.res_code===1){
                                           this.loginSuccess(username);
                                       }
                                        
                                    },
                                    datatype:"json"


                                })


                            }else{
                                alert("请阅读协议");
                            }
                             
                         
                })
            }
            
            loginSuccess(username){
               //存cookie
               $.cookie('username',username,{path :"/"});
               alert('登陆成功，即将跳转主页面');
               location.href = "/";
               
            }
        }


    new Login();
    })

})