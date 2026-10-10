export type YouTubePlayerHandle = {
  getCurrentTime(): number;
  getPlayerState(): number;
  getIframe(): HTMLIFrameElement;
  destroy(): void;
};

type PlayerEvent = { target: YouTubePlayerHandle };
export type YouTubeAPI = {
  Player: new (
    element: HTMLIFrameElement,
    options: {
      events: {
        onReady: (event: PlayerEvent) => void;
        onStateChange: (event: PlayerEvent & { data: number }) => void;
        onError: (event: PlayerEvent & { data: number }) => void;
      };
    },
  ) => YouTubePlayerHandle;
};

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

// One browser SDK download; learning data still belongs to the React providers.
let pending: Promise<YouTubeAPI> | undefined;

export function loadYouTubeAPI(): Promise<YouTubeAPI> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (pending) return pending;
  pending = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const previous = window.onYouTubeIframeAPIReady;
    const timer = window.setTimeout(() => fail(), 15000);
    function fail() {
      window.clearTimeout(timer);
      window.onYouTubeIframeAPIReady = previous;
      script.remove();
      pending = undefined;
      reject(new Error("YouTube controls could not connect."));
    }
    window.onYouTubeIframeAPIReady = () => {
      window.clearTimeout(timer);
      window.onYouTubeIframeAPIReady = previous;
      previous?.();
      if (window.YT?.Player) resolve(window.YT);
      else fail();
    };
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = fail;
    document.head.append(script);
  });
  return pending;
}
