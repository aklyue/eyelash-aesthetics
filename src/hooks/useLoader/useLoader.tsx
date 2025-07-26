import { useEffect, useState } from "react";

export const useLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = Array.from(document.images);
    const total = images.length;
    let loaded = 0;
    let timeoutId: NodeJS.Timeout;

    const checkDone = () => {
      if (loaded === total && document.readyState === "complete") {
        clearTimeout(timeoutId);
        setTimeout(() => setLoading(false), 200);
      }
    };

    if (total === 0 && document.readyState === "complete") {
      setTimeout(() => setLoading(false), 200);
      return;
    }

    images.forEach((img) => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener("load", () => {
          loaded++;
          checkDone();
        });
        img.addEventListener("error", () => {
          loaded++;
          checkDone();
        });
      }
    });

    // На случай, если readyState ещё не complete
    if (document.readyState !== "complete") {
      window.addEventListener("load", checkDone);
    }

    // Fallback на случай, если что-то не прогрузилось
    timeoutId = setTimeout(() => setLoading(false), 3000);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("load", checkDone);
    };
  }, []);

  return { loading };
};
