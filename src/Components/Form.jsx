import { useState } from "react";
import * as Yup from "yup";
import bgImage from "../assets/bg-event.png";
import Logo from "../assets/logo-event.png";
import { DateInput, InputField, makeId, SelectField } from "./Fields";
import { CirclePlus, CircleX, UserRoundPen } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useApi from "./useApi";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const initForm = {
    name: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    occupation: "",
    email: "",
    phone: "",
    source: "",
  };
  const [formValues, setFormValues] = useState(initForm);
  const [isEdit, setisEdit] = useState(false);
  const { request } = useApi();
  const [errors, setErrors] = useState({});
  const [persons, setPersons] = useState([]);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    dob: Yup.string().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string().required("Pincode is required"),
    country: Yup.string().required("Country is required"),
    occupation: Yup.string().required("Occupation is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    source: Yup.string().required("This field is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValidation = async () => {
    try {
      await validationSchema.validateSync(formValues, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      // console.log(errors);
      setErrors(errors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitForm = async (tickets) => {
      Swal.fire({
        title: "Submitting...",
        text: "Please wait while we process your request.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const apiResponse = await request("post", "buy-ticket", { tickets });
        if (apiResponse.status) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            allowOutsideClick: false,
            allowEscapeKey: false,
            text: "Form submitted successfully.",
          }).then((e) => {
            if (e.isConfirmed) {
              setFormValues(initForm);
              setPersons([]);
              localStorage.setItem("tickets", JSON.stringify(apiResponse.data));
              navigate("/viewTicket");
            }
          });
          // console.log("API Response:", apiResponse);
        } else {
          const errorMessage = apiResponse.duplicates
            ? `${apiResponse.message}\n${apiResponse.duplicates.toString()}`
            : "Something went wrong. Please try again later.";
          Swal.fire({
            icon: "error",
            title: "Submission Failed",
            text: errorMessage,
          });
          toast.error(apiResponse.message);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Something went wrong. Please try again later.",
        });
        console.error("API Call Failed:", error);
      }
    };

    const confirmSubmission = async (tickets) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to submit this form?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, submit it!",
        cancelButtonText: "Cancel",
      });
      if (result.isConfirmed) {
        await submitForm(tickets);
      }
    };

    if (persons.length > 0) {
      await confirmSubmission(persons);
    } else if (await handleValidation()) {
      await confirmSubmission([formValues]);
    }
  };

  const addPerson = async () => {
    if (await handleValidation()) {
      // const existEmail = persons.find((e) => e.email == formValues.email);

      // if (existEmail) {
      //   toast.error("Email Already Exist");
      //   return;
      // }
      setPersons([...persons, { ...formValues, id: makeId() }]);
      setFormValues(initForm);
      toast.success("Person added");
    }
    return;
  };
  const clearError = (e) => {
    const field = e.target.name;
    setErrors({ ...errors, [field]: null });
  };
  const handleDateChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleEditPerson = (e) => {
    setFormValues(e);
    setisEdit(true);
  };
  const updatePerson = async () => {
    if (await handleValidation()) {
      // const existEmail = persons.find(
      //   (e) => e.email == formValues.email && e.id != formValues.id
      // );
      // console.log(existEmail, formValues, "daada");
      // if (existEmail) {
      //   toast.error("Email Already Exist");
      //   return;
      // }
      const removePerson = persons.filter((e) => e.id != formValues.id);
      setPersons([...removePerson, formValues]);
      setFormValues(initForm);
      setisEdit(false);
      toast.success("Person details updated");
    }
    return;
  };
  const cancelEdit = () => {
    setisEdit(false);
    setErrors({});
    setFormValues(initForm);
  };
  const handleDeletePerson = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setPersons(persons.filter((person) => person.id !== id));
        Swal.fire("Deleted!", "The person has been removed.", "success");
      }
    });
  };
  const tickets = JSON.parse(localStorage.getItem("tickets")) ?? null;
  return (
    <div
      className="min-h-screen p-5 flex justify-center items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg p-1 md:p-8 relative overflow-hidden">
        {/* Header */}
        <div className="flex  justify-center md:justify-between items-center gap-3 mb-8">
          <div>
            <img
              src={Logo}
              alt="Parambodil Foundation"
              className="object-contain h-[60px] md:h-[70px]"
            />
          </div>
          <div className="text-center md:flex-1">
            <h1 className="text-xl md:text-4xl font-bold text-[#F85C2C]">
              Thaipoosam Event
            </h1>
            <h2 className="text-lg md:text-2xl md:mt-2 text-gray-600 pb-3 border-b-3 border-[#F85C2C] inline-block px-4">
              Registration Form
            </h2>
          </div>
          <div className=" md:block">
            {tickets != null ? (
              <button
                className="bg-[#F85C2C] text-white rounded-sm p-1"
                onClick={() => navigate("/viewTicket")}
              >
                Ticket
              </button>
            ) : null}
          </div>{" "}
          {/* Spacer for alignment */}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6 md:p-4 pt-0 mx-10 rounded-lg relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-content-baseline">
              <InputField
                label="Name"
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleChange}
                onBlur={clearError}
                error={errors.name}
              />

              <DateInput
                label="DOB"
                name="dob"
                placeholder="21/05/2000"
                onChange={(value) => handleDateChange("dob", value)}
                error={errors.dob}
                value={formValues.dob}
              />
              <SelectField
                label="Gender"
                name="gender"
                value={formValues.gender}
                onChange={handleChange}
                error={errors.gender}
                onBlur={clearError}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Address"
                name="address"
                type="text"
                value={formValues.address}
                onChange={handleChange}
                error={errors.address}
                onBlur={clearError}
              />
              <InputField
                label="City"
                name="city"
                type="text"
                value={formValues.city}
                onChange={handleChange}
                error={errors.city}
                onBlur={clearError}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="State"
                name="state"
                type="text"
                value={formValues.state}
                onChange={handleChange}
                onBlur={clearError}
                error={errors.state}
              />
              <InputField
                label="Pincode / Zip"
                name="pincode"
                type="text"
                value={formValues.pincode}
                onChange={handleChange}
                error={errors.pincode}
                onBlur={clearError}
              />
              <InputField
                label="Country"
                name="country"
                type="text"
                value={formValues.country}
                onChange={handleChange}
                error={errors.country}
                onBlur={clearError}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Specify Your Occupation"
                name="occupation"
                type="text"
                value={formValues.occupation}
                onChange={handleChange}
                error={errors.occupation}
                onBlur={clearError}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                error={errors.email}
                onBlur={clearError}
              />
              <InputField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formValues.phone}
                onChange={handleChange}
                error={errors.phone}
                onBlur={clearError}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
              <InputField
                label="How do you come to know about Thaipoosam Event"
                name="source"
                type="text"
                value={formValues.source}
                onChange={handleChange}
                onBlur={clearError}
                error={errors.source}
              />
              <button
                type="button"
                onClick={addPerson}
                className="text-[#F85C2C] flex items-center gap-2 hover:text-orange-700"
              >
                <CirclePlus /> Add Another Person
              </button>
            </div>
          </div>
          {persons.length > 0 && (
            <div className="">
              <div className="text-center">
                <h2 className="text-2xl mt-2 text-center text-gray-600 pb-3 border-b-3 border-[#F85C2C] inline-block px-4">
                  No of Registrations{" "}
                  <span className="bg-[#F85C2C] p-1 text-white rounded-lg px-2 text-sm font-bold">
                    {persons.length}
                  </span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 my-6">
                {persons.map((e, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 flex items-center gap-4  m-1 rounded-full bg-[#F85C2C] text-white`}
                  >
                    <div className="max-w-36 truncate">{e.name}</div>
                    <div className="flex justify-center items-center gap-1">
                      <UserRoundPen
                        className="cursor-pointer"
                        onClick={() => handleEditPerson(e)}
                      />
                      <CircleX
                        className="cursor-pointer"
                        onClick={() => handleDeletePerson(e.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center items-center mb-8 ">
            {isEdit ? (
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={updatePerson}
                  className="bg-[#F85C2C] px-5 text-white cursor-pointer py-2 rounded-lg text-xl font-normal hover:bg-orange-600 transition-colors"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-[#F85C2C] px-5 text-white cursor-pointer py-2 rounded-lg text-xl font-normal hover:bg-orange-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-[#F85C2C] w-[50%] text-white cursor-pointer py-2 rounded-lg text-xl font-normal hover:bg-orange-600 transition-colors"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
