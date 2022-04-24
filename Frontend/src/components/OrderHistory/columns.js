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
        Header: 'Gift Wrap',
        accessor: 'GIFT_WRAP',
        Cell: tableProps => (
          <>
            <div>
              {tableProps.row.original.GIFT_WRAP ? "Yes" : "No"}
            </div>
            <div>
              {tableProps.row.original.MESSAGE ? "Note: "+ tableProps.row.original.MESSAGE : ""}
            </div>
            </>
          )
    },
    {
        Header: 'Date',
        accessor: 'ORDER_DATE',
        Cell: tableProps => (
          <>
            {tableProps.row.original.ORDER_DATE.slice(0,10)}
            </>
          )
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