import React from 'react';
import {StudentSlugComponent} from "@/components/student-slug.tsx";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import axios from "@/lib/axios.ts";
import {Student} from "@/types/student.ts";
import Loading from "@/components/Loading.tsx";

const StudentPage = () => {
  const {id} = useParams();

  const {data, isFetching} = useQuery<Student>({
    queryKey: ['student', id],
    queryFn: async () => {
      const res = await axios.get(`/student/${id}`);
      if (res) {
        return res.data.data;
      } else {
        console.error("No student data");
      }
    },
  });

  return (
    <div>
      {isFetching ? <Loading/> : <StudentSlugComponent student={data}/>}
    </div>
  );
};

export default StudentPage;