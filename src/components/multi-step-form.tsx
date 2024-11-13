import {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Checkbox} from "@/components/ui/checkbox"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import AttachmentField from "@/modules/students/AttachmentField.tsx";
import {StudentFormFields} from "@/types/student.ts";
import Creatable, {useCreatable} from 'react-select/creatable';

export function MultiStepFormComponent() {
  const [step, setStep] = useState(1)
  const [isSameAddress, setIsSameAddress] = useState('n')
  const [othersResidency, setOthersResidency] = useState('')
  const [isLivingWithOthers, setIsLivingWithOthers] = useState(false)
  const [studentFormData, setStudentFormData] = useState<StudentFormFields>({
    // make this part in the first step
    // grouped in a single row
    firstName: '', // text field 1/3 of width
    lastName: '', // text field 1/3 of width
    middleName: '', // text field 1/3 of width

    // grouped in next row
    nickname: '', // text field 5/12 of width
    birthdate: '', // date field 4/12
    gender: '', // radio button 3/12 of width

    // grouped in next row
    course: '', // dropdown 1/2 of width
    year: '', // number field 1/2 of width

    // grouped in next row
    mailingAddress: '',
    mailingContactNumber: '',

    // show this is isSameAddress is false
    permanentAddress: '',
    permanentContactNumber: '',

    // grouped in next row
    residency: 'owned', // dropdown with the values owned, rent, others (labels of Sentence case) (if others, show a text field)
    civilStatus: 'single', // dropdown with the values
    religion: '', // text field

    // show if married or annulled, grouped in a row
    spouseName: '',
    spouseOccupation: '',

    // grouped in next row
    birthOrder: 0,
    brotherCount: 0,
    sisterCount: 0,
    totalSiblings: 0, // don't show in the form, just calculate in the backend
    livingWith: 'parent', //dropdown parent, guardian, friend, others (if others, show a text field)


    // make this part in the second step
    // make this a table with the following columns: blank (serves as a buffer column), Mother and Father (has a checkbox if living or not)
    // the rows being blank (serves as a buffer column) Name, Nationality, Religion, Educational Attainment, Occupation, Company, Birthdate, Contact Number
    fatherLiving: 0,
    fatherName: '',
    fatherNationality: '',
    fatherReligion: '',
    fatherEducAttainment: '',
    fatherOccupation: '',
    fatherCompany: '',
    fatherBirthdate: '',
    fatherContactNumber: '',

    motherLiving: 0,
    motherName: '',
    motherNationality: '',
    motherReligion: '',
    motherEducAttainment: '',
    motherOccupation: '',
    motherCompany: '',
    motherBirthdate: '',
    motherContactNumber: '',

    monthlyIncome: '', // text field

    // show this if living with guardian
    guardianName: '', //
    guardianRelationship: '',
    guardianAddress: '',
    guardianContactNumber: '',
    guardianEmail: '',


    emergencyContact: '',
    emergencyContactNumber: '',

    // make this part in the third step
    educStatus: [], // checkbox group with the values Freshman, Transferee, Second Course, Regular/Irregular, Working Student

    // make this a table with the following columns Level, School Name, Address, Year Graduated, Honor/s
    // the Level column has the following values: Tertiary, Alternative Learning System, Secondary, Elementary and the other columns are text fields (max 3)
    educBackground: [
      {level: 'Tertiary', year: '', address: '', honors: '', schoolName: ''},
      {level: 'Alternative Learning System', year: '', address: '', honors: '', schoolName: ''},
      {level: 'Secondary', year: '', address: '', honors: '', schoolName: ''},
      {level: 'Elementary', year: '', address: '', honors: '', schoolName: ''}
    ],

    // make this a radio button group with the values Yes and No and show a text field if Yes that corresponds to the educAssistanceInfo
    educAssistance: 0,
    educAssistanceInfo: '',

    // make this a table with the columns: Organization, Affiliation, Year/s, and a checkbox if currently active (max 3)
    institutionalAffiliations: [
      {organization: '', affiliation: '', year: '', status: false},
      {organization: '', affiliation: '', year: '', status: false},
      {organization: '', affiliation: '', year: '', status: false},
    ],

    // make this a table with the columns: Company, Position, Role (max 3)
    workExperience: [
      {companyName: '', position: '', dateRange: ''},
      {companyName: '', position: '', dateRange: ''},
      {companyName: '', position: '', dateRange: ''},
    ],

    // make this part in the fourth
    interest: [] as string[],
    talents: [] as string[],
    characteristics: [] as string[],
    selfImageAnswer: '', // text box
    selfMotivationAnswer: '', // text box
    decisionMakingAnswer: '', // text box

    // add an upload info sheet. use the AttachmentField
    infoSheetPath: {
      file: '',
      path: ''
    }
  });

  const [file, setFile] = useState<{ file: string; path: string }[]>([]);
  const [isTermsChecked, setIsTermsChecked] = useState(false)

  useEffect(() => {
    console.group('Student form data');
    console.log(studentFormData.interest, new Date());
    console.groupEnd();
  }, [studentFormData]);

  useEffect(() => {
    setStudentFormData(prev => ({...prev, infoSheetPath: file[0]}))
  }, [file]);


  const handleSubmit = async () => {
    console.log('Form submitted:', {...studentFormData, file})
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const steps = ['Personal Information', 'Family Background', 'Professional Background and Affiliations', 'Profile', 'Review']
  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-8xl">
        <h1 className="text-2xl font-bold mb-6">Guidance Office Cumulative Form</h1>
        <div className="mb-8">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div style={{width: `${(step / 5) * 100}%`}}
                   className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
            </div>
            <div className="flex justify-between">
              {steps.map((label, index) => (
                <div key={label} className="text-center">
                  <div
                    className={`w-10 h-10 mx-auto rounded-full text-lg flex items-center justify-center ${step > index ? 'bg-primary text-white' : 'bg-white border-2 border-gray-200'}`}>
                    <span>{index + 1}</span>
                  </div>
                  <div className="text-xs mt-2">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

            <div className="flex space-x-4">
              <div className="w-1/3">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={studentFormData.firstName}
                  onChange={(e) => setStudentFormData({...studentFormData, firstName: e.target.value})}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="w-1/3">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={studentFormData.lastName}
                  onChange={(e) => setStudentFormData({...studentFormData, lastName: e.target.value})}
                  placeholder="Enter your last name"
                />
              </div>
              <div className="w-1/3">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={studentFormData.middleName}
                  onChange={(e) => setStudentFormData({...studentFormData, middleName: e.target.value})}
                  placeholder="Enter your middle name"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-5/12">
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  value={studentFormData.nickname}
                  onChange={(e) => setStudentFormData({...studentFormData, nickname: e.target.value})}
                  placeholder="Enter your nickname"
                />
              </div>
              <div className="w-4/12">
                <Label htmlFor="birthdate">Birthdate</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={studentFormData.birthdate}
                  onChange={(e) => setStudentFormData({...studentFormData, birthdate: e.target.value})}
                />
              </div>
              <div className="w-3/12">
                <Label htmlFor="gender">Gender</Label>
                <RadioGroup
                  value={studentFormData.gender}
                  onValueChange={(value) => setStudentFormData({...studentFormData, gender: value})}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male"/>
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female"/>
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <Label htmlFor="course">Course</Label>
                <Select
                  value={studentFormData.course}
                  onValueChange={(value) => setStudentFormData({...studentFormData, course: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your course"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BLIS">BLIS</SelectItem>
                    <SelectItem value="BSCPE">BSCPE</SelectItem>
                    <SelectItem value="BSP">BSP</SelectItem>
                    <SelectItem value="BSIT">BSIT</SelectItem>
                    <SelectItem value="BEED">BEED</SelectItem>
                    <SelectItem value="BTLED">BTLED</SelectItem>
                    <SelectItem value="BSED Filipino">BSED Filipino</SelectItem>
                    <SelectItem value="BSED English">BSED English</SelectItem>
                    <SelectItem value="BSED Values">BSED Values</SelectItem>
                    <SelectItem value="BSED Social Studies">BSED Social Studies</SelectItem>
                    <SelectItem value="BSED science">BSED science</SelectItem>
                    <SelectItem value="BSED Math">BSED Math</SelectItem>
                    <SelectItem value="BPED">BPED</SelectItem>
                    <SelectItem value="BSCRIM">BSCRIM</SelectItem>
                    <SelectItem value="BSAIS">BSAIS</SelectItem>
                    <SelectItem value="BSENTREP">BSENTREP</SelectItem>
                    <SelectItem value="BSBA MM">BSBA MM</SelectItem>
                    <SelectItem value="BSBA HRM">BSBA HRM</SelectItem>
                    <SelectItem value="BSOA">BSOA</SelectItem>
                    <SelectItem value="BSTM">BSTM</SelectItem>
                    <SelectItem value="BSHM">BSHM</SelectItem>
                    <SelectItem value="CPE">CPE</SelectItem>
                    <SelectItem value="BSBA FM">BSBA FM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={studentFormData.year}
                  onChange={(e) => setStudentFormData({...studentFormData, year: e.target.value})}
                  placeholder="Enter your year"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-5/12">
                <Label htmlFor="mailingAddress">Mailing Address</Label>
                <Input
                  id="mailingAddress"
                  value={studentFormData.mailingAddress}
                  onChange={(e) => setStudentFormData({...studentFormData, mailingAddress: e.target.value})}
                  placeholder="Enter your mailing address"
                />
              </div>
              <div className="w-5/12">
                <Label htmlFor="mailingContactNumber">Mailing Contact Number</Label>
                <Input
                  id="mailingContactNumber"
                  value={studentFormData.mailingContactNumber}
                  onChange={(e) => setStudentFormData({...studentFormData, mailingContactNumber: e.target.value})}
                  placeholder="Enter your mailing contact number"
                />
              </div>
              <div className="w-3/12">
                <Label htmlFor="gender">Different Permanent Address?</Label>
                <RadioGroup
                  value={isSameAddress || 'n'}
                  onValueChange={(value) => setIsSameAddress(value)}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="n" id="n"/>
                      <Label htmlFor="n">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="y" id="y"/>
                      <Label htmlFor="y">Yes</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {isSameAddress === 'y' && (
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Label htmlFor="permanentAddress">Permanent Address</Label>
                  <Input
                    id="permanentAddress"
                    value={studentFormData.permanentAddress}
                    onChange={(e) => setStudentFormData({...studentFormData, permanentAddress: e.target.value})}
                    placeholder="Enter your permanent address"
                  />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="permanentContactNumber">Permanent Contact Number</Label>
                  <Input
                    id="permanentContactNumber"
                    value={studentFormData.permanentContactNumber}
                    onChange={(e) => setStudentFormData({...studentFormData, permanentContactNumber: e.target.value})}
                    placeholder="Enter your permanent contact number"
                  />
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <div className="w-1/3">
                <Label htmlFor="residency">Residency</Label>
                <Select
                  value={studentFormData.residency}
                  onValueChange={(value) => {
                    setStudentFormData({...studentFormData, residency: value});
                    if (value === 'others') setOthersResidency('');
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your residency"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owned">Owned</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
                {studentFormData.residency === 'others' && (
                  <Input
                    value={othersResidency}
                    onChange={(e) => setOthersResidency(e.target.value)}
                    placeholder="Specify other residency"
                  />
                )}
              </div>
              <div className="w-1/3">
                <Label htmlFor="civilStatus">Civil Status</Label>
                <Select
                  value={studentFormData.civilStatus}
                  onValueChange={(value) => setStudentFormData({...studentFormData, civilStatus: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your civil status"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                    <SelectItem value="separated">Separated</SelectItem>
                    <SelectItem value="annulled">Annulled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="religion">Religion</Label>
                <Input
                  id="religion"
                  value={studentFormData.religion}
                  onChange={(e) => setStudentFormData({...studentFormData, religion: e.target.value})}
                  placeholder="Enter your religion"
                />
              </div>
            </div>

            {(studentFormData.civilStatus === 'married' || studentFormData.civilStatus === 'annulled') && (
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Label htmlFor="spouseName">Spouse Name</Label>
                  <Input
                    id="spouseName"
                    value={studentFormData.spouseName}
                    onChange={(e) => setStudentFormData({...studentFormData, spouseName: e.target.value})}
                    placeholder="Enter your spouse's name"
                  />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="spouseOccupation">Spouse Occupation</Label>
                  <Input
                    id="spouseOccupation"
                    value={studentFormData.spouseOccupation}
                    onChange={(e) => setStudentFormData({...studentFormData, spouseOccupation: e.target.value})}
                    placeholder="Enter your spouse's occupation"
                  />
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <div className="w-1/4">
                <Label htmlFor="birthOrder">Birth Order</Label>
                <Input
                  id="birthOrder"
                  type="number"
                  value={studentFormData.birthOrder}
                  onChange={(e) => setStudentFormData({...studentFormData, birthOrder: parseInt(e.target.value)})}
                  placeholder="Enter your birth order"
                />
              </div>
              <div className="w-1/4">
                <Label htmlFor="brotherCount">Number of Brothers</Label>
                <Input
                  id="brotherCount"
                  type="number"
                  value={studentFormData.brotherCount}
                  onChange={(e) => setStudentFormData({...studentFormData, brotherCount: parseInt(e.target.value)})}
                  placeholder="Enter number of brothers"
                />
              </div>
              <div className="w-1/4">
                <Label htmlFor="sisterCount">Number of Sisters</Label>
                <Input
                  id="sisterCount"
                  type="number"
                  value={studentFormData.sisterCount}
                  onChange={(e) => setStudentFormData({...studentFormData, sisterCount: parseInt(e.target.value)})}
                  placeholder="Enter number of sisters"
                />
              </div>
              <div className="w-1/4">
                <Label htmlFor="livingWith">Living With</Label>
                <Select
                  value={studentFormData.livingWith}
                  onValueChange={(value) => {
                    setStudentFormData({...studentFormData, livingWith: value});
                    setIsLivingWithOthers(value === 'others');
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select who you are living with"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="guardian">Guardian</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
                {isLivingWithOthers && (
                  <Input
                    value={othersResidency}
                    onChange={(e) => setOthersResidency(e.target.value)}
                    placeholder="Specify other living arrangement"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Family Background</h2>
            <table className="w-full">
              <thead>
              <tr>
                <th className="w-2/12"></th>
                <th className="w-5/12 text-left">Father</th>
                <th className="w-5/12 text-left">Mother</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td></td>
                <td className="gap-2 items-center">
                  <Checkbox
                    id="fatherLiving"
                    checked={studentFormData.fatherLiving === 1}
                    onCheckedChange={(checked) => setStudentFormData({
                      ...studentFormData,
                      fatherLiving: checked ? 1 : 0
                    })}
                  />
                  <Label htmlFor="fatherLiving">Living</Label>
                </td>
                <td className="gap-2 items-center">
                  <Checkbox
                    id="motherLiving"
                    checked={studentFormData.motherLiving === 1}
                    onCheckedChange={(checked) => setStudentFormData({
                      ...studentFormData,
                      motherLiving: checked ? 1 : 0
                    })}
                  />
                  <Label htmlFor="motherLiving">Living</Label>
                </td>
              </tr>
              {['Name', 'Nationality', 'Religion', 'Educational Attainment', 'Occupation', 'Company', 'Birthdate', 'Contact Number'].map((field, index) => (
                <tr key={index}>
                  <td className="w-2/12">{field}</td>
                  <td className="w-5/12">
                    <Input
                      id={`father${field.replace(/\s+/g, '')}`}
                      type={field === 'Birthdate' ? 'date' : 'text'}
                      value={studentFormData[`father${field.replace(/\s+/g, '')}`]}
                      onChange={(e) => setStudentFormData({
                        ...studentFormData,
                        [`father${field.replace(/\s+/g, '')}`]: e.target.value
                      })}
                      placeholder={`Enter father's ${field.toLowerCase()}`}
                    />
                  </td>
                  <td className="w-5/12">
                    <Input
                      id={`mother${field.replace(/\s+/g, '')}`}
                      type={field === 'Birthdate' ? 'date' : 'text'}
                      value={studentFormData[`mother${field.replace(/\s+/g, '')}`]}
                      onChange={(e) => setStudentFormData({
                        ...studentFormData,
                        [`mother${field.replace(/\s+/g, '')}`]: e.target.value
                      })}
                      placeholder={`Enter mother's ${field.toLowerCase()}`}
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>

            <div className="mt-4">
              <Label htmlFor="monthlyIncome">Monthly Income</Label>
              <Input
                id="monthlyIncome"
                value={studentFormData.monthlyIncome}
                onChange={(e) => setStudentFormData({...studentFormData, monthlyIncome: e.target.value})}
                placeholder="Enter monthly income"
              />
            </div>

            {studentFormData.livingWith === 'guardian' && (
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="guardianName">Guardian Name</Label>
                  <Input
                    id="guardianName"
                    value={studentFormData.guardianName}
                    onChange={(e) => setStudentFormData({...studentFormData, guardianName: e.target.value})}
                    placeholder="Enter guardian's name"
                  />
                </div>
                <div>
                  <Label htmlFor="guardianRelationship">Guardian Relationship</Label>
                  <Input
                    id="guardianRelationship"
                    value={studentFormData.guardianRelationship}
                    onChange={(e) => setStudentFormData({...studentFormData, guardianRelationship: e.target.value})}
                    placeholder="Enter guardian's relationship"
                  />
                </div>
                <div>
                  <Label htmlFor="guardianAddress">Guardian Address</Label>
                  <Input
                    id="guardianAddress"
                    value={studentFormData.guardianAddress}
                    onChange={(e) => setStudentFormData({...studentFormData, guardianAddress: e.target.value})}
                    placeholder="Enter guardian's address"
                  />
                </div>
                <div>
                  <Label htmlFor="guardianContactNumber">Guardian Contact Number</Label>
                  <Input
                    id="guardianContactNumber"
                    value={studentFormData.guardianContactNumber}
                    onChange={(e) => setStudentFormData({...studentFormData, guardianContactNumber: e.target.value})}
                    placeholder="Enter guardian's contact number"
                  />
                </div>
                <div>
                  <Label htmlFor="guardianEmail">Guardian Email</Label>
                  <Input
                    id="guardianEmail"
                    value={studentFormData.guardianEmail}
                    onChange={(e) => setStudentFormData({...studentFormData, guardianEmail: e.target.value})}
                    placeholder="Enter guardian's email"
                  />
                </div>
              </div>
            )}

            <div className="mt-4">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={studentFormData.emergencyContact}
                onChange={(e) => setStudentFormData({...studentFormData, emergencyContact: e.target.value})}
                placeholder="Enter emergency contact"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="emergencyContactNumber">Emergency Contact Number</Label>
              <Input
                id="emergencyContactNumber"
                value={studentFormData.emergencyContactNumber}
                onChange={(e) => setStudentFormData({...studentFormData, emergencyContactNumber: e.target.value})}
                placeholder="Enter emergency contact number"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">Educational Background</h2>

              <Label>Please Check if you are:</Label>
              <div className="flex flex-row space-x-4">
                {["Freshman", "Transferee", "Second Course", "Regular / Irregular", "Working Student"].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={status}
                      checked={studentFormData.educStatus.includes(status)}
                      onCheckedChange={(checked) => {
                        setStudentFormData((prev) => ({
                          ...prev,
                          educStatus: checked
                            ? [...prev.educStatus, status]
                            : prev.educStatus.filter((s) => s !== status),
                        }));
                      }}
                    />
                    <Label htmlFor={status}>{status}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Are you enjoying education/financial assistance?</Label>
              <RadioGroup
                value={studentFormData.educAssistance.toString()}
                onValueChange={(value) => setStudentFormData({...studentFormData, educAssistance: parseInt(value)})}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="yes"/>
                    <Label htmlFor="yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="no"/>
                    <Label htmlFor="no">No</Label>
                  </div>
                </div>
              </RadioGroup>
              {studentFormData.educAssistance === 1 && (
                <div className="mt-2">
                  <Label htmlFor="educAssistanceInfo">If yes, please specify</Label>
                  <Input
                    id="educAssistanceInfo"
                    value={studentFormData.educAssistanceInfo}
                    onChange={(e) => setStudentFormData({...studentFormData, educAssistanceInfo: e.target.value})}
                    placeholder="Specify your education/financial assistance"
                  />
                </div>
              )}
            </div>

            <table className="w-full">
              <thead>
              <tr>
                <th className="text-left">Level</th>
                <th className="text-left">School Name</th>
                <th className="text-left">Address</th>
                <th className="text-left">Year Graduated</th>
                <th className="text-left">Honor/s</th>
              </tr>
              </thead>
              <tbody>
              {studentFormData.educBackground.map((background, index) => (
                <tr key={index}>
                  <td>
                    <Select
                      value={background.level}
                      onValueChange={(value) => {
                        const newBackground = [...studentFormData.educBackground];
                        newBackground[index].level = value;
                        setStudentFormData({...studentFormData, educBackground: newBackground});
                      }}
                      disabled
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tertiary">Tertiary</SelectItem>
                        <SelectItem value="Alternative Learning System">Alternative Learning System</SelectItem>
                        <SelectItem value="Secondary">Secondary</SelectItem>
                        <SelectItem value="Elementary">Elementary</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td>
                    <Input
                      value={background.schoolName}
                      onChange={(e) => {
                        const newBackground = [...studentFormData.educBackground];
                        newBackground[index].schoolName = e.target.value;
                        setStudentFormData({...studentFormData, educBackground: newBackground});
                      }}
                      placeholder="Enter school name"
                    />
                  </td>
                  <td>
                    <Input
                      value={background.address}
                      onChange={(e) => {
                        const newBackground = [...studentFormData.educBackground];
                        newBackground[index].address = e.target.value;
                        setStudentFormData({...studentFormData, educBackground: newBackground});
                      }}
                      placeholder="Enter address"
                    />
                  </td>
                  <td>
                    <Input
                      value={background.year}
                      onChange={(e) => {
                        const newBackground = [...studentFormData.educBackground];
                        newBackground[index].year = e.target.value;
                        setStudentFormData({...studentFormData, educBackground: newBackground});
                      }}
                      placeholder="Enter year graduated"
                    />
                  </td>
                  <td>
                    <Input
                      value={background.honors}
                      onChange={(e) => {
                        const newBackground = [...studentFormData.educBackground];
                        newBackground[index].honors = e.target.value;
                        setStudentFormData({...studentFormData, educBackground: newBackground});
                      }}
                      placeholder="Enter honors"
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Institutional Affiliations</h2>
            <table className="w-full">
              <thead>
              <tr>
                <th className="text-left">Organization</th>
                <th className="text-left">Affiliation</th>
                <th className="text-left">Year/s</th>
                <th className="text-left">Active</th>
              </tr>
              </thead>
              <tbody>
              {studentFormData.institutionalAffiliations.map((affiliation, index) => (
                <tr key={index}>
                  <td>
                    <Input
                      value={affiliation.organization}
                      onChange={(e) => {
                        const newAffiliations = [...studentFormData.institutionalAffiliations];
                        newAffiliations[index].organization = e.target.value;
                        setStudentFormData({...studentFormData, institutionalAffiliations: newAffiliations});
                      }}
                      placeholder="Enter organization"
                    />
                  </td>
                  <td>
                    <Input
                      value={affiliation.affiliation}
                      onChange={(e) => {
                        const newAffiliations = [...studentFormData.institutionalAffiliations];
                        newAffiliations[index].affiliation = e.target.value;
                        setStudentFormData({...studentFormData, institutionalAffiliations: newAffiliations});
                      }}
                      placeholder="Enter affiliation"
                    />
                  </td>
                  <td>
                    <Input
                      value={affiliation.year}
                      onChange={(e) => {
                        const newAffiliations = [...studentFormData.institutionalAffiliations];
                        newAffiliations[index].year = e.target.value;
                        setStudentFormData({...studentFormData, institutionalAffiliations: newAffiliations});
                      }}
                      placeholder="Enter year/s"
                    />
                  </td>
                  <td>
                    <Checkbox
                      checked={affiliation.status}
                      onCheckedChange={(checked) => {
                        const newAffiliations = [...studentFormData.institutionalAffiliations];
                        newAffiliations[index].status = checked === true;
                        setStudentFormData({...studentFormData, institutionalAffiliations: newAffiliations});
                      }}
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
            <table className="w-full">
              <thead>
              <tr>
                <th className="text-left">Company</th>
                <th className="text-left">Position</th>
                <th className="text-left">Date Range</th>
              </tr>
              </thead>
              <tbody>
              {studentFormData.workExperience.map((experience, index) => (
                <tr key={index}>
                  <td>
                    <Input
                      value={experience.companyName}
                      onChange={(e) => {
                        const newExperience = [...studentFormData.workExperience];
                        newExperience[index].companyName = e.target.value;
                        setStudentFormData({...studentFormData, workExperience: newExperience});
                      }}
                      placeholder="Enter company name"
                    />
                  </td>
                  <td>
                    <Input
                      value={experience.position}
                      onChange={(e) => {
                        const newExperience = [...studentFormData.workExperience];
                        newExperience[index].position = e.target.value;
                        setStudentFormData({...studentFormData, workExperience: newExperience});
                      }}
                      placeholder="Enter position"
                    />
                  </td>
                  <td>
                    <Input
                      value={experience.dateRange}
                      onChange={(e) => {
                        const newExperience = [...studentFormData.workExperience];
                        newExperience[index].dateRange = e.target.value;
                        setStudentFormData({...studentFormData, workExperience: newExperience});
                      }}
                      placeholder="Enter date range"
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>

            <div>
              <Label htmlFor="interest">Interests</Label>
              <Creatable
                isMulti
                value={studentFormData.interest.map(value => ({value, label: value}))}
                onChange={(selectedOptions) => setStudentFormData({
                  ...studentFormData,
                  interest: selectedOptions.map(option => option.value)
                })}
                onCreateOption={(value) => {
                  setStudentFormData({
                    ...studentFormData,
                    interest: [...studentFormData.interest, value]
                  })
                }}
                options={[
                  {value: 'Sports', label: 'Sports'},
                  {value: 'Music', label: 'Music'},
                  {value: 'Art', label: 'Art'},
                  // Add more options as needed
                ]}

                placeholder="Select interests"
              />
            </div>

            <div>
                  <Label htmlFor="talents">Talents</Label>
                  <Creatable
                    isMulti
                    value={studentFormData.talents.map(value => ({value, label: value}))}
                    onChange={(selectedOptions) => setStudentFormData({
                      ...studentFormData,
                      talents: selectedOptions.map(option => option.value)
                    })}
                    onCreateOption={(value) => {
                      setStudentFormData({
                        ...studentFormData,
                        talents: [...studentFormData.talents, value]
                      })
                    }}
                    options={[
                      {value: 'Singing', label: 'Singing'},
                      {value: 'Dancing', label: 'Dancing'},
                      {value: 'Drawing', label: 'Drawing'},
                      // Add more options as needed
                    ]}
                    placeholder="Select talents"
                  />
                </div>

                <div>
                  <Label htmlFor="characteristics">Characteristics</Label>
                  <Creatable
                    isMulti
                    value={studentFormData.characteristics.map(value => ({value, label: value}))}
                    onChange={(selectedOptions) => setStudentFormData({
                      ...studentFormData,
                      characteristics: selectedOptions.map(option => option.value)
                    })}
                    onCreateOption={(value) => {
                      setStudentFormData({
                        ...studentFormData,
                        characteristics: [...studentFormData.characteristics, value]
                      })
                    }}
                    options={[
                      {value: 'Hardworking', label: 'Hardworking'},
                      {value: 'Creative', label: 'Creative'},
                      {value: 'Team Player', label: 'Team Player'},
                      // Add more options as needed
                    ]}
                    placeholder="Select characteristics"
                  />
                </div>

                <div>
                  <Label htmlFor="selfImageAnswer">How important am I?</Label>
                  <Textarea
                    value={studentFormData.selfImageAnswer}
                    onChange={(e) => setStudentFormData({...studentFormData, selfImageAnswer: e.target.value})}
                    placeholder="Describe your self-image"
                  />
                </div>

                <div>
                  <Label htmlFor="selfMotivationAnswer">Am I eager to start and end with my work? If yes, why? If no,
                    why</Label>
                  <Textarea
                    value={studentFormData.selfMotivationAnswer}
                    onChange={(e) => setStudentFormData({...studentFormData, selfMotivationAnswer: e.target.value})}
                    placeholder="Describe your self-motivation"
                  />
                </div>

                <div>
                  <Label htmlFor="decisionMakingAnswer">Do you usually make a decision alone or with a group? Why? When
                    do
                    you ask for help?</Label>
                  <Textarea
                    value={studentFormData.decisionMakingAnswer}
                    onChange={(e) => setStudentFormData({...studentFormData, decisionMakingAnswer: e.target.value})}
                    placeholder="Describe your decision-making process"
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Cumulative Form</h2>
                <div className="">
                  <h3 className="text-lg font-semibold ">Notes</h3>
                  <p>Make sure that you have accomplished this form without any errors as you won't be able to change
                    this
                    information later.</p>
                  <p>This form also serves as your guidance record and will be kept confidential.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={isTermsChecked}
                      onCheckedChange={(checked) => setIsTermsChecked(checked === true)}
                    />
                    <label htmlFor="terms">I confirm that the information I have supplied is accurate and
                      error-free</label>
                  </div>
                </div>
                <div className=" rounded">
                  <h3 className="font-semibold mb-2">Form Summary</h3>
                  <AttachmentField fileSetter={setFile}/>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <Button onClick={prevStep}>Previous</Button>
              )}
              {step < 5 ? (
                <Button onClick={nextStep}>Next</Button>
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
            </div>
          </div>
          </div>
          )
        }