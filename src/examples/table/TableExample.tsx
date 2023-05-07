import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import CoolTable, { CoolTableProps } from "../../components/table/CoolTable";
import { columns, data } from "./data";
import type { DataType } from "./data";

interface IProps {
  children?: ReactNode;
}

const TableExample: FC<IProps> = () => {
  const searchConfig: CoolTableProps<DataType>["searchConfig"] = {
    searchColumn: ["name", "age"],
    componentProps: {
      allowClear: true,
    },
  };
  return (
    <CoolTable
      dataSource={data}
      columns={columns}
      searchConfig={searchConfig}
    />
  );
};

export default memo(TableExample);
