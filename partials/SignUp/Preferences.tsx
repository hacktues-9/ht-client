import {
  ContainerEatingPreferences,
  ContainerAlergies,
  ContainerTshirt,
} from "../../components/form/signup/multipleChoice/Container";

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
        error={errors.eatingPreferences}
      />
      <ContainerAlergies
        value={form.alergies}
        onChange={handleAlergiesChange}
        error={errors.alergies}
      />
      <ContainerTshirt
        value={form.tshirt}
        onChange={handleTshirtChange}
        error={errors.tshirt}
      />
    </div>
  );
};

export default PreferencesTab;
