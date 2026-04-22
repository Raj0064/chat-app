import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const {setUser}=useAuth();

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", input, {
        withCredentials: true,
      });

      console.log(res.data);
      if (res.data.success) {
        setUser(res.data.user);
        navigate("/");
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
            <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
            <p className="text-muted-foreground text-sm">
              Login to continue chatting
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-4">

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
              Login
            </Button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  );
};

export default Login;