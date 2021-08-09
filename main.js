/**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play / pause / stop
 * 4. CD rotate
 * 5. Next / Previous
 * 6. Random
 * 7. Next / repeat when song ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click on song list
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist')
const cd = $('.cd')
const audio = $('#audio')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const songName = $('.dashboard > header > h2')
const cdThumb = $('.cd-thumb')

const app = {
  currentIndex: 0,
  isPlaying: false,
  songs: [
    {
      name: 'Bad Habits',
      singer: 'Ed Sheeran',
      path: './assets/songs/BadHabits.mp3',
      image: './assets/images/BadHabits.jpg',
    },
    {
      name: 'Cure For Me',
      singer: 'Aurora',
      path: './assets/songs/CureForMe.mp3',
      image: './assets/images/CureForMe.png',
    },
    {
      name: 'Mr.Angel',
      singer: 'Tommy Newport',
      path: './assets/songs/MrAngel.mp3',
      image: './assets/images/MrAngel.jpg',
    },
    {
      name: 'New Light',
      singer: 'John Mayer',
      path: './assets/songs/NewLight.mp3',
      image: './assets/images/NewLight.jpg',
    },
    {
      name: 'Nothing',
      singer: 'Bruno Major',
      path: './assets/songs/Nothing.mp3',
      image: './assets/images/Nothing.jpeg',
    },
    {
      name: 'Oreo',
      singer: 'Shotgun Willy',
      path: './assets/songs/Oreo.mp3',
      image: './assets/images/Oreo.jpg',
    },
    {
      name: 'Stay',
      singer: 'The Kid LAROI, Justin Bieber',
      path: './assets/songs/Stay.mp3',
      image: './assets/images/Stay.jpg',
    },
    {
      name: 'Sunflower',
      singer: 'Post Malone, Swae Lee',
      path: './assets/songs/Sunflower.mp3',
      image: './assets/images/Sunflower.jpg',
    },
    {
      name: 'Sunflower',
      singer: 'Rex Orange Country',
      path: './assets/songs/SunflowerRex.mp3',
      image: './assets/images/SunflowerRex.jpg',
    },
    {
      name: 'The Most Beautiful Thing',
      singer: 'Bruno Major',
      path: './assets/songs/TheMostBeautifulThing.mp3',
      image: './assets/images/TheMostBeautifulThing.jpg',
    },
  ],
  // Render songs to view
  render: function () {
    const htmls = this.songs.map((song) => {
      return `
        <div class="song">
          <div class="thumb" style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      `
    })
    playlist.innerHTML = htmls.join('')
  },
  // Load current song
  currentSong: function () {
    let song = this.songs[this.currentIndex]
    audio.setAttribute('src', song.path)
    songName.innerText = song.name
    cdThumb.style.backgroundImage = 'url(' + song.image + ')'
  },

  // Handle events of users
  handleEvent: function () {
    // When users scroll
    const _this = this
    document.onscroll = function () {
      cd.style.width =
        200 - window.scrollY > 0 ? 200 - window.scrollY + 'px' : 0
      cd.style.opacity =
        200 - window.scrollY > 0 ? (200 - window.scrollY) / 200 : 0
    }

    // When users hit play button
    playBtn.onclick = function () {
      // Playing
      if (!this.isPlaying) {
        this.isPlaying = !this.isPlaying
        audio.play()
        player.classList.add('playing')
      }
      // Pause
      else {
        this.isPlaying = !this.isPlaying
        audio.pause()
        player.classList.remove('playing')
      }
    }
  },

  // Start the application
  start: function () {
    // Handle events of users
    this.handleEvent()

    // Take current song data
    this.currentSong()

    // Render songs to view
    this.render()
  },
}
app.start()
