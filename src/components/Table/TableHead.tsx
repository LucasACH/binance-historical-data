interface TableHeadProps {
  headers: string[];
}
const TableHead: React.FC<TableHeadProps> = ({ headers }) => {
  return (
    <thead className='bg-gray-50 border-b border-gray-300'>
      <tr>
        {headers.map((header) => (
          <th
            className='px-6 py-3 text-left text-xxs font-medium text-gray-500 uppercase tracking-wider'
            key={header}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
