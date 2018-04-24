{
    let view={
        el:'.newSong',
        init(){
            this.$el=$(this.el)
        },
        template:`
                <li>
                   <h3>{{song.name}}</h3>
                   <p>
                        <svg class="icon icon-sq">
                         <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use>
                        </svg>
                      {{song.singer}}
                   </p>
                   <a class="playButton" href="./songPlay.html?id={{song.id}}">
                      <svg class="icon iconPlay" aria-hidden="true">
                        <use xlink:href="#icon-play"></use>
                       </svg>
                   </a>
                </li>

        `,
        render(data){
            let {songs} =data
            songs.map((song)=>{
                let $li=$(this.template.replace('{{song.name}}', song.name)
                    .replace('{{song.singer}}', song.singer)
                    .replace('{{song.id}}', song.id))
                this.$el.find('.list').append($li)
            })
        }
    }
    let model={
        data:{
            songs:[]
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
            this.view.init()
            this.model=model
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view,model)
}
