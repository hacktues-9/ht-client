import {
  ContainerEatingPreferences,
  ContainerAlergies,
  ContainerTshirt,
} from "../../components/form/signup/multipleChoice/Container";

const PreferencesTab = () => {
  return (
    <div>
      <ContainerEatingPreferences />
      <ContainerAlergies />
      <ContainerTshirt />
    </div>
  );
};

export default PreferencesTab;
