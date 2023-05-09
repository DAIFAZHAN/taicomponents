import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import CoolTable, { CoolTableProps } from "../../components/table/CoolTable";
import { columns, data } from "./data";
import type { DataType } from "./data";
import { Button, Select } from "antd";
import EditableCoolTable from "../../components/table/EditableCoolTable";
import EditableRowTable from "../../components/table/EditableRowTable";
import EditableRowExample from "./EditableRowExample";

interface IProps {
  children?: ReactNode;
}

const TableExample: FC<IProps> = () => {
  /**配置搜索 */
  const searchConfig: CoolTableProps<DataType>["searchConfig"] = {
    searchColumn: ["name", "age"],
    componentProps: {
      allowClear: true,
    },
    position: "left",
    style: {
      margin: "0 0 0 120px",
    },
  };

  /**配置选择 */
  const [selectedRowKeys, setSelectRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const rowSelection: CoolTableProps<DataType>["rowSelection"] = {
    type: "checkbox",
    preserveSelectedRowKeys: true, // 用于搜索框搜索改变数据后仍保留选择值
    selectedRowKeys,
    setSelectRowKeys,
    setSelectedRows,
  };
  const setSelectedRowNone = () => {
    setSelectRowKeys([]);
    setSelectedRows([]);
  };
  useEffect(() => {
    console.log("selected", selectedRowKeys, selectedRows);
  }, [selectedRows, selectedRowKeys]);

  const [dataSource, setDataSource] = useState<DataType[]>([...data]);

  const tableProps: CoolTableProps<DataType> = {
    rowKey: "age",
    dataSource,
    columns,
    searchConfig,
    rowSelection,
  };

  return (
    <div style={{ position: "relative" }}>
      {/* <div style={{ position: "absolute", zIndex: 1 }}>
        <Select></Select>
      </div>
      <div style={{ position: "absolute", zIndex: 1, right: 0 }}>
        <Button onClick={setSelectedRowNone}>重置勾选</Button>
        <Button onClick={() => setDataSource([...data])}>刷新数据</Button>
      </div> */}
      <CoolTable {...tableProps} />
      <EditableRowExample />
      <EditableCoolTable />
    </div>
  );
};

export default memo(TableExample);
