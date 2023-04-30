import { Stack, Chip } from "@mui/material";
import "./Table.css";

function Table({ data }) {
  return (
    <>
      <Stack
        className="row"
        key={data.order_id}
        data-testid="table-row"
        direction="row"
        spacing={1}
      >
        <Chip label={data.order_id} className="chip" style={{ width: '20%' }} />
        <Chip label={data.vendor_name} className="chip" style={{ width: '30%' }} />
        <Chip label={data.pickup_date} className="chip" style={{ width: '20%' }} />
        <Chip
          label={data.status}
          className="chip status-chip"
          data-testid="table-column-status"
          style={{ width: '30%' }}
        />
      </Stack>
      <hr className="separator" />
    </>
  );
}

export default Table;
