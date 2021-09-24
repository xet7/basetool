import { Field } from '../../types'
import { ReactNode, memo } from 'react'

const IndexFieldWrapper = ({
  children,
}: {
  field: Field;
  children: ReactNode;
}) => (
  <div className="py-2 leading-tight whitespace-no-wrap overflow-hidden overflow-ellipsis">
    {children}
  </div>
)

export default memo(IndexFieldWrapper)
