import moment from 'moment'

import '../css/style.css'
import {
    getData
} from './data';

let data = getData()
let previouslyPlaying
let interval

window.onload = function () {
    buildPlaylist()
    trackEventListeners()
    updateAlbumArt(data[0])
}

function buildPlaylist() {
    const result = data.reduce((result, track) => {
        result += `<div id=${track.id} class="playlist">
                    <div class="play-button">►</div>
                    <div>${track.name}</div>
                    <div>${track.artist}</div>
                    <div>${track.album}</div>
                    <div class="duration">${moment.utc(track.duration*1000).format('mm:ss')}</div>
                    </div>`
        return result
    }, '')
    let tracks = document.getElementById('tracks')
    tracks.innerHTML += result
}

function trackEventListeners() {
    let tracks = document.getElementById('tracks').querySelectorAll('.playlist')
    tracks.forEach(track => track.addEventListener('click', togglePlay))
}

function togglePlay() {
    const track = data.filter(track => track.id == this.id)[0]
    track.playing = !track.playing
    let trackInfo = `<div>Playing:
                      <div>${track.name}, ${track.artist}, ${track.album}</div>
                    </div>`
    updateCurrentlyPlaying(trackInfo)
    updatePlayButtons(track.id)
    updateAlbumArt(track)
    track.playing ? updateTrackDuration(track) : clearInterval(interval)
}

function updateCurrentlyPlaying(trackInfo) {
    let currentlyPlaying = document.querySelector('.currently-playing')
    currentlyPlaying.innerHTML = trackInfo
}

function updatePlayButtons(trackId) {
    let button = document.getElementById(trackId).querySelector('.play-button')
    button.innerHTML = button.innerHTML == '►' ? '▮▮' : '►'
    if (previouslyPlaying && previouslyPlaying != button) {
        previouslyPlaying.innerHTML = '►'
    }
    previouslyPlaying = button
}

function updateAlbumArt(track) {
    document.querySelector('.album-cover').src = track.albumArt;
}

function updateTrackDuration(track) {
    let duration = document.getElementById(track.id).querySelector('.duration')
    let trackDuration = track.duration
    interval = setInterval(function () {
        trackDuration -= 1
        duration.innerHTML = moment.utc(trackDuration * 1000).format('mm:ss')
        if (trackDuration == 0) {
            clearInterval(interval)
            trackDuration = track.duration
        }
    }, 1000)
}