import React from "react";
import "./Table.css";

const Table = () => {
  const arr = [
    [{ title: '首页' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
    [{ title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
    [{ title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
    [{ title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
    [{ title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
    [{ title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
    [{ title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
    [{ title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
    [{ title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
    [{ title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
    [{ title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
    [{ title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
    [{ title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' }, { title: '名称' },],
  ]

  return (
    <div className="table-container">
      <table>
        <tbody>
          {arr.map(i => {
            return (
              <tr>
                {i.map(k => <td>
                  <div className="td-content">
                    {k.title}
                  </div>
                </td>)}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table;