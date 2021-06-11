import { Table, Form } from "react-bootstrap";

import styles from "./index.module.scss";

function GiftInfo({
  code,
  therapyType,
  therapist,
  minutes,
  price,
  handleSelection,
}) {
  // for mobile devices
  return (
    <Table className={`${styles.table} d-table d-md-none`}>
      <tbody>
        <tr>
          <td>CODE</td>
          <td>{code}</td>
        </tr>
        <tr>
          <td>THERAPY TYPE</td>
          <td>{therapyType}</td>
        </tr>
        <tr>
          <td>THERAPIST</td>
          <td>{therapist}</td>
        </tr>
        <tr>
          <td>MINUTES</td>
          <td>{minutes}</td>
        </tr>
        <tr>
          <td>INR</td>
          <td>{price}</td>
        </tr>
        <tr>
          <td>QUANTITY</td>
          <td>
            <Form.Check
              name={code}
              type="checkbox"
              id={code}
              custom
              onChange={handleSelection}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default GiftInfo;
