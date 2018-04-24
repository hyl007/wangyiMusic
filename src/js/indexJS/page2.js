{
    let view={
        el:'.page2',
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
        },
        bindEventsHub(){
            window.eventHub.on('selectTab',(tabName)=>{
                if(tabName==='page-2'){
                    this.view.show()
                }else {
                    this.view.hide()
                }
            })
        }

    }
    controller.init(view,model)
}

