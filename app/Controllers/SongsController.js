import { ProxyState } from "../AppState.js";
import songService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
async function _drawResults() {
  let template = ''
  ProxyState.songs.forEach(s => template += s.ResultsTemplate)
  document.getElementById('songs').innerHTML = template
}

function _drawActiveSong() {
  let template = ''
  ProxyState.activeSong.forEach(s => template += s.ActiveTemplate)
  document.getElementById("displayed-song").innerHTML = template
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = ''
  ProxyState.playlist.forEach(s => template += s.PlaylistTemplate)
  document.getElementById("playlist").innerHTML = template
}



//Public
export default class SongsController {
  constructor() {
    console.log('songs controller loaded');
    ProxyState.on('songs', _drawResults)
    ProxyState.on('activeSong', _drawActiveSong)
    ProxyState.on('playlist', _drawPlaylist)
    //TODO Don't forget to register your listeners and get your data
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  makeActiveSong(id) {
    console.log("making active song...", id,);
    let foundSong = ProxyState.songs.find(s => s.id == id)
    console.log(foundSong);
    ProxyState.activeSong = [foundSong]
    _drawActiveSong
  }
  addSong(id) {
    console.log("adding song...");
    try {
      let realSong = ProxyState.activeSong.find(s => s.id == id)
      ProxyState.playlist = [...ProxyState.playlist, realSong]
    } catch (error) {

    }


  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) { }
}
