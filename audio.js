var audioElement = document.createElement('audio');
audioElement.setAttribute('src', "./Assets/GameStartAudio2.0.mp3");
audioElement.play();


var audioElement = document.createElement('audio');
audioElement.setAttribute('src', "./Assets/GameStartAudio2.0.mp3");
audioElement.load()
audioElement.addEventListener("load", function() {
  audioElement.play();
  $(".duration span").html(audioElement.duration);
  $(".filename span").html(audioElement.src);
}, true);