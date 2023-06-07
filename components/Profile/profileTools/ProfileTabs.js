import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CSS from './ProfileTabs.module.scss'

const ProfileTabs = ({onHandleTabs}) =>{

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onHandleTabs(event, newValue);
    };

    
    return(
        <Tabs value={value} onChange={handleChange} className={CSS.container}>
            <Tab className={CSS.tab} label='Posts' />
            <Tab className={CSS.tab} label='Siguiendo' />
        </Tabs>
    )

}

ProfileTabs.displayName = "ProfileTabs";
export default ProfileTabs;