import { Table, TableProps } from "antd";
import { SearchProps } from "antd/es/input";
import Search from "antd/es/input/Search";
import cloneDeep from "lodash/cloneDeep";
import React, { CSSProperties, memo, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface CoolTableProps<T extends object> extends TableProps<T> {
  children?: ReactNode;
  rowSelection?: TableProps<T>["rowSelection"] & {
    rowKey: TableProps<T>["rowKey"];
  };
  /**
   * 搜索框配置
   */
  searchConfig?: {
    /**需要进行搜索的列 */
    searchColumn: Array<keyof T>;
    /**antd的Search组件属性 */
    componentProps?: Omit<SearchProps, "onSearch">;
    /**搜索框位置 */
    position?: "left" | "right";
    /**配置搜索框宽度，外边距 */
    style?: Pick<CSSProperties, "margin" | "width">;
  };
}
const CoolTable = function <T extends object>(props: CoolTableProps<T>) {
  const [data, setData] = useState(cloneDeep(props.dataSource));

  // 搜索方法
  const [searchValue, setSearchValue] = useState("");
  const searchProps: SearchProps | undefined = props.searchConfig && {
    ...props.searchConfig?.componentProps,
    value: searchValue,
    onChange: (e) => {
      setSearchValue(e.target.value);
    },
    onSearch: (value) => {
      const newData = props.dataSource?.filter((record) => {
        return props.searchConfig?.searchColumn.some((key) =>
          String(record[key]).toLowerCase().includes(value.toLowerCase())
        );
      });
      setData(newData);
    },
  };
  useEffect(() => {
    searchProps?.onSearch?.(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataSource]);

  const tableProps: TableProps<T> = {
    dataSource: data,
    rowKey: props.rowSelection?.rowKey,
  };

  return (
    <div style={{ position: "relative" }}>
      {/* 搜索框 */}
      {props.searchConfig && (
        <div
          style={{
            float: props.searchConfig.position || "right",
            width: 200,
            zIndex: 1,
            position: "relative",
            ...props.searchConfig.style,
          }}
        >
          <Search {...searchProps}></Search>
        </div>
      )}
      {/* 表格 */}
      <Table {...props} {...tableProps}></Table>
    </div>
  );
};

export default memo(CoolTable) as typeof CoolTable;
