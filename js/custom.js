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

  function playVideo(fileName, userInitiated) {
    const video = document.getElementById('randomVideo1');
    const videoSource = document.getElementById('videoSource1');
    if (!video || !videoSource) return;

    videoSource.src = `videos/${encodeURIComponent(fileName)}`;
    video.dataset.fileName = fileName;
    video.style.display = 'block';
    video.muted = !userInitiated;
    video.load();
    video.onloadedmetadata = function () {
      video.currentTime = 0;
      video.play().catch(() => {});
    };
  }

  function playRandomVideo(previousFileName, userInitiated) {
    const availableFiles = videoFiles.filter((fileName) => fileName !== previousFileName);
    const randomIndex = Math.floor(Math.random() * availableFiles.length);
    playVideo(availableFiles[randomIndex], userInitiated);
  }

  function buildVideoThumbnails() {
    const thumbnailGrid = document.getElementById('videoThumbnails');
    if (!thumbnailGrid) return;

    videoFiles.forEach((fileName) => {
      const thumbnail = document.createElement('video');
      thumbnail.className = 'video-thumbnail';
      thumbnail.src = `videos/${encodeURIComponent(fileName)}`;
      thumbnail.muted = true;
      thumbnail.loop = true;
      thumbnail.autoplay = true;
      thumbnail.playsInline = true;
      thumbnail.preload = 'metadata';
      thumbnail.setAttribute('aria-label', fileName);
      thumbnail.addEventListener('click', () => playVideo(fileName, true));
      thumbnail.addEventListener('loadedmetadata', () => {
        if (thumbnail.duration && !isNaN(thumbnail.duration)) {
          thumbnail.currentTime = Math.random() * thumbnail.duration;
        }
        thumbnail.play().catch(() => {});
      });
      thumbnailGrid.appendChild(thumbnail);
    });

    const mainVideo = document.getElementById('randomVideo1');
    if (mainVideo) {
      mainVideo.addEventListener('ended', () => playRandomVideo(mainVideo.dataset.fileName, false));
      playRandomVideo(null, false);
    }
  }

  document.addEventListener('DOMContentLoaded', buildVideoThumbnails);

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
