import { toast } from 'sonner';

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ScrollToTopSmooth() {
  return window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

export function getRandomNumberWithDecimals(min = 0, max = 20000): number {
  // Ensure min is less than or equal to max
  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value.');
  }

  // Generate random float between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Scale the random decimal to the desired range (min to max)
  const scaled = randomDecimal * (max - min);

  // Multiply by 100 to get two decimal places, then round
  const withDecimals = Math.round(scaled * 100) / 100;

  // Add the minimum value to get the final random number within range
  return withDecimals + min;
}

export const copyToClipboard = (text: string) => {
  return new Promise((resolve, reject) => {
    if (navigator?.clipboard) {
      const cb = navigator.clipboard;

      cb.writeText(text).then(resolve).catch(reject);
    } else {
      try {
        const body = document.querySelector('body');

        const textarea = document.createElement('textarea');
        body?.appendChild(textarea);

        textarea.value = text;
        textarea.select();
        document.execCommand('copy');

        body?.removeChild(textarea);

        resolve(void 0);
      } catch (e) {
        reject(e);
      }
    }
  });
};

export function CopyToClipboardRoute({
  url,
  messages,
}: {
  url: string;
  messages: { success: { title: string; description: string } };
}) {
  try {
    copyToClipboard(url);
    toast.success(messages.success.title, { description: messages.success.description });
  } catch (error) {
    if (error && typeof error === 'string') {
      toast.error('Não foi possível copiar o link', { description: error });
    }
  }
}