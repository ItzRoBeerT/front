import { Tab, Tabs } from "@mui/material";
import { useState } from "react";



const ProfileTabs = () =>{

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    
    return(
        <Tabs value={value} onChange={handleChange}>
            <Tab label='Posts' />
            <Tab label='Siguiendo' />
        </Tabs>
    )

}

ProfileTabs.displayName = "ProfileTabs";
export default ProfileTabs;