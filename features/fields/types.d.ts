import { Views } from "./enums";
import type { Record as BasetoolRecord } from "@/features/records";

export type FieldType =
  | "Id"
  | "Text"
  | "Number"
  | "Boolean"
  | "DateTime"
  | "Select"
  | "Textarea"
  | "Json"
  | "Association"
  | "ProgressBar"
  | "Gravatar";

export type ForeignKey = {
  /* eslint-disable camelcase */
  table_schema: string;
  constraint_name: string;
  table_name: string;
  column_name: string;
  foreign_table_schema: string;
  foreign_table_name: string;
  foreign_column_name: string;
  /* eslint-enable camelcase */
};

export type BaseOptions = {
  visibility: Views[];
  nullable: boolean;
  nullValues: any[];
  required: boolean;
  readonly: boolean;
  placeholder: string;
  help: string;
  label: string;
  disconnected: boolean;
  defaultValue: string;
  orderIndex?: number;
  computed: boolean;
  computedSource: string;
  backgroundColor: string;
};

export type Column<
  DataSourceColumnInfo = Record<string, unknown>,
  FieldColumnOptions = Record<string, unknown>
> = {
  name: string; // machine name
  label: string; // Human readable name
  fieldType: FieldType;
  primaryKey?: boolean;

  baseOptions: BaseOptions;
  dataSourceInfo?: DataSourceColumnInfo;
  fieldOptions: FieldColumnOptions;
  foreignKeyInfo?: ForeignKeyInfo;
};

export type FieldValue = string | number | undefined | boolean;

export type Field = {
  value: FieldValue;
  column: Column;
  record: BasetoolRecord;
  tableName: string;
};

export type EditFieldProps = {
  field: Field;
  formState: any;
  register: any;
  schema?: AnySchema;
  setValue?: (name: string, value: unknown, config?: unknown) => void;
  view?: Views;
};
