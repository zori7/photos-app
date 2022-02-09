import {Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Pagination, Select} from "@mui/material"
import {useEffect, useMemo, useState} from "react"
import {usePagination} from "./hooks/usePagination"
import {Tile} from "./components/Tile"
import {PhotoDialog} from "./components/PhotoDialog"

function App() {
    const [photos, setPhotos] = useState([])
    const [page, setPage] = useState(1)
    const [selectedAlbum, setSelectedAlbum] = useState("")
    const [dialogOpened, setDialogOpened] = useState(false)
    const [dialogItem, setDialogItem] = useState(null)

    const filteredPhotos = useMemo(() => {
        if (selectedAlbum) {
            return photos.filter((item) => item.albumId === selectedAlbum)
        }

        return photos
    }, [photos, selectedAlbum])

    const availableAlbums = useMemo(() => {
        const albums = []

        photos.forEach((item) => {
            if (!albums.includes(item.albumId)) {
                albums.push(item.albumId)
            }
        })

        return albums
    }, [photos])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/photos")
            .then((res) => res.json())
            .then((data) => {
                setPhotos(data)
            })
    }, [])

    const {count, items} = usePagination(filteredPhotos, page, 24)

    const onPageChange = (_, value) => {
        setPage(value)
    }

    const onRemoveItem = (id) => () => {
        setPhotos(photos.filter((item) => item.id !== id))
    }

    const onAlbumSelect = (e) => {
        setSelectedAlbum(e.target.value)
    }

    const resetAlbumSelect = () => {
        setSelectedAlbum("")
    }

    const onDialogOpen = (item) => () => {
        setDialogItem(item)
        setDialogOpened(true)
    }

    const onDialogClose = () => {
        setDialogOpened(false)
    }

    const onDialogExited = () => {
        setDialogItem(null)
    }

    return (
        <Container>
            <Box marginY={2}>
                <FormControl>
                    <InputLabel id="album-select-label">Album</InputLabel>
                    <Select
                        labelId="album-select-label"
                        value={selectedAlbum}
                        label="Album"
                        onChange={onAlbumSelect}
                        sx={{minWidth: "120px"}}
                    >
                        {availableAlbums.map((albumId) => (
                            <MenuItem value={albumId} key={albumId}>{albumId}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedAlbum && (
                    <Button sx={{marginLeft: "1rem"}} onClick={resetAlbumSelect}>All</Button>
                )}
            </Box>
            <Box style={{display: "flex", justifyContent: "center"}}>
                <Pagination count={count} page={page} onChange={onPageChange}/>
            </Box>
            <Grid container spacing={2} marginY={4}>
                {items.map((item) => (
                    <Grid item xs={12} sm={6} md={3} lg={2} key={item.id}>
                        <Tile item={item} onRemove={onRemoveItem(item.id)} onClick={onDialogOpen(item)}/>
                    </Grid>
                ))}
            </Grid>

            <PhotoDialog open={dialogOpened} onClose={onDialogClose} item={dialogItem} onExited={onDialogExited}/>
        </Container>
    )
}

export default App
