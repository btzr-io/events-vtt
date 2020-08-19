const EVENT_END = "event:end"
const EVENT_START = "event:start"
const TRACK_LABEL = "events"
const TRACK_KIND_METADATA = "metadata"

export default class EventManagerVTT extends EventTarget {
  constructor(mediaElement, config) {
    super();
    this._queue = []
    this._config = config;
    this._player = mediaElement;
    this._init();
  }

  // Destroy handlers and events
  destroy() {
    this._player.removeEventListener('load', this.handleReadyState);
  }

  // Call after MediaElement triggered `onload` event
  _init(event) {
    const tracks = this._player.textTracks;
    // Scan for metadata tracks
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].kind === TRACK_KIND_METADATA && tracks[i].label === TRACK_LABEL) {
        // Contains regitered events
        if(tracks[i].cues) {
          // Listen for cue changes
          tracks[i].addEventListener('cuechange', this.handleCueChange.bind(this))
        }
      }
    }
  }

  // Handle events
  handleCueChange(event) {
    const track = event.target
    if (track && track.activeCues && track.activeCues.length > 0 ) {
        // Event emitted
        const cue = track.activeCues[0]
        const data = JSON.parse(cue.text)
        // Add event to queue
        const { id } = cue
        this._queue.push(cue.id)
        // Generate custom event
        const dispatchEventStart = new CustomEvent(EVENT_START, {
          detail: {id, data}
        });
        // Report started event
        this.dispatchEvent(dispatchEventStart)
    } else if ( track && track.activeCues.length === 0 ) {
      // Event reached life time
      const id = this._queue.pop()
      const cue = track.cues.getCueById(id)
      const data = JSON.parse(cue.text)
      // Generate custom event
      const dispatchEventEnd = new CustomEvent(EVENT_END, {
        detail: {id, data}
      });
      // Report exited event
      this.dispatchEvent(dispatchEventEnd)
    }
  }
  
  // Expose media element
  get player() { return this._player; }
};
