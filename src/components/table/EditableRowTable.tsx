import React from "react";
import { Form, FormInstance, Input, InputNumber } from "antd";
import CoolTable, { CoolTableProps } from "./CoolTable";
import { ColumnType } from "antd/es/table";
import { Rule } from "antd/es/form";

interface EditableRowTableProps<RecordType extends object>
  extends CoolTableProps<RecordType> {
  rowKey: keyof RecordType & string;
  form: FormInstance<any>;
  isRowEditing: (record: RecordType) => boolean;
  columns: (ColumnType<RecordType> & MoreColumnType)[];
}
type InputType = "text" | "number" | "select";
interface MoreColumnType {
  editable?: boolean;
  validateRules?: Rule[];
  inputType?: InputType;
}
const EditableRowTable = function <T extends object>(
  props: EditableRowTableProps<T>
) {
  const mergedColumns = props.columns?.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: T) => ({
        record,
        inputType: col.inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: props.isRowEditing(record),
        validateRules: col.validateRules,
      }),
    };
  });

  const tableProps: CoolTableProps<T> = {
    rowKey: props.rowKey,
    components: {
      body: {
        cell: EditableCell,
      },
    },
    columns: mergedColumns as ColumnType<T>[],
    rowClassName: "editable-row",
  };
  return (
    <Form form={props.form} component={false}>
      <CoolTable {...props} {...tableProps}></CoolTable>
    </Form>
  );
};

interface EditableCellProps<RecordType>
  extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  validateRules: Rule[];
  dataIndex: string;
  title: any;
  inputType: InputType;
  record: RecordType;
  index: number;
  children: React.ReactNode;
}

const EditableCell = function <Record>({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  validateRules,
  ...restProps
}: EditableCellProps<Record>) {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={
            validateRules || [
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]
          }
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableRowTable;
