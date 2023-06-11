import { Button, Divider, FormControl, FormLabel, Input, TextField } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { createNewUser } from '@/api/users';
import CSS from './FormRegister.module.scss';

const FormRegister = () => {
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

    const resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            },
            'base64'
        );
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createNewUser(user);
    };
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };
    //#endregion
    return (
        <form method="post" onSubmit={handleSubmit} className={CSS.formContent}>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <TextField
                    label="your name"
                    type="text"
                    id="name"
                    onChange={handleChange}
                    className={CSS.inputText}
                    inputProps={{
                        className: CSS.inputCustom,
                    }}
                    InputLabelProps={{
                        className: CSS.inputLabel,
                    }}
                />
                <Divider className={CSS.divider} />
                <FormLabel>Last name</FormLabel>
                <TextField
                    label="your last name"
                    type="text"
                    id="lastName"
                    onChange={handleChange}
                    inputProps={{
                        className: CSS.inputCustom,
                    }}
                    InputLabelProps={{
                        className: CSS.inputLabel,
                    }}
                />
                <Divider className={CSS.divider} />
                <FormLabel>Age</FormLabel>
                <TextField
                    label="your age"
                    type="number"
                    id="age"
                    onChange={handleChange}
                    inputProps={{
                        className: CSS.inputCustom,
                    }}
                    InputLabelProps={{
                        className: CSS.inputLabel,
                    }}
                ></TextField>
                <Divider className={CSS.divider} />

                <FormLabel>email</FormLabel>
                <Divider className={CSS.divider} />

                <TextField
                    label="your email"
                    type="text"
                    id="email"
                    onChange={handleChange}
                    inputProps={{
                        className: CSS.inputCustom,
                    }}
                    InputLabelProps={{
                        className: CSS.inputLabel,
                    }}
                ></TextField>
                <Divider className={CSS.divider} />
                <FormLabel>Password</FormLabel>
                <TextField
                    label="your password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    inputProps={{
                        className: CSS.inputCustom,
                    }}
                    InputLabelProps={{
                        className: CSS.inputLabel,
                    }}
                ></TextField>
                <Divider className={CSS.divider} />

                <FormLabel>Nickname</FormLabel>
                <TextField
                    label="your nickname"
                    type="text"
                    id="nickname"
                    onChange={handleChange}
                    inputProps={{
                        className: CSS.inputCustom,
                    }}
                    InputLabelProps={{
                        className: CSS.inputLabel,
                    }}
                ></TextField>
                <Divider className={CSS.divider} />

                <Input type="file" onChange={onFileChange} />
                {image && <Image src={image} width={200} height={200} alt={image} />}
                {error && <p>File not supported</p>}
                <Button variant="outlined" color="secondary" type="submit">
                    Submit
                </Button>
            </FormControl>
        </form>
    );
};

export default FormRegister;
