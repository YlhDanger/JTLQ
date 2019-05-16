require(['require.config'],() =>{
     require(['jquery','url','template','swiper','header','footer',],($,url,template,Swiper) =>{
         class Index{
              constructor(){            
                   this.getList();
                    this.Search();
                    this.inputBlur();
                    this.inputCon();
                    this.banner();
              }


          //获取数据
          getList(){
              //ajax 请求数据
              $.get(url.rapBaseUrl+"index/list",data =>{
                  if(data.res_code === 1){
                      this.randerList(data.res_body.list);
                  }
              })
          } 
          //渲染html页面
          randerList(list){
              //console.log(list);
                let html = template("list-index",{list})
                $("#list-ul").html(html);
          }

          //搜索框功能
           Search(){
               
               $("#search-input").on('keyup',function(){
                   //没一次事件把上一次的渲染的li清除
                $("#search-list").empty();
                   let keyWords = $(this).val();
                   console.log($(this).val());
                //带上关键字请求jsonp的接口
                $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+keyWords,data=>{
                   console.log(data);
                   $(data.s).each((index,item)=>{
                      let li = $("<li></li>");
                      $("#search-list").append(li.html(item)).css("display","block");
                   }) 

                })
                
               })
               
            }
            // 失去焦点让内容隐藏
            inputBlur(){
                $("#search-input").blur(()=>{
                   setTimeout(()=>{
                    $("#search-list").css("display","none")
                   },500);
                })
            }
            // 点击搜索内容渲染到input里面
            inputCon(){
                $("#search-list").on('click','li',function(){
                    $("#search-input").val($(this).html());

                })
            }


            
      banner () {
        // 首页轮播图
        var mySwiper = new Swiper ('.swiper-container', {
          autoplay: true,
          
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          
          // 如果需要前进后退按钮
        //   navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev'
            
        //   }

        }) 
      }

          }

          new Index();

     })

})