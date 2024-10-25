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
import {Field, Form, Formik} from "formik";
import toast from "react-hot-toast";
import axios from "@/lib/axios.ts";

export function LoginForm() {
  type LoginCredentials = {
    username: string,
    password: string
  }
  const login = async (values: LoginCredentials) => {
    try {
      const response = await toast.promise(axios.post("/user/login", values), {
        success: "Logged in successfully",
        error: "Failed to login",
        loading: "Logging in..."
      })

      if (response.data.payload) {
        localStorage.setItem("token", response.data.payload.token)
        localStorage.setItem("user", JSON.stringify(response.data.payload.user))
        window.location.reload()
      }
    } catch (e) {
      console.log(e)
      toast.error("Something went wrong")
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">Login to Link <FaLink/> pace</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik<LoginCredentials> initialValues={{
          username: "",
          password: "",
        }} onSubmit={async (values) => {
          try {
            await login(values)
          } catch (e) {
            toast.error("Failed to login")
          }
        }}>
          <Form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="text">Username</Label>
                <Field as={Input} id="text" type="text" placeholder="Enter your username" required name="username"/>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Field as={Input} id="password" type="password" required placeholder="Enter your password"
                       name="password"/>
              </div>
              <Button type="submit" className="w-full bg-primary">
                Login
              </Button>
            </div>
          </Form>

        </Formik>
      </CardContent>
    </Card>
  )
}
