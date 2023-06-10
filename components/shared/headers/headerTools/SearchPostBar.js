import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

//#region  COMPONENTS
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
//#endregion

const SearchPostBar = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const token = useSelector((state) => state.auth.token);

    //#region  FUNCTIONS
    const changeSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchEnter = async (e) => {
        if (e.key === 'Enter' && search !== '') {
            router.push({pathname: '/search', query: {key: search}});
        }
    };

    const handleSearchClick = async (e) => {
        if (search !== ''){
            router.push({pathname: '/search', query: {key: search}});

        } 
    };

    //#endregion
    return (
        <Search>
            <IconButton onClick={handleSearchClick}>
                <SearchIcon sx={{ color: 'white' }} />
            </IconButton>
            <StyledInputBase value={search} onChange={changeSearch} onKeyDown={handleSearchEnter} placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Search>
    );
};

SearchPostBar.displayName = 'SearchPostBar';
export default SearchPostBar;
