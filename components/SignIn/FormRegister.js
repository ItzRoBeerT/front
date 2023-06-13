import { Avatar, Button, Divider, FormControl, FormLabel, IconButton, Input, TextField } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { createNewUser } from '@/api/users';
import CSS from './FormRegister.module.scss';
import styled from '@emotion/styled';
import ModalAreYouSure from '../Modal/ModalAreYouSure';
import { useRouter } from 'next/router';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'rgb(41, 41, 190)',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgb(41, 41, 190)',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#E0E3E7',
        },
    },
});

const NICKNAMESNOTALLOWED = ['admin', 'post', 'register', 'settings', 'search'];

const FormRegister = ({ nicknames, emails }) => {
    //#region VARIABLES
    const [image, setImage] = useState('');
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        age: 0,
        email: '',
        password: '',
        nickname: '',
    });
    const [error, setError] = useState(false);
    const [errorNickname, setErrorNickname] = useState(false);
    const [lblNicknameError, setLblNicknameError] = useState('Nickname already exists');
    const [errorEmail, setErrorEmail] = useState(false);
    const [lblEmailError, setLblEmailError] = useState('Email already exists');
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorAge, setErrorAge] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorLastName, setErrorLastName] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalError, setOpenModalError] = useState(false);
    const router = useRouter();
    //#endregion

    //#region FUNCTIONS
    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            if (file.type.includes('image')) {
                try {
                    const resizedImage = await resizeFile(file);
                    setUser({
                        ...user,
                        avatar: resizedImage,
                    });
                    setImage(resizedImage);
                } catch (error) {
                    console.log(error);
                }
            } else {
                delete user.avatar;
                setImage(null);
                setError(true);
            }
        }
    };

    const getAgeFromDate = (date) => {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleModal = (value) => {
        setOpenModal(value);
    };
    const handleModalError = (value) => {
        setOpenModalError(value);
    };
    const goToHome = () => {
        router.push('/');
    };

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                'JPEG',
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                'base64'
            );
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.name === '' || user.lastName === '' || user.email === '' || user.password === '' || user.age === 0 || user.nickname === '') {
            if (user.name === '') {
                setErrorName(true);
            }
            if (user.lastName === '') {
                setErrorLastName(true);
            }
            if (user.email === '') {
                setErrorEmail(true);
                setLblEmailError('Email is required');
            }
            if (user.password === '') {
                setErrorPassword(true);
            }
            if (user.age === 0) {
                setErrorAge(true);
            }
            if (user.nickname === '') {
                setErrorNickname(true);
                setLblNicknameError('Nickname is required');
            }
            handleModalError(true);
            return;
        }

        if (errorNickname || error) {
            handleModalError(true);
            return;
        }
        const res = await createNewUser(user);
        if (res) {
            handleModal(true);
        }
    };

    const handleChange = (e) => {
        if (e.target.id === 'nickname' && NICKNAMESNOTALLOWED.includes(e.target.value)) {
            setErrorNickname(true);
            setLblNicknameError('Nickname not allowed');
        } else if (nicknames.includes(e.target.value)) {
            setErrorNickname(true);
            setLblNicknameError('Nickname already exists');
        } else {
            setErrorNickname(false);
        }

        if (e.target.id === 'email' && emails.includes(e.target.value)) {
            setErrorEmail(true);
            setLblEmailError('Email already exists');
        } else {
            setErrorEmail(false);
        }

        if (e.target.id === 'age') {
            const age = getAgeFromDate(e.target.value);

            setUser({
                ...user,
                age,
            });
        } else {
            setUser({
                ...user,
                [e.target.id]: e.target.value,
            });
        }
    };
    //#endregion
    return (
        <form method="post" onSubmit={handleSubmit} className={CSS.formContent}>
            <FormControl>
                <div className={`${CSS.flex}`}>
                    <div className={CSS.contentData}>
                        <div className={CSS.flex3}>
                            <div className={`${CSS.flex} ${CSS.gap10} ${CSS.mt10}`}>
                                <CssTextField
                                    error={errorName}
                                    helperText={errorName ? 'Name is required' : ''}
                                    label="your name"
                                    type="text"
                                    id="name"
                                    onChange={handleChange}
                                    className={CSS.flex1}
                                    inputProps={{
                                        className: CSS.inputCustom,
                                    }}
                                    InputLabelProps={{
                                        className: CSS.inputLabel,
                                    }}
                                />
                                <CssTextField
                                    label="your last name"
                                    error={errorLastName}
                                    helperText={errorLastName ? 'Last name is required' : ''}
                                    type="text"
                                    id="lastName"
                                    className={CSS.flex1}
                                    onChange={handleChange}
                                    inputProps={{
                                        className: CSS.inputCustom,
                                    }}
                                    InputLabelProps={{
                                        className: CSS.inputLabel,
                                    }}
                                />
                                <CssTextField
                                    error={errorNickname}
                                    helperText={errorNickname ? lblNicknameError : ''}
                                    label="your nickname"
                                    type="text"
                                    id="nickname"
                                    className={CSS.flex1}
                                    onChange={handleChange}
                                    inputProps={{
                                        className: CSS.inputCustom,
                                    }}
                                    InputLabelProps={{
                                        className: CSS.inputLabel,
                                    }}
                                ></CssTextField>
                            </div>

                            <div className={`${CSS.flex} ${CSS.gap10} ${CSS.mt10}`}>
                                <CssTextField
                                    label="your email"
                                    error={errorEmail}
                                    helperText={errorEmail ? lblEmailError : ''}
                                    type="text"
                                    id="email"
                                    onChange={handleChange}
                                    className={CSS.flex2}
                                    inputProps={{
                                        className: CSS.inputCustom,
                                    }}
                                    InputLabelProps={{
                                        className: CSS.inputLabel,
                                    }}
                                ></CssTextField>
                                <CssTextField
                                    label="your password"
                                    error={errorPassword}
                                    helperText={errorPassword ? 'Password is required' : ''}
                                    type="password"
                                    id="password"
                                    className={CSS.flex1}
                                    onChange={handleChange}
                                    inputProps={{
                                        className: CSS.inputCustom,
                                    }}
                                    InputLabelProps={{
                                        className: CSS.inputLabel,
                                    }}
                                ></CssTextField>
                                <CssTextField
                                    type="date"
                                    error={errorAge}
                                    helperText={errorAge ? 'Age is required' : ''}
                                    id="age"
                                    className={CSS.flex1}
                                    onChange={handleChange}
                                    inputProps={{
                                        className: CSS.inputCustom,
                                    }}
                                    InputLabelProps={{
                                        className: CSS.inputLabel,
                                    }}
                                ></CssTextField>
                            </div>
                            <Button variant="outlined" color="secondary" type="submit" sx={{ marginTop: '10px' }}>
                                Submit
                            </Button>
                        </div>
                    </div>

                    <div className={CSS.contentImage + ' ' + CSS.flexSpace}>
                        <IconButton>
                            <IconButton component="label">
                                <input type="file" hidden onChange={onFileChange} />
                                {image !== null ? (
                                    <Avatar src={image} sx={{ width: '100px', height: '100px' }} width={100} height={100} alt={image} />
                                ) : (
                                    <Avatar sx={{ width: '100px', height: '100px' }} width={100} height={100} alt={'default'} />
                                )}
                            </IconButton>
                        </IconButton>
                    </div>
                </div>
            </FormControl>
            <ModalAreYouSure
                title={'Account created successfully'}
                contentText={'Your account has been created successfully, you can now log in'}
                open={openModal}
                withOptions={false}
                onSetOpen={handleModal}
                handleEvent={goToHome}
            />
            <ModalAreYouSure
                title={'There was an error creating your account'}
                contentText={'Check that the data is correct and try again'}
                open={openModalError}
                withOptions={false}
                onSetOpen={handleModalError}
            />
        </form>
    );
};

export default FormRegister;
