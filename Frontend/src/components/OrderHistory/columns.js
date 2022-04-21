export const COLUMNS = [
    {
        Header: 'Order Id',
        accessor: '_id'
    },
    {
        Header: 'Item Name',
        accessor: 'ITEM_NAME'
    },
    {
        Header: 'Image',
        accessor: 'ITEM_IMAGE',
        Cell: tableProps => (
            <img
              src={tableProps.row.original.ITEM_IMAGE}
            //   width={60}
              height={150}
              alt='Player'
            />
          )
    },
    {
        Header: 'Date',
        accessor: 'ORDER_DATE'
    },
    {
        Header: 'Price',
        accessor: 'BUY_PRICE'
    },
    {
        Header: 'Quantity',
        accessor: 'QUANTITY'
    },
    {
        Header: 'Total',
        accessor: 'TOTAL_PRICE'
    }

]