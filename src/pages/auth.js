import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/auth/Login"), {
  ssr: false,
});

const Auth = () => {
  // const [stores, setstores] = useState([]);

  return (
    <>
      <Head>
        <title>Login | Binfat Computer Technology</title>
      </Head>
      <DynamicComponentWithNoSSR />
    </>
  );
};

export default Auth;
