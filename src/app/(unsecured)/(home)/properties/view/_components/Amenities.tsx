import CustomDialog, { handleToggleDialog } from "@/components/common/modal";
import {
  TbWifi,
  TbAirConditioning,
  TbWashMachine,
  TbGrill,
  TbPool,
  TbFirstAidKit,
  TbFireExtinguisher,
  TbFridge,
  TbDeviceTv,
  TbBriefcase,
  TbBath,
  TbToolsKitchen2,
  TbBeach,
  TbBuildingSkyscraper,
} from "react-icons/tb";

const amenities = [
  { label: "Wifi", icon: TbWifi },
  { label: "Air conditioning", icon: TbAirConditioning },
  { label: "Laundry", icon: TbWashMachine },
  { label: "BBQ grill", icon: TbGrill },
  { label: "Pool", icon: TbPool },
  { label: "First aid kit", icon: TbFirstAidKit },
  { label: "Fire extinguisher", icon: TbFireExtinguisher },
  { label: "Refrigerator", icon: TbFridge },
  { label: "TV", icon: TbDeviceTv },
  { label: "Dedicated workspace", icon: TbBriefcase },
  { label: "Bath tub", icon: TbBath },
  { label: "Kitchen & utensils", icon: TbToolsKitchen2 },
  { label: "Beachfront", icon: TbBeach },
  { label: "City view", icon: TbBuildingSkyscraper },
];

const Amenities = ({ data }: any) => {
  return (
    <div className="py-6 border-b border-gray-200 grid gap-5">
      <h3 className="text-xl font-medium mb-2">Amenities</h3>
      <div className="grid grid-cols-2 gap-4 text-lg text-gray-500">
        {amenities.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <item.icon className="text-xl" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => handleToggleDialog("viewAmenities", true)}
        className="underline text-left"
      >
        Show more
      </button>

      <CustomDialog
        onClose={() => handleToggleDialog("viewAmenities", false)}
        id={"viewAmenities"}
        header="Amenities"
      >
        <div className="grid grid-cols-2 gap-4 text-lg text-gray-500 mt-5">
          {amenities.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <item.icon className="text-xl" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </CustomDialog>
    </div>
  );
};

export default Amenities;
