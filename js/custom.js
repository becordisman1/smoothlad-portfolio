(function () {
  'use strict';

  const videoFiles = [
    'A slice of life.mp4', 'Bastards of avarice.mp4', 'Benzo day, afternoon.mp4',
    'Chaste C****....mp4', 'Cosmic orphan (live action).mp4', 'Dev log.mp4',
    'Do me a jest.mp4', 'Galactic ball infographic.mp4', 'Lusty ken.mp4',
    'Stick the CR.mp4', 'Tenerife 256.mp4', 'The cloud.mp4', 'The lad....mp4',
    'art pop she was.mp4', 'deep modernity terminal.mp4', 'dungeon dweller.mp4',
    'jerry b - local housing authority adventures.mp4', 'pamphlet knight (visualiser).mp4',
    'round the clock business chat.mp4', 'smoothworld-takeover.mp4', 'smoothworld.mp4',
    'space paladin (visualiser).mp4', 'standing outside the offie.mp4', 'tech lad.mp4',
    'the metropole.mp4', 'the rat.mp4', 'the shunning.mp4', 'theeggman.mp4',
  ];

  let soundEnabled = false;

  function showRandomVideo(videoId, videoSourceId) {
    const changeSound = document.getElementById('changeSound');

    function show() {
      if (changeSound && soundEnabled) {
        changeSound.currentTime = 0;
        changeSound.play().catch(() => {});
      }

      const randomIndex = Math.floor(Math.random() * videoFiles.length);
      const video = document.getElementById(videoId);
      const videoSource = document.getElementById(videoSourceId);

      if (!video || !videoSource) return;

      videoSource.src = `videos/${encodeURIComponent(videoFiles[randomIndex])}`;
      video.style.display = '';
      video.load();
      video.onloadedmetadata = function () {
        if (video.duration && !isNaN(video.duration)) {
          video.currentTime = Math.random() * video.duration;
        }
        video.muted = false;
        video.play().catch(() => {});
      }

      const nextTime = (Math.floor(Math.random() * 33 + 6)) * 1000;
      setTimeout(show, nextTime);
    }

    show();
  }

  document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('playButton');
    if (!playButton) return;

    let armed = false;

    function moveButtonRandomly() {
      const parent = playButton.offsetParent || document.body;
      const parentRect = parent.getBoundingClientRect();
      const btnRect = playButton.getBoundingClientRect();
      const maxX = parentRect.width - btnRect.width;
      const maxY = parentRect.height - btnRect.height;
      const randX = Math.random() * maxX;
      const randY = Math.random() * maxY;
      playButton.style.left = randX + 'px';
      playButton.style.top = randY + 'px';
      playButton.style.transform = 'translate(0,0)';
    }

    playButton.addEventListener('mouseenter', moveButtonRandomly);
    playButton.addEventListener('click', function () {
      moveButtonRandomly();

      if (!armed) {
        armed = true;
        playButton.classList.add('armed-green');
        console.log('[playButton] armed - click again to play');
        return;
      }

      console.log('[playButton] second click - playing');
      const changeSound = document.getElementById('changeSound');
      soundEnabled = true;
      if (changeSound) {
        changeSound.currentTime = 0;
        changeSound.play().catch(() => {});
      }

      setTimeout(() => {
        playButton.style.display = 'none';
        showRandomVideo('randomVideo1', 'videoSource1');
      }, 300);
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formStatus = document.getElementById('formStatus');
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      const mailtoLink = `mailto:becord9000@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoLink;

      formStatus.innerHTML = '<div class="alert alert-success">Opening your email client...</div>';
      setTimeout(() => {
        contactForm.reset();
        formStatus.innerHTML = '';
      }, 3000);
    });
  });
})();
