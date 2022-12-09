import React from 'react';
import TableHeadRow from '../TableHeadRow';
import TableBodyRow from '../TableBodyRow';
import "./style.css";

export default function Table() {
  return (
    <div className='data-table'>
        <div className="container">
          <table>
            <TableHeadRow />
            <TableBodyRow />
          </table>
        </div>
    </div>
  )
}
