import Head from "next/head";
import { Box, Button, Container, Grid, Pagination, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Download as DownloadIcon } from "src/icons/download";
import { Upload as UploadIcon } from "src/icons/upload";
import PurchaseList from "src/components/purchases/purchase-lists";
import SupplierLedgerList from "src/components/purchases/supplier-ledger-lists";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ManageSupplierLists = () => (
  <>
    <Head>
      <title>Supplier Ledger Lists| Binfat Computer Technology</title>
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
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            Lists Of Suppliers Ledgers
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
              Home
            </Button>
            <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
              Manage Suppliers
            </Button>
          </Box>
        </Box>
        <Box sx={{ pt: 3 }}>
          <SupplierLedgerList />
        </Box>
      </Container>
    </Box>
  </>
);

ManageSupplierLists.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ManageSupplierLists;
