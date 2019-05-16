define(['jquery','cookie'],$=>{
    function Header (){
        this.container = $("#header-container");
        this.load().then(() => {
            this.isLogin();
          });
    }

    $.extend(Header.prototype, {
        // ES6对象增强写法
        load () {
          // header.html加载到container里
          // this.container.load('/html/module/header.html #header-bottom'); // 选择加载文件中的某一部分
          return new Promise(resolve => {
            this.container.load('/html/module/header.html', () => {
              // load异步执行结束
              resolve();
            });
          })
        },

        isLogin(){
            this.loginBtn = $("#login-btn");
            this.afterLogin = $("#after-login");
            this.nameSpan = $("#name");
            this.logout = $("#exit");
            //从cookie 里面取username
            let username = $.cookie("username");
            if(username){
              this.loginBtn.hide();
              this.afterLogin.show();
              this.nameSpan.html(username);
              $(".nav-list").css("width","690px");
            }
            //点击退出按钮
            this.logout.on('click',()=>{
              if(confirm("确定要退出吗")){
                //移出cookie
                $.removeCookie("username",{path : "/"})
              this.loginBtn.show();
              this.afterLogin.hide();
              $(".nav-list").css("width","650px");
              }
            })
        }
    });


return new Header();
});