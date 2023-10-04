import React from "react";
import Table from 'react-bootstrap/Table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Transaction } from "../../backendInterface";


const columnHelper = createColumnHelper<Transaction>()

const columns = [
  columnHelper.accessor('date', {
    cell: info => new Date(info.getValue()).toLocaleDateString(),
    header: 'Date',
  }),
  columnHelper.accessor('amount', {
    cell: info => `$${info.getValue().toFixed(2)}`,
    header: 'Amount',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
];

type Props = {
  transactions: Transaction[];
}

const TrasactionsTable: React.FC<Props> = ({ transactions }) => {

  const table = useReactTable<Transaction>({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TrasactionsTable;
