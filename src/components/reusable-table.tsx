import React, {useMemo, useState} from 'react'

interface Column<T> {
  header: string
  accessor: keyof T
  render?: (value: any) => React.ReactNode
}

interface ReusableTableProps<T> {
  data: T[]
  columns: Column<T>[],
  tableTitle?: string;
}

export function ReusableTableComponent<T extends Record<string, any>>({data, columns, tableTitle}:ReusableTableProps<T>){
  const [filterText, setFilterText] = useState('')

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    )
  }, [data, filterText])

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight text-white">{tableTitle || "Table"}</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.header}
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
              </tr>
              </thead>
              <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td
                      key={column.header}
                      className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      {column.render
                        ? column.render(item[column.accessor])
                        : item[column.accessor]}
                    </td>
                  ))}
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <button
                      type="button"
                      className="inline-block text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        className="inline-block h-6 w-6 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}