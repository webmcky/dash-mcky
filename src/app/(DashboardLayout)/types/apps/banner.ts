export interface mediaProps {
  disabled?: boolean;
  onFileSelected?: (file: File, previewUrl: string) => void;
}