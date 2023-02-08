export interface IInput {
  label: string;
  classes: string[];
  id: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  value?: string;
  error?: string;
  options?: IOption[];
  checkmark?: boolean;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  readOnly?: boolean;
}

export interface IOption {
  value: string;
  label: string;
}
