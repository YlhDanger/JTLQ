require(['require.config'],()=>{
   require(['url','template','header','footer','zoom'],(url,template)=>{
          class Detail{
              constructor(){
                this.init();
                this.addCart();
              }
            
            init(){
               //从url取到id，携带id请求详情数据，渲染页面
               // console.log(location); 
               //后端需要什么类型的ID就用什么  取到的是字符串
               let id = Number(location.search.slice(4));
               //console.log(id);
               //利用get请求数据
               $.get(url.rapBaseUrl+"detail/type",{id},res=>{
                    if(res.res_code===1){
                        //利用解构赋值取到data
                        // console.log(res);
                        let {data} = res.res_body;
                        // data展开成  title: "abc", price:100
                        // 再在后面解构赋值增加一个id字段
                        data={...data,id}// 当接口变成真实接口的时候，这句代码不需要
                        //把data挂在this身上后面加入购物车用
                        this.data=data;
                        //传data 渲染页面
                        this.render(data);

                    } 
               })
            }  
            //接收数据渲染页面
            render(data){
                $("#detail").html(template("detail_template",{data}));
                this.zoom();
                this.changColor();
            }

            //点击切换型号和颜色
            changColor(){
              
              $("#model").on('click',"span",function(){
                $(this).siblings().removeClass("change_color");
                $(this).addClass("change_color");
                  })
              $("#color_style").on('click',"span",function(){
                $(this).siblings().removeClass("change_color");
                $(this).addClass("change_color");
              })
            }
            

            zoom () {
              // 放大镜插件
              $(".zoom-img").elevateZoom({
                gallery:'gal1',
                cursor: 'pointer',
                galleryActiveClass: 'active',
                borderSize:'1',    
                borderColor:'#888'
              });
            }

            addCart(){
              //在请求数据的时候，把数据挂在this身上
              //找到加入购物车按钮绑点击事件 最开始页面没有渲染 找不到 用事件委托
              $("#detail").on('click','#shopcart',()=>{
                // 列表页自定义属性，详情页可以不用
                // let id = $(this).attr("data-id");
                // 取到这条id对应的数据
                // 把this.data存在localstorage里

                //先取localStorage的cart 然后判断有没有 没有就加入  有的话判断有没有当前商品
                let cart = localStorage.getItem('cart');
                //有数据
                if(cart){
                    cart = JSON.parse(cart);
                  //判断有没有当前数据  有的就num++  没有就直接push
                  //给index赋值为-1 为0的话不满足的话 第0条也要num++
                  let index = -1;
                  if(cart.some((shop,i)=>{
                    index = i;
                    return shop.id === this.data.id;
                  })){
                      cart[index].num++
                  }else{
                      cart.push({...this.data,num : 1});
                  }

                }else{
                  //购物车为空
                  //第一次加入的时候只买一个
                  cart = [{...this.data,num : 1}];
                }
                //重新存localStorage
                localStorage.setItem('cart',JSON.stringify(cart));
                
                alert("添加购物车成功")

              })
            }


          }  

          new Detail();
   })


})