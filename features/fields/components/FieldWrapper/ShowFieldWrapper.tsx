import { Field } from "../../types";
import { ReactNode, memo, useMemo } from "react";
import { getColumnNameLabel, iconForField } from "../..";
import { isEmpty, isNull, isUndefined } from "lodash";
import { useResponsive } from "@/hooks";

const ShowFieldWrapper = ({
  field,
  children,
  extra,
}: {
  field: Field;
  children: ReactNode;
  extra?: ReactNode;
}) => {
  const prettyColumnName = getColumnNameLabel(field?.column?.baseOptions?.label, field?.column?.label, field?.column?.name);

  const IconElement = useMemo(
    () => iconForField(field.column),
    [field.column.fieldType]
  );

  const { isMd } = useResponsive();
  const showExtra = useMemo(() => {
    if (isMd) {
      return true;
    } else {
      return !isUndefined(extra) && !isNull(extra) && !isEmpty(extra);
    }
  }, [isMd, extra]);

  return (
    <div className="flex flex-col md:flex-row border-b md:min-h-16 py-2 md:py-0 space-y-3 md:space-y-0">
      <div className="w-full md:w-48 lg:w-64 xl:w-64 px-4 md:px-6 flex items-start space-x-2">
        <div className="flex items-center space-x-2 md:min-h-16 md:py-4">
          <IconElement className="h-4 self-start mt-1 lg:self-center lg:mt-0 inline-block flex-shrink-0" />{" "}
          <span>{prettyColumnName}</span>
        </div>
      </div>
      <div className="flex-2 xl:flex-1 flex flex-row">
        <div className="w-full px-4 md:py-4 self-center">{children}</div>
      </div>
      {showExtra && <div className="flex-1 py-4">{extra}</div>}
    </div>
  );
};

export default memo(ShowFieldWrapper);
