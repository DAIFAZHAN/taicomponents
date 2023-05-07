import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import CoolTable, { CoolTableProps } from "../../components/table/CoolTable";
import { columns, data } from "./data";
import type { DataType } from "./data";

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
  };

  /**配置选择 */
  const [selectRowKeys, setSelectRowKeys] = useState<React.Key[]>([]);
  const [selectRows, setSelectRows] = useState<DataType[]>([]);
  const rowSelection: CoolTableProps<DataType>["rowSelection"] = {
    type: "checkbox",
    rowKey: "age",
    selectRowKeys,
    setSelectRowKeys,
    setSelectRows,
  };
  useEffect(() => {
    console.log("selected", selectRowKeys, selectRows);
  }, [selectRows, selectRowKeys]);

  const tableProps = {
    dataSource: data,
    columns,
    searchConfig,
    rowSelection,
  };

  return <CoolTable {...tableProps} />;
};

export default memo(TableExample);
