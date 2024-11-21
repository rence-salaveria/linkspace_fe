import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Info} from 'lucide-react'
import {Student} from "@/types/student.ts";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {Checkbox} from "@radix-ui/react-checkbox";

type Props = {
  student: Student
}

export function StudentSlugComponent(props: Props) {
  const baseURL = "http://localhost:8000"
  const navigate = useNavigate()

  const student = props.student

  const [studentPhoto, setStudentPhoto] = useState<string | null>(null)

  useEffect(() => {
    if (student.photo === null) {
      setStudentPhoto(`${import.meta.env.BASE_URL}img.png`)
    } else {
      setStudentPhoto(`${baseURL}/storage/${student.photo}`)
    }
    console.log(studentPhoto)
  }, [student]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-[400px_1fr] gap-6">
            <div className="flex justify-center">
              <img
                alt="Student profile picture"
                className="rounded-lg object-cover"
                height="200"
                src={studentPhoto}
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="400"
              />
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input id="studentName" value={
                    `${student.lastName}, ${student.firstName} ${student.middleName}` || 'No Name Provided'
                  } readOnly className="uppercase"/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="studentName">Nickname</Label>
                  <Input id="studentName" value={
                    `${student.nickname}` || 'No Name Provided'
                  } readOnly className="uppercase"/>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input id="studentId" value={student.idNumber} readOnly/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={student.permanentAddress ? student.permanentAddress : student.mailingAddress}
                    readOnly
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Contact Number</Label>
                  <Input
                    id="address"
                    value={student.permanentContactNumber ? student.permanentContactNumber : student.permanentContactNumber}
                    readOnly
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="enrollment">Enrollment Status</Label>
                  <Input id="enrollment" value={student.educStatus.join(", ")} readOnly/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nationality">Course and Year</Label>
                  <Input id="nationality" value={`${student.course} - Year ${student.year}`} readOnly/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contact">Emergency Contact Person</Label>
                  <Input id="contact" value={student.emergencyContact} readOnly/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="course">Emergency Contact Number</Label>
                  <Input id="course" value={student.emergencyContactNumber} readOnly/>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4"/>
            <span>
              Note: If the student&apos;s information is inaccurate, please contact the registrar&apos;s office for updates.
            </span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="family">Family Background</TabsTrigger>
          <TabsTrigger value="professional">Professional Background</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <Card>
            <CardHeader className="text-xl font-bold">Personal Information</CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="civilStatus">Civil Status</Label>
                  <Input id="civilStatus" className="capitalize" value={student.civilStatus} readOnly/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Input id="religion" className="capitalize" value={student.religion} readOnly/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input id="gender" className="capitalize" value={student.gender} readOnly/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="residency">Residency</Label>
                  <Input id="residency" className="capitalize" value={student.residency} readOnly/>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="family">
          <Card>
            <CardHeader className="text-xl font-bold">Family Background</CardHeader>
            <CardContent>
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
                      checked={student.fatherLiving === 1}
                    />
                    <Label htmlFor="fatherLiving">{student.fatherLiving === 1 ? 'Living' : 'Deceased'}</Label>
                  </td>
                  <td className="gap-2 items-center">
                    <Checkbox
                      id="motherLiving"
                      checked={student.motherLiving === 1}
                    />
                    <Label htmlFor="motherLiving">{student.motherLiving === 1 ? 'Living' : 'Deceased'}</Label>
                  </td>
                </tr>
                <tr>
                  <td className="w-2/12">Name</td>
                  <td className="w-5/12">
                    <Input
                      id="fatherName"
                      type="text"
                      value={student.fatherName}
                      readOnly
                    />
                  </td>
                  <td className="w-5/12">
                    <Input
                      id="motherName"
                      type="text"
                      value={student.motherName}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-2/12">Nationality</td>
                  <td className="w-5/12">
                    <Input
                      id="fatherNationality"
                      type="text"
                      value={student.fatherNationality}
                      readOnly
                    />
                  </td>
                  <td className="w-5/12">
                    <Input
                      id="motherNationality"
                      type="text"
                      value={student.motherNationality}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-2/12">Religion</td>
                  <td className="w-5/12">
                    <Input
                      id="fatherReligion"
                      type="text"
                      value={student.fatherReligion}
                      readOnly
                    />
                  </td>
                  <td className="w-5/12">
                    <Input
                      id="motherReligion"
                      type="text"
                      value={student.motherReligion}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-2/12">Educational Attainment</td>
                  <td className="w-5/12">
                    <Input
                      id="fatherEducAttainment"
                      type="text"
                      value={student.fatherEducAttainment}
                      readOnly
                    />
                  </td>
                  <td className="w-5/12">
                    <Input
                      id="motherEducAttainment"
                      type="text"
                      value={student.motherEducAttainment}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-2/12">Occupation</td>
                  <td className="w-5/12">
                    <Input
                      id="fatherOccupation"
                      type="text"
                      value={student.fatherOccupation}
                      readOnly
                    />
                  </td>
                  <td className="w-5/12">
                    <Input
                      id="motherOccupation"
                      type="text"
                      value={student.motherOccupation}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-2/12">Company</td>
                  <td className="w-5/12">
                    <Input
                      id="fatherCompany"
                      type="text"
                      value={student.fatherCompany}
                      readOnly
                    />
                  </td>
                  <td className="w-5/12">
                    <Input
                      id="motherCompany"
                      type="text"
                      value={student.motherCompany}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-2/12">Birthdate</td>
                  <td className="w-5/12">
                    <Input
                      id="fatherBirthdate"
                      type="date"
                      value={student.fatherBirthdate}
                      readOnly
                    />
                  </td>
                  <td className="w-5/12">
                    <Input
                      id="motherBirthdate"
                      type="date"
                      value={student.motherBirthdate}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-2/12">Contact Number</td>
                  <td className="w-5/12">
                    <Input
                      id="fatherContactNumber"
                      type="text"
                      value={student.fatherContactNumber}
                      readOnly
                    />
                  </td>
                  <td className="w-5/12">
                    <Input
                      id="motherContactNumber"
                      type="text"
                      value={student.motherContactNumber}
                      readOnly
                    />
                  </td>
                </tr>
                </tbody>
              </table>

              <div className="mt-4">
                <Label htmlFor="monthlyIncome">Total Siblings</Label>
                <Input
                  id="monthlyIncome"
                  value={student.totalSiblings}
                  readOnly
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="monthlyIncome">Brother Count</Label>
                <Input
                  id="monthlyIncome"
                  value={student.brotherCount}
                  readOnly
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="monthlyIncome">Sister Count</Label>
                <Input
                  id="monthlyIncome"
                  value={student.sisterCount}
                  readOnly
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="monthlyIncome">Monthly Income</Label>
                <Input
                  id="monthlyIncome"
                  value={student.monthlyIncome}
                  readOnly
                />
              </div>


              {student.livingWith === 'guardian' && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="guardianName">Guardian Name</Label>
                    <Input
                      id="guardianName"
                      value={student.guardianName}
                      readOnly
                      placeholder="Enter guardian's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianRelationship">Guardian Relationship</Label>
                    <Input
                      id="guardianRelationship"
                      value={student.guardianRelationship}
                      readOnly
                      placeholder="Enter guardian's relationship"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianAddress">Guardian Address</Label>
                    <Input
                      id="guardianAddress"
                      value={student.guardianAddress}
                      readOnly
                      placeholder="Enter guardian's address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianContactNumber">Guardian Contact Number</Label>
                    <Input
                      id="guardianContactNumber"
                      value={student.guardianContactNumber}
                      readOnly
                      placeholder="Enter guardian's contact number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianEmail">Guardian Email</Label>
                    <Input
                      id="guardianEmail"
                      value={student.guardianEmail}
                      readOnly
                      placeholder="Enter guardian's email"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="professional">
          <Card>
            <CardHeader className="text-xl font-bold">Professional Background</CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="workExperience">Education/Financial Assistance</Label>
                  <Input id="workExperience" value={student.educAssistance === 1 ? student.educAssistanceInfo : 'None'}
                         readOnly/>
                </div>

                <h2 className="text-xl font-semibold mb-4">Educational Background</h2>
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
                  {student.educBackground.map((background, index) => (
                    <tr key={index}>
                      <td>
                        <Select value={background.level} disabled>
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
                          readOnly
                          placeholder="Enter school name"
                        />
                      </td>
                      <td>
                        <Input
                          value={background.address}
                          readOnly
                          placeholder="Enter address"
                        />
                      </td>
                      <td>
                        <Input
                          value={background.year}
                          readOnly
                          placeholder="Enter year graduated"
                        />
                      </td>
                      <td>
                        <Input
                          value={background.honors}
                          readOnly
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
                  {student.institutionalAffiliations.map((affiliation, index) => (
                    <tr key={index}>
                      <td>
                        <Input
                          value={affiliation.organization}
                          readOnly
                          placeholder="Enter organization"
                        />
                      </td>
                      <td>
                        <Input
                          value={affiliation.affiliation}
                          readOnly
                          placeholder="Enter affiliation"
                        />
                      </td>
                      <td>
                        <Input
                          value={affiliation.year}
                          readOnly
                          placeholder="Enter year/s"
                        />
                      </td>
                      <td>
                        <Input
                          value={affiliation.status ? 'Yes' : 'No'}
                          disabled
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
                  {student.workExperience.map((experience, index) => (
                    <tr key={index}>
                      <td>
                        <Input
                          value={experience.companyName}
                          readOnly
                          placeholder="Enter company name"
                        />
                      </td>
                      <td>
                        <Input
                          value={experience.position}
                          readOnly
                          placeholder="Enter position"
                        />
                      </td>
                      <td>
                        <Input
                          value={experience.dateRange}
                          readOnly
                          placeholder="Enter date range"
                        />
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader className="text-xl font-bold">Profile</CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="interests">Interests</Label>
                  <Input id="interests" value={student.interest.join(", ")} readOnly/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="talents">Interests</Label>
                  <Input id="talents" value={student.talents.join(", ")} readOnly/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="characteristics">Characteristics</Label>
                  <Input id="characteristics" value={student.characteristics.join(", ")} readOnly/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="selfImage">How important am I?</Label>
                  <Input id="selfImage" value={student.selfImageAnswer} readOnly/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="motivation">Am I eager to start and end with my work? If yes, why? If no, why?</Label>
                  <Input id="motivation" value={student.selfMotivationAnswer} readOnly/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="decision">Do you usually make a decision alone or with a group? Why? When do you ask
                    for help?</Label>
                  <Input id="decision" value={student.decisionMakingAnswer} readOnly/>
                </div>

                {student.infoSheet && (
                  <div className="grid gap-2">
                    <h3 className="text-lg font-bold">Info Sheet</h3>
                    <iframe
                      className="w-full h-96"
                      src={`${baseURL}/storage/${student.infoSheet}`}
                      title="Info Sheet"/>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}