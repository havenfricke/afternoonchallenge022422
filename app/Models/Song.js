export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId?.toString() || data.id;
  }

  get ResultsTemplate() {
    return `
    <li class="selectable" onclick="app.songsController.makeActiveSong(${this.id})"> ${this.title} - ${this.artist}</li>
        `
  }

  get ActiveTemplate() {
    return `
    <section>
    <div class="d-flex justify-content-center">
      <img class="img-fluid" src="${this.albumArt}"
        alt="album art">
    </div>
    <h3 class="text-center">${this.artist}</h3>
    <h5 class="text-center">${this.title}</h5>
    <p class="text-center">${this.album}</p>
    <div class="p-1 mb-5 d-flex justify-content-center">
    <button btn-success onclick="app.songsController.addSong(${this.id})">Add to My Playlist</button>
  </div>
    </section>`
  }

  get PlaylistTemplate() {
    return `
    <li class="selectable" onclick="app.songsController.makeActiveSong(${this.id})"> ${this.title} - ${this.artist}</li>
        `;
  }
}
