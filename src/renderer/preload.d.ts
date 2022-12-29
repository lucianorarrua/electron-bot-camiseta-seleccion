import { AxiosResponse } from 'axios';
import { Channels } from 'main/preload';

declare global {
  type VariantSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';
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
        playAlertSound(): void;
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
