import { first, isNull } from "lodash";
import { useDataSourceContext } from "@/hooks";
import { useGetDataSourceQuery } from "@/features/data-sources/api-slice";
import { useGetTablesQuery } from "@/features/tables/api-slice";
import GoogleSheetsSetup from "@/components/GoogleSheetsSetup";
import Layout from "@/components/Layout";
import LoadingOverlay from "@/components/LoadingOverlay";
import PageWrapper from "@/components/PageWrapper";
import React, { useMemo } from "react";
import isEmpty from "lodash/isEmpty";

function DataSourcesShow() {
  const { dataSourceId } = useDataSourceContext();
  const { data, error, isLoading } = useGetTablesQuery(
    { dataSourceId },
    { skip: !dataSourceId }
  );
  const { data: dataSourceResponse } = useGetDataSourceQuery(
    { dataSourceId },
    {
      skip: !dataSourceId,
    }
  );

  const showSetup = useMemo(
    () => isNull(dataSourceResponse?.data?.options?.spreadsheetId),
    [dataSourceResponse?.data?.options?.spreadsheetId]
  );

  return (
    <Layout>
      {isLoading && <LoadingOverlay transparent={isEmpty(data?.data)} />}
      {error && (
        <div>
          Error: {"data" in error && first((error?.data as any)?.messages)}
        </div>
      )}
      {!isLoading && data?.ok && (
        <>
          {showSetup && <GoogleSheetsSetup />}
          {showSetup || (
            <PageWrapper heading={dataSourceResponse?.data?.name}>
              <>👈 &nbsp;Select a table to get started.</>
            </PageWrapper>
          )}
        </>
      )}
    </Layout>
  );
}

export default DataSourcesShow;
