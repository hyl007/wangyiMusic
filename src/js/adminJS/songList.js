{
    let view={
        el:'.songList-container',
        template:`
        <ul class="songList">

        </ul>
        `,
        render(data){
            let $el = $(this.el)
            $el.html(this.template)
            let {songs,selectSongId}=data
            let liList=songs.map((songs)=>{
                let $li=$('<li></li>').text(songs.name).attr('data-id',songs.id)
                if(songs.id===selectSongId){
                    $li.addClass('active')
                }
                return $li
            })
            $el.find('ul').empty()
            liList.map((domLi)=>{
                $el.find('ul').append(domLi)
            })
        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        }
    }
    let model={
        data:{
            songs:[],
            selectSongId:undefined,
        },
        find(){
            var query = new AV.Query('Song');
            return query.find().then((songs)=>{
                this.data.songs=songs.map((songs)=>{
                    return {id:songs.id,...songs.attributes}
                })
                return songs
            })
        }
    }
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            this.getAllSong()
            this.bindEventsHub()
            this.bindEvents()
        },
        getAllSong(){
            return this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
            $(this.view.el).on('click','li',(e)=>{
                let songId=e.currentTarget.getAttribute('data-id')
                this.model.data.selectSongId=songId
                this.view.render(this.model.data)

                let data
                let songs=this.model.data.songs
                for(let i=0;i<songs.length;i++){
                    if(songs[i].id===songId){
                        data=songs[i]
                        break
                    }
                }
                window.eventHub.emit('select',JSON.parse(JSON.stringify(data)))
            })
        },
        bindEventsHub(){
            window.eventHub.on('create',(songData)=>{
                this.model.data.songs.push(songData)
                this.view.render(this.model.data)
            })
            window.eventHub.on('new',()=>{
                this.view.clearActive()
            })
            window.eventHub.on('update',(song)=>{
                let songs = this.model.data.songs
                for(let i=0;i<songs.length;i++){
                    if(songs[i].id===song.id){
                        Object.assign(songs[i],song)
                    }
                }
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view,model)
}