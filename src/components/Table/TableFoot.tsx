import Button from '../Button';

interface TableFootProps {
  loading: boolean;
  data: string[][];
  downloadAction: React.MouseEventHandler<HTMLButtonElement> | undefined;
  downloadDisabled: boolean | undefined;
}

const TableFoot: React.FC<TableFootProps> = ({
  loading,
  data,
  downloadAction,
  downloadDisabled,
}) => {
  return (
    <tfoot className='bg-gray-50 min-w-full'>
      <tr className='flex w-full border-t border-gray-300'>
        <td className='px-6 py-3 flex items-center justify-between w-full '>
          <p>Total candles: {!loading && data.length}</p>
          <Button
            label='Download Data'
            onClick={downloadAction}
            disabled={downloadDisabled}
          />
        </td>
      </tr>
    </tfoot>
  );
};

export default TableFoot;
