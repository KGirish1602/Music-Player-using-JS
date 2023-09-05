let nowPlaying=document.querySelector(".now-playing");
let trackArt=document.querySelector(".track-art");
let trackName=document.querySelector(".track-name");
let trackArtist=document.querySelector(".track-artist");

let playpauseBtn=document.querySelector(".playpause-track");
let nextBtn=document.querySelector(".next-track");
let prevBtn=document.querySelector(".prev-track");

let seekSlider=document.querySelector(".seek-slider");
let volumeSlider=document.querySelector(".volume-slider");

let currentTime=document.querySelector(".current-time");
let totalDuration=document.querySelector(".total-duration");
let randomIcon=document.querySelector(".fa-random");
let currentTrack=document.createElement("audio");

let trackIndex=0;
let isPlaying=false;
let isRandom=false;
let updateTimer;

const listOfSong=[
    {
        img:"./Assets/pournami.jpg",
        name:"Muvvala Navvakala",
        artist:"S.P.Balasubramayam",
        song:"./Assets/Muvvala Navvakala.mp3"
    },

    {
        img:"./Assets/chakram.jpg",
        name:"Oke Oka Mata",
        artist:"Chakri",
        song:"./Assets/Oke Oka Mata.mp3"
    },

    {
        img:"./Assets/darling.jpg",
        name:"Neeve",
        artist:"G.V.Prakash",
        song:"./Assets/Neeve.mp3"
    },

    {
        img:"./Assets/mirchi.jpeg",
        name:"Idhedho Bagundhe",
        artist:"Vijay Prakash,Anitha",
        song:"./Assets/Idhedho Bagundhe.mp3"
    }
];

loadTrack(trackIndex);

function loadTrack(trackIndex){
    clearInterval(updateTimer);
    reset();

    currentTrack.src=listOfSong[trackIndex].song;
    currentTrack.load();

    trackArt.style.backgroundImage="url("+listOfSong[trackIndex].img+")";
    trackName.textContent=listOfSong[trackIndex].name;
    trackArtist.textContent=listOfSong[trackIndex].artist;
    nowPlaying.textContent="Playing "+(trackIndex+1)+" of "+listOfSong.length;

    updateTimer=setInterval(setUpdate,1000);

    currentTrack.addEventListener('ended',nextTrack);
}

function reset(){
    currentTime.textContent="00:00";
    totalDuration.textContent="00:00";
    seekSlider.value=0; 
}

function randomTrack(){
    isRandom? pauseRandom():playRandom();
}

function playRandom(){
    isRandom=true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom(){
    isRandom=false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack(){
    let currentIndex=trackIndex;
    loadTrack(currentIndex);
    playTrack();
}

function playpauseTrack(){
    isPlaying?pauseTrack():playTrack();
}

function playTrack(){
    currentTrack.play();
    isPlaying=true;
    playpauseBtn.innerHTML='<i class="fas fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
    currentTrack.pause();
    isPlaying=false;
    playpauseBtn.innerHTML='<i class="fas fa-play-circle fa-5x"></i>';
}


function nextTrack(){
    if(trackIndex < listOfSong.length-1 && isRandom === false){
        trackIndex += 1;
    }else if(trackIndex < listOfSong.length-1 && isRandom === true){
        let randomIndex=Number.parseInt(Math.random()*listOfSong.length);
        trackIndex =randomIndex;
    }
    else{
        trackIndex=0;
    }
    loadTrack(trackIndex);
    playTrack();
}

function prevTrack(){
    if(trackIndex>0){
        trackIndex -= 1;
    }
    else{
        trackIndex=listOfSong.length-1;
    }
    loadTrack(trackIndex);
    playTrack();
}

function seekTo(){
    let seekTo=currentTrack.duration*(seekSlider.value/100);
    currentTrack.currentTime=seekTo;
}

function setVolume(){
    currentTrack.volume=volumeSlider.value/100;
}

function setUpdate(){
    let seekPosition=0;
    if(!isNaN(currentTrack.duration)){
        seekPosition=currentTrack.currentTime*(100/currentTrack.duration);
        seekSlider.value=seekPosition;

        let currentMinutes = Math.floor(currentTrack.currentTime/60);
        let currentSeconds = Math.floor(currentTrack.currentTime-currentMinutes*60);
        let durationMinutes= Math.floor(currentTrack.duration/60);
        let durationSeconds=Math.floor(currentTrack.duration-durationMinutes*60);

        if(currentSeconds < 10){currentSeconds="0"+currentSeconds;}
        if(durationSeconds < 10){durationSeconds="0"+durationSeconds;}
        if(currentMinutes <10){currentMinutes="0"+currentMinutes;}
        if(durationMinutes < 10){durationMinutes="0"+durationMinutes;}

        currentTime.textContent=currentMinutes+":"+currentSeconds;
        totalDuration.textContent=durationMinutes+':'+durationSeconds;
    }
}

