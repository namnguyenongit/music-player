/**
 * 1. Render songs -> done
 * 2. Scroll top -> done
 * 3. Play / pause / seek -> done
 * 4. CD rotate -> done
 * 5. Next / Previous -> done
 * 6. Random -> done
 * 7. Next / repeat when song ended -> done
 * 8. Active song -> done
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
const progress = $('.progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
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
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${index === this.currentIndex ? 'active' : ''}">
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
  // Handle events of users
  handleEvent: function () {
    const _this = this
    // Handle scrolling CD
    const cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
      duration: 20000,
      iterations: Infinity,
    })
    cdThumbAnimate.pause()
    // When users scroll
    document.onscroll = function () {
      cd.style.width =
        200 - window.scrollY > 0 ? 200 - window.scrollY + 'px' : 0
      cd.style.opacity =
        200 - window.scrollY > 0 ? (200 - window.scrollY) / 200 : 0
    }
    // When users hit play button
    playBtn.onclick = function () {
      if (!_this.isPlaying) {
        audio.play()
      } else {
        audio.pause()
      }
    }
    // When users hit next button
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong()
      } else {
        _this.nextSong()
      }
      audio.play()
      _this.render()
    }
    // When users hit previous button
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong()
      } else {
        _this.prevSong()
      }
      audio.play()
      _this.render()
    }
    // When users hit random button
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom
      randomBtn.classList.toggle('active')
    }
    // When users hit repeat button
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat
      repeatBtn.classList.toggle('active')
      audio.loop = !audio.loop
    }
    // While song is being played
    audio.onplay = function () {
      player.classList.add('playing')
      _this.isPlaying = true
      cdThumbAnimate.play()
    }
    // While song is being paused
    audio.onpause = function () {
      player.classList.remove('playing')
      _this.isPlaying = false
      cdThumbAnimate.pause()
    }
    // Progress bar follows the music
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        )
        progress.value = progressPercent
      }
    }
    // While song is being seeked
    progress.oninput = function (e) {
      var newTime = (e.target.value * audio.duration) / 100
      audio.currentTime = newTime
    }
  },
  // Load current song
  loadCurrentSong: function () {
    let currentSong = this.songs[this.currentIndex]
    audio.setAttribute('src', currentSong.path)
    songName.innerText = currentSong.name
    cdThumb.style.backgroundImage = 'url(' + currentSong.image + ')'
  },
  // Load next song
  nextSong: function () {
    this.currentIndex++
    if (this.currentIndex > this.songs.length - 1) {
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },
  // Load previous song
  prevSong: function () {
    this.currentIndex--
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1
    }
    this.loadCurrentSong()
  },
  // play random song
  playRandomSong: function () {
    let newIndex = this.currentIndex
    do {
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while (newIndex === this.currentIndex)
    this.currentIndex = newIndex
    this.loadCurrentSong()
  },
  // Play next song when ended
  continuePlaying: function () {
    audio.addEventListener('ended', function () {
      nextBtn.onclick()
    })
  },

  // Start the application
  start: function () {
    // Render songs to view
    this.render()

    // Handle events of users
    this.handleEvent()

    // Take current song data
    this.loadCurrentSong()

    // Continue playing when song ended
    this.continuePlaying()
  },
}
app.start()
