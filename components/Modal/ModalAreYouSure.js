import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ModalAreYouSure = ({ title, contentText, open, onSetOpen, handleEvent, withOptions = true }) => {
    const handleClose = () => {
        onSetOpen(false);
    };

    const handleYes = () => {
        handleEvent();
        handleClose();
    };
    const handleOk = () => {
        if (handleEvent) handleEvent();
        handleClose();
    };

    return withOptions ? (
        <Dialog open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">{contentText}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="error">
                    No
                </Button>
                <Button onClick={handleYes}>YES</Button>
            </DialogActions>
        </Dialog>
    ) : (
        <Dialog open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">{contentText}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOk}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalAreYouSure;
