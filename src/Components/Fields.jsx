import { DatePicker } from "antd";
import dayjs from "dayjs";

export const DateInput = ({ label, value, onChange, onBlur, error, name }) => {
  const onChangeFun = (date, dateString) => {
    onChange(dateString); // Pass the formatted date string to the parent
  };

  return (
    <div className="flex flex-col">
      {label && <label className="block text-gray-700">{label}</label>}
      <DatePicker
        onChange={onChangeFun}
        format={"DD-MM-YYYY"}
        className={`w-full px-4 py-2 border rounded-lg h-10 ${
          error
            ? "border-red-500"
            : "!focus:ring-2 !focus:ring-orange-300 !focus:border-orange-300"
        } outline-none`}
        onFocus={onBlur}
        value={value ? dayjs(value, "DD-MM-YYYY") : null} // Correctly set the value
        status={error ? "error" : ""}
        autoComplete="off"
        style={{border: "1px solid black"}}
        placeholder="Select a date"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};


export function makeId() {
  const length = 8;
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
}) => (
  <div>
    <label className="block text-gray-700 ">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full px-4 py-2 border rounded-lg ${
        error
          ? "border-red-500"
          : "focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
      } outline-none`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export const SelectField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
}) => (
  <div>
    <label className="block text-gray-700 ">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full px-4 py-2 border  rounded-lg focus:ring-2 ${
        error
          ? "ring-red-500 border-red-500"
          : "ring-orange-300 border"
      } focus:border-orange-300 outline-none`}
    >
      <option value="">Select Gender</option>
      <option value="M">Male</option>
      <option value="F">Female</option>
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
