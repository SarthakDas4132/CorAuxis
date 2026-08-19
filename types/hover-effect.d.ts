declare module "hover-effect" {
  export interface HoverEffectOptions {
    parent: HTMLElement | null;
    intensity?: number;
    intensity1?: number;
    intensity2?: number;
    angle?: number;
    angle1?: number;
    angle2?: number;
    speedIn?: number;
    speedOut?: number;
    speed?: number;
    hover?: boolean;
    easing?: string;
    image1: string;
    image2: string;
    displacementImage: string;
    imagesRatio?: number;
    video?: boolean;
  }

  export default class HoverEffect {
    constructor(options: HoverEffectOptions);
    next(): void;
    previous(): void;
  }
}
