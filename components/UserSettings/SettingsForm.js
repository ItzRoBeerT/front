import { Avatar, Button, FormControl, FormLabel, IconButton, Input, TextField, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import { deleteAccount, updateUserInfo } from '@/api/users';
import CSS from './SettingsForm.module.scss';
import authSlice from '@/store/auth-slice';
import UserAvatar from '../shared/headers/headerTools/UserAvatar';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import ModalAreYouSure from '../Modal/ModalAreYouSure';

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

const CssTextFieldDisabled = styled(TextField)({
    '& label.Mui-focused': {
        color: 'rgb(41, 41, 190)',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'red',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgb(41, 41, 190)',
        },
        '&:hover fieldset': {
            borderColor: 'red',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#E0E3E7',
        },
    },
});

const SettingsForm = ({ user }) => {
    const [updates, setUpdates] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [confirmPwd, setConfirmPwd] = useState('');
    const [errorPwd, setErrorPwd] = useState(false);
    const [openDialogCorrect , setOpenDialogCorrect] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const token = useSelector((state) => state.auth.userToken);
    

    //#region FUNCTIONS
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updates === {}) return;

        console.log({confirmPwd, realPwd: updates.password});
        if (confirmPwd !== updates.password) {
            setErrorPwd(true);
            return;
        }

        setErrorPwd(false);

        const res = await updateUserInfo(updates, token);
        if (res) {
            dispatch(authSlice.actions.updateUser(res));
            setOpenDialogCorrect(true);
        }
    };

    const handleChange = (e) => {
        if (e.target.id === 'date') {
            const age = getAgeFromDate(e.target.value);
            setUpdates({
                ...updates,
                age: age,
            });
        } else {
            setUpdates({
                ...updates,
                [e.target.id]: e.target.value,
            });
        }
    };

   
    const handleRepeatPwd = (e) => {
        setConfirmPwd(e.target.value);
    }

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

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type.includes('image')) {
                try {
                    const resizedImage = await resizeFile(file); // Llama a la función resizeFile
                    setUpdates({
                        ...updates,
                        avatar: resizedImage,
                    });
                    setAvatar(resizedImage);
                } catch (error) {
                    console.log(error);
                }
            } else {
                delete updates.avatar;
                setAvatar(null);
            }
        }
    };

    const handleDialog = (value) => {
        setOpenDialog(value);
    };
    const handleDialogCorrect = (value) => {
        setOpenDialogCorrect(value);
    };

    const goToProfile = () => {
        router.push('/'+user.nickname);
    }

    const handleDeleteAccount = async () => {
        const res = await deleteAccount(token);
        if (res) {
            dispatch(authSlice.actions.logout());
            router.push('/');
        }
    };
    const getDateFromAge = (age) => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - age);
        return date.toISOString().split('T')[0];
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

    //#endregion

    return (
        <form method="post" onSubmit={handleSubmit}>
            <FormControl className={CSS.formControl}>
                <div className={CSS.flex+ ' ' + CSS.centrar}>
                    <div className={CSS.contentData}>
                        <div className={`${CSS.mainData} ${CSS.flex3}`}>
                            <div className={`${CSS.flex} ${CSS.gap10} ${CSS.mt10}`}>
                                <CssTextField
                                    label="your name"
                                    type="text"
                                    id="name"
                                    defaultValue={user.name}
                                    onChange={handleChange}
                                    className={CSS.flex1}
                                    inputProps={{ className: CSS.inputName }}
                                    InputLabelProps={{ className: CSS.labelName }}
                                />
                                <CssTextField
                                    label="your last name"
                                    type="text"
                                    id="lastName"
                                    className={CSS.flex1}
                                    defaultValue={user.lastName}
                                    onChange={handleChange}
                                    inputProps={{ className: CSS.inputLastName }}
                                    InputLabelProps={{ className: CSS.labelLastName }}
                                />
                            </div>
                            <div className={`${CSS.flex} ${CSS.gap10} ${CSS.mt10}`}>
                                <CssTextField
                                    label="your email"
                                    type="text"
                                    id="email"
                                    className={CSS.flex3}
                                    defaultValue={user.email}
                                    onChange={handleChange}
                                    inputProps={{ className: CSS.inputEmail }}
                                    InputLabelProps={{ className: CSS.labelEmail }}
                                />

                                <CssTextField
                                    type="date"
                                    id="age"
                                    className={CSS.flex1}
                                    defaultValue={getDateFromAge(user.age)}
                                    onChange={handleChange}
                                    inputProps={{ className: CSS.inputAge }}
                                    InputLabelProps={{ className: CSS.labelAge }}
                                />
                            </div>
                            <div className={`${CSS.flex} ${CSS.gap10} ${CSS.mt10}`}>
                                <CssTextField
                                    label="your password"
                                    error={errorPwd}
                                    helperText={errorPwd ? 'Passwords do not match' : ''}
                                    type="password"
                                    id="password"
                                    className={CSS.flex1}
                                    defaultValue={user.password}
                                    onChange={handleChange}
                                    inputProps={{ className: CSS.inputPassword }}
                                    InputLabelProps={{ className: CSS.labelPassword }}
                                />

                                <CssTextField
                                    label="repeat password"
                                    error={errorPwd}
                                    helperText={errorPwd ? 'Passwords do not match' : ''}
                                    type="password"
                                    id="repeatPassword"
                                    className={CSS.flex1}
                                    onChange={handleRepeatPwd}
                                    inputProps={{ className: CSS.inputPassword }}
                                    InputLabelProps={{ className: CSS.labelPassword }}
                                />
                            </div>
                        </div>

                        <div className={`${CSS.flex} ${CSS.gap10} ${CSS.mt10}`}>
                            <TextareaAutosize
                                type="text"
                                placeholder="Tell us about yourself..."
                                id="bio"
                                minRows={5}
                                maxRows={5}
                                maxLength={200}
                                className={`${CSS.flex1} ${CSS.textArea}`}
                                defaultValue={user.bio}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={CSS.contentImage + ' ' + CSS.flexSpace}>
                        <IconButton>
                            <IconButton component="label">
                                <input type="file" hidden onChange={onFileChange} />
                                {avatar !== null ? (
                                    <Avatar src={avatar} sx={{ width: '100px', height: '100px' }} width={100} height={100} alt={avatar} />
                                ) : user.avatar ? (
                                    <Avatar src={user.avatar} sx={{ width: '100px', height: '100px' }} width={100} height={100} alt={user.avatar} />
                                ) : (
                                    <UserAvatar isStringAvatar={false} />
                                )}
                            </IconButton>
                        </IconButton>
                        <div className={CSS.nickNameContent}>
                            <CssTextFieldDisabled
                                label="your nickname"
                                type="text"
                                id="nickname"
                                disabled
                                sx={{
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        WebkitTextFillColor: 'white',
                                    },
                                    flex: 1,
                                }}
                                defaultValue={user.nickname}
                                inputProps={{ className: CSS.inputNickname }}
                                InputLabelProps={{ className: CSS.labelNickname }}
                            />
                        </div>

                        <div className={`${CSS.flex} ${CSS.gap10} ${CSS.mt10} ${CSS.pl10}`}>
                            <Button type="submit" variant="outlined" color="secondary">
                                Save
                            </Button>
                            <Button type="button" variant="outlined" color="error" onClick={() => handleDialog(true)}>
                                Delete
                            </Button>
                            <ModalAreYouSure
                                title={'DELETE ACCOUNT'}
                                contentText={'Are you sure you want to delete your account?'}
                                open={openDialog}
                                onSetOpen={handleDialog}
                                handleEvent={handleDeleteAccount}
                            />
                             <ModalAreYouSure
                                title={'ACCOUNT  UPDATED'}
                                contentText={'Your account has been updated successfully'}
                                open={openDialogCorrect}
                                withOptions={false}
                                onSetOpen={handleDialogCorrect}
                                handleEvent={goToProfile}
                            />
                        </div>
                    </div>
                </div>
            </FormControl>
        </form>
    );
};

SettingsForm.displayName = 'SettingsForm';
export default SettingsForm;
