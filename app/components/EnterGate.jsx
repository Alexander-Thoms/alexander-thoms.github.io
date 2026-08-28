"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "72YoraTjNI0";
const STORAGE_KEY = "bgmusic_volume";

export default function EnterGate() {
  const overlayRef = useRef(null);
  const musicControlRef = useRef(null);
  const muteBtnRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const volumePctRef = useRef(null);

  const playerRef = useRef(null);
  const lastVolumeRef = useRef(50);
  const mutedRef = useRef(false);
  const ytRequestedRef = useRef(false);

  const [entered, setEntered] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [muted, setMuted] = useState(false);

  // Restore persisted volume on mount
  useEffect(() => {
    const slider = volumeSliderRef.current;
    const pct = volumePctRef.current;
    if (!slider || !pct) return;

    let saved = 50;
    try {
      const raw = parseInt(localStorage.getItem(STORAGE_KEY), 10);
      if (!isNaN(raw) && raw >= 0 && raw <= 100) saved = raw;
    } catch (e) {
      /* localStorage unavailable (private mode) — ignore */
    }

    slider.value = String(saved);
    lastVolumeRef.current = saved;
    pct.textContent = String(saved);

    if (saved === 0) {
      mutedRef.current = true;
      setMuted(true);
      updateMuteIcon();
    }
  }, []);

  function persistVolume(v) {
    try {
      localStorage.setItem(STORAGE_KEY, String(v));
    } catch (e) {
      /* ignore */
    }
  }

  function updateMuteIcon() {
    if (!muteBtnRef.current) return;
    muteBtnRef.current.innerHTML = mutedRef.current
      ? '<i class="fa-solid fa-volume-xmark"></i>'
      : '<i class="fa-solid fa-volume-high"></i>';
  }

  function ensureApi(callback) {
    if (window.YT && window.YT.Player) {
      callback();
      return;
    }
    if (!document.getElementById("yt-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = function () {
        callback();
      };
    }
  }

  function startMusic() {
    if (ytRequestedRef.current) return;
    ytRequestedRef.current = true;

    ensureApi(function () {
      const holder = document.createElement("div");
      holder.id = "yt-holder";
      const container = document.getElementById("music-video");
      if (container) {
        container.appendChild(holder);
      }

      try {
        playerRef.current = new window.YT.Player("yt-holder", {
          videoId: VIDEO_ID,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: VIDEO_ID,
            controls: 1,
            modestbranding: 1,
            playsinline: 1,
            fs: 1,
            iv_load_policy: 3,
          },
          events: {
            onReady: function (e) {
              e.target.setVolume(lastVolumeRef.current);
              e.target.playVideo();
              // YouTube resets volume to 100% when playback starts; re-assert
              setTimeout(function () {
                if (playerRef.current) playerRef.current.setVolume(lastVolumeRef.current);
              }, 300);
              setShowControls(true);
            },
            onStateChange: function (e) {
              if (e.data === window.YT.PlayerState.ENDED) {
                e.target.seekTo(0);
                e.target.playVideo();
              } else if (e.data === window.YT.PlayerState.PLAYING) {
                e.target.setVolume(lastVolumeRef.current);
              }
            },
            onError: function (err) {
              console.warn("YouTube background player error:", err);
            },
          },
        });
      } catch (err) {
        console.warn("Failed to start background music:", err);
      }
    });
  }

  function enterSite() {
    setEntered(true);
    if (overlayRef.current) overlayRef.current.classList.add("hidden");
    window.scrollTo(0, 0);
    startMusic();
  }

  function onVolumeInput(e) {
    const v = parseInt(e.target.value, 10);
    if (volumePctRef.current) volumePctRef.current.textContent = String(v);
    lastVolumeRef.current = v;
    if (v === 0) {
      mutedRef.current = true;
      setMuted(true);
      if (playerRef.current) playerRef.current.mute();
      updateMuteIcon();
    } else if (mutedRef.current) {
      mutedRef.current = false;
      setMuted(false);
      if (playerRef.current) playerRef.current.unMute();
      updateMuteIcon();
    }
    if (playerRef.current) playerRef.current.setVolume(v);
    persistVolume(v);
  }

  function onMuteClick() {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
    if (mutedRef.current) {
      if (playerRef.current) playerRef.current.mute();
    } else {
      if (playerRef.current) playerRef.current.unMute();
      if (parseInt(volumeSliderRef.current.value, 10) === 0) {
        volumeSliderRef.current.value = "50";
        if (volumePctRef.current) volumePctRef.current.textContent = "50";
        lastVolumeRef.current = 50;
        if (playerRef.current) playerRef.current.setVolume(50);
        persistVolume(50);
      }
    }
    updateMuteIcon();
  }

  return (
    <>
      {/* Entry gate: click to open (satisfies autoplay-with-sound policy) */}
      <div id="enter-overlay" ref={overlayRef}>
        <div className="enter-inner">
          <h1 className="enter-title">Welcome to my webpage</h1>
          <button id="enter-btn" type="button" onClick={enterSite}>
            click to open
          </button>
          <p className="enter-hint">turn your sound on ♪</p>
        </div>
      </div>

      {/* Music video mounts into #music-video (defined in page.jsx) when entering */}

      {/* Music control (mute + volume), shown after entering */}
      <div
        id="music-control"
        className="volume-controls-wrapper"
        ref={musicControlRef}
        hidden={!showControls}
      >
        <div className="volume-controls">
          <button
            id="mute-btn"
            className="control-button"
            type="button"
            aria-label="mute"
            ref={muteBtnRef}
            onClick={onMuteClick}
          >
            <i className="fa-solid fa-volume-high"></i>
          </button>
          <div className="volume-slider-background">
            <input
              id="volume-slider"
              className="volume-slider"
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              aria-label="volume"
              ref={volumeSliderRef}
              onInput={onVolumeInput}
            />
          </div>
          <span id="volume-percentage" className="volume-percentage" ref={volumePctRef}>
            50
          </span>
        </div>
      </div>
    </>
  );
}
