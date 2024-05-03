const songs = [
    {
        album: "SINGLE",
        artista: "KIZUNA",
        duracion: "00:02:30",
        imagen: "CANCIONES/AIAIAI.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:03:19",
        imagen: "CANCIONES/Antichlorobenzene.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:03:42",
        imagen: "CANCIONES/Black Board.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:03:57",
        imagen: "CANCIONES/Burenai Ai de.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:04:50",
        imagen: "CANCIONES/Easy Dance.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:04:02",
        imagen: "CANCIONES/FREELY TOMORROW.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:04:48",
        imagen: "CANCIONES/Hatsune miku no shoushitsu.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:03:17",
        imagen: "CANCIONES/Hatsune.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:04:49",
        imagen: "CANCIONES/Hello How are you.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:03:20",
        imagen: "CANCIONES/Rollin Girl.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:03:24",
        imagen: "CANCIONES/Solar System Disco.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:03:03",
        imagen: "CANCIONES/Turkish March (Tsumanne).JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:03:08",
        imagen: "CANCIONES/Two-Faced Lovers.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:03:51",
        imagen: "CANCIONES/Unhappy Refrain.JPEG",
    },
    {
        album: "SINGLE",
        artista: "VOCALOID",
        duracion: "00:03:36",
        imagen: "CANCIONES/VIVA HAPPY.JPEG",
    }    
];

class Reproductor {
    constructor(songs){
        this.songs = songs;
        this.enReproduccion = false;
        this.ahoraSuena = 0;
        this.audioElement = new Audio();
        this.audioElement.addEventListener('timeupdate', () => this.updateProgressBar());
        this.showSongInSite();
    }
    playPause(){
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (this.enReproduccion){
            this.enReproduccion = false;
            this.audioElement.pause();
            playPauseBtn.classList.remove('pause');
            playPauseBtn.src ='REPRODUCTOR/play.png';
        } else {
            this.enReproduccion = true;
            this.audioElement.src = this.songs[this.ahoraSuena].audio;
            this.audioElement.play();
            playPauseBtn.classList.add('pause');
            playPauseBtn.src ='REPRODUCTOR/pausa.png';
            this.showSongInSite();
        }
    }

    stop(){
        this.enReproduccion = false;
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        const playPauseBtn = document.getElementById('playPauseBtn');
        playPauseBtn.classList.remove('pause');
        playPauseBtn.src ='REPRODUCTOR/play.png';
        document.getElementById('songDetails').innerHTML = ''; 
    }

    shuffle(){
        let previousSong = this.ahoraSuena;
        this.ahoraSuena = Math.floor(Math.random() * this.songs.length);
        if(this.ahoraSuena === previousSong && this.songs.length > 1){
            this.ahoraSuena = (this.ahoraSuena + 1) % this.songs.length;
        }
        this.stop();
        this.playPause();
    }

    next(){
        this.ahoraSuena = (this.ahoraSuena + 1) % this.songs.length;
        this.stop();
        this.playPause();
    }

    prev(){
        this.ahoraSuena = (this.ahoraSuena - 1 + this.songs.length) % this.songs.length;
        this.stop();
        this.playPause();
    }

    updateProgressBar() {
        const progressBar = document.getElementById('progressBar');
        const percentage = (this.audioElement.currentTime / this.audioElement.duration) * 100;
        progressBar.style.width = percentage + '%';
    }

    showSongInSite(){//detalle cancion en el sitio
        const song = this.songs[this.ahoraSuena];
        const songDetails =
        `<img src="${song.imagen}" alt="Portada del álbum">
            <p>Álbum: ${song.album}</p>
            <p>Artista: ${song.artista}</p>
            <p>Duración: ${song.duracion}</p>`;
        
        document.getElementById('songDetails').innerHTML = songDetails;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const reproductor = new Reproductor(songs);

    function play(songIndex) {
        reproductor.stop(); 
        reproductor.ahoraSuena = songIndex; 
        reproductor.playPause(); 
    }

    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const buttonId = event.target.id;
            switch(buttonId) {
                case 'playPauseBtn':
                    reproductor.playPause();
                    break;
                case 'stopBtn':
                    reproductor.stop();
                    break;
                case 'shuffleBtn':
                    reproductor.shuffle();
                    break;
                case 'prevBtn':
                    reproductor.prev();
                    break;
                case 'nextBtn':
                    reproductor.next();
                    break;
            }
        });
    });
});