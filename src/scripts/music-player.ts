import {  Observable, filter, fromEvent, map, mergeMap, of, switchMap, takeUntil } from 'rxjs';
import data from '../data/music.json';

interface Music {
    title: string;
    artist: string;
    duration: number;
    url: string;
    coverUrl: string;
}

class MusicPlayer {

    private songs: Music[];
    private currentSongIndex: number;
    private pausedTime: number;
    private isPlaying: boolean;
    private currentSong!: Music;
    private audio: HTMLAudioElement;
    private durationLabel!: HTMLSpanElement;
    private currentTimeLabel!: HTMLSpanElement;
    private songCover!: HTMLImageElement;
    private title!: HTMLElement;
    private artist!: HTMLElement;
    private playIcon!: HTMLImageElement;
    private buttonClick!: HTMLButtonElement[];
    
    private progressBar!: HTMLDivElement;
    private handle!: HTMLDivElement;
    private track!: HTMLDivElement;

    private stopAudio$!: Observable<Event>;
    private progress$!: Observable<Event>;

    private mouseDown$!: Observable<Event>;
    private mouseMove$!: Observable<Event>;
    private mouseUp$!: Observable<Event>;
    private buttonClick$!: Observable<Event>;


    constructor(data: Music[]) {
        this.songs = data;
        this.currentSongIndex = 0; 
        this.currentSong = this.songs[this.currentSongIndex]
        this.pausedTime = 0;
        this.audio = new Audio();
        this.isPlaying = false;

        this.initializeUI();
        this.setupEvents();
        this.setupButtonEvents();
    }

    private initializeUI() {
        this.currentTimeLabel = document.getElementById('current-time') as HTMLElement;
        this.durationLabel = document.getElementById('song-duration') as HTMLElement;
        this.title = document.getElementById('song-title') as HTMLElement;
        this.artist = document.getElementById('song-autor') as HTMLElement;
        this.songCover = document.getElementById('song-cover') as HTMLImageElement;
        this.playIcon = document.getElementById('play-toggle-img') as HTMLImageElement;
        this.buttonClick = Array.from(document.querySelectorAll('button.btn'));

        this.progressBar = document.getElementById('progress-bar') as HTMLDivElement;
        this.handle = document.getElementById('handle') as HTMLDivElement;
        this.track = document.querySelector('.progress-bar-track') as HTMLDivElement;
    
        this.updateUI();               
        this.playIcon.src = '/src/assets/icons/play.svg'; 
    }

    private updateUI() {
        this.currentTimeLabel.textContent = this.formatTime(this.audio.currentTime);
        this.durationLabel.textContent = this.formatTime(this.currentSong.duration);   
        this.title.textContent = this.currentSong.title;               
        this.artist.textContent = this.currentSong.artist;              
        this.songCover.src = this.currentSong.coverUrl;                    
        this.songCover.alt = this.currentSong.title;                    
    }
    
    private setupEvents() {
        //Observable para eventos de audio
        this.stopAudio$ = fromEvent(this.audio, 'pause');
        this.progress$ = fromEvent(this.audio, 'timeupdate');

        //Observable para eventos del mouse
        this.mouseDown$ = fromEvent<MouseEvent>(this.handle, 'mousedown');
        this.mouseMove$ = fromEvent<MouseEvent>(this.progressBar, 'mousemove');
        this.mouseUp$ = fromEvent<MouseEvent>(this.progressBar, 'mouseup');
        this.buttonClick$ = fromEvent<MouseEvent>(this.buttonClick, 'click')

        const dragStart$ = this.mouseDown$.pipe(
        switchMap((startEvent) => {
            const startX = (startEvent as MouseEvent).clientX;
            const initialLeft = this.handle.offsetLeft;

            return this.mouseMove$.pipe(
                map((moveEvent) => {
                    moveEvent.preventDefault();
                    const offsetX = (moveEvent as MouseEvent).clientX - startX;
                    const newLeft = Math.min(this.progressBar.offsetWidth - this.handle.offsetWidth, Math.max(0, initialLeft + offsetX));
                    return newLeft;
                }),
                takeUntil(this.mouseUp$)
            );
        }));

        dragStart$.subscribe((newLeft) => {
            this.handle.style.left = newLeft + 'px';
            this.track.style.width = newLeft + 'px';
        });

        this.mouseUp$.subscribe(() => {
            const progress = (parseInt(this.track.style.width) / (this.progressBar.offsetWidth - this.handle.offsetWidth)) * 100;
            const currentDuration = this.currentSong.duration;
            if (!isNaN(currentDuration) && isFinite(currentDuration)) {
                console.log(currentDuration)
                this.pausedTime = (progress / 100) * currentDuration;
                this.audio.currentTime = this.pausedTime;
            }
        });
    }

    private setupButtonEvents() {
        
        this.buttonClick$.pipe(
            mergeMap(({ target }) => this.handleButtonClick(target as HTMLElement))
        ).subscribe();
    }

    private handleButtonClick(target: HTMLElement) {
        const button = (target instanceof Image) ? target.parentElement : target;
        const buttonId = button?.id;
        switch (buttonId) {
            case 'play-toggle':
                this.togglePlayPause();
                break;
            case 'next':
                this.playNextSong();
                break;
            case 'prev':
                this.playPrevSong();
                break;
            default:
                //nothing
            }
        return of(target);
    }

    private handleProgressBar() {
        this.currentTimeLabel.textContent = this.formatTime(this.audio.currentTime);
        const progress = (this.audio.currentTime / this.audio.duration) * (this.progressBar.offsetWidth - this.handle.offsetWidth);
        this.handle.style.left = progress + 'px';
        this.track.style.width = progress + 'px';
    }

    private playSong() {
    
        this.isPlaying = true; 
        this.playIcon.src = '/src/assets/icons/pause.svg'; 
        this.currentSong = this.songs[this.currentSongIndex]; 
        this.audio.src = this.currentSong.url; 
        this.audio.currentTime = this.pausedTime; 
        this.updateUI(); 
        this.audio.play(); 

        // Suscribirse al evento de tiempo de actualización para actualizar la interfaz de usuario
        this.progress$.pipe(
            takeUntil(this.stopAudio$),
            takeUntil(this.buttonClick$.pipe(
                filter(button =>  button?.id !== 'play-toggle' && this.isPlaying)))
        ).subscribe({
            next: () => this.handleProgressBar(),
            error: err => console.error(err),
            complete: () => console.log('completado')
        });
    }

    private pauseSong() {
        this.isPlaying = false;
        this.playIcon.src = '/src/assets/icons/play.svg';
        this.pausedTime = this.audio.currentTime;
        this.audio.pause();
    }
    
    private togglePlayPause() {
        if (this.isPlaying) {
            this.pauseSong();
        } else {
            this.playSong();
        }
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

    private formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    }

}

new MusicPlayer(data);