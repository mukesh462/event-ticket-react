import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function ViewTicket() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const ticket = JSON.parse(localStorage.getItem("tickets"));
    setdata(ticket ?? [])
  }, []);

  return (
    <div className="min-h-screen flex justify-start mt-10 items-center flex-col">
    <h1 className="text-2xl font-bold mb-5">Register Ticket</h1>
    <div className="overflow-x-auto bg-[#FFE4D6] shadow-md rounded-lg">
      <table className="w-full table-auto">
        <thead className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
          <tr className="hidden md:table-row">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-left">QR Code</th>
            <th className="py-3 px-6 text-left">Booked Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.length > 0 ? (
            data.map((e) => (
              <tr
                className="border-b border-gray-200  md:table-row flex flex-col mb-4 md:mb-0"
                key={e.ticket_code}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap md:table-cell block">
                  <div className="md:hidden font-bold mb-1">Name:</div>
                  <span className="font-medium">{e.name}</span>
                </td>
                <td className="py-3 px-6 text-left md:table-cell block">
                  <div className="md:hidden font-bold mb-1">Email:</div>
                  <span>{e.email}</span>
                </td>
                <td className="py-3 px-6 text-left md:table-cell block">
                  <div className="md:hidden font-bold mb-1">Phone:</div>
                  <span>{e.phone}</span>
                </td>
                <td className="py-3 px-6 text-left md:table-cell block">
                  <div className="md:hidden font-bold mb-1">QR Code:</div>
                  <div
                    style={{
                      height: "auto",
                      margin: "0 auto",
                      maxWidth: 64,
                      width: "100%",
                    }}
                  >
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={e.ticket_code}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </td>
                <td className="py-3 px-6 text-left md:table-cell block">
                  <div className="md:hidden font-bold mb-1">Booked Date:</div>
                  <span>{dayjs(e.booking_date).format("DD-MM-YYYY")}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b border-gray-200">
              <td colSpan={2}></td>
              <td
                colSpan={2}
                className="text-[#F85C2C] font-bold px-6 py-4 whitespace-nowrap text-center"
              >
                No Ticket Register
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  
  );
}

export default ViewTicket;
