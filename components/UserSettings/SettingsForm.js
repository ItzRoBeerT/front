import { Button, FormControl, FormLabel, IconButton, Input, TextField } from '@mui/material';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { updateUserInfo } from '@/api/users';
import CSS from './SettingsForm.module.scss';

const SettingsForm = ({ user }) => {
    const [updates, setUpdates] = useState({});
    const token = useSelector((state) => state.auth.userToken);

    //#region FUNCTIONS
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updates === {}) return;

        const res = updateUserInfo(updates, token);
        console.log({ res });
    };

    const handleChange = (e) => {
        setUpdates({
            ...updates,
            [e.target.id]: e.target.value,
        });
    };

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
                    <br />
                    {user.avatar && <Image src={user.avatar} width={200} height={200} alt={user.avatar} />}
                    <br />
                    <IconButton component="label">
                        <input type="file" hidden />
                        <PermMediaIcon color="primary" />
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
