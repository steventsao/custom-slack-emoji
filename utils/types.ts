/* eslint-disable no-unused-vars */
export interface ImageProps {
  id: number;
  height: string;
  width: string;
  public_id: string;
  format: string;
  blurDataUrl?: string;
}

export interface StickerProps {
  public_id: string;
  format: string;
  blurDataUrl: string;
  onStickerToggle: (stickerAction: StickerAction) => void;
}
export type StickerAction = {
  imageUrl: string;
  public_id: string;
};
export interface StickersResponse {
  images: ImageProps[];
  nextCursor: string;
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}
