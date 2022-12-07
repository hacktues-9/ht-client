export interface IInput {
  label: string;
  classes: string[];
  id: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}