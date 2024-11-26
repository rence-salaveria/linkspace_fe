import {MultiStepFormComponent} from "@/components/multi-step-form.tsx";
import Navbar from "@/components/Navbar.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

const AddStudent = () => {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Navbar/>
      <div className="flex items-center justify-between w-[80%]">
        <h1 className="text-3xl font-bold pt-12 pb-8 text-white">Add a New Student</h1>
        <Link to={'/table/student'}>
          <Button>
            Go back
          </Button>
        </Link>
      </div>
      <div className="container mb-24">
        <MultiStepFormComponent/>
      </div>
    </div>
  );
};

export default AddStudent;