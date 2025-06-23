import { CustomTable } from "@/components/common/table";
import { ColumnDef } from "@tanstack/react-table";

const Upcoming = () => {
  type Reservation = {
    id: string;
    status: string;
    guests: string;
    checkIn: string;
    checkOut: string;
    booked: string;
    listing: string;
    totalPayout: string;
  };

  const columns: ColumnDef<Reservation>[] = [
    { accessorKey: "status", header: "Status" },
    {
      accessorKey: "guests",
      header: "Guests",
      cell: ({ getValue }) => (
        <div>
          {String(getValue())}
          <p className="text-xs">3 Bedroom, Wifi </p>
        </div>
      ),
    },
    { accessorKey: "checkIn", header: "Check-in" },
    { accessorKey: "checkOut", header: "Check-out" },
    { accessorKey: "booked", header: "Booked" },
    { accessorKey: "listing", header: "Listing" },
    { accessorKey: "totalPayout", header: "Total Payout" },
    {
      id: "actions",
      header: "Action",
      cell: () => (
        <button className="border py-2 px-4 bg-stone-700 text-white rounded-xl ">
          Details
        </button>
      ),
    },
  ];

  const data: Reservation[] = [
    {
      id: "1",
      status: "Checking out today",
      guests: "Donice Onyekachukwu Ubaru",
      checkIn: "2023-12-01",
      checkOut: "2023-12-05",
      booked: "2023-11-15",
      listing: "Villa A",
      totalPayout: "$500",
    },
    {
      id: "2",
      status: "Pending",
      guests: "Jane Smith",
      checkIn: "2023-12-10",
      checkOut: "2023-12-15",
      booked: "2023-11-20",
      listing: "Villa B",
      totalPayout: "$750",
    },
    {
      id: "3",
      status: "Confirmed",
      guests: "Mike Johnson",
      checkIn: "2023-12-20",
      checkOut: "2023-12-25",
      booked: "2023-11-25",
      listing: "Villa C",
      totalPayout: "$600",
    },
    {
      id: "4",
      status: "Confirmed",
      guests: "Sarah Williams",
      checkIn: "2023-12-28",
      checkOut: "2024-01-02",
      booked: "2023-11-30",
      listing: "Villa A",
      totalPayout: "$900",
    },
    {
      id: "5",
      status: "Pending",
      guests: "Robert Brown",
      checkIn: "2024-01-05",
      checkOut: "2024-01-10",
      booked: "2023-12-01",
      listing: "Villa D",
      totalPayout: "$800",
    },
    {
      id: "6",
      status: "Confirmed",
      guests: "Emily Davis",
      checkIn: "2024-01-15",
      checkOut: "2024-01-20",
      booked: "2023-12-05",
      listing: "Villa B",
      totalPayout: "$650",
    },
    {
      id: "7",
      status: "Pending",
      guests: "Tom Wilson",
      checkIn: "2024-01-25",
      checkOut: "2024-01-30",
      booked: "2023-12-10",
      listing: "Villa C",
      totalPayout: "$700",
    },
  ];

  return (
    <div>
      <CustomTable columns={columns} data={data} />
    </div>
  );
};

export default Upcoming;
