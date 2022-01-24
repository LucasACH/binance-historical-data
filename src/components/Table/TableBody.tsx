interface TableBodyProps {
  data: string[][];
}

const TableBody: React.FC<TableBodyProps> = ({ data }) => {
  return (
    <tbody className='divide-y divide-gray-200 flex-auto'>
      {data.map((row, index) => (
        <tr key={index}>
          {row.map((tableData, index) => (
            <td
              className='px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-700'
              key={index}
            >
              {tableData}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
