import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AddSales } from "src/components/sales/add-sales";
import dynamic from "next/dynamic";
import { SalesReportForm } from "src/components/reporting/sales-report-form";
import { useContext, useEffect } from "react";
import { getSalesReport } from "src/statesManagement/store/actions/reportingActions/sales-report-action";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";
import { getStores } from "src/statesManagement/store/actions/store-outlet-action";
import { getProduct } from "src/statesManagement/store/actions/product-action";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const SalesReport = () => {
  const { dispatch, state } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Head>
        <title>Sales Report| 18A Nigerial Limited</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <DynamicComponentWithNoSSR />
        <Container maxWidth={true}>
          <SalesReportForm />
        </Container>
      </Box>
    </>
  );
};

SalesReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SalesReport;
