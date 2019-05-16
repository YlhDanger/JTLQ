define(['jquery'],$ =>{
     function Footer(){
         this.container = $("#footer-container");
         this.load().then(()=>{

         })

     }

     $.extend(Footer.prototype,{
         load(){
            return new Promise(resolve => {
                this.container.load('/html/module/footer.html', () => {
                  // load异步执行结束
                  resolve();
                });
              })
            
             
         }

     })
     return  new Footer();

})