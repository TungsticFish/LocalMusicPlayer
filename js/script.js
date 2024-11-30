// JavaScript source code



function readFiles() {

    document.getElementById("music_list").innerHTML=''

    var folderInput = document.getElementById('folderInput');
    var fileList = folderInput.files;
    

    for (var i = 0; i < fileList.length; i++) {        
        var file = fileList[i];
        var file_list = document.createElement("button");//给元素添加属性
        file_list.classList.add("row_1");
        file_list.classList.add("item");
        file_list.innerHTML=file.name;        
        file_list.id=URL.createObjectURL(file)
        file_list.onclick= function () {
            console.log(file.name)
            audioElement.src = this['id'];
            audioElement.play();
            masterSongName.innerHTML = this.innerText;
        }

        //监测是否是音频，只添加音频
        if (file.type.match('audio.*')) {
            document.getElementById("music_list").appendChild(file_list);
        }
        
    }

}




//新播放
let audioElement = new Audio('assets/EVA.mp3');
let masterPlay = document.getElementById('masterPlay');
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        //masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})



