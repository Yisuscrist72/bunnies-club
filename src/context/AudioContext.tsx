"use client";
import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

export interface Track {
  id: string;
  title: string;
  url: string; 
}

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: Track | null;
  volume: number;
  currentTime: number;
  duration: number;
  togglePlay: () => Promise<void>;
  playNext: () => Promise<void>;
  playPrev: () => Promise<void>;
  changeVolume: (newVolume: number) => void;
  seek: (time: number) => void; // Para saltar a un minuto concreto
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const playlist: Track[] = [
  { id: '1', title: 'Hype Boy', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734509/NewJeans_%EB%89%B4%EC%A7%84%EC%8A%A4_Hype_Boy_Official_MV_Performance_ver.1__11cta61wi0g_jquaet.mp3' },
  { id: '2', title: 'Attention', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734517/NewJeans_%EB%89%B4%EC%A7%84%EC%8A%A4_-_Attention_Official_Audio_bgpz7u.mp3' },
  { id: '3', title: 'Ditto', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734513/NewJeans_%EB%89%B4%EC%A7%84%EC%8A%A4_Ditto_Performance_Video_Km71Rr9K-Bw_trxedg.mp3' },
  { id: '4', title: 'OMG', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734512/NewJeans_%EB%89%B4%EC%A7%84%EC%8A%A4_OMG_Official_MV_Performance_ver.1__sVTy_wmn5SU_r4ed1w.mp3' },
  { id: '5', title: 'Super Shy', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734511/%EB%89%B4%EC%A7%84%EC%8A%A4_NewJeans_Super_Shy_Official_Audio_cQY5brXxEig_w3dwcn.mp3' },
  { id: '6', title: 'ETA', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734510/NewJeans_%EB%89%B4%EC%A7%84%EC%8A%A4_-_ETA_Audio__2u_kncwzJ5Y_maiwhj.mp3' },
  { id: '7', title: 'Cool With You', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734510/Cool_With_You_-jEmhjZr8RE_csdwjw.mp3' },
  { id: '8', title: 'ASAP', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734509/NewJeans_%EB%89%B4%EC%A7%84%EC%8A%A4_ASAP_Official_Audio_1gqypGFMuQ0_mesxiv.mp3' },
  { id: '9', title: 'New Jeans', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734508/New_Je_Krr2u8BUtLw_o9u0eu.mp3' },
  { id: '10', title: 'Get Up', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734508/NewJeans_Get_Up_tuepdv.mp3' },
  { id: '11', title: 'Cookie', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734518/NewJeans_%EB%89%B4%EC%A7%84%EC%8A%A4_Cookie_Official_MV_VOmIplFAGeg_pxluhx.mp3' },
  { id: '12', title: 'Hurt', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734516/NewJeans_%EB%89%B4%EC%A7%84%EC%8A%A4_Hurt_Official_MV_tVIXY14aJms_i1l9di.mp3' },
  { id: '13', title: 'Supernatural', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734514/NewJeans_%EB%89%B4%EC%A7%84%EC%8A%A4_Supernatural_Official_MV_Part.1__ZncbtRo7RXs_aytpcx.mp3' },
  { id: '14', title: 'How Sweet', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734509/How_Sweet_vrM2mrI83uk_luwhc8.mp3' },
  { id: '15', title: 'Bubble Gum', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734515/NewJeans_%EB%89%B4%EC%A7%84%EC%8A%A4_Bubble_Gum_Official_MV_ud9fqz.mp3' },
  { id: '16', title: 'Right Now', url: 'https://res.cloudinary.com/da5xbcf6c/video/upload/v1771734514/NewJeans_%EB%89%B4%EC%A7%84%EC%8A%A4_Right_Now_Official_MV_m6pTbEz4w3o_lv7n7l.mp3' },
];

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(10);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[0].url);
      audioRef.current.volume = 0.1;

      // Eventos para el tiempo
      audioRef.current.ontimeupdate = () => setCurrentTime(audioRef.current?.currentTime || 0);
      audioRef.current.onloadedmetadata = () => setDuration(audioRef.current?.duration || 0);
    }
  }, []);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (e) { console.log("Play interrupted:", e); }
    }
  }, [isPlaying]);

  const playNext = useCallback(async () => {
    if (!audioRef.current) return;
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    audioRef.current.src = playlist[nextIndex].url;
    audioRef.current.load();
    if (isPlaying) {
      try { await audioRef.current.play(); } catch (e) { console.log(e); }
    }
  }, [currentTrackIndex, isPlaying]);

  const playPrev = useCallback(async () => {
    if (!audioRef.current) return;
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    audioRef.current.src = playlist[prevIndex].url;
    audioRef.current.load();
    if (isPlaying) {
      try { await audioRef.current.play(); } catch (e) { console.log(e); }
    }
  }, [currentTrackIndex, isPlaying]);

  const changeVolume = useCallback((v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v / 100;
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  useEffect(() => {
    const handleEnded = () => playNext();
    const currentAudio = audioRef.current;
    if (currentAudio) currentAudio.addEventListener('ended', handleEnded);
    return () => {
      if (currentAudio) currentAudio.removeEventListener('ended', handleEnded);
    };
  }, [playNext]);

  return (
    <AudioContext.Provider value={{ 
      isPlaying, currentTrack: playlist[currentTrackIndex], volume, 
      currentTime, duration, togglePlay, playNext, playPrev, changeVolume, seek 
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio debe usarse dentro de un AudioProvider');
  return context;
};