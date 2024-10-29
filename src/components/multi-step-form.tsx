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
    // grouped in a single row
    firstName: '', // text field 1/3 of width
    lastName: '', // text field 1/3 of width
    middleName: '', // text field 1/3 of width

    // grouped in next row
    nickname: '', // text field 5/12 of width
    birthdate: '', // date field 4/12
    gender: '', // radio button 3/12 of width


    course: '', // dropdown 1/2 of width
    year: '', // number field 1/2 of width


    mailingAddress: '',
    mailingContactNumber: '',

    // show this is isSameAddress is false
    permanentAddress: '',
    permanentContactNumber: '',

    residency: 'owned', // dropdown with the values owned, rent, others (labels of Sentence case) (if others, show a text field)
    civilStatus: 'single', // dropdown with the values
    religion: '', // text field

    // show if married or annulled, grouped in a row
    spouseName: '',
    spouseOccupation: '',

    birthOrder: 0,
    brotherCount: '',
    sisterCount: 0,
    totalSiblings: 0, // don't show in the form, just calculate in the backend
    livingWith: 'parent', //dropdown parent, guardian, friend, others (if others, show a text field)

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
    guardianName: '',
    guardianRelationship: '',
    guardianAddress: '',
    guardianContactNumber: '',
    guardianEmail: '',
    emergencyContact: '',
    emergencyContactNumber: '',

    educStatus: '',
    educBackground: [],
    educAssistance: 0,
    educAssistanceInfo: '',
    institutionalAffiliations: [],
    workExperience: [],

    interest: [],
    talents: [],
    characteristics: [],
    selfImageAnswer: '',
    selfMotivationAnswer: '',
    decisionMakingAnswer: '',
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
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => updateFormData('age', e.target.value)}
                placeholder="Enter your age"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="file">Personal Information Sheet</Label>
              <AttachmentField fileSetter={setFile} />
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