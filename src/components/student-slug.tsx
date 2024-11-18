import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from 'lucide-react'

export function StudentSlugComponent() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-[375px_1fr] gap-6">
            <div className="flex justify-center">
              {/*<Image*/}
              {/*  alt="Student profile picture"*/}
              {/*  className="rounded-lg object-cover"*/}
              {/*  height="200"*/}
              {/*  src="/placeholder.svg"*/}
              {/*  style={{*/}
              {/*    aspectRatio: "200/200",*/}
              {/*    objectFit: "cover",*/}
              {/*  }}*/}
              {/*  width="200"*/}
              {/*/>*/}
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input id="studentName" value="PUTM KHBRT QPSL" readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input id="studentId" value="000000000048208" readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value="176 BLK 7 KABISIG FLOODWAY SAN ANDRES (POB.) CAINTA RIZAL Region 4A"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="birthdate">Birthdate</Label>
                  <Input id="birthdate" value="November 20, 1998" readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input id="nationality" value="FILIPINO" readOnly />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contact">Contact No</Label>
                  <Input id="contact" value="09990990999" readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="course">Course</Label>
                  <Input id="course" value="Computer Science" readOnly />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
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
            <CardHeader>Personal Information</CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="civilStatus">Civil Status</Label>
                  <Input id="civilStatus" value="Single" readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Input id="religion" value="Catholic" readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input id="gender" value="Male" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="family">
          <Card>
            <CardHeader>Family Background</CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fatherName">Father&apos;s Name</Label>
                  <Input id="fatherName" value="John Doe" readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="motherName">Mother&apos;s Name</Label>
                  <Input id="motherName" value="Jane Doe" readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="siblings">Number of Siblings</Label>
                  <Input id="siblings" value="2" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="professional">
          <Card>
            <CardHeader>Professional Background</CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="workExperience">Work Experience</Label>
                  <Input id="workExperience" value="Internship at Tech Solutions Inc." readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Input id="skills" value="Programming, Web Development, Data Analysis" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader>Profile</CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="academicAchievements">Academic Achievements</Label>
                  <Input id="academicAchievements" value="Dean's Lister, Hackathon Winner" readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="extracurricularActivities">Extracurricular Activities</Label>
                  <Input id="extracurricularActivities" value="Student Council, Robotics Club" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}