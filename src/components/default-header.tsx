import { HeaderContext } from '@tanstack/react-table';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from './ui/context-menu';
import { Task } from 'types/MainType';

interface DefaultHeaderProps<T> {
  info: HeaderContext<Task, T>;
  name: string;
}

export function DefaultHeader<TValue>({
  info,
  name,
}: DefaultHeaderProps<TValue>) {
  const { table } = info;
  const sorted = info.column.getIsSorted();

  return (
    <ContextMenu>
      <ContextMenuTrigger
        onPointerDown={(e) => {
          e.preventDefault();
          info.column.toggleSorting(info.column.getIsSorted() === 'asc');
        }}
        className="w-full h-full flex flex-row items-center justify-start gap-4 cursor-default"
      >
        {name}
        {sorted === 'asc' && <FaSortAlphaDown />}
        {sorted === 'desc' && <FaSortAlphaUp />}
      </ContextMenuTrigger>
      <ContextMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <ContextMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </ContextMenuCheckboxItem>
          ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default DefaultHeader;
