export const CustomHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="my-3">
      <h3 className="text-lg lg:text-2xl font-bold">{title}</h3>
      <p className="text-[#33333380] dark:text-[#D7DFEF]">{description}</p>
    </div>
  );
};

export const CustomSubHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="grid gap-1">
      <h3 className="text-md font-bold">{title}</h3>
      <p className="text-xs text-[#33333380] dark:text-[#D7DFEF]">{description}</p>
    </div>
  );
};
