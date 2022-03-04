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
import CollapsibleTable from "src/components/printingPage/profit-loss-report-table";
import Moment from "react-moment";
// import PrintingHeader from "src/components/printingPage/printing-header";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ProfitOrLossPrintReport = (props) => {
  const { state } = useContext(Store);
  const { profitOrLossReport } = state;
  console.log(profitOrLossReport);
  const printRef = useRef();
  const { router } = props;


function convert(date) {
  var date = new Date(date),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

  return (
    <>
      <Head>
        <title>Reporting|Binfat Computer Technology</title>
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
            sx={{
              mb: 4,
            }}
            title={`Profit And Loss Report at ${router.query.branch} Between ${convert( new Date(router?.query?.from))} and ${convert(new Date(router?.query?.to))}`}
          />
          <CollapsibleTable profitOrLossReport={profitOrLossReport} />
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

ProfitOrLossPrintReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default withRouter(ProfitOrLossPrintReport);
