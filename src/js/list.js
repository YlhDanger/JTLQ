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
                
          }
        //升序
         ascendingOrder(list){
             //点击升序按钮时排序
            $("#ascending").on('click',()=>{
                list.sort(function(a,b){
                    return a.item_price - b.item_price;
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
                    return b.item_price - a.item_price;
                })
                //console.log(list);
                this.renderList(list);

            })
        }

        //携带ID跳转详情页
        jumpDetail(){
            $("#box").on('click',"li",function(){
                let id = this.attributes["data-id"].nodeValue;
                location.href = "/html/detail.html?id="+id;
            })
        }
        

        }

        new List();

    })


})