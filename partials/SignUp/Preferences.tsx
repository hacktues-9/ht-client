import {
  ContainerEatingPreferences,
  ContainerAlergies,
  ContainerTshirt,
} from "../../components/form/signup/multipleChoice/Container";

const PreferencesTab = () => {
  return (
    <div>
      <h2>преференции</h2>
      <ContainerEatingPreferences />
      <ContainerAlergies />
      <ContainerTshirt />
    </div>
  );
};

export default PreferencesTab;
