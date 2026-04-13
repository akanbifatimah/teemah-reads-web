import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  MenuBook,
} from "@mui/icons-material";

interface Props {
  onLogin: (email: string, password: string) => Promise<boolean>;
  onRegister: (email: string, password: string) => Promise<boolean>;
  loading: boolean;
  error: string;
}

export function AuthForm({ onLogin, onRegister, loading, error }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    if (!email || !password) {
      setLocalError("All fields are required");
      return;
    }
    if (mode === "register" && password !== confirm) {
      setLocalError("Passwords do not match");
      return;
    }
    if (mode === "register" && password.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return;
    }

    const ok =
      mode === "login"
        ? await onLogin(email, password)
        : await onRegister(email, password);
    if (ok) {
      setEmail("");
      setPassword("");
      setConfirm("");
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary-600 text-white rounded-2xl p-4 mb-3 shadow-lg">
            <MenuBook sx={{ fontSize: 36 }} />
          </div>
          <Typography variant="h5" className="font-semibold text-primary-900">
            BookShelf
          </Typography>
          <Typography variant="body2" className="text-blue-400 mt-1">
            Your personal reading tracker
          </Typography>
        </div>

        <Paper
          elevation={0}
          className="rounded-2xl border border-blue-100 overflow-hidden"
        >
          {/* Tab switcher */}

          <div className="p-8">
            <Typography variant="h6" className="font-semibold mb-3">
              {mode === "login" ? "Welcome back" : "Get started"}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-6">
              {mode === "login"
                ? "Sign in to access your book list"
                : "Create an account to start tracking"}
            </Typography>

            {displayError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">
                {displayError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <TextField
                label="Email address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email className="text-blue-300" fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Password"
                type={showPass ? "text" : "password"}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock className="text-blue-300" fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowPass((p) => !p)}
                        >
                          {showPass ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {mode === "register" && (
                <TextField
                  label="Confirm password"
                  type={showConfirmPass ? "text" : "password"}
                  fullWidth
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock className="text-blue-300" fontSize="small" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setShowConfirmPass((p) => !p)}
                          >
                            {showConfirmPass ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                className="mt-2 py-3 rounded-xl normal-case font-semibold text-base"
                sx={{ textTransform: "none", fontWeight: 600, py: 1.5 }}
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : mode === "login" ? (
                  "Sign in"
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            <Divider className="my-6" />

            <Typography variant="body2" className="text-center text-gray-500">
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setLocalError("");
                }}
                className="text-primary-600 font-medium cursor-pointer hover:underline"
              >
                {mode === "login" ? "Register" : "Sign in"}
              </span>
            </Typography>
          </div>
        </Paper>
      </div>
    </div>
  );
}
