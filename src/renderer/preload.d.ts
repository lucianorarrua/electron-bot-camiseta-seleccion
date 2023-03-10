import { AxiosResponse } from 'axios';
import { Channels } from 'main/preload';

declare global {
  type VariantSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';

  type SoundName = 'que_mira_bobo.mp3' | 'quick-tone.wav';
  export interface ProductAvailability {
    id: string;
    availability_status: string;
    variation_list: ProductVariation[];
  }

  export interface ProductVariation {
    sku: string;
    size: string;
    availability: number;
    availability_status: string;
  }

  interface Window {
    electron: {
      ipcRenderer: {
        getShirtAvailability(): Promise<
          AxiosResponse<ProductAvailability, any>
        >;
        focus(): void;
        playAlertSound(soundName: SoundName): void;
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
