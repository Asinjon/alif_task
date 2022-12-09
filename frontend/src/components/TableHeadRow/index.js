import React from 'react';
import {useSelector} from "react-redux";

export default function TableHeadRow() {
  const data = useSelector(state => state.comments.data);
  return (
    <tr>
      {data.length > 0 && Object.keys(data[0]).map(key => {
        return <th key={key}>{key}</th>
      })}
    </tr>
  )
}
