import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "@/lib/api";

const SignUp = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", input, {
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">

      <Card className="w-full max-w-md shadow-xl border rounded-2xl">
        <CardContent className="p-6 space-y-6">

          {/* Title */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold">Create Account 🚀</h1>
            <p className="text-muted-foreground text-sm">
              Start chatting with your friends
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-4">

            <div className="space-y-1">
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="John Cena"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>

            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="abc@gmail.com"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
              />
            </div>

            <div className="space-y-1">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
              />
            </div>

            <Button className="w-full mt-2 rounded-xl">
              Sign Up
            </Button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;