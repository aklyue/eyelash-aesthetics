import { useEffect, useState } from "react";

export const useLoader = (minDelay = 200, timeout = 5000) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imgElements = Array.from(document.images);
    const bgUrls: string[] = [];

    const allElements = Array.from(document.querySelectorAll("*"));
    allElements.forEach((el) => {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg !== "none") {
        const match = bg.match(/url\(["']?(.*?)["']?\)/);
        if (match?.[1]) {
          bgUrls.push(match[1]);
        }
      }
    });

    const totalResources = imgElements.length + bgUrls.length;
    let loaded = 0;

    if (totalResources === 0 && document.readyState === "complete") {
      setTimeout(() => setLoading(false), minDelay);
      return;
    }

    const checkDone = () => {
      loaded++;
      if (loaded === totalResources && document.readyState === "complete") {
        clearTimeout(fallbackTimeout);
        setTimeout(() => setLoading(false), minDelay);
      }
    };

    imgElements.forEach((img) => {
      if (img.complete) {
        checkDone();
      } else {
        img.addEventListener("load", checkDone);
        img.addEventListener("error", checkDone);
      }
    });

    bgUrls.forEach((url) => {
      const img = new Image();
      img.onload = img.onerror = checkDone;
      img.src = url;
    });

    const fallbackTimeout = setTimeout(() => {
      setLoading(false);
    }, timeout);

    return () => {
      clearTimeout(fallbackTimeout);
      imgElements.forEach((img) => {
        img.removeEventListener("load", checkDone);
        img.removeEventListener("error", checkDone);
      });
    };
  }, [minDelay, timeout]);

  return loading;
};
