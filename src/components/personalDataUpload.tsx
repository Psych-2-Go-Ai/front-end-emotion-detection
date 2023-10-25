import DropDownIcon from "../assets/icons/dropDown";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface UserData {
  name: string;
  age: number | string;
  gender: string;
}

interface PersonalDataUploadProps {
  setUser: (value: UserData) => void;
  setDataLoading: (value: boolean) => void;
}

const PersonalDataUpload: React.FC<PersonalDataUploadProps> = ({
  setUser,
  setDataLoading,
}) => {
  const initialValues: UserData = {
    name: "",
    age: "",
    gender: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required!"),
    age: Yup.number()
      .nullable()
      .min(1, "Value must be greater than or equal to 1")
      .max(99, "Value must be less than or equal to 99")
      .required("This field is required!"),
    gender: Yup.string().required("This field is required!"),
  });
  const handleSubmit = (formValue: UserData) => {
    setDataLoading(true);
    setTimeout(() => {
      setUser(formValue);
    }, 6000);
  };
  return (
    <div className="flex flex-col items-center popup-content bg-[#FFF3E1] py-[52px] px-8 max-w-[384px] mx-auto rounded-lg w-full">
      <h4 className="text-[#62388A] text-[18px] pb-4">
        Tell me about yourself!
      </h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form className="w-full upload-data">
              <div className="mb-3">
                <label className="text-[14px] mb-1 block">Your name*</label>

                <Field
                  type="text"
                  className="py-2 px-3 bg-white rounded-lg block w-full  border border-[#D0D5DD] text-[#667085]"
                  placeholder="Enter your name here"
                  name="name"
                />
                <ErrorMessage name="name" component="span" />
              </div>
              <div className="mb-3">
                <label className="text-[14px] mb-1 block">Your age*</label>
                <Field
                  type="number"
                  className="py-2 px-3 bg-white rounded-lg block w-full  border border-[#D0D5DD] text-[#667085]"
                  placeholder="Enter your age here"
                  name="age"
                />
                <ErrorMessage name="age" component="span" />
              </div>
              <div className="m-0">
                <label className="text-[14px] mb-1 block">Your gender*</label>
                <div className="relative drop-down">
                  <Field
                    as="select"
                    className="py-2 px-3 bg-white rounded-lg block w-full appearance-none border border-[#D0D5DD] text-[#667085]"
                    name="gender"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <DropDownIcon />
                  <ErrorMessage name="gender" component="span" />
                </div>
              </div>
              <div className="mt-[32px] mx-auto text-center">
                <button
                  type="submit"
                  className="py-4 max-w-[220px] w-full text-center bg-[#6941C6] text-[#fff] rounded-[32px] text-[18px] submit-btn"
                  disabled={!formik.isValid}
                >
                  Talk to me
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PersonalDataUpload;
