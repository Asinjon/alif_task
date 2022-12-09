import React from 'react';
import {useSelector} from "react-redux";

export default function TableBodyRow() {
  const data = useSelector(state => state.comments.data);
  return (
    <>
        {data.length > 0 && Object.keys(data).map(value => {
          return (
            <tr key={value}>
              { Object.keys(data[value]).map(key => {
                return <td key={data[value][key]}>{data[value][key]}</td>
              }) }
            </tr>
            );
        })}
    </>
  )
}
