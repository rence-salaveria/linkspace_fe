import React, { useMemo, useState } from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {useNavigate} from "react-router-dom";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

interface ReusableTableProps<T> {
  data: T[];
  columns: Column<T>[];
  tableTitle?: string;
}

export function ReusableTableComponent<T extends Record<string, any>>({
                                                                        data,
                                                                        columns,
                                                                        tableTitle,
                                                                      }: ReusableTableProps<T>) {
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) => {
        if (typeof value === 'object' && value !== null) {
          // Concatenate name, course, and year for filtering
          const nameCourseYear = `${value.lastName}, ${value.firstName} - ${value.course} - Year ${value.year}`;
          return nameCourseYear.toLowerCase().includes(filterText.toLowerCase());
        }
        return value != null && value.toString().toLowerCase().includes(filterText.toLowerCase());
      })
    );
  }, [data, filterText]);

  const table = useReactTable<T>({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel<T>(),
  });

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold leading-tight text-white">
            {tableTitle || 'Table'}
          </h2>
          <div className="flex flex-row gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="px-4 py-2 border rounded"
            />
            {tableTitle === 'Students' && (
              <button
                className="px-4 py-2 bg-primary text-white rounded"
                onClick={() => navigate('/add/student')}>Add Student</button>
            )}
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <div className="max-h-[40rem] overflow-y-auto">
              <table className="min-w-full leading-normal">
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-primary text-white">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-6 py-3 text-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
                </thead>
                <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center">No data yet</td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="odd:bg-gray-100 even:bg-white">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4 align-middle text-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
