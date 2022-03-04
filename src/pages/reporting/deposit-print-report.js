import Head from "next/head";
import { Box, Button, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";

import dynamic from "next/dynamic";
import PrintingHeader from "src/components/printingPage/printing-header";
import DenseTable from "src/components/printingPage/sales-report-table";
import { withRouter } from "next/router";
import { useContext, useRef } from "react";
import { Store } from "src/statesManagement/store/store";
import ReactToPrint from "react-to-print";
import BasicTable from "src/components/printingPage/deposit-report-table";

// import PrintingHeader from "src/components/printingPage/printing-header";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const DepositPrintReport = (props) => {
  const { state } = useContext(Store);
  const { depositReport } = state;
  const printRef = useRef();
  const { router } = props;
  const startDate = new Date(router?.query?.from)
  const endDate = new Date(router?.query?.to)

function convert(date) {
  var date = new Date(date),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

  return (
    <>
      <Head>
        <title>Reporting| Binfat Computer Technology</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container ref={printRef} maxWidth={true}>
          <PrintingHeader
            title={`Deposit Report at ${router.query.branch} Between ${convert(startDate)} and ${convert(endDate)}`}
          />
          <BasicTable depositReport={depositReport} />
        </Container>
        <Container
          sx={{
            display: "flex",
            mt: 4,
            justifyContent: "flex-end",
          }}
        >
          <ReactToPrint
            trigger={() => (
              <Button variant="contained" color="primary">
                Print Report
              </Button>
            )}
            content={() => printRef.current}
          />
        </Container>
      </Box>
    </>
  );
};

DepositPrintReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default withRouter(DepositPrintReport);
