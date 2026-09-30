export interface GalleryPhoto {
  /** Caption shown on the tile and in the lightbox */
  caption: string;
  /**
   * Optional real photo. Leave undefined to use the generated gradient
   * placeholder, or set to an imported image / URL to use a real photo.
   */
  src?: string;
}

export interface Reason {
  emoji: string;
  title: string;
  note: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  desc: string;
}

export interface CelebrationConfig {
  name: string;
  heroKicker: string;
  message: string;
  secretMessage: string;
  signature: string;
  closingCopy: string;
  giftUrl?: string; //
  gallery: GalleryPhoto[];
  reasons: Reason[];
  timeline: TimelineEntry[];
}
