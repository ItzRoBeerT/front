import { Button, FormControl, FormLabel, Input, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { createNewUser } from "@/api/users";

const FormRegister = () => {
    //#region VARIABLES
    const [image, setImage] = useState("");
    const [user, setUser] = useState({
        name: "",
        lastName: "",
        age: 0,
        email: "",
        password: "",
        nickname: "",
    });
    const [error, setError] = useState(false);
    //#endregion

    //#region FUNCTIONS
    const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            if (file.type.includes("image")) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function load() {
                    setUser({
                        ...user,
                        avatar: reader.result,
                    });
                    setImage(reader.result);
                    setError(false);
                };
            } else {
                console.log("it is not an image");
                delete user.avatar;
                setImage(null);
                setError(true);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        const res = await createNewUser(user);
        console.log(res);
    };
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };
    //#endregion
    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <TextField label="your name" type="text" id="name" onChange={handleChange} />
                <FormLabel>Last name</FormLabel>
                <TextField label="your last name" type="text" id="lastName" onChange={handleChange} />
                <FormLabel>Age</FormLabel>
                <TextField label="your age" type="number" id="age" onChange={handleChange}></TextField>
                <FormLabel>email</FormLabel>
                <TextField label="your email" type="text" id="email" onChange={handleChange}></TextField>
                <FormLabel>Password</FormLabel>
                <TextField label="your password" type="password" id="password" onChange={handleChange}></TextField>
                <FormLabel>Nickname</FormLabel>
                <TextField label="your nickname" type="text" id="nickname" onChange={handleChange}></TextField>
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
