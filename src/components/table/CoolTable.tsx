import { Table } from "antd";
import type { TableProps } from "antd";
import type { SearchProps } from "antd/es/input";
import Search from "antd/es/input/Search";
import cloneDeep from "lodash/cloneDeep";
import React, { memo, useEffect, useState } from "react";
import type { ReactNode, CSSProperties, Dispatch, SetStateAction } from "react";
export interface CoolTableProps<T extends object> extends TableProps<T> {
  children?: ReactNode;
  /**
   * 选择配置
   */
  rowSelection?: Omit<
    NonNullable<TableProps<T>["rowSelection"]>,
    "onChange" | "getCheckboxProps"
  > & {
    /**配置单选/多选 */
    type: "checkbox" | "radio";
    /**配置唯一key值 */
    rowKey: keyof T & string;
    /**配置已选中项 */
    selectRowKeys: React.Key[];
    /**传入更改选中项key方法 */
    setSelectRowKeys?: React.Dispatch<React.SetStateAction<React.Key[]>>;
    /**传入更改选中项record方法 */
    setSelectRows?: Dispatch<SetStateAction<T[]>>;
    /**配置不可选条件 */
    disabled?: (record: T) => boolean;
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

  // 勾选选择
  const rowSelection = props.rowSelection && {
    onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => {
      props.rowSelection?.setSelectRowKeys?.(selectedRowKeys);
      props.rowSelection?.setSelectRows?.(selectedRows);
    },
    getCheckboxProps: (record: T) => ({
      disabled: props.rowSelection?.disabled?.(record), // Column configuration not to be checked
    }),
    ...props.rowSelection,
  };

  const tableProps: TableProps<T> = {
    dataSource: data,
    rowKey: props.rowSelection?.rowKey,
    rowSelection,
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
