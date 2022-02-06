function loadAudio(filename) {
    window.onload = () => {
      var audioElement = document.createElement('audio');
  
      audioElement.setAttribute('id', 'MyAudio')
      audioElement.setAttribute('src', filename);
    //   audioElement.setAttribute('controls', true)
      audioElement.setAttribute('autoplay', true)
      audioElement.setAttribute('loop', true)
   
  
      document.body.append(audioElement)
  
      window.setVolume = (vol) => audioElement.volume = vol
  
      window.setPlaybackSpeed = (speed) => audioElement.playbackRate = speed
    }
  }