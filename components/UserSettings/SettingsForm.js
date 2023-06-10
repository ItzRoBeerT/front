import { Avatar, Button, FormControl, FormLabel, IconButton, Input, TextField } from '@mui/material';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import { updateUserInfo } from '@/api/users';
import CSS from './SettingsForm.module.scss';
import authSlice from '@/store/auth-slice';
import UserAvatar from '../shared/headers/headerTools/UserAvatar';

const SettingsForm = ({ user }) => {
    const [updates, setUpdates] = useState({});
    const [avatar, setAvatar] = useState(null);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.userToken);

    //#region FUNCTIONS
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updates === {}) return;

        console.log({ updates });
        const res = await updateUserInfo(updates, token);
        if (res) {
            dispatch(authSlice.actions.updateUser(res));
        }
    };

    const handleChange = (e) => {
        setUpdates({
            ...updates,
            [e.target.id]: e.target.value,
        });
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

    const resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            },
            'base64'
        );
    });

    //#endregion

    return (
        <form method="post" onSubmit={handleSubmit}>
            <FormControl className={CSS.formControl}>
                <FormLabel>Username</FormLabel>
                <TextField
                    label="your name"
                    type="text"
                    id="name"
                    defaultValue={user.name}
                    onChange={handleChange}
                    className={CSS.textField}
                    inputProps={{ className: CSS.inputName }}
                    InputLabelProps={{ className: CSS.labelName }}
                />
                <FormLabel>Last name</FormLabel>
                <TextField
                    label="your last name"
                    type="text"
                    id="lastName"
                    defaultValue={user.lastName}
                    onChange={handleChange}
                    inputProps={{ className: CSS.inputLastName }}
                    InputLabelProps={{ className: CSS.labelLastName }}
                />
                <FormLabel>Bio</FormLabel>
                <TextField
                    label="your bio"
                    type="text"
                    id="bio"
                    defaultValue={user.bio}
                    onChange={handleChange}
                    inputProps={{ className: CSS.inputBio }}
                    InputLabelProps={{ className: CSS.labelBio }}
                />
           
              
                <FormLabel>Age</FormLabel>
                <TextField
                    label="your age"
                    type="number"
                    id="age"
                    defaultValue={user.age}
                    onChange={handleChange}
                    inputProps={{ className: CSS.inputAge }}
                    InputLabelProps={{ className: CSS.labelAge }}
                />
                <FormLabel>email</FormLabel>
                <TextField
                    label="your email"
                    type="text"
                    id="email"
                    defaultValue={user.email}
                    onChange={handleChange}
                    inputProps={{ className: CSS.inputEmail }}
                    InputLabelProps={{ className: CSS.labelEmail }}
                />
                <FormLabel>Password</FormLabel>
                <TextField
                    label="your password"
                    type="password"
                    id="password"
                    defaultValue={user.password}
                    onChange={handleChange}
                    inputProps={{ className: CSS.inputPassword }}
                    InputLabelProps={{ className: CSS.labelPassword }}
                />
                <FormLabel>Nickname</FormLabel>
                <TextField
                    label="your nickname"
                    type="text"
                    id="nickname"
                    defaultValue={user.nickname}
                    className={CSS.test}
                    disabled
                    inputProps={{ className: CSS.inputNickname }}
                    InputLabelProps={{ className: CSS.labelNickname }}
                />
                <IconButton>
                    <IconButton component="label">
                        <input type="file" hidden onChange={onFileChange} />
                        {avatar !== null ? (
                            <Avatar src={avatar} sx={{width: '200px', height: '200px'}} width={200} height={200} alt={avatar} />
                        ) : user.avatar ? (
                            <Avatar src={user.avatar} sx={{width: '200px', height: '200px'}} width={200} height={200} alt={user.avatar} />
                        ) : (
                            <UserAvatar  isStringAvatar={false} />
                        )}
                    </IconButton>
                </IconButton>
                <Button type="submit" variant="outlined">
                    Save
                </Button>
            </FormControl>
        </form>
    );
};

SettingsForm.displayName = 'SettingsForm';
export default SettingsForm;
