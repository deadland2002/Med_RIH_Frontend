import React from "react";
import Layout from "../../../../../components/account/doctor/Layout";
import axios from "axios";

export async function getServerSideProps(context) {
  const TOKEN = context.req.cookies["TOKEN"];
  const { query } = context;

  if (TOKEN && query && query.id) {
    const res = await axios.post("http://localhost:2000/api/user/Appointment", {
      token: TOKEN,
      ID : query.id
    });
    console.log(res.data);
    return {
      props: {
        data: query.id,
      },
    };
  }

  return {
    redirect: {
      permanen: false,
      destination: "/SignIn",
    },
  };
}

const DynamicViewer = ({ data }) => {
  return <Layout>{data}</Layout>;
};

export default DynamicViewer;
