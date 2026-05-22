export interface Kimono {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface KimonoColor {
  id: string;
  name: string;
  twColor: string;
}

export interface KimonoPattern {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface Background {
  id: string;
  name: string;
  thumbnailUrl: string;
  imageUrl?: string; // Made optional for custom uploads
  file?: File;      // Added for custom uploads
  description: string;
}

export interface StylePreset {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  settings: {
    colorId: string;
    patternId: string;
    backgroundId: string;
    kimonoId: string;
    pose: string;
  };
}
