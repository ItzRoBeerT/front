import {Tab, Tabs, Toolbar } from "@mui/material";
import { memo, useState } from "react";

const PAGES = ["Recents", "features"];
const MiniHeader = ({onSendValue}) => {
    const [value, setValue] = useState(0);

    const handlechange = async (e, value) => {
        setValue(value);
        onSendValue(value);
    };

    return (
        <>
                <Toolbar sx={{display: 'flex', justifyContent:'center'}}>
                    <Tabs textColor="inherit" value={value} onChange={handlechange}>
                        {PAGES.map((page, index) => (
                            <Tab key={index} label={page} />
                        ))}
                    </Tabs>
                </Toolbar> 
        </>
    );
};

MiniHeader.displayName = "MiniHeader";
export default MiniHeader;
