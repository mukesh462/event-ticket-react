import dayjs from "dayjs";
import React from "react";
import QRCode from "react-qr-code";

function ViewTicket() {
  return (
    <div className="min-h-screen flex justify-start mt-10 items-center flex-col">
      <h1 className="text-2xl font-bold mb-5">Register Tickets</h1>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Phone
              </th>
              <th scope="col" class="px-6 py-3">
                Qr code
              </th>
              <th scope="col" class="px-6 py-3">
                Booked Date
              </th>
            </tr>
          </thead>
          <tbody className="text-black">
            <tr class="bg-white border-b  border-gray-200">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">
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
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={"text"}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </td>
              <td class="px-6 py-4">
             {dayjs().format('DD-MM-YYYY')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewTicket;
