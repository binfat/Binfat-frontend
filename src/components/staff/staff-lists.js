import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Store } from "src/statesManagement/store/store";

const ListOfStaff = ({ staff }) => {
  const { dispatch } = useContext(Store);

  const Router = useRouter();
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  const handleDelete = (tableMeta) => (e) => {
    confirm("Are you sure you want to delete Staff");
    const staffId = tableMeta.rowData[2];
    deleteStaff(dispatch, staffId, Router);
  };

  const columns = [
    {
      name: "Delete",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button onClick={handleDelete(tableMeta)} variant="contained" color="error">
              <Typography variant="body1" color="inherit">
                Delete
              </Typography>
            </Button>
          );
        },
      },
    },

    {
      name: "ID",
    },
    {
      name: "FIRST NAME",
    },
    {
      name: "LAST NAME",
    },
    {
      name: "USERNAME",
    },
    {
      name: "EMAIL",
    },
  ];

  const mystaff = staff.map((stf) => Object.values(stf));
  const data = [...mystaff];

  const options = {
    filter: true,
    sort: true,
    selectableRowsHeader: false,
  };

  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Staff"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default ListOfStaff;