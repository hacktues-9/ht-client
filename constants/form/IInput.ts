export interface IInput {
  label: string;
  classes: string[];
  id: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  value?: string;
  options?: IOption[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export interface IOption {
  value: string;
  label: string;
}
