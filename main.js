/**
 * 1. Render songs -> done
 * 2. Scroll top -> done
 * 3. Play / pause / seek -> done
 * 4. CD rotate -> done
 * 5. Next / Previous -> done
 * 6. Random -> done
 * 7. Next / repeat when song ended -> done
 * 8. Active song -> done
 * 9. Scroll active song into view -> done (there's bug)
 * 10. Play song when click on song list -> done
 *
 * Additions
 * 1. Timer -> done
 * 2. Options
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'

const dashboard = $('.dashboard')
const playlist = $('.playlist')
const cd = $('.cd')
const audio = $('#audio')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const songName = $('.dashboard > header > h2')
const author = $('.dashboard > header > p')
const cdThumb = $('.cd-thumb')
const progress = $('.progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const timer = $('#timer')
const songDuration = $('#duration')
const popup = $('.popup')
const popupSongName = $('.song-name')
const addToFav = $('.add-to-fav')
const share = $('.share')
const coverLayer = $('.cover-layer')

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: 'All You Need To Know',
      singer: 'Griffin & Slander',
      path: './assets/songs/AllYouNeedToKnow.mp3',
      image: './assets/images/AllYouNeedToKnow.jpg',
    },
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
      name: 'Drive Safe',
      singer: 'Rich Brian',
      path: './assets/songs/DriveSafe.mp3',
      image: './assets/images/DriveSafe.jpg',
    },
    {
      name: 'Drown',
      singer: 'Martin Garrix',
      path: './assets/songs/Drown.mp3',
      image: './assets/images/Drown.jpg',
    },
    {
      name: 'Hello Anxiety',
      singer: 'Phum Viphurit',
      path: './assets/songs/HelloAnxiety.mp3',
      image: './assets/images/HelloAnxiety.jpg',
    },
    {
      name: 'Love In My Pocket',
      singer: 'Rich Brian',
      path: './assets/songs/LoveInMyPocket.mp3',
      image: './assets/images/LoveInMyPocket.jpg',
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
      name: 'Pink Champagne',
      singer: 'Nick Lopez',
      path: './assets/songs/PinkChampagne.mp3',
      image: './assets/images/PinkChampagne.jpg',
    },
    {
      name: 'Rather Be',
      singer: 'Clean Bandit',
      path: './assets/songs/RatherBe.mp3',
      image: './assets/images/RatherBe.jpg',
    },
    {
      name: 'Ruthless',
      singer: 'The Marías',
      path: './assets/songs/Ruthless.mp3',
      image: './assets/images/Ruthless.jpg',
    },
    {
      name: 'San Francisco Street',
      singer: 'Sun Rai',
      path: './assets/songs/SanFranciscoStreet.mp3',
      image: './assets/images/SanFranciscoStreet.jpg',
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
    {
      name: 'This Girl',
      singer: 'Kungs',
      path: './assets/songs/ThisGirl.mp3',
      image: './assets/images/ThisGirl.jpg',
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
  },
  // Render songs to view
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${
          index === this.currentIndex ? 'active' : ''
        }" data-index = '${index}'>
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
      _this.scrollIntoView()
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
      _this.scrollIntoView()
    }
    // When users hit repeat button
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat
      _this.setConfig('isRepeat', _this.isRepeat)
      repeatBtn.classList.toggle('active')
    }
    // When users hit random button
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom
      _this.setConfig('isRandom', _this.isRandom)
      randomBtn.classList.toggle('active')
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
    // Progress bar and timer
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        )
        progress.value = progressPercent
      }
      _this.setTimer()
      _this.displayDuration()
    }
    // While song is being seeked
    progress.oninput = function (e) {
      var newTime = (e.target.value * audio.duration) / 100
      audio.currentTime = newTime
    }
    // When users hit the song on list
    playlist.onclick = function (e) {
      const songNode = e.target.closest('.song:not(.active)')
      const optionNode = e.target.closest('.option')
      const Node = e.target.closest('.song')
      if (songNode || optionNode) {
        // Click on option
        if (optionNode) {
          const songIndex = Number(Node.dataset.index)
          popupSongName.innerHTML = _this.songs[songIndex].name
          popup.style.display = 'block'
          coverLayer.style.display = 'block'
        }
        // Click on song
        else if (songNode) {
          _this.currentIndex = Number(Node.dataset.index)
          _this.loadCurrentSong()
          _this.render()
          audio.play()
        }
      }
    }
    // Hide option onclick
    coverLayer.onclick = function () {
      coverLayer.style.display = 'none'
      popup.style.display = 'none'
    }
    // When user add a song to favorite
    addToFav.onclick = function () {
      alert('Added to favorite!')
      coverLayer.onclick()
    }
    // When user share a song
    share.onclick = function () {
      alert('Thank you for sharing this song <3')
      window.open('https://facebook.com/nyamm.pasu')
    }
  },
  // Load config
  loadConfig: function () {
    this.isRandom = this.config.isRandom
    this.isRepeat = this.config.isRepeat
    audio.loop = this.isRepeat
  },
  // Load current song
  loadCurrentSong: function () {
    let currentSong = this.songs[this.currentIndex]
    audio.setAttribute('src', currentSong.path)
    songName.innerText = currentSong.name
    author.innerText = currentSong.singer
    cdThumb.style.backgroundImage = 'url(' + currentSong.image + ')'
  },
  // Scroll active song into view
  scrollIntoView: function () {
    setTimeout(() => {
      $('.song.active').scrollIntoView(
        {
          block: 'end',
          inline: 'center',
          behavior: 'smooth',
        },
        {
          block: 'center',
          inline: 'center',
          behavior: 'smooth',
        }
      )
    }, 300)
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
  // Timer
  setTimer: function () {
    setInterval(() => {
      var mins = Math.floor(audio.currentTime / 60)
      var secs = Math.floor(audio.currentTime % 60)
      if (secs < 10) {
        secs = '0' + String(secs)
      }
      if (mins < 10) {
        mins = '0' + String(mins)
      }
      timer.innerHTML = mins + ':' + secs
    }, 100)
  },
  // Display song's duration
  displayDuration: function () {
    if (audio.duration) {
      var mins = Math.floor(audio.duration / 60)
      var secs = Math.floor(audio.duration % 60)
      if (secs < 10) {
        secs = '0' + String(secs)
      }
      if (mins < 10) {
        mins = '0' + String(mins)
      }
      songDuration.innerHTML = mins + ':' + secs
    }
  },
  // Start the application
  start: function () {
    // Load config
    this.loadConfig()

    // Render songs to view
    this.render()

    // Handle events of users
    this.handleEvent()

    // Take current song data
    this.loadCurrentSong()

    // Continue playing when song ended
    this.continuePlaying()

    // Display first stat of repeat and random button
    repeatBtn.classList.toggle('active', this.isRepeat)
    randomBtn.classList.toggle('active', this.isRandom)
  },
}
app.start()
