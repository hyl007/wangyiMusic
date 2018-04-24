{
    let view={
        el:'#songPlay',
        render(data){
            let {song,status}=data
            $(this.el).append("<style>.page::before{background-image:url("+song.cover+")</style>")
            $(this.el).find('.cover').attr('src',song.cover)
            if($(this.el).find('audio').attr('src')!==song.url){
                let audio=$(this.el).find('audio').attr('src',song.url).get(0)
                audio.onended=()=>{
                    window.eventHub.emit('endSong')
                }
                audio.ontimeupdate=()=>{
                    this.showLyric(audio.currentTime)
                }
            }
            if(status==='playing'){
                $(this.el).find('.disc-container').addClass('playing')
            }else {
                $(this.el).find('.disc-container').removeClass('playing')
            }
            $(this.el).find('.song-description>h1').text(song.name)
            let {lyrics}=song
            var array=lyrics.split('\n').map((string)=>{
                let p = document.createElement('p')
                let regex = /\[([\d:.]+)\](.+)/
                let matches=string.match(regex)
                if(matches){
                    p.textContent=matches[2]
                    let time = matches[1]
                    let parts=time.split(':')
                    let minute=parts[0]
                    let seconds=parts[1]
                    let newTime =parseFloat(minute)*60+parseFloat(seconds)
                    p.setAttribute('data-time',newTime)
                } else if(matches===null){
                    p.textContent=''
                    let regex1=/\[([\d:.]+)\]/
                    let matches1=string.match(regex1)
                    let time = matches1[1]
                    let parts=time.split(':')
                    let minute=parts[0]
                    let seconds=parts[1]
                    let newTime =parseFloat(minute)*60+parseFloat(seconds)
                    p.setAttribute('data-time',newTime)
                }else {
                    p.textContent=''
                }
                $(this.el).find('.lyric > .lines').append(p)
            })

        },
        play(){
            $(this.el).find('audio')[0].play()
        },
        pause(){
            $(this.el).find('audio')[0].pause()
        },
        showLyric(time){
            let allP=$(this.el).find('.lines>p')
            let p
            for(let i=0;i<allP.length;i++){
                if(i===allP.length-1){
                    p = allP[i]
                    break
                }else {
                    let currentTime= allP.eq(i).attr('data-time')
                    let nextTime= allP.eq(i+1).attr('data-time')
                    if(currentTime<=time&&time<nextTime){
                        p = allP[i]
                        break
                    }
                }
            }
            let pHeight = p.getBoundingClientRect().top
            let linesHeight = $(this.el).find('.lyric>.lines')[0].getBoundingClientRect().top
            let height = pHeight - linesHeight
            $(this.el).find('.lyric>.lines').css({
                transform: `translateY(${- (height - 25)}px)`
            })
            $(p).addClass('active').siblings('.active').removeClass('active')
        }
    }
    let model={
        data:{
            song:{
                id:'',
                name:'',
                singer:'',
                url:'',
                cover:'',
                lyrics:''
            },
            status:'paused'
        },
        get(id){
            var query = new AV.Query('Song');
            return query.get(id).then( (song)=> {
                Object.assign( this.data.song,{id:song.id,...song.attributes})
                return song
            }, function (error) {
                // 异常处理
            });
        }
    }
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            let id=this.getSongId()
            this.model.get(id).then((data)=>{
                this.view.render(this.model.data)
            })
            this.bindEvents()
        },
        bindEvents(){
            $(this.view.el).on('click','.icon-play',()=>{
                this.model.data.status='playing'
                this.view.render(this.model.data)
                this.view.play()
            })
            $(this.view.el).on('click','.icon-pause',()=>{
                this.model.data.status='paused'
                this.view.render(this.model.data)
                this.view.pause()
            })
            window.eventHub.on('endSong',()=>{
                this.model.data.status='paused'
                this.view.render(this.model.data)
            })
        },
        getSongId(){
            let search=window.location.search
            if(search.indexOf('?')===0){
                search= search.substring(1)
            }
            let array=search.split('&').filter((v=>v))
            let id= ''
            for(let i=0;i<array.length;i++){
                let keyValue=array[i].split('=')
                let key=keyValue[0]
                let value=keyValue[1]
                if(key ==='id'){
                    id=value
                    break
                }
            }
            return id
        }
    }
    controller.init(view,model)
}