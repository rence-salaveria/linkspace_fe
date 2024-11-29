import React, {useEffect} from 'react';
import Select, {components, OptionProps, SingleValueProps} from 'react-select';
import {Student} from "@/types/student.ts";

type Props = {
  options: Student[];
  isFetching: boolean;
  setSelectedStudent: (id: number | null) => void;
}

type OptionType = {
  label: string;
  value: number;
  student: Student;
};

const Option = (props: OptionProps<OptionType, false>) => {
  const { data, ...rest } = props;
  return (
    <components.Option {...rest} data={data}>
      <div>
        <h4 className="text-lg font-semibold">{`${data.student.firstName} ${data.student.lastName}`}</h4>
        <div className="text-gray-500" style={{paddingLeft: 10}}>
          {`${data.student.course} - Year ${data.student.year}`}
        </div>
        <div className="text-gray-500" style={{paddingLeft: 10}}>
          {`ID: ${data.student.idNumber || 'No ID Number' }`}
        </div>
      </div>
    </components.Option>
  );
};

const SingleValue = (props: SingleValueProps<OptionType, false>) => {
  const { data, ...rest } = props;
  return (
    <components.SingleValue {...rest} data={data}>
      {`${data.student.firstName} ${data.student.lastName}`}
    </components.SingleValue>
  );
};

const StudentDropdown: React.FC<Props> = ({ options, isFetching, setSelectedStudent }) => {
  const [students, setStudents] = React.useState<Student[]>([]);

  useEffect(() => {
    if (isFetching) {
      setStudents([]);
    } else {
      setStudents(options);
    }
  }, [options, isFetching]);

  const destructuredOptions = students?.map(student => ({
    label: `${student.firstName} ${student.lastName}`,
    value: student.id,
    student: student
  }));

  return (
    <Select
      className="col-span-3"
      placeholder={(<span className="text-md">Select student</span>)}
      options={destructuredOptions}
      components={{ Option, SingleValue }}
      onChange={(selectedOption) => setSelectedStudent(selectedOption ? selectedOption.value : null)}
      styles={{
        control: () => ({
          display: 'flex',
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 5,
          paddingRight: 5,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#ced4da',
          borderStyle: 'solid',
        }),
        multiValue: (styles) => ({
          ...styles,
          backgroundColor: '#f0f0f0',
          padding: 2
        }),
      }}
    />
  );
};

export default StudentDropdown;