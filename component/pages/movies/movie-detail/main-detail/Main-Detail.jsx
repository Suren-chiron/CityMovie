import { useEffect } from 'react'
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { setTrailer } from '@/redux/reducers/trailermovie';
import ImageMovie from "./Image-Movie";
import DurationExchange from "@/utils/DurationExchange";
import Rating from "@/utils/Rating";
import PlayTrailer from "./Play-Trailer";
import BackgroundMovie from "./Background-Movie";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";

export const BeforeDot = styled('div')(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5px"
    },
    [theme.breakpoints.up("md")]: {
        display: "flex", justifyContent: "center", alignItems: "center", ":before": {
            fontSize: "1em", lineHeight: '1', content: '"•"', width: "100%", height: "100%", display: "flex", margin: "0 6px"
        }
    }
}));

const MainDetail = ({ movie }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setTrailer([]))
    }, [])

    return (
        <>
            <BackgroundMovie movie={movie}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center" }}>
                    <ImageMovie image={movie.title.image.url} title={movie.title.title} />
                    <Box sx={{ ml: { md: "2rem", xs: "0" }, px: { xs: "10px", lg: "0" }, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", width: "100%" }}>
                        <Box sx={{ mt: { xs: "1rem", md: "0" } }}>
                            <Typography variant="h4">{movie.title.title}  {" "} <span style={{ opacity: ".8" }}>({movie.title.year})</span></Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start", alignItems: { lg: "center", xs: "start" }, flexDirection: { xs: "column", md: "row" }, mt: { xs: "1rem", lg: "5px" } }}>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {movie.certificates ?
                                    <>
                                        {movie.certificates.US[0] ?
                                            <span style={{ border: "1px solid gray", borderRadius: "5px", padding: "0 2px", marginRight: "6px", color: "gray" }}>
                                                {movie.certificates.US[0].certificate}
                                            </span>
                                            : ""}
                                    </>
                                    : ""}
                                <Typography variant="body1">
                                    {movie.releaseDate.length !== 0 && movie.releaseDate !== undefined ? <>{movie.releaseDate}</> : ""}
                                </Typography>
                            </Box>
                            {movie.genres.length !== 0 && movie.genres !== undefined ?
                                <BeforeDot>
                                    {movie.genres.length >= 4 ?
                                        <>
                                            <Typography variant='body1' display={{ xs: "inline", md: "none" }}>Episodes : </Typography>
                                            {movie.genres.slice(0, 4).map((genre, item) => <Link href={`/category/${genre}`} key={item}><Typography variant="body1" sx={{ mx: "2px" }}>{genre}{(item + 1) === 4 ? "" : ","}</Typography></Link>)}
                                        </> :
                                        <>
                                            <Typography variant='body1' display={{ xs: "inline", md: "none" }}>Genres : </Typography>
                                            {movie.genres.map((genre, item) => <Link href={`/category/${genre}`} key={item}><Typography variant="body1" sx={{ mx: "2px" }}>{genre}{(item + 1) === movie.genres.length ? "" : ","}</Typography></Link>)}
                                        </>
                                    }
                                </BeforeDot>
                                : ""}
                            {movie.title.titleType === "movie" ? <>
                                {movie.title.runningTimeInMinutes ?
                                    <BeforeDot>
                                        <DurationExchange duration={movie.title.runningTimeInMinutes} />
                                    </BeforeDot>
                                    : ""}
                            </> :
                                <>
                                    {movie.title.numberOfEpisodes ?
                                        <BeforeDot>
                                            <Typography variant='body1' display={{ xs: "inline", md: "none" }} sx={{ mr: '5px' }}>Episodes : </Typography>
                                            <Typography variant='body1'>{movie.title.numberOfEpisodes}<Box component={"span"} sx={{ ml: '5px', display: { xs: "none", md: "inline" } }}>Episodes</Box></Typography>
                                        </BeforeDot>
                                        : ""}
                                </>
                            }
                        </Box>
                        <Box sx={{ display: "flex", mt: { xs: "1rem", lg: "2rem" }, alignItems: "center", justifyContent: "center" }}>
                            {movie.ratings.rating ?
                                <Box sx={{ display: 'flex', mr: "1rem" }}>
                                    <Rating rate={movie.ratings.rating * 10} />
                                    <Box sx={{ ml: "10px" }}>
                                        <Typography variant="body2">User</Typography>
                                        <Typography variant="body2">Score</Typography>
                                    </Box>
                                </Box>
                                : ""}
                            <PlayTrailer image={movie.title.image.url} id={movie.title.id} />
                        </Box>
                        <Box sx={{ mt: "2rem" }}>
                            {movie.plotSummary ?
                                <>
                                    <Typography variant="h6">Overview</Typography>
                                    <Box>
                                        <Typography variant="body1" sx={{ mt: "10px", color: "#c8c8c8", fontWeight: "400 !important", }}>{movie.plotSummary.text.split(".")[0].length >= 30 ? movie.plotSummary.text.split(".")[0] : <>{movie.plotSummary.text.split(".")[1] ? movie.plotSummary.text.split(".")[1] : ""}</>}</Typography>
                                    </Box>
                                </>
                                :
                                <>
                                    {movie.plotOutline ?
                                        <>
                                            <Typography variant="h6">Overview</Typography>
                                            <Box>
                                                <Typography variant="body1" sx={{ mt: "10px", color: "#c8c8c8", fontWeight: "400 !important", }}>{movie.plotOutline.text.split(".")[0].length >= 30 ? movie.plotOutline.text.split(".")[0] : <>{movie.plotOutline.text.split(".")[1] ? movie.plotOutline.text.split(".")[1] : ""}</>}</Typography>
                                            </Box>
                                        </>
                                        : ""}
                                </>
                            }
                        </Box>
                    </Box>
                </Box>
            </BackgroundMovie>
        </>
    );
}

export default MainDetail;