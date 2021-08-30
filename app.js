const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn= document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

const songs = [ "lilly-wood", "Shohruhxon-Parizod", "Ajab sirlar","turpal_abdulkerimov","Raksana"]

let songIndex = 0;

loadSong(songs[songIndex])

function loadSong(song){
    title.innerHTML = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`


}


function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause()
}


async function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

   await loadSong(songs[songIndex]);
   await playSong()

}

async function nextSong(){
    songIndex++;

    if(songIndex > songs.length -1){
        songIndex = 0;
    }

   await loadSong(songs[songIndex]);
   await playSong()

}




async function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
    await audio.onloadeddata = function(){
        let sec = parseInt(audio.duration % 60)
        let min = parseInt((audio.duration / 60) % 60)
        document.querySelector('.progress span').innerHTML = `${min}:${sec}`
    }
}


function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration;

}





playBtn.addEventListener('click', () =>{
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})


window.addEventListener('keydown', (e) =>{
   if(e.code === 'MediaTrackNext'){
    nextSong()
   }if(e.code  === 'MediaTrackPrev'){
       prevSong()
   }
})

// channge songIndex

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', nextSong)
