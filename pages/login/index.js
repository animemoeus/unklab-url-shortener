import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import Cookies from "js-cookie";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://instagram.com/arter_tendean/">
        Unklab URL Shortener
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const router = useRouter();

  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  // force redirect to home page if the user is authenticated
  useEffect(() => {
    if (accessToken !== undefined) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // handle login button click
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    // post data payload
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    // API calling
    fetch("https://uus.animemoe.us/api/account/login/", requestOptions)
      .then((response) => {
        if (!response.ok) {
          alert("Invalid email or password.");
          return null;
        } else {
          return response.json();
        }
      })
      .then((result) => {
        if (result !== null) {
          Cookies.set("name", result.name, { expires: 20 });
          Cookies.set("email", result.email, { expires: 20 });
          Cookies.set("accessToken", result.access, { expires: 20 });
          setAccessToken(result.access);
        }
      })
      .catch((error) => {
        alert("Invalid email or password.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_siteName} | Login</title>
      </Head>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Unklab URL Shortener
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Login Button */}
            {isLoading === false && (
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Masuk
              </Button>
            )}
            {isLoading === true && (
              <LoadingButton
                loadingPosition="start"
                loading
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                startIcon={<SaveIcon />}
                disabled
              >
                Masuk
              </LoadingButton>
            )}
            {/* End Login Button */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
                <NextLink href="/register" passHref>
                  <Link variant="body2">Belum memiliki akun? Mendaftar</Link>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
