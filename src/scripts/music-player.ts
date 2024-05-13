import {  fromEvent, mergeMap, of, tap } from 'rxjs';
import data from '../data/music.json';

interface Music {
    title: string;
    artist: string;
    duration: number;
    url: string;
    coverUrl: string;
}

class MusicPlayer {

    // private list: HTMLUListElement;
    private songs: Music[];
    private currentSong: Music;
    private currentSongIndex: number;
    private pausedTime: number;
    private isPlaying: boolean;
    private audio: HTMLAudioElement;
    private durationLabel: HTMLSpanElement;
    private currentTimeLabel: HTMLSpanElement;
    private songCover: HTMLImageElement;
    private title: HTMLElement;
    private artist: HTMLElement;
    private progress: HTMLProgressElement;
    private playIcon: HTMLImageElement;


    constructor() {
        this.songs = data;
        this.currentSongIndex = 3;
        this.pausedTime = 0;
        this.audio = new Audio();
        this.isPlaying = false;
        this.currentSong = this.songs[this.currentSongIndex];
        this.durationLabel = document.getElementById('song-duration') as HTMLSpanElement; 
        this.songCover = document.getElementById('song-cover') as HTMLImageElement
        this.title = document.getElementById('song-title') as HTMLElement
        this.artist = document.getElementById('song-autor') as HTMLElement
        this.progress = document.querySelector('progress') as HTMLProgressElement;
        this.currentTimeLabel = document.getElementById('current-time') as HTMLSpanElement;
        this.playIcon = document.getElementById('play-toggle-img') as HTMLImageElement;

        
        this.uploadDisplay();
        this.setupEventListeners();
    }
    
    private uploadDisplay () {  
        this.currentTimeLabel.textContent = this.formatTime(this.audio.currentTime);
        this.durationLabel.textContent = this.formatTime(this.currentSong.duration)
        this.title.textContent = this.currentSong.title;
        this.artist.textContent = this.currentSong.artist
        this.songCover.src = this.currentSong.coverUrl;
        this.songCover.alt = this.currentSong.title;
        this.progress.max = this.currentSong.duration;
        this.progress.value = 0;
    }

    private setupEventListeners() {
        fromEvent(document.querySelectorAll('button.btn'), 'click').pipe(
            mergeMap(({ target }) => {
                const button = (target instanceof Image) ? target.parentElement : target;
                const action = button.id;
                switch (action) {
                    case 'play-toggle':
                        (!this.isPlaying) ? this.playSong() : this.pauseSong()
                        break;
                    case 'next':
                        this.playNextSong();
                        break;
                    case 'prev':
                        this.playPrevSong();
                        break;
                    default:
                        //nothing;
                }
                return of(target)
            })
        ).subscribe();

        fromEvent(this.audio, 'timeupdate').pipe(
            tap(() => {
                this.currentTimeLabel.textContent = this.formatTime(this.audio.currentTime);
                this.progress.value = this.audio.currentTime;
            })
        ).subscribe();
    }

    private formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    }

    private playSong() {
        this.isPlaying = true;
        this.playIcon.src = `/src/assets/icons/pause.svg`;
        this.currentSong = this.songs[this.currentSongIndex];
        this.audio.src = this.currentSong.url;
        this.audio.currentTime = this.pausedTime;
        this.uploadDisplay();
        this.audio.play();
    }
    
    private pauseSong() {
        this.isPlaying = false;
        this.playIcon.src = `/src/assets/icons/play.svg`;
        this.pausedTime = this.audio.currentTime;
        this.audio.pause();
    }
    
    private playNextSong() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
        this.pausedTime = 0;
        this.playSong();
    }
    
    private playPrevSong() {
        this.currentSongIndex = (this.currentSongIndex === 0) ? this.songs.length - 1 : this.currentSongIndex - 1;
        this.pausedTime = 0;
        this.playSong();
    }
}

new MusicPlayer();