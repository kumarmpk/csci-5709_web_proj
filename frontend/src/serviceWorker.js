export async function register() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register('./service-worker.js');
    } catch (e) {
      //console.log(`SW registration failed`, e);
    }
  }
}

