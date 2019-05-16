require(['require.config'],()=>{
    require(['template','header','footer'],(template)=>{
        class Cart{
            constructor(){
                this.init();                   


            }
        init(){
            //从localStorage里面拿到数据 渲染页面
            let cart = localStorage.getItem('cart');
            if(cart){
                cart = JSON.parse(cart);
                //把数据传过去 渲染列表
                this.render(cart);

            }else{
                alert("购物车为空，去逛逛吧")
            }

        }
        //渲染
        render(cart){
            $("#listCart").html(template("cart-template",{cart}));
            //购物车不为空时显示
            if(cart.length!==0){
                $("#listTotal").css("display","block");
            }
            this.calcTotal();
            this.deleteCart(cart);
            this.addNum(cart);
            this.cutNum(cart);
        }
        //计算总价
        calcTotal(){
            let total = 0;
            $(".Subtotal").each((index,item)=>{
                total += Number($(item).html());
              })
             //把总价渲染到页面
             $("#total1").html("原价 ：" + total + "元");
             $("#total2").html( total + ".00元");
            
        }
        deleteCart(cart){
            //保存外层this
            let _this=this;
            $(".delete").on('click',function(){
                //找到父级元素删除
             $(this).parent().remove();
             //找到父元素的id
             let id = $(this).parent().attr("data-id");
             //用some方法  找到满足条件的数据 删除之后重新存
             cart.some((item,i)=>{
                if(item.id==id){
                    cart.splice(i,1);
                    localStorage.setItem('cart',JSON.stringify(cart));
                    //删除之后重新计算总价
                    _this.calcTotal();
                }
              })
              //判断cart 是否为空 空的话让结算隐藏
              if(cart.length===0){
                $("#listTotal").css("display","none");
            }
            })
            
        }
        //点击加方法
        addNum(cart){
            let _this = this;
            $(".count_plus").on('click',function(){
                //找到点击的祖先元素id
               let id =  $(this).parents(".cartList").attr("data-id");
            // console.log(cart);
               let index = -1;
               if(cart.some((item,i)=>{
                   index = i;
                    return item.id==id;
               })){
                    cart[index].num++;
                    $(this).prev().children().val(cart[index].num);
                     localStorage.setItem('cart',JSON.stringify(cart));
                     _this.subtotal(id,this,cart);
                     _this.calcTotal();
               }
            })
        }
        //减
        cutNum(cart){
            let _this = this;
            $(".count_minus").on('click',function(){
                //找到点击的祖先元素id
               let id =  $(this).parents(".cartList").attr("data-id");
            // console.log(cart);
               let index = -1;
               if(cart.some((item,i)=>{
                   index = i;
                    return item.id==id;
               })){
                    cart[index].num--;
                    
                    if(cart[index].num===0){
                        if(confirm("再减就没有了")){
                            $(".delete")[0].click();
                        }
                        
                    }else{
                        $(this).next().children().val(cart[index].num);
                        localStorage.setItem('cart',JSON.stringify(cart));
                        _this.subtotal(id,this,cart);
                        _this.calcTotal();
                    }
               }
            })
        }

            //计算小计
            subtotal(id,_this,cart){
            //   console.log(id,_this,cart);
            let index =-1;
            if(cart.some((item,i)=>{
                index = i;
                 return item.id==id;
            })){
                let html = cart[index].price*cart[index].num;
                $(_this).parents(".number").nextAll(".Subtotal").html(html);
                
            }
            
        }


        }




    new Cart();
    })


})