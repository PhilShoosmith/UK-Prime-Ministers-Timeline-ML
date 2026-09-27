// Sound synthesis service using Web Audio API for zero-latency, cross-browser procedural audio.

class SoundService {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private isTickScheduled: boolean = false;

  constructor() {
    // Check localStorage for saved sound preference (default to true)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ukpm_sound_enabled');
      if (saved !== null) {
        this.soundEnabled = saved === 'true';
      }
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ukpm_sound_enabled', enabled ? 'true' : 'false');
    }
  }

  public toggleSound(): boolean {
    const next = !this.soundEnabled;
    this.setSoundEnabled(next);
    if (next) {
      // Play a quick subtle pop confirmation
      this.playTickClick(800, 0.04);
    }
    return next;
  }

  /**
   * Quick clock tick / wood click using noise or short sine pulse
   */
  private playTickClick(freq: number, volume: number = 0.05, duration: number = 0.04) {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.4), ctx.currentTime + duration);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  /**
   * Sound played on each second of the 30-second timer.
   * Progressively escalates in urgency and tension as it approaches zero:
   * - 30s to 16s: steady, calm atmospheric clock tick (alternating tick-tock)
   * - 15s to 6s: urgent dual-pulse tension tick with low resonant thud
   * - 5s to 1s: climactic ascending countdown warning pings (5, 4, 3, 2, 1)
   */
  public playTimerTick(timeLeft: number): void {
    if (!this.soundEnabled || timeLeft < 1 || timeLeft > 30) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Phase 3: Final 5 seconds (5 down to 1) - Eventuating countdown urgency
      if (timeLeft <= 5) {
        // Ascending pitches: 5=C5 (523Hz), 4=D5 (587Hz), 3=E5 (659Hz), 2=G5 (784Hz), 1=A5 (880Hz)
        const countdownPitches: { [sec: number]: number } = {
          5: 523.25,
          4: 587.33,
          3: 659.25,
          2: 783.99,
          1: 880.00,
        };
        const pitch = countdownPitches[timeLeft] || 880;

        // Urgent ping: sine wave with slight triangle overtone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = timeLeft === 1 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(pitch, now);

        // Ping envelope
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.18);

        // At 1 second left, add a quick echo pulse for intense climax
        if (timeLeft <= 2) {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(pitch * 1.25, now + 0.08);
          gain2.gain.setValueAtTime(0.001, now);
          gain2.gain.setValueAtTime(0.08, now + 0.08);
          gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start(now + 0.08);
          osc2.stop(now + 0.22);
        }
        return;
      }

      // Phase 2: 15s down to 6s - Increased tension with dual rhythmic pulse & resonant body
      if (timeLeft <= 15) {
        const isTick = timeLeft % 2 === 0;
        const mainFreq = isTick ? 950 : 750;
        this.playTickClick(mainFreq, 0.07, 0.05);

        // Add subtle low urgency heartbeat pulse
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(110, now);
        subOsc.frequency.exponentialRampToValueAtTime(55, now + 0.12);
        subGain.gain.setValueAtTime(0.06, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + 0.12);
        return;
      }

      // Phase 1: 30s down to 16s - Steady clock ticking (alternating tick / tock)
      const isTick = timeLeft % 2 === 0;
      const freq = isTick ? 800 : 580;
      this.playTickClick(freq, 0.045, 0.035);
    } catch {
      // Ignore audio synthesis errors on browsers with restrictive auto-play
    }
  }

  /**
   * Triumphant positive sound when user answers correctly.
   * Plays a sparkling ascending major arpeggio (C5 -> E5 -> G5 -> C6).
   */
  public playCorrectSound(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // C5, E5, G5, C6 notes
      const notes = [
        { freq: 523.25, time: 0.0, dur: 0.15, vol: 0.15 },
        { freq: 659.25, time: 0.08, dur: 0.15, vol: 0.16 },
        { freq: 783.99, time: 0.16, dur: 0.18, vol: 0.18 },
        { freq: 1046.50, time: 0.24, dur: 0.45, vol: 0.22 },
      ];

      notes.forEach(({ freq, time, dur, vol }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.linearRampToValueAtTime(vol, now + time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

        // Add a subtle high harmonic shimmer to the top note
        if (freq >= 1046) {
          const shimmer = ctx.createOscillator();
          const shimmerGain = ctx.createGain();
          shimmer.type = 'sine';
          shimmer.frequency.setValueAtTime(freq * 1.5, now + time);
          shimmerGain.gain.setValueAtTime(0.05, now + time);
          shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur * 0.8);
          shimmer.connect(shimmerGain);
          shimmerGain.connect(ctx.destination);
          shimmer.start(now + time);
          shimmer.stop(now + time + dur);
        }

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur);
      });
    } catch {
      // Audio playback fails silently if user has not interacted yet
    }
  }

  /**
   * Negative sound when user answers incorrectly.
   * Plays a distinct, low-pitched descending two-tone buzz (A3 -> Eb3).
   */
  public playIncorrectSound(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Two-tone descending error cue
      const tones = [
        { freq: 220, start: 0.0, dur: 0.14, vol: 0.18 },
        { freq: 155.56, start: 0.13, dur: 0.35, vol: 0.20 }, // Eb3 (diminished 5th / dissonant interval)
      ];

      tones.forEach(({ freq, start, dur, vol }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + start);
        if (start > 0) {
          // Slight downward pitch slide on the second buzz
          osc.frequency.exponentialRampToValueAtTime(freq * 0.85, now + start + dur);
        }

        // Lowpass filter to avoid abrasive harshness while keeping a clear buzz
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, now + start);

        gain.gain.setValueAtTime(0.001, now + start);
        gain.gain.linearRampToValueAtTime(vol, now + start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + start);
        osc.stop(now + start + dur);
      });
    } catch {
      // Audio playback fails silently
    }
  }

  /**
   * Negative sound specifically for running out of time (0s).
   * A descending timeout gong/buzzer.
   */
  public playTimeoutSound(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Low dramatic gong / buzzer
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.6);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // Audio playback fails silently
    }
  }
}

export const soundService = new SoundService();
