import React from 'react';
import {StudentSlugComponent} from "@/components/student-slug.tsx";
import {useParams} from "react-router-dom";

const StudentPage = () => {
  const {id} = useParams();
  return (
    <div>
      <StudentSlugComponent />
    </div>
  );
};

export default StudentPage;