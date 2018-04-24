{
    let view={
        el:'.nav',
        init(){
            this.$el=$(this.el)
        }
    }
    let model={}
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.init()
            this.bindEvents()
        },
        bindEvents(){
            this.view.$el.on('click', '.tab-nav>li', (e)=> {
                let $li = $(e.currentTarget)
                let pageName=$li.attr('data-tab-name')
                $li.children().addClass('active')
                $li.siblings().children().removeClass('active')
                window.eventHub.emit('selectTab',pageName)
            })
        }
    }
    controller.init(view,model)
}