import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {FaLink} from "react-icons/fa6";
import {Formik} from "formik";
import toast from "react-hot-toast";

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">Login to Link <FaLink /> pace</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik initialValues={{
          username: "",
          password: "",
        }} onSubmit={async (values) => toast(`${values.password}, ${values.username}`)}>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="text">Username</Label>
                <Input
                  id="text"
                  type="text"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required placeholder="Enter your password"/>
              </div>
              <Button type="button" className="w-full bg-primary">
                Login
              </Button>
            </div>
          </form>

        </Formik>
      </CardContent>
    </Card>
  )
}
