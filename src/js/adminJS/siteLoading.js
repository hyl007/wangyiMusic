{
    let view ={
        el:'.site-loading',
        show(){
            $(this.el).addClass('activeL')
        },
        hide(){
            $(this.el).removeClass('activeL')
        }
    }
    let controller={
        init(view){
            this.view=view
            this.bindEventsHub()
        },
        bindEventsHub(){
            window.eventHub.on('beforeUpload',()=>{
                this.view.show()
            })
            window.eventHub.on('afterUpload',()=>{
                this.view.hide()
            })
        }
    }
    controller.init(view)
}
