import TableHead from './TableHead';
import TableLoadingBody from './TableLoadingBody';
import TableBody from './TableBody';
import TableFoot from './TableFoot';

interface TableProps {
  headers: string[];
  data: string[][];
  loading: boolean;
  downloadAction: React.MouseEventHandler<HTMLButtonElement> | undefined;
  downloadDisabled: boolean;
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  loading,
  downloadAction,
  downloadDisabled,
}) => {
  return (
    <table className='flex flex-col min-w-full divide-y divide-gray-200'>
      <TableHead headers={headers} />
      {loading ? <TableLoadingBody /> : <TableBody data={data} />}
      <TableFoot
        loading={loading}
        data={data}
        downloadAction={downloadAction}
        downloadDisabled={downloadDisabled}
      />
    </table>
  );
};

export default Table;
