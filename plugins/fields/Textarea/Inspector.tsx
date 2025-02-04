import { Column } from "@/features/fields/types";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import OptionWrapper from "@/features/tables/components/OptionsWrapper";
import React, { useEffect } from "react";
import fieldOptions from "./fieldOptions";

function Inspector({
  column,
  setColumnOptions,
}: {
  column: Column;
  setColumnOptions: (c: Column, options: Record<string, unknown>) => void;
}) {
  const defaultValue = fieldOptions.rows ? fieldOptions.rows : 5;
  const initialValue = column.fieldOptions.rows
    ? column.fieldOptions.rows
    : defaultValue;

  // when changing the field type to this one, the new options are not automatically passed to the column
  useEffect(() => {
    setColumnOptions(column, { "fieldOptions.rows": initialValue });
  }, []);

  return (
    <OptionWrapper helpText="Choose how tall should the input be.">
      <FormControl id="rows">
        <FormLabel>Rows</FormLabel>
        <Input
          type="number"
          name="rows"
          placeholder="Rows"
          required={false}
          defaultValue={initialValue as number}
          onChange={(e) => {
            setColumnOptions(column, {
              "fieldOptions.rows":
                parseInt(e.currentTarget.value) > 0
                  ? parseInt(e.currentTarget.value)
                  : initialValue,
            });
          }}
        />
      </FormControl>
    </OptionWrapper>
  );
}

export default Inspector;
