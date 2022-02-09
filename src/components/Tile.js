import {Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@mui/material"
import Icon from "@mui/material/Icon"

export const Tile = (props) => {
    const {item, onRemove, onClick} = props

    return (
        <Card>
            <CardHeader
                action={
                    <IconButton onClick={onRemove}>
                        <Icon>close</Icon>
                    </IconButton>
                }
            />
            <CardActionArea onClick={onClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={item.thumbnailUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" noWrap>
                        {item.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}