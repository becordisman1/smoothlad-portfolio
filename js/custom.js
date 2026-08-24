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
    let videoAudioEnabled = false;
    let activeThumbnail = null;

  function playVideo(fileName, userInitiated, startPlayback = true) {
    const video = document.getElementById('randomVideo1');
    if (!video) return;

    video.dataset.fileName = fileName;
    video.style.display = 'block';
    video.muted = false;
    video.onloadedmetadata = function () {
      video.currentTime = 0;
      if (startPlayback) {
        video.play().catch(() => {});
      }
    };
    video.src = `videos/${encodeURIComponent(fileName)}`;
    video.load();
  }

  function playRandomVideo(previousFileName, userInitiated, startPlayback = true) {
    const availableFiles = videoFiles.filter((fileName) => fileName !== previousFileName);
    const randomIndex = Math.floor(Math.random() * availableFiles.length);
    playVideo(availableFiles[randomIndex], userInitiated, startPlayback);
  }

  function buildVideoThumbnails() {
    const thumbnailGrid = document.getElementById('videoThumbnails');
    if (!thumbnailGrid) return;
    const isConstrainedDevice = window.matchMedia('(max-width: 576px), (prefers-reduced-data: reduce)').matches;

    const unloadThumbnail = (thumbnail) => {
      thumbnail.pause();
      thumbnail.removeAttribute('src');
      thumbnail.load();
      if (activeThumbnail === thumbnail) {
        activeThumbnail = null;
      }
    };

    const thumbnailObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const thumbnail = entry.target;
          const bounds = thumbnail.getBoundingClientRect();
          const nearViewport = bounds.bottom >= -160 && bounds.top <= window.innerHeight + 160;
          if (!isConstrainedDevice && entry.isIntersecting && nearViewport) {
            if (activeThumbnail && activeThumbnail !== thumbnail) {
              unloadThumbnail(activeThumbnail);
            }
            activeThumbnail = thumbnail;
            thumbnail.src = thumbnail.dataset.src;
            thumbnail.load();
            thumbnail.play().catch(() => {});
          } else {
            unloadThumbnail(thumbnail);
          }
        });
      }, { rootMargin: '160px 0px' })
      : null;

      const enableVideoAudio = () => {
        videoAudioEnabled = true;
        const mainVideo = document.getElementById('randomVideo1');
        if (mainVideo) {
          mainVideo.muted = false;
        }
      };
      document.addEventListener('pointerdown', enableVideoAudio, { once: true });
      document.addEventListener('touchstart', enableVideoAudio, { once: true, passive: true });
      document.addEventListener('keydown', enableVideoAudio, { once: true });

    videoFiles.forEach((fileName) => {
      const thumbnail = document.createElement('video');
      thumbnail.className = 'video-thumbnail';
      thumbnail.muted = true;
      thumbnail.loop = true;
      thumbnail.playsInline = true;
      thumbnail.preload = 'none';
      thumbnail.setAttribute('aria-label', fileName);
      thumbnail.dataset.src = `videos/${encodeURIComponent(fileName)}`;
      thumbnail.addEventListener('click', () => {
        playVideo(fileName, true);
      });
      thumbnail.addEventListener('loadedmetadata', () => {
        if (thumbnail.duration && !isNaN(thumbnail.duration)) {
          thumbnail.currentTime = Math.random() * thumbnail.duration;
        }
        if (activeThumbnail === thumbnail) {
          thumbnail.play().catch(() => {});
        }
      });
      thumbnailGrid.appendChild(thumbnail);
      if (thumbnailObserver) {
        thumbnailObserver.observe(thumbnail);
      } else if (!isConstrainedDevice) {
        thumbnail.src = thumbnail.dataset.src;
      }
    });

    const mainVideo = document.getElementById('randomVideo1');
    if (mainVideo) {
      const playbackIndicator = document.getElementById('videoPlaybackIndicator');
      const toggleMainVideo = () => {
        const wasPaused = mainVideo.paused;
        if (wasPaused && !mainVideo.src) {
          playVideo(mainVideo.dataset.fileName, true);
        } else if (wasPaused) {
          mainVideo.play().catch(() => {});
        } else {
          mainVideo.pause();
        }
        if (playbackIndicator) {
          playbackIndicator.textContent = wasPaused ? 'Play' : 'Pause';
          playbackIndicator.classList.remove('is-visible');
          void playbackIndicator.offsetWidth;
          playbackIndicator.classList.add('is-visible');
        }
      };
      let pointerHandled = false;
      mainVideo.addEventListener('click', () => {
        if (pointerHandled) {
          pointerHandled = false;
          return;
        }
        toggleMainVideo();
      });
      mainVideo.addEventListener('pointerup', () => {
        pointerHandled = true;
        toggleMainVideo();
      });
      mainVideo.addEventListener('ended', () => playRandomVideo(mainVideo.dataset.fileName, false));
      const initialFileName = videoFiles[Math.floor(Math.random() * videoFiles.length)];
      mainVideo.dataset.fileName = initialFileName;
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
