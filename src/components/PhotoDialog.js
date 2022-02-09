import {Dialog} from "@mui/material"

export const PhotoDialog = (props) => {
    const {onClose, open, item, onExited} = props

    return (
        <Dialog onClose={onClose} open={open} TransitionProps={{onExited}}>
            {item && <img style={{width: "100%"}} src={item.url} alt=""/>}
        </Dialog>
    )
}
