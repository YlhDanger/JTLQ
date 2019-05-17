require(['require.config'],()=>{
    require(['url','template','header','footer'],(url,template)=>{
        class List{
            constructor(){
            this.getData();
            this.jumpDetail();
            }
            //ajax请求数据
          getData(){
            $.ajax({
                url : url.rapBaseUrl + "list/type",
                type : "get",
                dataType :"json",
                success : data=>{
                    if(data.res_code===1){
                        //调用渲染页面方法把请求到的数据传过去
                        this.renderList(data.res_body.list);
                        //调用升序方法把请求到的数据传过去
                        this.ascendingOrder(data.res_body.list);
                        this.descendingOrder(data.res_body.list);
                    }
                   console.log(data); 
                }

            })

          }
          //用请求的数据利用模板引擎渲染页面
          renderList(list){
              //template第一个参数装模板引擎的script Id 第二个参数是结构赋值"list" : list
                let html = template("list_item",{list})
                //找到需要渲染的容器渲染
                $("#box").html(html);
                this.addCart(list);
                
          }
        //升序
         ascendingOrder(list){
             //点击升序按钮时排序
            $("#ascending").on('click',()=>{
                list.sort(function(a,b){
                    return a.price - b.price;
                })
                //console.log(list);
                this.renderList(list);

            })
        

         }
         //降序
         descendingOrder(list){
              //点击降序按钮时排序
              $("#descending").on('click',()=>{
                list.sort(function(a,b){
                    return b.price - a.price;
                })
                //console.log(list);
                this.renderList(list);

            })
        }

        //携带ID跳转详情页
        jumpDetail(){
            $("#box").on('click',"img",function(){
                let id = $(this).parents(".fl").attr("data-id");
                location.href = "/html/detail.html?id="+id;
            })
        }
        addCart(list){
            $("#box").on('click',".addCart",function(){
                alert("添加购物车成功");
               let id = $(this).parents(".fl").attr("data-id");
               console.log(list);
               let index = -1;
               $(list).each((i,item)=>{
                    if(list[i].id == id){
                          index = i;   
                    }     
               })
                this.data = list[index];
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
               

            })


        }
        

        }

        new List();

    })


})