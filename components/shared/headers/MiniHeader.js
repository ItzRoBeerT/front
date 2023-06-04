import {Tab, Tabs, Toolbar } from "@mui/material";
import { memo, useState } from "react";

const PAGES = ["Recents", "features"];
const MiniHeader = () => {
    const [value, setValue] = useState(0);

    return (
        <>
                <Toolbar sx={{display: 'flex', justifyContent:'center'}}>
                    <Tabs textColor="inherit" value={value} onChange={(e, value) => setValue(value)}>
                        {PAGES.map((page, index) => (
                            <Tab key={index} label={page} />
                        ))}
                    </Tabs>
                </Toolbar> 
        </>
    );
};

MiniHeader.displayName = "MiniHeader";
export default memo(MiniHeader);
