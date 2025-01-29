import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/logo-event.png";
import { ScanQrCode, ShieldCheck, SquareUserRound } from "lucide-react";
import TableList from "./Table";
import QRCode from "react-qr-code";
import dayjs from "dayjs";
import ModalView from "./Model";

import QRReaderWithHtml5Qrcode from "./QrReader";
import useApi from "./useApi";
import toast from "react-hot-toast";
import KeyValueTable from "./TableDetails";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Statistic } from "antd";
function Admin() {
  const apiUrl = "getAllTicket"; // Replace with your actual API URL
  const [modelOpen, setmodelOpen] = useState(false);
  const [QrReader, setQrReader] = useState(false);
  const [QrReaderView, setQrReaderView] = useState(false);
  const [ticketData, setticketData] = useState(null);
  const [tableData, setTableData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      navigate("/login");
    }
  }, []);

  const { request } = useApi();
  const [data, setdata] = useState({});
  const config = [
    {
      colname: "Name",
      sortable: true,
      className: "",
      data: "name",
    },
    {
      colname: "Qr",
      sortable: false,
      className: "",
      data: "ticket_code",
      render: (batch) => (
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: 100,
            width: "100%",
            textAlign: "center",
          }}
          onClick={() => setmodelOpen(true)}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={batch.ticket_code}
            viewBox={`0 0 256 256`}
          />
        </div>
      ),
    },
    {
      colname: "Email",
      sortable: true,
      className: "",
      data: "email",
      render: (batch) => <p className="badge badge-warning">{batch.email}</p>,
    },
    {
      colname: "Mobile",
      sortable: false,
      className: "",
      data: "phone",
    },
    {
      colname: "Seat No",
      sortable: false,
      className: "",
      data: "seat_no",
    },
    {
      colname: "Age",
      sortable: true,
      className: "",
      data: "age",
    },
    {
      colname: "dob",
      sortable: false,
      className: "",
      data: "dob",
      render: (e) => <span>{e.dob}</span>,
    },
    {
      colname: "Admit Status",
      sortable: false,
      className: "",
      data: "admit_status",
      render: (val) =>
        val.admit_status == 1 ? (
          <span className="bg-green-400 text-white p-2  font-bold rounded-md">
            Admit
          </span>
        ) : (
          <span className="bg-red-400 text-white p-2 font-bold rounded-md">
            Open
          </span>
        ),
    },
    {
      colname: "Booking Date",
      sortable: false,
      className: "",
      data: "booking_date",
      render: (batch) => (
        <p className="">{dayjs(batch?.booking_date).format("DD-MM-YYYY")}</p>
      ),
    },
  ];
  const tableRef = useRef();

  const handleRowSelect = (data) => {
    setdata(data);
    // Add your logic for handling row clicks
  };
  const handleQr = async (data) => {
    setQrReader(false);
    setQrReaderView(true);
    try {
      const response = await request("post", "get-ticket", {
        ticket_code: data,
      });
      if (response.status) {
        toast.success(response.message);
        setticketData(response.data);
      } else {
        setQrReaderView(false);
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const changeStatus = async () => {
    try {
      setticketData(null);
      const response = await request("post", "statusChange", {
        ticket_code: ticketData?.ticket_code,
      });
      if (response.status) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      handleRefresh();
      setQrReader(false);
      setQrReaderView(false);
    } catch (error) {
      toast.error(error);
    }
  };
  const handleRefresh = () => {
    // console.log(tableRef.current)
    if (tableRef.current) {
      tableRef.current.useRefresh();
    }
  };
  return (
    <div className="min-h-screen bg-[#FFE4D6]">
      <div className="header bg-white flex justify-between items-center px-2 ">
        <img
          src={Logo}
          alt="Parambodil Foundation"
          width={70}
          height={70}
          className="object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div>
          <ScanQrCode
            className="h-10 w-10 text-[#F85C2C] cursor-pointer"
            onClick={() => setQrReader(true)}
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="m-3">
          <Row gutter={16}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Enrolled"
                  value={tableData?.total_ticket}
                  valueStyle={{
                    color: "#3f8600",
                  }}
                  prefix={<SquareUserRound />}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Admitted"
                  value={tableData?.admit_ticket}
                  prefix={<ShieldCheck />}
                  valueStyle={{
                    color: "#1677ff",
                  }}
                />
              </Card>
            </Col>
          </Row>
        </div>
        <TableList
          title="Ticket "
          apiUrl={apiUrl}
          config={config}
          onClickRow={handleRowSelect}
          ref={tableRef}
          useData={setTableData}
        />
      </div>
      <ModalView
        className={
          " flex w-[50%] justify-center items-center flex-col h-[50%] p-5 bg-white"
        }
        title={"View Qr"}
        isOpen={modelOpen}
        closeModal={() => setmodelOpen(!modelOpen)}
      >
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            width: "100%",
            maxWidth: 200,
            textAlign: "center",
          }}
          className="bg-white m-5 "
        >
          <QRCode
            size={200}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={data?.ticket_code}
            viewBox={`0 0 256 256`}
          />
        </div>
      </ModalView>
      <QRReaderWithHtml5Qrcode
        isOpen={QrReader}
        onClose={() => setQrReader(!QrReader)}
        callback={handleQr}
      />
      <ModalView
        className={
          " flex w-full  md:w-[70%] justify-center items-center flex-col md:h-[50%] p-5 "
        }
        title={null}
        isOpen={QrReaderView}
        closeModal={() => setQrReaderView(!QrReaderView)}
      >
        {ticketData == null ? (
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <div>
            <KeyValueTable data={ticketData} close={setQrReaderView} />
            <div className="flex justify-center items-center mb-5">
              <button
                disabled={ticketData?.admit_status == 1}
                className={`text-white ${
                  ticketData?.admit_status == 0 ? "bg-green-400" : "bg-gray-400"
                }  px-5 py-2 rounded-md`}
                onClick={changeStatus}
              >
                {" "}
                {ticketData?.admit_status == 0 ? "Admit" : "Already Admitted"}
              </button>
            </div>
          </div>
        )}
      </ModalView>
    </div>
  );
}

export default Admin;
