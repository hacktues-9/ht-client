import {
  ContainerEatingPreferences,
  ContainerAlergies,
  ContainerTshirt,
} from "../../components/form/signup/multipleChoice/Container";

import { ERRORS_TEXT } from "../../constants/signup/errors";

const PreferencesTab = ({ form, setForm, errors }) => {
  const handleEatingPreferencesChange = (value) => {
    setForm({
      ...form,
      eatingPreferences: form.eatingPreferences === value ? "" : value,
    });
  };

  const handleAlergiesChange = (value) => {
    if (form.alergies.includes(value)) {
      setForm({
        ...form,
        alergies: form.alergies.filter((alergy) => alergy !== value),
      });
    } else {
      setForm({
        ...form,
        alergies: [...form.alergies, value],
      });
    }
  };

  const handleTshirtChange = (value) => {
    setForm({
      ...form,
      shirtSize: form.shirtSize === value ? "" : value,
    });
  };

  return (
    <div>
      <h2>преференции</h2>
      <ContainerEatingPreferences
        value={form.eatingPreferences}
        onChange={handleEatingPreferencesChange}
        error={ERRORS_TEXT.eatingPreferences[errors.eatingPreferences]}
      />
      <ContainerAlergies
        value={form.alergies}
        onChange={handleAlergiesChange}
        error={ERRORS_TEXT.alergies[errors.alergies]}
      />
      <ContainerTshirt
        value={form.shirtSize}
        onChange={handleTshirtChange}
        error={ERRORS_TEXT.shirtSize[errors.shirtSize]}
      />
    </div>
  );
};

export default PreferencesTab;
