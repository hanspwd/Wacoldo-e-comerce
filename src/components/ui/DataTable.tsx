import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface DataColumn<T> {
  key: string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: Array<DataColumn<T>>;
  rows: T[];
  getRowKey: (row: T) => string;
  getRowClassName?: (row: T) => string;
  emptyMessage?: string;
  caption?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  getRowClassName,
  emptyMessage = 'No hay registros para mostrar.',
  caption,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn('table-responsive app-table-wrap', className)}>
      <table className="table app-table align-middle mb-0">
        {caption && <caption className="visually-hidden">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className={column.headerClassName}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center text-secondary py-5">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={getRowKey(row)} className={getRowClassName?.(row)}>
                {columns.map((column) => (
                  <td key={column.key} className={column.className}>
                    {column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
