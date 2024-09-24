import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { FormControl } from '@mui/material';

type Inputs = {
    user: string
    password: string
}

const Card = styled(MuiCard)(({ theme }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }: any) => ({
  height: '100%',
  padding: 4,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

const Login = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit((data) => {
        navigate('/home');
    })}>
        <SignInContainer direction="column" justifyContent="space-between">
            <Stack
                    sx={{
                        justifyContent: 'center',
                        height: '100dvh',
                        p: 2,
                    }}
                >
                <Card variant="outlined">
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                        >
                            Sign in
                        </Typography>
                    <Box
                        component="form"
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        {/* User */}
                        <FormControl>
                            <FormLabel htmlFor="user_name">User</FormLabel>
                                <TextField
                                type="text"
                                className="form-control"
                                id="user_name"
                                {...register("user", {required: true})}
                                required
                                variant="outlined"
                                autoFocus
                                />
                        </FormControl>

                        {/* Password */}
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <TextField
                            type="password"
                            id="user_password"
                            {...register("password", {required: true})}
                            required
                            fullWidth
                            variant='outlined'
                            />
                        </FormControl>
                        {errors.user && <span>User is required</span>}
                        {errors.password && <span>Password is required</span>}
                    </Box>
                    <Button fullWidth variant="contained" type="submit">Enter</Button>
                </Card>
            </Stack>
        </SignInContainer>
    </form>
  );
};

export default Login;
