{
    let view={
        el:'.page1',
        init(){
            this.$el=$(this.el)
        },
        show(){
            this.$el.addClass('activeT')
        },
        hide(){
            this.$el.removeClass('activeT')
        }
    }
    let model={

    }
    let controller={
        init(view,model){
            this.view=view
            this.view.init()
            this.model=model
            this.bindEventsHub()
            this.Module1()
            this.Module2()
        },
        bindEventsHub(){
            window.eventHub.on('selectTab',(tabName)=>{
                if(tabName==='page-1'){
                    this.view.show()
                }else {
                    this.view.hide()
                }
            })
        },
        Module1(){
            let script1 = document.createElement('script')
            script1.src = './js/indexJS/page1-1.js'
            script1.onload = function(){
                console.log('模块一加载完毕')
            }
            document.body.appendChild(script1)
        },
        Module2(){
            let script2 =document.createElement('script')
            script2.src='js/indexJS/page1-2.js'
            script2.onload=function(){
                console.log("模块二加载完毕")
            }
            document.body.appendChild(script2)
        }

    }
    controller.init(view,model)
}
