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

const app = {
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
  // Start the application
  start: function () {
    this.render()
  },
}
app.start()
