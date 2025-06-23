import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnDef
} from '@tanstack/react-table';
import { useState } from 'react';

interface TableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function CustomTable<TData>({ columns, data }: TableProps<TData>) {
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: { pageIndex, pageSize: 10 },
    },
    manualPagination: false,
    onPaginationChange: (updater) => {
      const newState = typeof updater === 'function' ? updater({ pageIndex, pageSize: 10 }) : updater;
      setPageIndex(newState.pageIndex);
    },
  });

  return (
    <div className="w-full">
      <table className="min-w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className=''>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="py-5 border-b border-gray-600 text-sm text-left font-medium">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b border-gray-500">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="py-5 text-left text-sm text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
