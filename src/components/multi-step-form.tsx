import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Checkbox} from "@/components/ui/checkbox"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import AttachmentField from "@/modules/students/AttachmentField.tsx";
import {StudentFormFields} from "@/types/student.ts";

type Experience = {
  company: string;
  years: string;
  role: string;
  [key: string]: string; // Add index signature
}

export function MultiStepFormComponent() {
  const [step, setStep] = useState(1)
  const [isSameAddress, setIsSameAddress] = useState(true)
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
    educStatus: '', // checkbox group with the values Freshman, Transferee, Second Course, Regular/Irregular, Working Student

    // make this a table with the following columns Level, School Name, Address, Year Graduated, Honor/s
    // the Level column has the following values: Tertiary, Alternative Learning System, Secondary, Elementary and the other columns are text fields
    educBackground: [],

    // make this a radio button group with the values Yes and No and show a text field if Yes that corresponds to the educAssistanceInfo
    educAssistance: 0,
    educAssistanceInfo: '',

    // make this a table with the columns: Organization, Affiliation, Year/s, and a checkbox if currently active
    institutionalAffiliations: [],

    // make this a table with the columns: Company, Position, Role
    workExperience: [],

    // make this part in the fourth
    // make this a multiselect dropdown that you can input to create new items
    interest: [],
    // make this a multiselect dropdown that you can input to create new items
    talents: [],
    // make this a multiselect dropdown that you can input to create new items
    characteristics: [],
    selfImageAnswer: '', // text box
    selfMotivationAnswer: '', // text box
    decisionMakingAnswer: '', // text box

    // add an upload info sheet. use the AttachmentField
    infoSheetPath: {
      file: '',
      path: ''
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    file: null as File | null,
    preferences: [] as string[], // Ensure preferences is string[]
    employmentStatus: '',
    experience: [{company: '', years: '', role: ''}] as Experience[],
    additionalInfo: '',
    country: '',
    termsAccepted: false
  })
  const [file, setFile] = useState<{ file: string; path: string }[]>([]);

  const updateFormData = (field: string, value: string | boolean | string[] | File | null) => {
    setFormData(prev => ({...prev, [field]: value}))
  }

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {company: '', years: '', role: ''}]
    }))
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...formData.experience]
    newExperience[index][field] = value
    setFormData(prev => ({...prev, experience: newExperience}))
  }

  const handleSubmit = async () => {
    console.log('Form submitted:', {...formData, file})
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
                    <RadioGroupItem value="male" id="male"/>
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female"/>
                    <Label htmlFor="female">Female</Label>
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
                    <SelectItem value="course1">Course 1</SelectItem>
                    <SelectItem value="course2">Course 2</SelectItem>
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
              <div className="w-1/2">
                <Label htmlFor="mailingAddress">Mailing Address</Label>
                <Input
                  id="mailingAddress"
                  value={studentFormData.mailingAddress}
                  onChange={(e) => setStudentFormData({...studentFormData, mailingAddress: e.target.value})}
                  placeholder="Enter your mailing address"
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="mailingContactNumber">Mailing Contact Number</Label>
                <Input
                  id="mailingContactNumber"
                  value={studentFormData.mailingContactNumber}
                  onChange={(e) => setStudentFormData({...studentFormData, mailingContactNumber: e.target.value})}
                  placeholder="Enter your mailing contact number"
                />
              </div>
            </div>

            {!isSameAddress && (
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
                    if (value === 'others') setIsLivingWithOthers(true);
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
                    value={studentFormData.livingWith}
                    onChange={(e) => setStudentFormData({...studentFormData, livingWith: e.target.value})}
                    placeholder="Specify other living arrangement"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div>
              <Label>Interests (Check all that apply)</Label>
              <div className="space-y-2">
                {['Technology', 'Sports', 'Music', 'Travel', 'Food'].map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={formData.preferences.includes(interest)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData('preferences', [...formData.preferences, interest])
                        } else {
                          updateFormData('preferences', formData.preferences.filter(i => i !== interest))
                        }
                      }}
                    />
                    <label htmlFor={interest}>{interest}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Employment Status</Label>
              <RadioGroup
                value={formData.employmentStatus}
                onValueChange={(value) => updateFormData('employmentStatus', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employed" id="employed"/>
                  <Label htmlFor="employed">Employed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unemployed" id="unemployed"/>
                  <Label htmlFor="unemployed">Unemployed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student"/>
                  <Label htmlFor="student">Student</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            <table className="w-full">
              <thead>
              <tr>
                <th className="text-left">Company</th>
                <th className="text-left">Years</th>
                <th className="text-left">Role</th>
              </tr>
              </thead>
              <tbody>
              {formData.experience.map((exp, index) => (
                <tr key={index}>
                  <td>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      placeholder="Company name"
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={exp.years}
                      onChange={(e) => updateExperience(index, 'years', e.target.value)}
                      placeholder="Years"
                    />
                  </td>
                  <td>
                    <Input
                      value={exp.role}
                      onChange={(e) => updateExperience(index, 'role', e.target.value)}
                      placeholder="Role"
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <Button onClick={addExperience}>Add Experience</Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <div>
              <Label htmlFor="additionalInfo">Tell us more about yourself</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                placeholder="Enter any additional information here"
                className="h-40"
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Review and Submit</h2>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => updateFormData('country', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your country"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => updateFormData('termsAccepted', checked)}
                />
                <label htmlFor="terms">I accept the terms and conditions</label>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Form Summary</h3>
              <p>Name: {formData.name}</p>
              <p>Age: {formData.age}</p>
              <p>Email: {formData.email}</p>
              <p>File: {formData.file ? formData.file.name : 'No file uploaded'}</p>
              <p>Preferences: {formData.preferences.join(', ')}</p>
              <p>Employment Status: {formData.employmentStatus}</p>
              <p>Country: {formData.country}</p>
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