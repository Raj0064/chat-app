import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import API from "@/lib/api";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.username || !form.email || !form.password) {
      return setError("All fields are required");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/auth/register",
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/login");
      }

    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed";
      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <Card className="w-full max-w-md shadow-xl border rounded-2xl">
        <CardContent className="p-6 space-y-6">

          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold">Create Account 🚀</h1>
            <p className="text-sm text-muted-foreground">
              Start chatting with your friends
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-1">
              <Label>Full Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="John Cena"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {/* 👇 NEW USERNAME FIELD */}
            <div className="space-y-1">
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                placeholder="john_cena"
                value={form.username}
                onChange={handleChange}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                Must be unique (no spaces, lowercase recommended)
              </p>
            </div>

            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="abc@gmail.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-1">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-2 rounded-xl"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
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

