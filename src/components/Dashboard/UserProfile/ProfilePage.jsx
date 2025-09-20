import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Chip,
} from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Refresh from "@mui/icons-material/Refresh";
import DeleteForever from "@mui/icons-material/DeleteForever";

const SectionCard = ({ title, children, subtitle }) => (
  <Paper elevation={0} sx={{ p: 2.5, borderRadius: 0 }}>
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ color: "#E2E8F0" }}>
        {title}
      </Typography>
      {subtitle ? (
        <Typography variant="caption" sx={{ color: "#94A3B8" }}>
          {subtitle}
        </Typography>
      ) : null}
    </Stack>
    <Divider sx={{ mb: 2, borderColor: "divider" }} />
    {children}
  </Paper>
);

function genApiKey() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function passwordStrength(pw = "") {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const clamp = Math.min(score, 5);
  const pct = (clamp / 5) * 100;
  const label =
    clamp <= 2
      ? "Weak"
      : clamp === 3
      ? "Fair"
      : clamp === 4
      ? "Good"
      : "Strong";
  const color =
    clamp <= 2
      ? "error"
      : clamp === 3
      ? "warning"
      : clamp === 4
      ? "info"
      : "success";
  return { pct, label, color };
}

export default function ProfilePage() {
  const { user, logout } = useAuth();

  // Avatar
  const [avatar, setAvatar] = useState(
    () => localStorage.getItem("profile.avatar") || ""
  );
  const onPickAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setAvatar(dataUrl);
      localStorage.setItem("profile.avatar", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Account info
  const initial = useMemo(
    () => ({
      name: user?.fullName || user?.name || "",
      email: user?.email || "",
    }),
    [user]
  );
  const [form, setForm] = useState(initial);
  useEffect(() => setForm(initial), [initial]);

  // Preferences
  const [prefs, setPrefs] = useState(() => ({
    emailAlerts: true,
    weeklyDigest: false,
    theme: localStorage.getItem("ui.theme") || "system",
    language: localStorage.getItem("ui.lang") || "en",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    twoFA: localStorage.getItem("profile.2fa") === "true",
  }));

  // API Key
  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem("profile.apiKey") || genApiKey()
  );
  useEffect(() => localStorage.setItem("profile.apiKey", apiKey), [apiKey]);

  // Security state
  const [sec, setSec] = useState({ current: "", next: "", confirm: "" });

  // Sessions (demo)
  const defaultSession = {
    id: "current",
    device: navigator.platform || "This device",
    browser: navigator.userAgent.split(" ")[0] || "Browser",
    location: "Unknown",
    lastActive: new Date().toLocaleString(),
    current: true,
  };
  const [sessions, setSessions] = useState(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("profile.sessions") || "[]"
      );
      if (!stored.find((s) => s.id === "current"))
        stored.unshift(defaultSession);
      return stored;
    } catch {
      return [defaultSession];
    }
  });
  useEffect(() => {
    localStorage.setItem("profile.sessions", JSON.stringify(sessions));
  }, [sessions]);

  // Dialogs & snack
  const [snack, setSnack] = useState(null);
  const [codesDlg, setCodesDlg] = useState(false);
  const [dangerDlg, setDangerDlg] = useState(false);
  const [dangerText, setDangerText] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSaveAccount = (e) => {
    e.preventDefault();
    setSnack({ type: "success", msg: "Account details saved (demo)." });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!sec.next || sec.next.length < 6)
      return setSnack({ type: "error", msg: "New password must be 6+ chars." });
    if (sec.next !== sec.confirm)
      return setSnack({ type: "error", msg: "Passwords do not match." });
    setSnack({ type: "success", msg: "Password updated (demo)." });
    setSec({ current: "", next: "", confirm: "" });
  };

  const handlePrefsChange = (key, val) => {
    const next = { ...prefs, [key]: val };
    setPrefs(next);
    if (key === "theme") localStorage.setItem("ui.theme", val);
    if (key === "language") localStorage.setItem("ui.lang", val);
    if (key === "twoFA") localStorage.setItem("profile.2fa", String(val));
    // Broadcast for potential listeners
    window.dispatchEvent(new CustomEvent("ui:prefs-updated", { detail: next }));
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnack({ type: "success", msg: "Copied to clipboard" });
    } catch {
      setSnack({ type: "error", msg: "Copy failed" });
    }
  };

  const regenerateKey = () => {
    const k = genApiKey();
    setApiKey(k);
    setSnack({ type: "info", msg: "API key regenerated (demo)" });
  };

  const revokeSession = (id) => {
    if (id === "current") return;
    setSessions((arr) => arr.filter((s) => s.id !== id));
    setSnack({ type: "success", msg: "Session revoked (demo)" });
  };

  const exportProfile = () => {
    const data = {
      user,
      prefs,
      apiKey,
      sessions,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profile-export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const backupCodes = useMemo(
    () =>
      Array.from({ length: 6 }, () =>
        Math.random().toString(36).slice(2, 8).toUpperCase()
      ),
    [prefs.twoFA]
  );

  const { pct, label, color } = passwordStrength(sec.next);

  return (
    <Box className="space-y-4">
      {/* Profile header */}
      <SectionCard title="Profile" subtitle="Manage your public information">
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={avatar || undefined} sx={{ width: 84, height: 84 }} />
          <Stack direction="row" spacing={1}>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              hidden
              onChange={onPickAvatar}
            />
            <label htmlFor="avatar-input">
              <Button
                variant="outlined"
                size="small"
                component="span"
                startIcon={<PhotoCamera />}
              >
                Upload Avatar
              </Button>
            </label>
            {avatar ? (
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={() => {
                  setAvatar("");
                  localStorage.removeItem("profile.avatar");
                }}
              >
                Remove
              </Button>
            ) : null}
            <Button variant="outlined" size="small" onClick={exportProfile}>
              Export Data
            </Button>
          </Stack>
        </Stack>
      </SectionCard>

      <Grid container spacing={2}>
        {/* Account */}
        <Grid item xs={12} md={6}>
          <SectionCard title="Account Information">
            <Stack component="form" spacing={2} onSubmit={handleSaveAccount}>
              <TextField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                fullWidth
                size="small"
                disabled
                helperText="Email is managed by authentication"
              />
              <Stack direction="row" spacing={1}>
                <Button type="submit" variant="contained" size="small">
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={logout}
                >
                  Logout
                </Button>
              </Stack>
            </Stack>
          </SectionCard>
        </Grid>

        {/* Security */}
        <Grid item xs={12} md={6}>
          <SectionCard title="Security" subtitle="Change password and 2FA">
            <Stack component="form" spacing={2} onSubmit={handleChangePassword}>
              <TextField
                label="Current Password"
                value={sec.current}
                onChange={(e) => setSec({ ...sec, current: e.target.value })}
                type="password"
                fullWidth
                size="small"
              />
              <TextField
                label="New Password"
                value={sec.next}
                onChange={(e) => setSec({ ...sec, next: e.target.value })}
                type="password"
                fullWidth
                size="small"
              />
              <Box>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  color={color}
                  sx={{ height: 6, borderRadius: 1, mb: 0.5 }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: "#94A3B8" }}
                >{`Strength: ${label}`}</Typography>
              </Box>
              <TextField
                label="Confirm New Password"
                value={sec.confirm}
                onChange={(e) => setSec({ ...sec, confirm: e.target.value })}
                type="password"
                fullWidth
                size="small"
              />
              <Stack direction="row" spacing={1}>
                <Button type="submit" variant="contained" size="small">
                  Update Password
                </Button>
                <FormControlLabel
                  control={
                    <Switch
                      checked={prefs.twoFA}
                      onChange={(e) =>
                        handlePrefsChange("twoFA", e.target.checked)
                      }
                    />
                  }
                  label="Enable Two-Factor"
                />
                {prefs.twoFA && (
                  <Button size="small" onClick={() => setCodesDlg(true)}>
                    Backup Codes
                  </Button>
                )}
              </Stack>
            </Stack>
          </SectionCard>
        </Grid>

        {/* Preferences */}
        <Grid item xs={12} md={6}>
          <SectionCard title="Preferences">
            <Stack spacing={2}>
              <FormControl size="small" fullWidth>
                <InputLabel id="theme-label">Theme</InputLabel>
                <Select
                  labelId="theme-label"
                  label="Theme"
                  value={prefs.theme}
                  onChange={(e) => handlePrefsChange("theme", e.target.value)}
                >
                  <MenuItem value="system">System</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="light">Light</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" fullWidth>
                <InputLabel id="lang-label">Language</InputLabel>
                <Select
                  labelId="lang-label"
                  label="Language"
                  value={prefs.language}
                  onChange={(e) =>
                    handlePrefsChange("language", e.target.value)
                  }
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" fullWidth>
                <InputLabel id="tz-label">Time Zone</InputLabel>
                <Select
                  labelId="tz-label"
                  label="Time Zone"
                  value={prefs.timezone}
                  onChange={(e) =>
                    handlePrefsChange("timezone", e.target.value)
                  }
                >
                  <MenuItem value={prefs.timezone}>{prefs.timezone}</MenuItem>
                  <MenuItem value="UTC">UTC</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={prefs.emailAlerts}
                    onChange={(e) =>
                      handlePrefsChange("emailAlerts", e.target.checked)
                    }
                  />
                }
                label="Email alerts for high-risk events"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={prefs.weeklyDigest}
                    onChange={(e) =>
                      handlePrefsChange("weeklyDigest", e.target.checked)
                    }
                  />
                }
                label="Weekly activity digest"
              />
            </Stack>
          </SectionCard>
        </Grid>

        {/* API & Developer */}
        <Grid item xs={12} md={6}>
          <SectionCard title="API Access" subtitle="Demo-only key">
            <Stack spacing={1}>
              <TextField
                label="API Key"
                value={apiKey}
                size="small"
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ContentCopy />}
                  onClick={() => copy(apiKey)}
                >
                  Copy
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  startIcon={<Refresh />}
                  onClick={regenerateKey}
                >
                  Regenerate
                </Button>
              </Stack>
              <Typography
                variant="caption"
                sx={{ color: "#94A3B8" }}
              >{`This key is stored locally for demo purposes.`}</Typography>
            </Stack>
          </SectionCard>
        </Grid>

        {/* Sessions */}
        <Grid item xs={12}>
          <SectionCard title="Sessions">
            <Stack spacing={1}>
              {sessions.map((s) => (
                <Stack
                  key={s.id}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    p: 1.25,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  <Chip
                    size="small"
                    label={s.current ? "Current" : "Active"}
                    color={s.current ? "success" : "default"}
                  />
                  <Typography sx={{ color: "#CBD5E1" }} variant="body2">
                    {s.device}
                  </Typography>
                  <Typography sx={{ color: "#64748B" }} variant="body2">
                    • {s.browser}
                  </Typography>
                  <Typography sx={{ color: "#64748B" }} variant="body2">
                    • {s.location}
                  </Typography>
                  <Typography sx={{ color: "#64748B" }} variant="body2">
                    • Last active: {s.lastActive}
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    disabled={s.current}
                    onClick={() => revokeSession(s.id)}
                  >
                    Revoke
                  </Button>
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>

        {/* Danger Zone */}
        <Grid item xs={12}>
          <SectionCard title="Danger Zone">
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteForever />}
                onClick={() => setDangerDlg(true)}
              >
                Delete Account
              </Button>
              <Typography
                variant="caption"
                sx={{ color: "#94A3B8", alignSelf: "center" }}
              >
                Permanently remove your account (demo only).
              </Typography>
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>

      {/* Backup Codes Dialog */}
      <Dialog open={codesDlg} onClose={() => setCodesDlg(false)}>
        <DialogTitle>Two-Factor Backup Codes</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Store these codes in a safe place. Each code can be used once.
          </Typography>
          <Stack spacing={1}>
            {backupCodes.map((c) => (
              <Stack key={c} direction="row" spacing={1} alignItems="center">
                <TextField
                  size="small"
                  value={c}
                  InputProps={{ readOnly: true }}
                />
                <Button size="small" onClick={() => copy(c)}>
                  Copy
                </Button>
              </Stack>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCodesDlg(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Danger Dialog */}
      <Dialog open={dangerDlg} onClose={() => setDangerDlg(false)}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Type DELETE to confirm. This is a demo; no real deletion occurs.
          </Typography>
          <TextField
            size="small"
            fullWidth
            value={dangerText}
            onChange={(e) => setDangerText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDangerDlg(false)}>Cancel</Button>
          <Button
            color="error"
            disabled={dangerText !== "DELETE"}
            onClick={() => {
              setDangerDlg(false);
              setSnack({ type: "success", msg: "Account deletion simulated." });
              setDangerText("");
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!snack}
        autoHideDuration={2500}
        onClose={() => setSnack(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {snack ? (
          <Alert
            onClose={() => setSnack(null)}
            severity={snack.type}
            sx={{ width: "100%" }}
          >
            {snack.msg}
          </Alert>
        ) : null}
      </Snackbar>
    </Box>
  );
}
